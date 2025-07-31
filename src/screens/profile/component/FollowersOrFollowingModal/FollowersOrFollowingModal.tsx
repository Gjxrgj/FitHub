import React, {useCallback, useEffect, useState} from 'react';
import {Image, Modal, ScrollView, TouchableOpacity, View} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RootStackParamList, UserDto} from '../../../../dto/types.ts';
import {getFollowersForUser, getFollowingForUser} from '../../../../services';
import {styles} from "./styles.ts";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {formatBase64Image} from "../../../../util/formatBase64Image";
import {LoadingSpinner} from "../../../../components/LoadingSpinner/LoadingSpinner";

export enum DataType {
    FOLLOWERS,
    FOLLOWING
}

interface FollowersOrFollowingModalProps {
    visible: boolean;
    onClose: () => void;
    dataType: DataType;
    userId: number;
}

type FollowerOrFollowingNavigationProps = StackNavigationProp<RootStackParamList, 'Profile'>;

export const FollowersOrFollowingModal: React.FC<FollowersOrFollowingModalProps> = ({
                                                                                        visible,
                                                                                        onClose,
                                                                                        dataType,
                                                                                        userId,
                                                                                    }) => {
    const [followersOrFollowing, setFollowersOrFollowing] = useState<Array<UserDto>>([]);
    const navigation = useNavigation<FollowerOrFollowingNavigationProps>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (visible) {
            fetchFollowersOrFollowing();
        }
    }, [visible]);

    const fetchFollowersOrFollowing = useCallback(() => {
        setLoading(true);
        if (dataType === DataType.FOLLOWERS) {
            getFollowersForUser(userId).then(followers => {
                setFollowersOrFollowing(followers);
                setLoading(false);
            });
        } else {
            getFollowingForUser(userId).then(following => {
                setFollowersOrFollowing(following);
                setLoading(false);
            });
        }
    }, [userId, dataType]);

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => {
                setFollowersOrFollowing([]);
                onClose();
            }}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <View style={styles.header}>
                        <Text style={styles.title}>
                            {dataType === DataType.FOLLOWERS ? 'Followers' : 'Following'}
                        </Text>
                        <IconButton
                            icon={() => (
                                <MaterialCommunityIcons name="close" size={30} color="black"/>
                            )}
                            onPress={() => {
                                setFollowersOrFollowing([]);
                                onClose();
                            }}
                            style={styles.closeButton}
                        />
                    </View>
                    {loading ? <LoadingSpinner/> :
                        <View>
                            <ScrollView>
                                {followersOrFollowing.map((user) => (
                                    <TouchableOpacity key={user.id} onPress={() => {
                                        navigation.navigate("Profile", {userId: user.id});
                                        setFollowersOrFollowing([]);
                                        onClose();
                                    }}>
                                        <View style={styles.userRow}>
                                            {user.avatar ? (
                                                <Image source={{uri: formatBase64Image(user.avatar)}}
                                                       style={styles.avatar}/>
                                            ) : (
                                                <MaterialCommunityIcons
                                                    name="account-circle"
                                                    size={50}
                                                    color="gray"
                                                    style={styles.avatarPlaceholder}
                                                />
                                            )}

                                            <View style={styles.userInfo}>
                                                <Text style={styles.username}>@{user.username}</Text>
                                                <Text style={styles.fullName}>
                                                    {user.firstName} {user.lastName}
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>}
                </View>
            </View>
        </Modal>
    );
};

