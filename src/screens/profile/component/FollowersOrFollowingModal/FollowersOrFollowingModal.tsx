import React, {useCallback, useEffect, useState} from 'react';
import {Image, Modal, ScrollView, TouchableOpacity, View} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RootStackParamList, UserDto} from '../../../../dto/types.ts';
import {getFollowersForUser, getFollowingForUser} from '../../../../services';
import {styles} from "./styles.ts";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";

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

    useEffect(() => {
        fetchFollowersOrFollowing();
    }, [userId, dataType, visible]);

    const fetchFollowersOrFollowing = useCallback(() => {
        if (dataType === DataType.FOLLOWERS) {
            getFollowersForUser(userId).then(followers => setFollowersOrFollowing(followers));
        } else {
            getFollowingForUser(userId).then(following => setFollowersOrFollowing(following));
        }
    }, [userId, dataType]);

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
                            {dataType === DataType.FOLLOWERS ? 'Followers' : 'Following'}
                        </Text>
                        <IconButton
                            icon={() => (
                                <MaterialCommunityIcons name="close" size={30} color="black"/>
                            )}
                            onPress={onClose}
                            style={styles.closeButton}
                        />
                    </View>
                    <ScrollView>
                        {followersOrFollowing.map((user) => (
                            <TouchableOpacity key={user.id} onPress={() => {
                                navigation.navigate("Profile", {userId: user.id});
                                onClose();
                            }}>
                                <View style={styles.userRow}>
                                    {user.avatar ? (
                                        <Image source={{uri: user.avatar}} style={styles.avatar}/>
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
                </View>
            </View>
        </Modal>
    );
};

