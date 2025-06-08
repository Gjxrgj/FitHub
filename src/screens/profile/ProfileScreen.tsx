import {ActivityIndicator, DrawerLayoutAndroid, FlatList, Image, Pressable, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {
    deletePost,
    disableUser,
    followUser,
    getFollowersForUser,
    getPostsForUser,
    getProfessionalTrainerById,
    getUserById,
    likePost,
    unfollowUser,
    unlikePost,
    updateUserAvatar
} from '../../services';
import {PostDto, ProfessionalTrainerDto, RootStackParamList, UserDto} from '../../dto/types.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CustomBottomNavigation} from '../../components/BottomNavigation/CustomBottomNavigation.tsx';
import {formatBase64Image} from '../../util/formatBase64Image.ts';
import {Divider, Menu, Text} from 'react-native-paper';
import {MainPageView} from '../../components/MainPagesView/MainPageView.tsx';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../theme/theme.ts';
import {useAuth} from '../../context/AuthProvider.tsx';
import {RouteProp, useFocusEffect, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {VenueType} from '../../enums/enums.ts';
import {styles} from './styles.ts';
import {DataType, FollowersOrFollowingModal} from './component/FollowersOrFollowingModal/FollowersOrFollowingModal.tsx';
import {DrawerLayout} from "react-native-gesture-handler";
import {pickImage} from "../../util/imageUtil";
import {EditBioModal} from "./component/Account/EditBio/EditBioModal";

type ProfileNavigation = StackNavigationProp<RootStackParamList, 'Profile'>;
type ProfileScreenRootProp = RouteProp<RootStackParamList, 'Profile'>;

export const ProfileScreen = () => {
    const auth = useAuth();
    const [userDto, setUserDto] = useState<UserDto>(auth.user);
    const route = useRoute<ProfileScreenRootProp>();
    const {params} = route || {};
    const userId = params?.userId;
    const navigation = useNavigation<ProfileNavigation>();
    const drawer = useRef<DrawerLayoutAndroid>(null);
    const [openFollowerFollowingModal, setOpenFollowerFollowingModal] = useState<boolean>(false);
    const [dataType, setDataType] = useState<DataType>(DataType.FOLLOWING);
    const [posts, setPosts] = useState<Array<PostDto>>([]);
    const flatListRef = useRef<FlatList>(null)
    const [openEditBio, setOpenEditBio] = useState<boolean>(false);
    const [userFollowers, setUserFollowers] = useState<Array<UserDto>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [postLoading, setPostLoading] = useState<boolean>(true);
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);
    const [professionalTrainer, setProfessionalTrainer] = useState<ProfessionalTrainerDto | undefined>(undefined);
    const openMenu = (postId: number) => setOpenMenuId(postId);
    const closeMenu = () => setOpenMenuId(null);


    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            setPostLoading(true);
            setPosts([]);
            fetchUsersPosts();
            if (userId && params) {
                if (userDto.professionalTrainerId) {
                    getProfessionalTrainerById(userDto.professionalTrainerId)
                        .then((professionalTrainer) => {
                            setProfessionalTrainer(professionalTrainer);
                        });
                }
                getUserById(userId)
                    .then(user => {
                        setUserDto(user);
                        getFollowersForUser(userId)
                            .then(followers => {
                                setUserFollowers(followers);
                                setLoading(false);
                            });
                    });
            } else {
                setUserDto(auth.user)
            }
        }, [userId]),
    );

    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            setPostLoading(true);
            setPosts([]);
            fetchUsersPosts();
            if (userId && params) {
                if (userDto.professionalTrainerId) {
                    getProfessionalTrainerById(userDto.professionalTrainerId)
                        .then((professionalTrainer) => {
                            setProfessionalTrainer(professionalTrainer);
                        });
                }
                getUserById(userId)
                    .then(user => {
                        setUserDto(user);
                        getFollowersForUser(userId)
                            .then(followers => {
                                setUserFollowers(followers);
                                setLoading(false);
                            });
                    });
            } else {
                setUserDto(auth.user)
            }
        }, []),
    );

    const fetchUsersPosts = useCallback(() => {
        if (!userId) {
            return;
        }
        getPostsForUser(userId)
            .then(p => {
                setPosts(p);
                setPostLoading(false);
            });
    }, [userId]);

    const handleImagePick = () => {
        pickImage()
            .then((data) => {
                updateUserAvatar(userId, data)
                    .then((updatedUser) => setUserDto(updatedUser));
            })
    };

    const navigationView = () => (
        <View style={[styles.navigationContainer]}>
            <TouchableOpacity onPress={() => {
                drawer.current.closeDrawer();
                navigation.navigate('EditPersonalInfoScreen');
            }}>
                <View style={styles.drawerBox}>
                    <Icon name="pencil" size={24} color={'#555'}/>
                    <Text style={styles.drawerItem}>
                        Edit personal info
                    </Text>
                </View>
            </TouchableOpacity>
            {!professionalTrainer && <TouchableOpacity onPress={() => {
                drawer.current.closeDrawer();
                navigation.navigate('BecomeProfessionalTrainer');
            }}>
                <View style={styles.drawerBox}>
                    <Icon name="whistle-outline" size={24} color={'#555'}/>
                    <Text style={styles.drawerItem}>
                        Become a trainer
                    </Text>
                </View>
            </TouchableOpacity>}
            <TouchableOpacity onPress={() => {
                drawer.current.closeDrawer();
                navigation.navigate('AddVenue', {venueType: VenueType.GYM});
            }}>
                <View style={styles.drawerBox}>
                    <Icon name="plus" size={24} color={'#555'}/>
                    <Text style={styles.drawerItem}>
                        Add Gym
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                drawer.current.closeDrawer();
                navigation.navigate('AddVenue', {venueType: VenueType.SHOP});
            }}>
                <View style={styles.drawerBox}>
                    <Icon name="plus" size={24} color={'#555'}/>
                    <Text style={styles.drawerItem}>
                        Add Shop
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                drawer.current.closeDrawer();
                navigation.navigate('AddVenue', {venueType: VenueType.RESTAURANT});
            }}>
                <View style={styles.drawerBox}>
                    <Icon name="plus" size={24} color={'#555'}/>
                    <Text style={styles.drawerItem}>
                        Add Restaurant
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                drawer.current.closeDrawer();
                navigation.navigate('MyVenues');
            }}>
                <View style={styles.drawerBox}>
                    <Icon name="store" size={24} color={'#555'}/>
                    <Text style={styles.drawerItem}>
                        My venues
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                AsyncStorage.removeItem('authToken').then(() => {
                    drawer.current.closeDrawer();
                    auth.setUser(null);
                })
            }}>
                <View style={styles.drawerBox}>
                    <Icon name="logout" size={24} color={'#555'}/>
                    <Text style={styles.drawerItem}>
                        Log out
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                drawer.current.closeDrawer();
                if (userDto?.id) {
                    disableUser(userDto.id).then(id => {
                        if (id > 0) {
                            AsyncStorage.removeItem('authToken').then(() => {
                                setUserDto(null);
                            });
                        }
                    });
                }
            }}>
                <View style={styles.drawerBox}>
                    <Icon name="account-off" size={24} color={theme.colors.error}/>
                    <Text style={styles.disableAccount}>
                        Disable account
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );

    const storePostToBeUpdated = async (postId: number) => {
        try {
            await AsyncStorage.setItem('postToBeUpdated', postId.toString());
        } catch (e) {
            console.error('Error saving data to AsyncStorage', e);
        }
    };


    const renderPost = ({item}: { item: PostDto }) => (
        <View style={styles.post}>
            <View style={{
                justifyContent: "space-between",
                flexDirection: "row",
                marginVertical: 5,
                marginBottom: 10
            }}>
                <View style={{
                    flexDirection: "row"
                }}>
                    {item.ownerAvatar ? (
                            <Image
                                source={{uri: formatBase64Image(item.ownerAvatar)}}
                                style={styles.postAvatar}
                            />
                        ) :
                        <View style={[styles.shadowContainer, styles.defaultIconContainer]}>
                            <Icon name="account" size={30} color="#ccc"/>
                        </View>
                    }
                    <Text style={{marginLeft: 10}}>{item.ownerUsername}</Text>
                </View>
                {auth.user?.id === item.userId && (
                    <Menu
                        visible={openMenuId === item.id}
                        onDismiss={closeMenu}
                        anchor={
                            <TouchableOpacity onPress={() => openMenu(item.id)}>
                                <Icon name="dots-vertical" size={24} color={"black"}/>
                            </TouchableOpacity>
                        }
                    >
                        <Menu.Item
                            onPress={() => {
                                closeMenu();
                                navigation.navigate("AddEditPostScreen", {postDto: item});
                            }}
                            title="Edit Post"
                        />
                        <Divider/>
                        <Menu.Item
                            onPress={() => {
                                closeMenu();
                                deletePost(item.id).then(() => {
                                    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== item.id));
                                });
                            }}
                            title="Delete Post"
                        />
                    </Menu>
                )}
            </View>
            <Image source={{uri: formatBase64Image(item.image)}} style={styles.postImage}/>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postDescription}>{item.description}</Text>
            <View style={{
                justifyContent: "flex-start",
                flexDirection: "row",
                paddingTop: 10,
            }}>
                <TouchableOpacity style={{alignItems: "center", flexDirection: "row"}} onPress={() => {
                    if (item.likes.map(like => like.userId).includes(auth.user?.id)) {
                        unlikePost(item.id, auth.user?.id)
                            .then((updatedPost) => {
                                setPosts((prevPosts) =>
                                    prevPosts.map((post) =>
                                        post.id === updatedPost.id ? updatedPost : post
                                    )
                                );
                            });
                    } else {
                        likePost(item.id, auth.user?.id)
                            .then((updatedPost) => {
                                setPosts((prevPosts) =>
                                    prevPosts.map((post) =>
                                        post.id === updatedPost.id ? updatedPost : post
                                    )
                                );
                            });
                    }
                }}>
                    {
                        item.likes.map(like => like.userId).includes(auth.user?.id) ?
                            <Icon name="heart" size={24} color="red"/> :
                            <Icon name="heart-outline" size={24} color="red"/>
                    }
                    <Text style={{paddingLeft: 5}}>{item.likes.length}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{padding: 10, alignItems: "center", flexDirection: "row"}} onPress={() => {
                    storePostToBeUpdated(item.id)
                        .then(() => navigation.navigate("CommentsScreen", {comments: item.comments, postId: item.id}));
                }}>
                    <Icon name="comment-outline" size={24} color="black"/>
                    <Text style={{paddingLeft: 5}}>{item.comments.length}</Text>
                </TouchableOpacity>
                {item.mealId != undefined &&
                    <TouchableOpacity style={{padding: 10, alignItems: "center"}} onPress={() => {
                        navigation.navigate("PostMeal", {mealId: item.mealId})
                    }}>
                        <Icon name="food-outline" size={24} color={"black"}/>
                    </TouchableOpacity>}

                {item.workoutId != undefined &&
                    <TouchableOpacity style={{padding: 10, alignItems: "center"}} onPress={() => {
                        navigation.navigate("PostWorkout", {workoutId: item.workoutId})
                    }}>
                        <Icon name="dumbbell" size={24} color={"black"}/>
                    </TouchableOpacity>}
            </View>
        </View>
    );

    if (loading) {
        return (<ActivityIndicator style={{margin: "auto"}} size="large"
                                   color={theme.colors.primary}/>);
    }

    return (
        <DrawerLayout
            ref={drawer}
            drawerWidth={220}
            drawerPosition={'right'}
            renderNavigationView={navigationView}>
            <MainPageView>
                <View>
                    <View style={styles.postsContainer}>
                        <FlatList
                            ref={flatListRef}
                            data={posts || []}
                            ListHeaderComponent={() => (
                                <View>
                                    {userDto?.id === auth.user?.id && <TouchableOpacity
                                        style={{
                                            position: 'absolute',
                                            right: 0,
                                            top: 0,
                                            padding: 15,
                                            zIndex: 1000,
                                        }}
                                        onPress={() => drawer.current?.openDrawer()}>
                                        <Icon name="menu" size={30} color="#000"/>
                                    </TouchableOpacity>}
                                    <View style={styles.profileHeader}>
                                        {auth.user?.id === userDto?.id ?
                                            <Pressable style={styles.avatarContainer} onPress={handleImagePick}>
                                                {userDto?.avatar ? (
                                                        <Image
                                                            source={{uri: formatBase64Image(userDto.avatar)}}
                                                            style={styles.avatar}
                                                        />
                                                    ) :
                                                    <View style={[styles.shadowContainer, styles.defaultIconContainer]}>
                                                        <Icon name="account" size={100} color="#ccc"/>
                                                    </View>
                                                }
                                                <View style={styles.editIconContainer}>
                                                    <Icon name="pencil" size={24} color="#fff"/>
                                                </View>
                                            </Pressable>
                                            :
                                            <View style={styles.avatarContainer}>
                                                {userDto?.avatar ? (
                                                        <Image
                                                            source={{uri: formatBase64Image(userDto.avatar)}}
                                                            style={styles.avatar}
                                                        />
                                                    ) :
                                                    <View style={[styles.shadowContainer, styles.defaultIconContainer]}>
                                                        <Icon name="account" size={100} color="#ccc"/>
                                                    </View>
                                                }
                                            </View>}
                                        <View
                                            style={{
                                                marginTop: 30,
                                                alignItems: 'center',
                                            }}>
                                            <Text style={styles.name}>{userDto?.firstName} {userDto?.lastName}</Text>
                                            <Text style={styles.username}>@{userDto?.username}</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginHorizontal: 10}}>
                                        <View style={styles.statsContainer}>
                                            <Text style={styles.statsNumber}>{userDto?.numPosts}</Text>
                                            <Text style={styles.statsLabel}>Posts</Text>
                                        </View>
                                        <Pressable onPress={() => {
                                            setOpenFollowerFollowingModal(true);
                                            setDataType(DataType.FOLLOWING);

                                        }}>
                                            <View style={styles.statsContainer}>
                                                <Text style={styles.statsNumber}>{userDto?.numFollowing}</Text>
                                                <Text style={styles.statsLabel}>Following</Text>
                                            </View>
                                        </Pressable>
                                        <Pressable onPress={() => {
                                            setOpenFollowerFollowingModal(true);
                                            setDataType(DataType.FOLLOWERS);
                                        }}>
                                            <View style={styles.statsContainer}>
                                                <Text style={styles.statsNumber}>{userDto?.numFollowers}</Text>
                                                <Text style={styles.statsLabel}>Followers</Text>
                                            </View>
                                        </Pressable>
                                    </View>
                                    {auth.user?.id === userId ?
                                        <View style={{marginHorizontal: 20, marginTop: 30}}>
                                            <Pressable style={styles.pressable}
                                                       onPress={() => navigation.navigate('AddEditPostScreen', {postDto: undefined})}>
                                                <View style={styles.pickAnImage}>
                                                    <Text style={styles.pickAnImageText}>
                                                        Add Post
                                                    </Text>
                                                </View>
                                            </Pressable>
                                        </View> :
                                        <View style={{marginHorizontal: 20, marginTop: 30}}>
                                            <Pressable style={styles.pressable}
                                                       onPress={() => {
                                                           if (userFollowers.map(follower => follower.id).includes(auth.user?.id)) {
                                                               unfollowUser(userDto.id).then(user => {
                                                                   setUserDto(user);
                                                                   setUserFollowers(prev => prev.filter(follower => follower.id !== auth.user?.id));
                                                               });
                                                           } else {
                                                               followUser(userDto.id).then(user => {
                                                                   setUserDto(user);
                                                                   setUserFollowers(prev => [...prev, {id: auth.user?.id}]);
                                                               });
                                                           }

                                                       }}>
                                                <View style={styles.pickAnImage}>
                                                    <Text style={styles.pickAnImageText}>
                                                        {userFollowers.map(follower => follower.id).includes(auth.user?.id) ? "Unfollow" : "Follow"}
                                                    </Text>
                                                </View>
                                            </Pressable>
                                        </View>

                                    }
                                    {userDto?.bio && (
                                        <View style={styles.bioContainer}>
                                            <View style={styles.bioCard}>
                                                <View style={styles.about}>
                                                    <Text style={styles.sectionTitle}>About</Text>
                                                    {auth.user?.id === userDto?.id &&
                                                        <TouchableOpacity onPress={() => {
                                                            setOpenEditBio(true)
                                                        }}>
                                                            <Icon name="pencil" size={24} color={theme.colors.primary}/>
                                                        </TouchableOpacity>
                                                    }
                                                </View>
                                                <View style={styles.line}/>
                                                <Text style={styles.bioText}>{userDto.bio || ''}</Text>
                                            </View>
                                        </View>
                                    )}
                                    {professionalTrainer && <View style={styles.professionalTrainerContainer}>
                                        <View style={styles.bioCard}>
                                            <View style={styles.about}>
                                                <Text style={styles.sectionTitle}>Professional trainer info</Text>
                                                {auth.user?.id === userDto?.id &&
                                                    <TouchableOpacity onPress={() => {
                                                        navigation.navigate("BecomeProfessionalTrainer", {professionalTrainer: professionalTrainer});
                                                    }}>
                                                        <Icon name="pencil" size={24} color={theme.colors.primary}/>
                                                    </TouchableOpacity>
                                                }
                                            </View>

                                            <View>
                                                <View style={styles.line}/>
                                                <Text style={styles.bioText}><Text style={{
                                                    fontWeight: "bold",
                                                    color: theme.colors.primary
                                                }}>Username</Text> {professionalTrainer.username}</Text>
                                                <Text style={styles.bioText}><Text style={{
                                                    fontWeight: "bold",
                                                    color: theme.colors.primary
                                                }}>Email</Text> {professionalTrainer.email}</Text>
                                                <Text style={styles.bioText}><Text
                                                    style={{fontWeight: "bold", color: theme.colors.primary}}>Phone
                                                    Number</Text> {professionalTrainer.phoneNumber}</Text>
                                            </View>

                                        </View>
                                    </View>
                                    }
                                </View>
                            )}
                            ListFooterComponent={postLoading ?
                                <ActivityIndicator style={{margin: "auto"}} size="large"
                                                   color={theme.colors.primary}/> : null}
                            renderItem={renderPost}
                            keyExtractor={(item) => item.id}
                        />
                    </View>
                </View>
            </MainPageView>
            <FollowersOrFollowingModal
                visible={openFollowerFollowingModal}
                onClose={() => setOpenFollowerFollowingModal(false)}
                dataType={dataType}
                userId={userDto?.id}/>
            <CustomBottomNavigation/>
            <EditBioModal
                visible={openEditBio}
                onClose={() => setOpenEditBio(false)}
                userId={userDto?.id}
                bio={userDto?.bio ?? ''}
                updateBio={(bio) => setUserDto(prev => ({
                    ...prev!,
                    bio: bio ?? "",
                }))}
            />
        </DrawerLayout>
    );
};
