import React, {useEffect, useState} from 'react';
import {Image, Modal, ScrollView, TouchableOpacity, View} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {fetchLiteUsers} from "../../../services";
import {LiteUserDto, RootStackParamList} from "../../../dto/types";
import {styles} from "./styles";
import {formatBase64Image} from "../../../util/formatBase64Image";
import {LoadingSpinner} from "../../../components/LoadingSpinner/LoadingSpinner";

interface FollowersOrFollowingModalProps {
    visible: boolean;
    onClose: () => void;
    userIds: Array<number>;
}

type LikesModalNavigationProps = StackNavigationProp<RootStackParamList, 'Profile'>;

export const LikesModal: React.FC<FollowersOrFollowingModalProps> = ({
                                                                         visible,
                                                                         onClose,
                                                                         userIds,
                                                                     }) => {
    const [liteUsers, setLiteUsers] = useState<Array<LiteUserDto>>([]);
    const navigation = useNavigation<LikesModalNavigationProps>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        fetchLiteUsers(userIds)
            .then(liteUsers => {
                setLiteUsers(liteUsers);
                setLoading(false);
            });
    }, [userIds]);

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <View style={styles.header}>
                        <Text style={styles.title}>
                            {'Likes'}
                        </Text>
                        <IconButton
                            icon={() => (
                                <MaterialCommunityIcons name="close" size={30} color="black"/>
                            )}
                            onPress={onClose}
                            style={styles.closeButton}
                        />
                    </View>
                    {loading ? <LoadingSpinner/> :
                        <ScrollView>
                            {liteUsers.map((user) => (
                                <TouchableOpacity key={user.id} onPress={() => {
                                    navigation.navigate("Profile", {userId: user.id});
                                    onClose();
                                }}>
                                    <View style={styles.userRow}>
                                        {user.avatar ? (
                                            <Image
                                                source={{uri: formatBase64Image(user.avatar)}}
                                                style={styles.avatar}
                                                resizeMode="covers"/>
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
                        </ScrollView>}
                </View>
            </View>
        </Modal>
    );
};

