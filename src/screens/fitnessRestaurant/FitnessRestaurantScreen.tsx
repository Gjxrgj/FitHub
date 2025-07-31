import {ActivityIndicator, FlatList, Image, ScrollView, TouchableOpacity, View} from 'react-native';
import {RouteProp, useFocusEffect, useNavigation, useRoute} from '@react-navigation/native';
import {
    ContactInformationDto,
    FitnessRestaurantDto,
    ImageDto,
    ReviewDto,
    RootStackParamList,
    UpsertImageDto,
} from '../../dto/types.ts';
import React, {useCallback, useState} from 'react';
import {CustomView} from '../../components/CustomView/CustomView.tsx';
import {theme} from '../../theme/theme.ts';
import {formatBase64Image} from '../../util/formatBase64Image.ts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Avatar, Button, Text} from 'react-native-paper';
import {styles} from './styles.ts';
import {VenueMapModal} from '../../components/VenueMapModal/VenueMapModal.tsx';
import {addImageToVenue, getAllReviewsForVenue, getFitnessRestaurantById, updateAvatar} from '../../services';
import {StackNavigationProp} from '@react-navigation/stack';
import {ReviewsModal} from '../../components/ReviewsModal/ReviewsModal.tsx';
import {ImageModal} from '../../components/ImageModal/ImageModal.tsx';
import {useAuth} from '../../context/AuthProvider.tsx';
import {EditDescriptionModal} from '../../components/EditDescriptionModal/EditDescriptionModal.tsx';
import {ContactInformationModal} from '../../components/ContactInfomationModal/ContactInformationModal.tsx';
import {pickImage} from "../../util/imageUtil";
import {VenueType} from "../../enums/enums";
import moment from "moment/moment";

type FitnessRestaurantScreenRouteProp = RouteProp<RootStackParamList, 'FitnessRestaurantScreen'>;
type MenuNavigation = StackNavigationProp<RootStackParamList, 'MenuScreen'>;

