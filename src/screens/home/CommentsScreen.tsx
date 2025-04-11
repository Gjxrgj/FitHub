import React, {useState} from "react";
import {FlatList, Text, TextInput, TouchableOpacity, View} from "react-native";
import {RouteProp, useRoute} from "@react-navigation/native";
import {CommentDto, RootStackParamList, UpsertCommentDto} from "../../dto/types";
import {useAuth} from "../../context/AuthProvider";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {theme} from "../../theme/theme";
import {commentOnPost, deleteComment} from "../../services";
import moment from "moment";

type CommentsScreenProps = RouteProp<RootStackParamList, 'CommentsScreen'>;

export const CommentsScreen = () => {
    const route = useRoute<CommentsScreenProps>();
    const initialComments = route.params.comments || [];
    const postId = route.params.postId;
    const [comments, setComments] = useState<CommentDto[]>(initialComments);
    const [newComment, setNewComment] = useState("");
    const auth = useAuth();

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
                    <View style={{
                        marginBottom: 10,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <View style={{flex: 1}}>
                            <Text>{item.comment}</Text>
                            <Text style={{fontSize: 12, color: "gray"}}>
                                {moment(item.creationDate).format("DD.MM.YYYY")}
                            </Text>
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
