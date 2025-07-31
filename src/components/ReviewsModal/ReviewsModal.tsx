import React, {useCallback, useState} from 'react';
import {Modal, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ReviewDto, UpsertReviewDto} from '../../dto/types.ts';
import {styles} from './style.ts';
import {theme} from '../../theme/theme.ts';
import {formatDate} from '../../util/dateUtil.ts';
import {Button, Snackbar} from 'react-native-paper';
import {useAuth} from '../../context/AuthProvider.tsx';
import {useForm} from '@tanstack/react-form';
import {CustomTextInput} from '../CustomTextInput/CustomTextInput.tsx';
import {addReviewToVenue, deleteReview} from "../../services/reviewService.ts";
import {ErrorDisplayComponent} from "../ErrorDisplay/ErrorDisplayComponent.tsx";

interface ReviewsModalProps {
    visible: boolean;
    onClose: () => void;
    getReviews: () => void;
    userId: number;
    venueId: number;
    reviews: ReviewDto[];
}

interface StarRatingProps {
    rating: number;
    onChangeRating: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({rating, onChangeRating}) => {
    const renderStars = () => {
        const stars = [];

        for (let i = 1; i <= 5; i++) {
            stars.push(
                <TouchableOpacity key={i} onPress={() => onChangeRating(i)}>
                    <Icon name={i <= rating ? 'star' : 'star-outline'} size={30}
                          color={i <= rating ? theme.colors.primary : '#ccc'}/>
                </TouchableOpacity>
            );
        }

        return <View style={styles.setRatingStarsContainer}>{stars}</View>;
    };

    return <View>{renderStars()}</View>;
};

export const ReviewsModal: React.FC<ReviewsModalProps> = ({
                                                              visible,
                                                              onClose,
                                                              getReviews,
                                                              userId,
                                                              venueId,
                                                              reviews,
                                                          }) => {
    const [showSnackbar, setShowSnackbar] = useState(false);
    const auth = useAuth();
    const form = useForm({
        defaultValues: {
            comment: '',
            rating: 0,
        },
        onSubmit: async ({value}) => {

            if (auth.user && auth.user.id) {
                const upsertReviewDto: UpsertReviewDto = {
                    userIdCreatedBy: auth.user.id,
                    comment: value.comment,
                    rating: value.rating,
                    username: auth.user.username,
                };
                addReviewToVenue(upsertReviewDto, venueId).then(() => {
                    form.reset();
                    setShowSnackbar(true);
                    getReviews();
                });
            }

        },
    });
    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const stars = [];

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<Icon key={i} name="star" size={20} color={theme.colors.primary}/>);
            } else if (i === fullStars && halfStar) {
                stars.push(<Icon key={i} name="star-half" size={20} color={theme.colors.primary}/>);
            } else {
                stars.push(<Icon key={i} name="star-outline" size={20} color="#ccc"/>);
            }
        }

        return <View style={styles.starsContainer}>{stars}</View>;
    };
    const handleDeleteReview = useCallback((id: number) => {
        deleteReview(id).then(() => getReviews());
    }, [getReviews]);

    const sortedReviews = [...reviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <Modal visible={visible} animationType="fade" transparent={true}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <TouchableWithoutFeedback onPress={() => {
                    form.reset();
                    onClose();
                }}>
                    <View style={styles.modalContainer}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalContent}>
                                <TouchableOpacity
                                    onPress={() => {
                                        form.reset();
                                        onClose();
                                    }}
                                    style={styles.closeButtonReviews}
                                >
                                    <Icon style={{margin: 'auto'}} name="close" size={30} color="#555"/>
                                </TouchableOpacity>

                                <Text style={styles.modalTitle}>Reviews</Text>
                                {userId !== auth.user?.id && (
                                    <View style={styles.addReviewForm}>
                                        <form.Field name={'rating'}
                                                    validators={{
                                                        onChange: ({value}) => {
                                                            if (value === 0) {
                                                                return 'Rating cannot be empty.';
                                                            }
                                                        },
                                                    }}>
                                            {(field) => (
                                                <View>
                                                    <StarRating
                                                        rating={Number(field.state.value)}
                                                        onChangeRating={(newRating) => field.handleChange(newRating)}
                                                    />
                                                    {field.state.meta.errors.length > 0 && (
                                                        <ErrorDisplayComponent errorMessages={field.state.meta.errors}/>
                                                    )}
                                                </View>
                                            )}
                                        </form.Field>
                                        <form.Field
                                            name={'comment'}
                                            validators={{
                                                onChange: ({value}) => {
                                                    if (value === '') {
                                                        return 'Review cannot be empty.';
                                                    }
                                                },
                                            }}
                                        >
                                            {(field) => (
                                                <View>
                                                    <CustomTextInput
                                                        label={'Add review...'}
                                                        multiline
                                                        numberOfLines={4}
                                                        onChangeText={(text) => field.handleChange(text)}
                                                        value={field.state.value}/>
                                                    {field.state.meta.errors.length > 0 && (
                                                        <ErrorDisplayComponent errorMessages={field.state.meta.errors}/>
                                                    )}
                                                </View>
                                            )}
                                        </form.Field>
                                        <Button style={{marginVertical: 10, borderRadius: 2, marginHorizontal:10}} mode="contained"
                                                onPress={form.handleSubmit}>
                                            Submit
                                        </Button>
                                    </View>
                                )}
                                {reviews.length === 0 && <Text style={styles.noResultsText}> No reviews yet</Text>}
                                {sortedReviews.map((review: ReviewDto, index: number) => (
                                    <View key={review.id} style={styles.review}>
                                        <View style={styles.reviewHeader}>
                                            <Text style={styles.reviewUsername}>{review.username}</Text>
                                            {review.userId === auth.user?.id &&
                                                <TouchableOpacity onPress={() => handleDeleteReview(review.id)}>
                                                    <Icon name="delete-forever" size={20} color={theme.colors.error}/>
                                                </TouchableOpacity>}
                                        </View>
                                        <View style={styles.starsAndDateContainer}>
                                            {renderStars(review.rating)}
                                            <Text style={styles.reviewDate}>{formatDate(review.date)}</Text>
                                        </View>
                                        <Text style={styles.reviewComment}>{review.comment}</Text>
                                        {index < sortedReviews.length - 1 && (
                                            <View style={styles.reviewDivider}/>
                                        )}
                                    </View>
                                ))}
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
            <Snackbar
                visible={showSnackbar}
                onDismiss={() => setShowSnackbar(false)}
                duration={4000}
                style={styles.snackbar}
            >
                {'Review has been successfully added.'}
            </Snackbar>
        </Modal>
    );
};
