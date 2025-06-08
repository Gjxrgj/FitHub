import {useNavigation} from "@react-navigation/native";
import React, {useEffect, useRef, useState} from "react";
import {RootStackParamList, UserDto} from "../../dto/types";
import _ from "lodash";
import {getUsersByUsername} from "../../services";
import {CustomView} from "../../components/CustomView/CustomView";
import {Text} from "react-native-paper";
import {theme} from "../../theme/theme";
import {Image, ScrollView, TextInput, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {LoadingSpinner} from "../../components/LoadingSpinner/LoadingSpinner";
import {CustomBottomNavigation} from "../../components/BottomNavigation/CustomBottomNavigation";
import {styles} from "./styles";
import {StackNavigationProp} from "@react-navigation/stack";
import {formatBase64Image} from "../../util/formatBase64Image";

type SearchFriendsScreenNavigation = StackNavigationProp<RootStackParamList, 'SearchFriends'>;

export const SearchFriends = () => {
    const navigation = useNavigation<SearchFriendsScreenNavigation>();
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [users, setUsers] = useState<Array<UserDto>>([]);

    const debounceFetchUsers = useRef(
        _.debounce(async (input: string) => {
            setUsers([]);
            setLoading(true);
            try {
                getUsersByUsername(input)
                    .then(u => setUsers(u));
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        }, 500),
    ).current;

    useEffect(() => {
        if (searchTerm.length > 1) {
            debounceFetchUsers(searchTerm);
        } else {
            debounceFetchUsers.cancel();
            setLoading(false);
        }
    }, [debounceFetchUsers, searchTerm]);

    return (
        <CustomView>
            <Text style={{
                fontSize: 30,
                fontWeight: 'normal',
                color: theme.colors.primary,
                marginHorizontal: 'auto',
                paddingTop: 20,
                paddingBottom: 20
            }}>Find Friends</Text>
            <View style={styles.searchContainer}>
                <View style={styles.iconContainer}>
                    <Icon name="magnify" size={20} color={theme.colors.primary}/>
                </View>
                <TextInput
                    style={styles.searchBar}
                    placeholder=""
                    placeholderTextColor={'#555'}
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                />
                <View style={styles.IconXContainer}>
                    <TouchableOpacity onPress={() => setSearchTerm('')}>
                        <Icon name="close" size={20} color={theme.colors.primary}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.scrollContainer}>
                <ScrollView>
                    {users.length === 0 && !loading && (
                        <Text style={styles.noResultsText}>No results found</Text>
                    )}
                    {loading && (
                        <LoadingSpinner/>
                    )}
                    {users.map((item, index) => {
                        const username = item.username;
                        const email = item.email;
                        const avatar = item.avatar;


                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => navigation.navigate('Profile', {userId: item.id})}
                            >
                                <View style={styles.userContainer}>
                                    <View style={styles.avatarContainer}>
                                        {avatar ? (
                                            <Image
                                                source={{uri: formatBase64Image(avatar)}}
                                                style={styles.avatar}
                                            />
                                        ) : (
                                            <View style={[styles.shadowContainer, styles.defaultIconContainer]}>
                                                <Icon name="account" size={50} color="#ccc"/>
                                            </View>
                                        )}
                                    </View>

                                    <View style={styles.textContainer}>
                                        <Text style={styles.exerciseName}>{username}</Text>
                                        <Text style={styles.exerciseText}>{email.toLowerCase()}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>
            <CustomBottomNavigation/>
        </CustomView>
    );
}