export const FitnessRestaurantScreen = () => {
    const auth = useAuth();
    const route = useRoute<FitnessRestaurantScreenRouteProp>();
    const {restaurantId} = route.params;
    const [restaurantDto, setRestaurantDto] = useState<FitnessRestaurantDto | undefined>(undefined);
    const [showReviewsModal, setShowReviewsModal] = useState<boolean>(false);
    const [showVenueModal, setShowVenueModal] = useState<boolean>(false);
    const [imageUris, setImageUris] = useState<Array<string>>([]);
    const [showImageModal, setShowImageModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const navigation = useNavigation<MenuNavigation>();
    const [reviews, setReviews] = useState<Array<ReviewDto>>([]);
    const [openEditDescriptionModal, setOpenEditDescriptionModal] = useState<boolean>(false);
    const [openContactInformationModal, setOpenContactInformationModal] = useState<boolean>(false);

    useFocusEffect(
        useCallback(() => {
            getRestaurant();
            getReviewsForRestaurant();
        }, [])
    );

    const getRestaurant = useCallback(() => {
        getFitnessRestaurantById(restaurantId)
            .then(restaurant => {
                setRestaurantDto(restaurant);
                setImageUris(restaurant.images.map(image => formatBase64Image(image.data)));
            });
    }, [restaurantId]);

    const getReviewsForRestaurant = useCallback(() => {
        getAllReviewsForVenue(restaurantId).then(rev => setReviews(rev));
    }, [restaurantId]);

    const setRestaurantImages = useCallback((newImageDtos: Array<ImageDto>) => {
        if (restaurantDto) {
            setRestaurantDto(prev => ({
                ...prev!,
                images: newImageDtos,
            }));

            const updatedImageUris = newImageDtos.map(image => formatBase64Image(image.data));
            setImageUris(updatedImageUris);
        }
    }, [restaurantDto]);

    const setRestaurantAvatar = useCallback((avatar: string) => {
        if (restaurantDto) {
            setRestaurantDto(prev => ({
                ...prev!,
                avatar: avatar,
            }));
        }
    }, [restaurantDto]);

    const updateDescription = useCallback((description: string) => {
        if (restaurantDto) {
            setRestaurantDto(prev => ({
                ...prev!,
                description: description,
            }));
        }
    }, [restaurantDto]);

    const updateContactInformation = useCallback((contactInformationDto: ContactInformationDto) => {
        if (restaurantDto) {
            setRestaurantDto(prev => ({
                ...prev!,
                contactNumber: contactInformationDto.contactNumber,
                contactEmail: contactInformationDto.contactEmail,
                businessWebsite: contactInformationDto.businessWebsite,
            }));
        }
    }, [restaurantDto]);

    if (!restaurantDto) {
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

    const handleAddImage = () => {
        pickImage().then((image) => {
            addImageToVenue({data: image} as UpsertImageDto, restaurantId)
                .then(images => {
                    setRestaurantDto(prev => ({
                        ...prev!,
                        images: images,
                    }));
                    setImageUris(images.map(image => formatBase64Image(image.data)));
                });
        });
    };

    const closeReviewsModal = () => {
        setShowReviewsModal(false);
    };

    const handleAvatarChange = async () => {
        pickImage().then((image) => {
            updateAvatar(restaurantId, image).then(data => setRestaurantAvatar(data))
        });
    };

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 60}}>
            <CustomView>
                <View style={{flexDirection: "column", justifyContent: "flex-end", alignItems: "center"}}>
                    <Text style={{fontWeight: "normal", fontSize: 16}}>Subscription ending
                        on {moment(restaurantDto.subscriptionExpirationDate, "YYYYMMDD").format("DD.MM.YYYY")}</Text>
                </View>
                <View style={styles.profileHeader}>
                    <TouchableOpacity onPress={() => {
                        auth.user?.id === restaurantDto?.userId && handleAvatarChange();
                    }}>
                        {restaurantDto?.avatar ? (
                            <View style={styles.shadowContainer}>
                                <Avatar.Image size={100} source={{uri: formatBase64Image(restaurantDto.avatar)}}/>
                            </View>
                        ) : (
                            <View style={[styles.shadowContainer, styles.defaultIconContainer]}>
                                <Icon name="account" size={100} color="#ccc"/>
                            </View>
                        )}
                        {auth.user?.id === restaurantDto.userId && <View style={styles.editIconContainer}>
                            <Icon name="pencil" size={24} color="#fff"/>
                        </View>}
                    </TouchableOpacity>
                    <View style={{marginTop: 30, alignItems: 'center'}}>
                        <Text style={styles.name}>{restaurantDto.name}</Text>
                        {renderStars(averageRating)}
                        {reviews.length >= 0 ?
                            <Button onPress={() => setShowReviewsModal(true)} style={styles.reviewButton}>
                                View Reviews ({reviews.length})
                            </Button> :
                            <Text style={{color: theme.colors.primary, marginTop: 5}}>No reviews yet</Text>}
                    </View>
                </View>

                {auth.user?.id === restaurantDto.userId &&<TouchableOpacity style={{
                    padding: 'auto',
                    paddingVertical: 10,
                    marginBottom: 20,
                    backgroundColor: theme.colors.primary,
                    borderRadius: 8,
                }} onPress={() => {
                    navigation.navigate('Resubscribe', {venue: restaurantDto, venueType: VenueType.RESTAURANT})
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
                        <Icon name="google-maps" size={20} color={theme.colors.secondary}/>See Location on Map
                    </Text>
                </TouchableOpacity>

                <View style={styles.imageContainer}>
                    <View style={styles.imageSectionTitleButton}>
                        <Text style={styles.sectionTitle}>Images</Text>
                        {auth.user?.id === restaurantDto.userId &&
                            <TouchableOpacity style={{
                                borderWidth: 1,
                                borderColor: theme.colors.primary,
                                borderRadius: 5,
                            }} onPress={handleAddImage}>
                                <Icon name={'plus'} size={30} color={theme.colors.primary}/>
                            </TouchableOpacity>}
                    </View>
                    {restaurantDto.images.length > 0 ?
                        <FlatList
                            style={{marginBottom: 15}}
                            data={imageUris}
                            renderItem={renderImage}
                            keyExtractor={(item, index) => index.toString()}
                            horizontal
                        />
                        : <Text
                            style={styles.descriptionText}>No images available.</Text>}
                </View>

                <View style={styles.descriptionContainer}>
                    <View style={styles.imageSectionTitleButton}>
                        <Text style={styles.sectionTitle}>Description</Text>
                        {auth.user?.id === restaurantDto.userId &&
                            <TouchableOpacity style={{
                                borderWidth: 1,
                                borderColor: theme.colors.primary,
                                borderRadius: 5,
                                padding: 2,
                            }} onPress={() => setOpenEditDescriptionModal(true)}>
                                <Icon name={'pencil'} size={25} color={theme.colors.primary}/>
                            </TouchableOpacity>}
                    </View>
                    <Text
                        style={styles.descriptionText}>{restaurantDto.description || 'No description available.'}</Text>
                </View>

                <View style={styles.contactContainer}>
                    <View style={styles.imageSectionTitleButton}>
                        <Text style={styles.sectionTitle}>Contact Information</Text>
                        {auth.user?.id === restaurantDto.userId &&
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
                        <Text style={styles.contactText}>{restaurantDto.contactNumber || 'N/A'}</Text>
                    </View>
                    <View style={styles.contactInfo}>
                        <Icon name="email" size={20} color={theme.colors.primary}/>
                        <Text style={styles.contactText}>{restaurantDto.contactEmail || 'N/A'}</Text>
                    </View>
                    <View style={styles.contactInfo}>
                        <Icon name="web" size={20} color={theme.colors.primary}/>
                        <Text style={styles.contactText}>{restaurantDto.businessWebsite || 'N/A'}</Text>
                    </View>
                </View>

                <ReviewsModal
                    visible={showReviewsModal}
                    onClose={closeReviewsModal}
                    reviews={reviews}
                    userId={restaurantDto.userId}
                    venueId={restaurantDto.id}
                    getReviews={getReviewsForRestaurant}
                />

                <ImageModal
                    showImageModal={showImageModal}
                    setShowImageModal={setShowImageModal}
                    selectedImage={selectedImage ?? ''}
                    currentImageIndex={currentImageIndex}
                    imageDtos={restaurantDto.images}
                    setImages={setRestaurantImages}
                    venueUserId={restaurantDto.userId}
                    showPreviousImage={showPreviousImage}
                    showNextImage={showNextImage}/>

                <VenueMapModal
                    visible={showVenueModal}
                    onClose={() => setShowVenueModal(false)}
                    venue={restaurantDto}
                />
                {restaurantDto.menu ?
                    <Button mode={'contained'} onPress={() => navigation.navigate('MenuScreen', {
                        menu: restaurantDto.menu,
                        restaurantName: restaurantDto.name,
                        ownerId: restaurantDto?.userId,
                        fitnessRestaurantId: restaurantId,
                    })}>See Menu</Button> :
                    <Text>No menu available.</Text>}

                <EditDescriptionModal
                    visible={openEditDescriptionModal}
                    onClose={() => setOpenEditDescriptionModal(false)}
                    venueId={restaurantId}
                    description={restaurantDto.description ?? ''}
                    updateDescription={updateDescription}
                />
                <ContactInformationModal
                    visible={openContactInformationModal}
                    onClose={() => setOpenContactInformationModal(false)}
                    venueId={restaurantId}
                    contactInformation={{
                        contactEmail: restaurantDto.contactEmail,
                        contactNumber: restaurantDto.contactNumber,
                        businessWebsite: restaurantDto.businessWebsite,
                    } as ContactInformationDto}
                    updateContactInformation={updateContactInformation}
                />
            </CustomView>
        </ScrollView>
    );
};
