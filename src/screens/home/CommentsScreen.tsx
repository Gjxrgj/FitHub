import React, {useEffect, useState} from "react";
import {FlatList, Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {CommentDto, LiteUserDto, RootStackParamList, UpsertCommentDto} from "../../dto/types";
import {useAuth} from "../../context/AuthProvider";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {theme} from "../../theme/theme";
import {commentOnPost, deleteComment, fetchLiteUsers} from "../../services";
import moment from "moment";
import {LoadingSpinner} from "../../components/LoadingSpinner/LoadingSpinner";
import {formatBase64Image} from "../../util/formatBase64Image";
import {StackNavigationProp} from "@react-navigation/stack";
import {ExpandableText} from "../../components/ExpandableText/ExpandableText";

type CommentsScreenProps = RouteProp<RootStackParamList, 'CommentsScreen'>;
type CommentsScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Profile'>;

export const CommentsScreen = () => {
    const route = useRoute<CommentsScreenProps>();
    const initialComments = route.params.comments || [];
    const postId = route.params.postId;
    const [comments, setComments] = useState<CommentDto[]>(initialComments);
    const [newComment, setNewComment] = useState("");
    const auth = useAuth();
    const [liteUsers, setLiteUsers] = useState<Record<number, LiteUserDto>>();
    const [loading, setLoading] = useState<boolean>(true);
    const navigation = useNavigation<CommentsScreenNavigationProps>();

    useEffect(() => {
        setLoading(true);
        if (comments.length === 0) return;

        fetchLiteUsers(comments.map(comment => comment.userId))
            .then(lu => {
                const mapped = lu.reduce((acc, user) => {
                    acc[user.id] = user;
                    return acc;
                }, {} as Record<number, LiteUserDto>);
                setLiteUsers(mapped);
                setLoading(false);
            });
    }, [comments]);

    const addComment = () => {
        if (newComment.trim().length === 0) {
            return;
        }
        if (newComment.trim()) {
            const newCommentObj: UpsertCommentDto = {
                userId: auth.user?.id ?? 0,
                postId: postId,
                comment: newComment,
            };

            commentOnPost(postId, newCommentObj).then((post) => {
                setComments(post.comments);
            }).catch((error) => {
                console.error("Failed to add comment:", error);
            });
            setNewComment("");
        }
    };

    return (
        <View style={{flex: 1, paddingHorizontal: 10}}>
            <Text style={{fontSize: 24, marginHorizontal: "auto", paddingBottom: 30, paddingTop: 20}}>Comments</Text>
            <FlatList
                data={comments}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    loading ? <LoadingSpinner/> :
                        <View style={{
                            marginBottom: 10,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}>
                            <View style={{flex: 1}}>
                                <View>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginVertical: 10,
                                        paddingHorizontal: 10,
                                        alignItems: 'flex-start',
                                    }}>
                                        <TouchableOpacity key={item.userId} onPress={() => {
                                            navigation.navigate("Profile", {userId: item.userId});
                                        }}>
                                            <View style={{paddingTop: 5}}>
                                                {liteUsers[item.userId].avatar ? (
                                                    <Image
                                                        source={{uri: formatBase64Image(liteUsers[item.userId].avatar)}}
                                                        style={{
                                                            width: 50,
                                                            height: 50,
                                                            borderRadius: 50,
                                                            marginRight: 10,
                                                            resizeMode: 'cover',
                                                        }}
                                                        resizeMode="covers"/>
                                                ) : (
                                                    <MaterialCommunityIcons
                                                        name="account-circle"
                                                        size={50}
                                                        color="gray"
                                                        style={{
                                                            width: 50,
                                                            height: 50,
                                                            marginRight: 10,
                                                        }}
                                                    />
                                                )}
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{
                                            flex: 1,
                                        }}>
                                            <TouchableOpacity key={item.userId} onPress={() => {
                                                navigation.navigate("Profile", {userId: item.userId});
                                            }}>
                                                <Text style={{
                                                    fontSize: 16,
                                                    fontWeight: 'bold',
                                                    color: theme.colors.primary,
                                                }}>
                                                    @{liteUsers[item.userId].username}
                                                </Text>
                                            </TouchableOpacity>
                                            <ExpandableText date={moment(item.creationDate).format("DD.MM.YYYY")}>
                                                {item.comment}
                                            </ExpandableText>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View>
                                {item.userId === auth.user.id && <TouchableOpacity onPress={() => deleteComment(item.id)
                                    .then((post) => {
                                        setComments(post.comments);
                                    })}>
                                    <Icon name={'delete'} size={30} color={theme.colors.error}/>
                                </TouchableOpacity>}
                            </View>
                        </View>
                )}
                ListEmptyComponent={<Text style={{textAlign: "center", marginTop: 20}}>There are no comments yet</Text>}
                contentContainerStyle={{paddingBottom: 80}}
            />

            <View style={{
                flexDirection: "row",
                alignItems: "center",
                position: "absolute",
                bottom: 20,
                left: 0,
                right: 0,
                paddingHorizontal: 10
            }}>
                <TextInput
                    style={{
                        borderWidth: 1,
                        borderColor: "#ccc",
                        borderRadius: 8,
                        padding: 10,
                        marginRight: 10,
                        flex: 1,
                        fontWeight: "normal"
                    }}
                    placeholder="Add a comment..."
                    multiline={true}
                    numberOfLines={4}
                    value={newComment}
                    onChangeText={setNewComment}
                />
                <TouchableOpacity style={{padding: 10}} onPress={addComment}>
                    <Icon name="send" size={24} color={theme.colors.primary}/>
                </TouchableOpacity>
            </View>
        </View>
    );
};
