import {RouteProp, useFocusEffect, useNavigation, useRoute} from '@react-navigation/native';
import {
    ContactInformationDto,
    GroupTrainingDto,
    GymDto,
    ImageDto,
    LocationInformationDto,
    PersonalTrainingDto,
    PricingDto,
    PromotionDto,
    ReviewDto,
    RootStackParamList,
    UpsertImageDto,
} from '../../dto/types.ts';
import React, {useCallback, useState} from 'react';
import {
    addImageToVenue,
    editLocationInformation,
    getAllReviewsForVenue,
    getGymById,
    removeGroupTrainingFromGym,
    removePersonalTraining,
    removePromotionFromGym,
    updateAvatar,
} from '../../services';
import {ActivityIndicator, FlatList, Image, ScrollView, TouchableOpacity, View} from 'react-native';
import {CustomView} from '../../components/CustomView/CustomView.tsx';
import {theme} from '../../theme/theme.ts';

import {Avatar, Button, Text} from 'react-native-paper';
import {formatBase64Image} from '../../util/formatBase64Image.ts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {formatDate} from '../../util/dateUtil.ts';
import {styles} from './styles.ts';
import {VenueMapModal} from '../../components/VenueMapModal/VenueMapModal.tsx';
import {ReviewsModal} from '../../components/ReviewsModal/ReviewsModal.tsx';
import {useAuth} from '../../context/AuthProvider.tsx';
import {ImageModal} from '../../components/ImageModal/ImageModal.tsx';
import {AddPromotionModal} from './components/addPromotion/AddPromotionModal.tsx';
import {AddGroupTrainingModal} from './components/addGroupTraining/AddGroupTrainingModal.tsx';
import {AddPersonalTrainingModal} from './components/addPersonalTraining/AddPersonalTrainingModal.tsx';
import {EditDescriptionModal} from '../../components/EditDescriptionModal/EditDescriptionModal.tsx';
import {ContactInformationModal} from '../../components/ContactInfomationModal/ContactInformationModal.tsx';
import {MapPickerModal} from '../../components/MapPickerModal/MapPickerModal.tsx';
import {UpdatePricingModal} from './components/updatePricingModal/UpdatePricingModal.tsx';
import {pickImage} from "../../util/imageUtil";
import {StackNavigationProp} from "@react-navigation/stack";
import moment from "moment";
import {VenueType} from "../../enums/enums";

type GymScreenRouteProp = RouteProp<RootStackParamList, 'GymScreen'>;
type GymScreenNavigation = StackNavigationProp<RootStackParamList, 'GymScreen'>;

