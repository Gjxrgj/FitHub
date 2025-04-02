import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {ActivityIndicator, FlatList, Image, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {useAuth} from '../../context/AuthProvider.tsx';
import {MainPageView} from '../../components/MainPagesView/MainPageView.tsx';
import {CustomBottomNavigation} from '../../components/BottomNavigation/CustomBottomNavigation.tsx';
import {CalorieOverview} from '../day/calorieOverview/CalorieOverview.tsx';
import {getMealsForDay, getPostById, getPostsForUsersFeed, likePost, unlikePost} from '../../services';
import {MealTrackDto, PostDto, RootStackParamList} from '../../dto/types.ts';
import {styles} from './styles.ts';
import {formatBase64Image} from '../../util/formatBase64Image.ts';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {StackNavigationProp} from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {theme} from "../../theme/theme";


type HomeScreenNavigation = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

export const HomeScreen: FC = () => {
    const auth = useAuth();
    const flatListRef = useRef<FlatList>(null);
    const [date, setDate] = useState<moment.Moment>(moment());
    const [meals, setMeals] = useState<Array<MealTrackDto>>([]);
    const [calorieIntake, setCalorieIntake] = useState<number>(0);
    const [posts, setPosts] = useState<Array<PostDto>>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const navigation = useNavigation<HomeScreenNavigation>();

    useFocusEffect(
        useCallback(() => {
            setDate(moment());
            setHasMore(true);
            loadMealsForDay();
            setPage(0);
            setPosts([]);
            loadPosts(0);
            void updatePostFromStorage();
        }, []),
    );

    useEffect(() => {
        if (page !== 0) {
            loadPosts(page);
        }
    }, [page]);

    const updatePostFromStorage = async () => {
        try {
            const postToBeUpdated = await AsyncStorage.getItem('postToBeUpdated');
            if (postToBeUpdated !== null) {
                const postId = Number(postToBeUpdated);
                if (!isNaN(postId)) {
                    getPostById(postId)
                        .then((updatedPost) => {
                            setPosts((prevPosts) =>
                                prevPosts.map((post) =>
                                    post.id === updatedPost.id ? updatedPost : post
                                )
                            );
                            AsyncStorage.removeItem("postToBeUpdated");
                        })
                        .catch((error) => {
                            console.error("Failed to fetch post:", error);
                        });
                }
            }
        } catch (error) {
            console.error("Error getting post from AsyncStorage:", error);
        }
    };

    const loadMealsForDay = useCallback(() => {
        if (auth.user?.id) {
            getMealsForDay(auth.user.id, date.format('YYYY-MM-DD')).then((m) => {
                setMeals(m);
                let sumCalories = 0;
                m.forEach((mt) => {
                    mt.foodItems.forEach((fi) => {
                        sumCalories += (fi.caloriesPer100g / 100.0) * fi.quantity;
                    });
                });
                setCalorieIntake(sumCalories);
            });
        }
    }, [auth.user?.id, date]);

    const loadPosts = (Page: number) => {
        if (auth.user?.id) {
            setLoading(true);
            getPostsForUsersFeed(auth.user.id, Page, 10)
                .then((newPosts) => {
                    setPosts((prevPosts) => {
                        const existingIds = new Set(prevPosts.map((post) => post.id));
                        const filteredNewPosts = newPosts.filter((post) => !existingIds.has(post.id));

                        const updatedPosts = Page === 0 ? filteredNewPosts : [...prevPosts, ...filteredNewPosts];

                        return updatedPosts.sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
                    });
                    setHasMore(newPosts.length > 0);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                });
        }
    };

    const storePostToBeUpdated = async (postId: number) => {
        try {
            await AsyncStorage.setItem('postToBeUpdated', postId.toString());
        } catch (e) {
            console.error('Error saving data to AsyncStorage', e);
        }
    };


    const renderPost = ({item}: { item: PostDto }) => (
        <View style={styles.post}>
            <TouchableOpacity onPress={() => navigation.navigate("Profile", {userId: item.userId})}>
                <View style={{
                    flexDirection: "row",
                    alignItems: "flex-end",
                    marginBottom: 15
                }}>
                    <View style={{
                        marginTop: 5,
                        width: 30
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

                    </View>
                    <Text style={{marginLeft: 10, paddingBottom: 2}}>{item.ownerUsername}</Text>
                </View>
            </TouchableOpacity>
            <Image source={{uri: formatBase64Image(item.image)}} style={styles.postImage}/>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postDescription}>{item.description}</Text>
            <View style={styles.cardRow}>

            </View>
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

    const handleEndReached = () => {
        if (hasMore && !loading) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    return (
        <MainPageView>
            <FlatList
                style={{marginBottom: 50}}
                ref={flatListRef}
                data={posts}
                renderItem={renderPost}
                ListHeaderComponent={() => (
                    <CalorieOverview
                        date={date}
                        setDate={setDate}
                        loadMealsForDay={loadMealsForDay}
                        calorieIntake={calorieIntake}
                        showButtons={true}
                        meals={meals}
                        dailyCalories={auth.user?.dailyCalories ?? 0}
                    />
                )}
                keyExtractor={(item, index) => `${index}`}
                onEndReached={handleEndReached}
                onEndReachedThreshold={1}
                ListFooterComponent={loading ?
                    <ActivityIndicator style={{margin: "auto"}} size="large" color={theme.colors.primary}/> : null}
            />
            <CustomBottomNavigation/>
        </MainPageView>
    );
};