export const GymScreen = () => {
    const route = useRoute<GymScreenRouteProp>();
    const {gymId} = route.params;
    const auth = useAuth();
    const [gymDto, setGymDto] = useState<GymDto | undefined>(undefined);
    const [showReviewsModal, setShowReviewsModal] = useState(false);
    const [showPromotions, setShowPromotions] = useState(false);
    const [showPersonalTrainings, setShowPersonalTrainings] = useState(false);
    const [showGroupTrainings, setShowGroupTrainings] = useState(false);
    const [imageUris, setImageUris] = useState<Array<string>>([]);
    const [showImageModal, setShowImageModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const [showVenueModal, setShowVenueModal] = useState<boolean>(false);
    const [reviews, setReviews] = useState<Array<ReviewDto>>([]);
    const [showAddPromotionModal, setShowAddPromotionModal] = useState<boolean>(false);
    const [showAddGroupTrainingModal, setShowAddGroupTrainingModal] = useState<boolean>(false);
    const [showAddPersonalTrainingModal, setShowAddPersonalTrainingModal] = useState<boolean>(false);
    const [openEditDescriptionModal, setOpenEditDescriptionModal] = useState<boolean>(false);
    const [openContactInformationModal, setOpenContactInformationModal] = useState<boolean>(false);
    const [openEditLocation, setOpenEditLocation] = useState<boolean>(false);
    const [openUpdatePricingModal, setOpenUpdatePricingModal] = useState<boolean>(false);
    const navigation = useNavigation<GymScreenNavigation>();

    useFocusEffect(
        useCallback(() => {
            getGym();
            getReviewsForGym();
        }, [])
    );
    const getGym = useCallback(() => {
        getGymById(gymId).then(gym => {
            setGymDto(gym);
            setImageUris(gym.images.map(image => formatBase64Image(image.data)));
        });
    }, []);

    const getReviewsForGym = useCallback(() => {
        getAllReviewsForVenue(gymId).then(rev => setReviews(rev));
    }, [gymId]);

    const setGymImages = useCallback((newImageDtos: Array<ImageDto>) => {
        if (gymDto) {
            setGymDto(prev => ({
                ...prev!,
                images: newImageDtos,
            }));

            const updatedImageUris = newImageDtos.map(image => formatBase64Image(image.data));
            setImageUris(updatedImageUris);
        }
    }, [gymDto]);

    const setGymAvatar = useCallback((avatar: string) => {
        if (gymDto) {
            setGymDto(prev => ({
                ...prev!,
                avatar: avatar,
            }));
        }
    }, [gymDto]);

    const updatePromotions = useCallback((promotions: Array<PromotionDto>) => {
        if (gymDto) {
            setGymDto(prev => ({
                ...prev!,
                promotions: promotions,
            }));
        }
    }, [gymDto]);

    const updateGroupTrainings = useCallback((groupTrainingDtos: Array<GroupTrainingDto>) => {
        if (gymDto) {
            setGymDto(prev => ({
                ...prev!,
                groupTrainings: groupTrainingDtos,
            }));
        }
    }, [gymDto]);

    const updatePersonalTrainings = useCallback((personalTrainingDtos: Array<PersonalTrainingDto>) => {
        if (gymDto) {
            setGymDto(prev => ({
                ...prev!,
                personalTrainings: personalTrainingDtos,
            }));
        }
    }, [gymDto]);

    const updateDescription = useCallback((description: string) => {
        if (gymDto) {
            setGymDto(prev => ({
                ...prev!,
                description: description,
            }));
        }
    }, [gymDto]);

    const updateContactInformation = useCallback((contactInformationDto: ContactInformationDto) => {
        if (gymDto) {
            setGymDto(prev => ({
                ...prev!,
                contactNumber: contactInformationDto.contactNumber,
                contactEmail: contactInformationDto.contactEmail,
                businessWebsite: contactInformationDto.businessWebsite,
            }));
        }
    }, [gymDto]);

    const updateLocation = useCallback((latitude: number, longitude: number, vicinity: string) => {
        if (gymDto) {
            const locationInformationDto: LocationInformationDto = {
                vicinity: vicinity,
                latitude: latitude,
                longitude: longitude,
            };
            editLocationInformation(gymId, locationInformationDto)
                .then(location => {
                        setGymDto(prev => ({
                            ...prev!,
                            vicinity: location.vicinity,
                            latitude: location.latitude,
                            longitude: location.longitude,
                        }));
                    }
                );
        }
    }, [gymDto, gymId]);

    const updatePricing = useCallback((pricing: PricingDto) => {
        if (gymDto) {
            setGymDto(prev => ({
                ...prev!,
                dailyPassPrice: pricing.dailyPass,
                monthlySubscription: pricing.monthlySubscription,
            }));
        }
    }, [gymDto]);

    if (!gymDto) {
        return (
            <CustomView>
                <ActivityIndicator size="large" color={theme.colors.primary}/>
            </CustomView>
        );
    }

    const showNextImage = () => {
        if (currentImageIndex < imageUris.length - 1) {
            const newIndex = currentImageIndex + 1;
            setCurrentImageIndex(newIndex);
            setSelectedImage(imageUris[newIndex]);
        }
    };

    const showPreviousImage = () => {
        if (currentImageIndex > 0) {
            const newIndex = currentImageIndex - 1;
            setCurrentImageIndex(newIndex);
            setSelectedImage(imageUris[newIndex]);
        }
    };

    const averageRating = reviews.length > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
        : 0;

    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const stars = [];

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<Icon key={i} name="star" size={30} color={theme.colors.primary}/>);
            } else if (i === fullStars && halfStar) {
                stars.push(<Icon key={i} name="star-half" size={30} color={theme.colors.primary}/>);
            } else {
                stars.push(<Icon key={i} name="star-outline" size={30} color="#ccc"/>);
            }
        }

        return <View style={styles.starsContainer}>{stars}</View>;
    };

    const renderImage = ({item, index}: { item: string, index: number }) => (
        <TouchableOpacity onPress={() => {
            setSelectedImage(item);
            setCurrentImageIndex(index);
            setShowImageModal(true);
        }}>
            <Image style={styles.thumbnail} resizeMode="cover" source={{uri: item}}/>
        </TouchableOpacity>
    );

    const closeReviewsModal = () => {
        setShowReviewsModal(false);
    };

    const handleAddImage = () => {
        pickImage().then((i) => {
            addImageToVenue({data: i} as UpsertImageDto, gymId)
                .then(images => {
                    setGymDto(prev => ({
                        ...prev!,
                        images: images,
                    }));
                    setImageUris(images.map(img => formatBase64Image(img.data)));
                });
        })
    };


    const handleAvatarChange = async () => {
        pickImage().then((image) => {
            updateAvatar(gymId, image)
                .then(data => setGymAvatar(data))
        });
    };

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 60}}>
            <CustomView>
                {auth.user?.id === gymDto?.userId &&
                    <View style={{flexDirection: "column", justifyContent: "flex-end", alignItems: "center"}}>
                        <Text style={{fontWeight: "normal", fontSize: 16}}>Subscription ending
                            on {moment(gymDto.subscriptionExpirationDate, "YYYYMMDD").format("DD.MM.YYYY")}</Text>
                    </View>}
                <View style={styles.profileHeader}>
                    <TouchableOpacity onPress={() => {
                        auth.user?.id === gymDto?.userId && handleAvatarChange();
                    }}>
                        {gymDto?.avatar ? (
                            <View style={styles.shadowContainer}>
                                <Avatar.Image size={100} source={{uri: formatBase64Image(gymDto.avatar)}}/>
                            </View>
                        ) : (
                            <View style={[styles.shadowContainer, styles.defaultIconContainer]}>
                                <Icon name="account" size={100} color="#ccc"/>
                            </View>
                        )}
                        {auth.user?.id === gymDto.userId &&
                            <View style={styles.editIconContainer}>
                                <Icon name="pencil" size={24} color="#fff"/>
                            </View>
                        }
                    </TouchableOpacity>
                    <View style={{marginTop: 30, alignItems: 'center'}}>
                        <Text style={styles.name}>{gymDto.name}</Text>
                        {renderStars(averageRating)}
                        {reviews.length >= 0 ?
                            <Button onPress={() => setShowReviewsModal(true)} style={styles.reviewButton}>
                                View Reviews ({reviews.length})
                            </Button> : <Text style={{color: theme.colors.primary, marginTop: 5}}>No reviews yet</Text>}
                    </View>
                </View>

                {auth.user?.id === gymDto.userId &&
                    <TouchableOpacity style={{
                        padding: 'auto',
                        paddingVertical: 10,
                        marginBottom: 20,
                        backgroundColor: theme.colors.primary,
                        borderRadius: 8,
                    }} onPress={() => {
                        navigation.navigate('Resubscribe', {venue: gymDto, venueType: VenueType.GYM})
                    }}>
                        <Text style={{fontSize: 16, textAlign: 'center', color: 'white'}}>
                            Resubscribe
                        </Text>
                    </TouchableOpacity>}
                <TouchableOpacity style={{
                    padding: 'auto',
                    paddingVertical: 10,
                    marginBottom: 20,
                    backgroundColor: theme.colors.primary,
                    borderRadius: 8,
                }} onPress={() => setShowVenueModal(true)}>
                    <Text style={{fontSize: 16, textAlign: 'center', color: 'white'}}>
                        <Icon name="google-maps" size={20} color={theme.colors.secondary}/> See Location on Map
                    </Text>
                </TouchableOpacity>
                {auth.user?.id === gymDto.userId &&
                    <TouchableOpacity style={{
                        padding: 'auto',
                        paddingVertical: 10,
                        marginBottom: 20,
                        backgroundColor: theme.colors.primary,
                        borderRadius: 8,
                    }} onPress={() => setOpenEditLocation(true)}>
                        <Text style={{fontSize: 16, textAlign: 'center', color: 'white'}}>
                            <Icon name="google-maps" size={20} color={theme.colors.secondary}/> Edit Location
                        </Text>
                    </TouchableOpacity>}

                <View style={styles.imageContainer}>
                    <View style={styles.imageSectionTitleButton}>
                        <Text style={styles.sectionTitle}>Images</Text>
                        {auth.user?.id === gymDto.userId &&
                            <TouchableOpacity style={{
                                borderWidth: 1,
                                borderColor: theme.colors.primary,
                                borderRadius: 5,
                            }} onPress={handleAddImage}>
                                <Icon name={'plus'} size={30} color={theme.colors.primary}/>
                            </TouchableOpacity>}
                    </View>
                    {gymDto.images.length > 0 ?
                        <FlatList
                            style={{marginBottom: 15}}
                            data={imageUris}
                            renderItem={renderImage}
                            keyExtractor={(item, index) => index}
                            horizontal
                        />
                        : <Text
                            style={styles.descriptionText}>No images available.</Text>}
                </View>

                <View style={styles.descriptionContainer}>
                    <View style={styles.imageSectionTitleButton}>
                        <Text style={styles.sectionTitle}>Description</Text>
                        {auth.user?.id === gymDto.userId &&
                            <TouchableOpacity style={{
                                borderWidth: 1,
                                borderColor: theme.colors.primary,
                                borderRadius: 5,
                                padding: 2,
                            }} onPress={() => setOpenEditDescriptionModal(true)}>
                                <Icon name={'pencil'} size={25} color={theme.colors.primary}/>
                            </TouchableOpacity>}
                    </View>
                    <Text style={styles.descriptionText}>{gymDto.description || 'No description available.'}</Text>
                </View>

                <View style={styles.pricingContainer}>
                    <View style={styles.imageSectionTitleButton}>
                        <Text style={styles.sectionTitle}>Pricing</Text>
                        {auth.user?.id === gymDto.userId &&
                            <TouchableOpacity style={{
                                borderWidth: 1,
                                borderColor: theme.colors.primary,
                                borderRadius: 5,
                                padding: 2,
                            }} onPress={() => setOpenUpdatePricingModal(true)}>
                                <Icon name={'pencil'} size={25} color={theme.colors.primary}/>
                            </TouchableOpacity>}
                    </View>
                    <View style={styles.priceItem}>
                        <Text style={styles.pricingText}>Daily Pass</Text>
                        <Text
                            style={styles.priceValue}>{gymDto.dailyPassPrice ? `${gymDto.dailyPassPrice} ${gymDto.currency}` : 'N/A'}</Text>
                    </View>
                    <View style={styles.priceItem}>
                        <Text style={styles.pricingText}>Monthly Subscription</Text>
                        <Text
                            style={styles.priceValue}>{gymDto.monthlySubscription ? `${gymDto.monthlySubscription} ${gymDto.currency}` : 'N/A'}</Text>
                    </View>
                </View>

                <View style={styles.contactContainer}>
                    <View style={styles.imageSectionTitleButton}>
                        <Text style={styles.sectionTitle}>Contact Information</Text>
                        {auth.user?.id === gymDto.userId &&
                            <TouchableOpacity style={{
                                borderWidth: 1,
                                borderColor: theme.colors.primary,
                                borderRadius: 5,
                                padding: 2,
                            }} onPress={() => setOpenContactInformationModal(true)}>
                                <Icon name={'pencil'} size={25} color={theme.colors.primary}/>
                            </TouchableOpacity>}
                    </View>
                    <View style={styles.contactInfo}>
                        <Icon name="phone" size={20} color={theme.colors.primary}/>
                        <Text style={styles.contactText}>{gymDto.contactNumber || 'N/A'}</Text>
                    </View>
                    <View style={styles.contactInfo}>
                        <Icon name="email" size={20} color={theme.colors.primary}/>
                        <Text style={styles.contactText}>{gymDto.contactEmail || 'N/A'}</Text>
                    </View>
                    <View style={styles.contactInfo}>
                        <Icon name="web" size={20} color={theme.colors.primary}/>
                        <Text style={styles.contactText}>{gymDto.businessWebsite || 'N/A'}</Text>
                    </View>
                </View>


                <TouchableOpacity onPress={() => {
                    if (gymDto?.promotions.length > 0 || gymDto?.userId === auth.user?.id) {
                        setShowPromotions(!showPromotions);
                    }
                }} style={styles.promotionToggle}>
                    <Text style={styles.sectionTitle}>Promotions ({gymDto.promotions.length})</Text>
                    <Icon name={showPromotions ? 'chevron-up' : 'chevron-down'} color={theme.colors.primary} size={24}/>
                </TouchableOpacity>

                {showPromotions && (
                    <View style={styles.promotionsContainer}>
                        {auth.user?.id === gymDto.userId &&
                            <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10}}>
                                <TouchableOpacity style={{
                                    borderWidth: 1,
                                    borderColor: theme.colors.primary,
                                    borderRadius: 5,
                                }} onPress={() => setShowAddPromotionModal(true)}>
                                    <Icon name={'plus'} size={30} color={theme.colors.primary}/>
                                </TouchableOpacity>
                            </View>
                        }
                        {gymDto.promotions.map((promotion) => (
                            <View key={promotion.id} style={styles.promotion}>
                                <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10}}>

                                    <TouchableOpacity onPress={() => {
                                        removePromotionFromGym(promotion.id)
                                            .then(promotions => updatePromotions(promotions));
                                    }}>
                                        {gymDto.userId === auth.user?.id &&
                                            <Icon name={'delete'} size={30} color={theme.colors.error}/>}
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.priceItem}>
                                    <Text style={styles.pricingText}>Lasts</Text>
                                    <Text
                                        style={styles.priceValue}>{promotion.amountOfMonths} months</Text>
                                </View>
                                <View style={styles.priceItem}>
                                    <Text style={styles.pricingText}>Price</Text>
                                    <Text
                                        style={styles.priceValue}>{promotion.price} {promotion.currency}</Text>
                                </View>
                                <View style={styles.priceItem}>
                                    <Text style={styles.pricingText}>Valid until</Text>
                                    <Text
                                        style={styles.priceValue}>{moment(promotion.validUntil, "YYYYMMDD").format("DD.MM.YYYY")}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                )}
                <TouchableOpacity onPress={() => {
                    if (gymDto?.personalTrainings.length !== 0 || gymDto?.userId === auth.user?.id) {
                        setShowPersonalTrainings(!showPersonalTrainings);
                    }
                }} style={styles.promotionToggle}>
                    <Text style={styles.sectionTitle}>Personal Trainings ({gymDto.personalTrainings.length})</Text>
                    <Icon name={showPersonalTrainings ? 'chevron-up' : 'chevron-down'} color={theme.colors.primary}
                          size={24}/>
                </TouchableOpacity>

                {showPersonalTrainings && (
                    <View style={styles.promotionsContainer}>
                        {auth.user?.id === gymDto.userId &&
                            <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10}}>
                                <TouchableOpacity style={{
                                    borderWidth: 1,
                                    borderColor: theme.colors.primary,
                                    borderRadius: 5,
                                }} onPress={() => {
                                    setShowAddPersonalTrainingModal(true);
                                }}>
                                    <Icon name={'plus'} size={30} color={theme.colors.primary}/>
                                </TouchableOpacity>
                            </View>
                        }
                        {gymDto.personalTrainings.map((training) => (
                            <View key={training.id} style={styles.promotion}>
                                <View style={styles.nameDeleteBox}>
                                    <Text style={styles.sectionTitle}>{training.name}</Text>
                                    <TouchableOpacity onPress={() => {
                                        removePersonalTraining(training.id)
                                            .then(trainings => updatePersonalTrainings(trainings));
                                    }}>
                                        {gymDto.userId === auth.user?.id &&
                                            <Icon name={'delete'} size={30} color={theme.colors.error}/>}
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.personalTrainingText}>{training.description}</Text>
                                <View style={styles.personalTrainingTrainer}>
                                    <Text style={styles.pricingText}>Price</Text>
                                    <Text style={styles.trainerUsername}>{training.price} {training.currency}</Text>
                                </View>
                                <View style={styles.personalTrainingTrainer}>
                                    <Text style={styles.pricingText}>Trainer</Text>
                                    <Text style={styles.trainerUsername}
                                          key={training.id}>@{training.professionalTrainerDto.username}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                )}

                <TouchableOpacity onPress={() => {
                    if (gymDto?.groupTrainings.length !== 0 || gymDto?.userId === auth.user?.id) {
                        setShowGroupTrainings(!showGroupTrainings);
                    }
                }} style={styles.promotionToggle}>
                    <Text style={styles.sectionTitle}>Group Trainings ({gymDto.groupTrainings.length})</Text>
                    <Icon name={showGroupTrainings ? 'chevron-up' : 'chevron-down'} color={theme.colors.primary}
                          size={24}/>
                </TouchableOpacity>

                {showGroupTrainings && (
                    <View style={styles.promotionsContainer}>
                        {auth.user?.id === gymDto.userId &&
                            <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10}}>
                                <TouchableOpacity style={{
                                    borderWidth: 1,
                                    borderColor: theme.colors.primary,
                                    borderRadius: 5,
                                }} onPress={() => {
                                    setShowAddGroupTrainingModal(true);
                                }}>
                                    <Icon name={'plus'} size={30} color={theme.colors.primary}/>
                                </TouchableOpacity>
                            </View>
                        }
                        {gymDto.groupTrainings.map((training) => (
                            <View key={training.id} style={styles.promotion}>
                                <View style={styles.nameDeleteBox}>
                                    <Text style={styles.sectionTitle}>{training.name}</Text>
                                    <TouchableOpacity onPress={() => {
                                        removeGroupTrainingFromGym(training.id)
                                            .then(trainings => updateGroupTrainings(trainings));
                                    }}>
                                        {gymDto.userId === auth.user?.id &&
                                            <Icon name={'delete'} size={30} color={theme.colors.error}/>}
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.personalTrainingText}>{training.description}</Text>
                                <View style={styles.priceItemGroupTraining}>
                                    <Text style={styles.pricingText}>Price</Text>
                                    <Text style={styles.priceValue}>{training.price} {training.currency}</Text>
                                </View>
                                <View style={styles.priceItemGroupTraining}>
                                    <Text style={styles.pricingText}>Professional trainer</Text>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate("Profile", {userId: training.professionalTrainerId})}>
                                        <Text style={styles.priceValue}>@{training.professionalTrainerUsername}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>
                )}
                <ReviewsModal
                    visible={showReviewsModal}
                    onClose={closeReviewsModal}
                    getReviews={getReviewsForGym}
                    reviews={reviews}
                    userId={gymDto.userId}
                    venueId={gymDto.id}
                />
                <ImageModal
                    showImageModal={showImageModal}
                    setShowImageModal={setShowImageModal}
                    selectedImage={selectedImage ?? ''}
                    currentImageIndex={currentImageIndex}
                    imageDtos={gymDto.images}
                    setImages={setGymImages}
                    showPreviousImage={showPreviousImage}
                    venueUserId={gymDto.userId}
                    showNextImage={showNextImage}
                />

                <VenueMapModal
                    visible={showVenueModal}
                    onClose={() => setShowVenueModal(false)}
                    venue={gymDto}
                />

                <AddPromotionModal
                    visible={showAddPromotionModal}
                    onClose={() => setShowAddPromotionModal(false)}
                    gymId={gymId}
                    updatePromotions={updatePromotions}
                />

                <AddGroupTrainingModal
                    visible={showAddGroupTrainingModal}
                    onClose={() => setShowAddGroupTrainingModal(false)}
                    gymId={gymId}
                    updateGroupTrainings={updateGroupTrainings}
                />

                <AddPersonalTrainingModal
                    visible={showAddPersonalTrainingModal}
                    onClose={() => setShowAddPersonalTrainingModal(false)}
                    gymId={gymId}
                    updatePersonalTrainings={updatePersonalTrainings}
                />

                <EditDescriptionModal
                    visible={openEditDescriptionModal}
                    onClose={() => setOpenEditDescriptionModal(false)}
                    venueId={gymId}
                    description={gymDto.description ?? ''}
                    updateDescription={updateDescription}
                />

                <ContactInformationModal
                    visible={openContactInformationModal}
                    onClose={() => setOpenContactInformationModal(false)}
                    venueId={gymId}
                    contactInformation={{
                        contactEmail: gymDto.contactEmail,
                        contactNumber: gymDto.contactNumber,
                        businessWebsite: gymDto.businessWebsite,
                    } as ContactInformationDto}
                    updateContactInformation={updateContactInformation}
                />
                <MapPickerModal
                    visible={openEditLocation}
                    onClose={() => setOpenEditLocation(false)}
                    onSelectLocation={updateLocation}
                />
                <UpdatePricingModal
                    visible={openUpdatePricingModal}
                    onClose={() => setOpenUpdatePricingModal(false)}
                    venueId={gymId}
                    pricing={{
                        dailyPass: gymDto.dailyPassPrice,
                        monthlySubscription: gymDto.monthlySubscription,
                    } as PricingDto}
                    updatePricing={updatePricing}
                />
            </CustomView>
        </ScrollView>
    );
};
