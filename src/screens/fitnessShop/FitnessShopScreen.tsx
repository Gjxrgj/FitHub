import {ActivityIndicator, FlatList, Image, ScrollView, TouchableOpacity, View,} from 'react-native';
import {RouteProp, useFocusEffect, useNavigation, useRoute} from '@react-navigation/native';
import {
    ContactInformationDto,
    FitnessShopDto,
    ImageDto,
    ReviewDto,
    RootStackParamList,
    UpsertImageDto
} from '../../dto/types.ts';
import React, {useCallback, useState} from 'react';
import {addImageToVenue, getAllReviewsForVenue, getShopById, updateAvatar} from '../../services';
import {CustomView} from '../../components/CustomView/CustomView.tsx';
import {formatBase64Image} from '../../util/formatBase64Image.ts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Avatar, Button, Text} from 'react-native-paper';
import {styles} from './styles.ts';
import {VenueMapModal} from '../../components/VenueMapModal/VenueMapModal.tsx';
import {ReviewsModal} from '../../components/ReviewsModal/ReviewsModal.tsx';
import {ImageModal} from "../../components/ImageModal/ImageModal.tsx";
import {useAuth} from "../../context/AuthProvider.tsx";
import {EditDescriptionModal} from "../../components/EditDescriptionModal/EditDescriptionModal.tsx";
import {ContactInformationModal} from "../../components/ContactInfomationModal/ContactInformationModal.tsx";
import {theme} from '../../theme/theme.ts';
import {pickImage} from "../../util/imageUtil";
import {VenueType} from "../../enums/enums";
import moment from "moment/moment";
import {StackNavigationProp} from "@react-navigation/stack";


type FitnessShopScreenRouteProp = RouteProp<RootStackParamList, 'FitnessShopScreen'>;
type FitnessShopScreenNavigation = StackNavigationProp<RootStackParamList, 'FitnessShopScreen'>;

export const FitnessShopScreen = () => {
    const auth = useAuth();
    const route = useRoute<FitnessShopScreenRouteProp>();
    const {shopId} = route.params;
    const [shopDto, setShopDto] = useState<FitnessShopDto | undefined>(undefined);
    const [showReviewsModal, setShowReviewsModal] = useState<boolean>(false);
    const [showVenueModal, setShowVenueModal] = useState<boolean>(false);
    const [imageUris, setImageUris] = useState<Array<string>>([]);
    const [showImageModal, setShowImageModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const [openEditDescriptionModal, setOpenEditDescriptionModal] = useState<boolean>(false);
    const [openContactInformationModal, setOpenContactInformationModal] = useState<boolean>(false);
    const navigation = useNavigation<FitnessShopScreenNavigation>();
    const [reviews, setReviews] = useState<Array<ReviewDto>>([]);


    useFocusEffect(
        useCallback(() => {
            getShop();
            getReviewsForShop();
        }, [])
    );

    const getShop = useCallback(() => {
        getShopById(shopId)
            .then(shop => {
                setShopDto(shop);
                setImageUris(shop.images.map(image => formatBase64Image(image.data)));
            });
    }, [shopId]);

    const getReviewsForShop = useCallback(() => {
        getAllReviewsForVenue(shopId).then(rev => setReviews(rev));
    }, [shopId]);


    const setShopImages = useCallback((newImageDtos: Array<ImageDto>) => {
        if (shopDto) {
            setShopDto(prev => ({
                ...prev!,
                images: newImageDtos,
            }));

            const updatedImageUris = newImageDtos.map(image => formatBase64Image(image.data));
            setImageUris(updatedImageUris);
        }
    }, [shopDto]);

    const setShopAvatar = useCallback((avatar: string) => {
        if (shopDto) {
            setShopDto(prev => ({
                ...prev!,
                avatar: avatar,
            }));
        }
    }, [shopDto]);

    const updateContactInformation = useCallback((contactInformationDto: ContactInformationDto) => {
        if (shopDto) {
            setShopDto(prev => ({
                ...prev!,
                contactNumber: contactInformationDto.contactNumber,
                contactEmail: contactInformationDto.contactEmail,
                businessWebsite: contactInformationDto.businessWebsite,
            }));
        }
    }, [shopDto]);

    const updateDescription = useCallback((description: string) => {
        if (shopDto) {
            setShopDto(prev => ({
                ...prev!,
                description: description,
            }));
        }
    }, [shopDto]);

    if (!shopDto) {
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

    const resetDto = () => {
        setShopDto(undefined);
    };

    const handleAddImage = () => {
        pickImage().then((image) => {
            addImageToVenue({data: image} as UpsertImageDto, shopId)
                .then(images => {
                    setShopDto(prev => ({
                        ...prev!,
                        images: images,
                    }));
                    setImageUris(images.map(image => formatBase64Image(image.data)));
                });
        })
    };

    const handleAvatarChange = () => {
        pickImage().then((image) => {
            updateAvatar(shopId, image)
                .then(data => setShopAvatar(data));
        })
    };


    return (
        <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 60}}>
            <CustomView>
                <View style={{flexDirection: "column", justifyContent: "flex-end", alignItems: "center"}}>
                    <Text style={{fontWeight: "normal", fontSize: 16}}>Subscription ending
                        on {moment(shopDto.subscriptionExpirationDate, "YYYYMMDD").format("DD.MM.YYYY")}</Text>
                </View>
                <View style={styles.profileHeader}>
                    <TouchableOpacity onPress={() => {
                        auth.user?.id === shopDto?.userId && handleAvatarChange();
                    }}>
                        {shopDto?.avatar ? (
                            <View style={styles.shadowContainer}>
                                <Avatar.Image size={100} source={{uri: formatBase64Image(shopDto.avatar)}}/>
                            </View>
                        ) : (
                            <View style={[styles.shadowContainer, styles.defaultIconContainer]}>
                                <Icon name="account" size={100} color="#ccc"/>
                            </View>
                        )}
                        {auth.user?.id === shopDto.userId && <View style={styles.editIconContainer}>
                            <Icon name="pencil" size={24} color="#fff"/>
                        </View>}
                    </TouchableOpacity>
                    <View style={{marginTop: 30, alignItems: 'center'}}>
                        <Text style={styles.name}>{shopDto.name}</Text>
                        {renderStars(averageRating)}
                        {reviews.length >= 0 ?
                            <Button onPress={() => setShowReviewsModal(true)} style={styles.reviewButton}>
                                View Reviews ({reviews.length})
                            </Button> :
                            <Text style={{color: theme.colors.primary, marginTop: 5}}>No reviews yet</Text>}
                    </View>
                </View>

                <TouchableOpacity style={{
                    padding: 'auto',
                    paddingVertical: 10,
                    marginBottom: 20,
                    backgroundColor: theme.colors.primary,
                    borderRadius: 8,
                }} onPress={() => {navigation.navigate('Resubscribe', { venue: shopDto, venueType: VenueType.SHOP} )}}>
                    <Text style={{fontSize: 16, textAlign: 'center', color: 'white'}}>
                        Resubscribe
                    </Text>
                </TouchableOpacity>
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
                        {auth.user?.id === shopDto.userId &&
                            <TouchableOpacity style={{
                                borderWidth: 1,
                                borderColor: theme.colors.primary,
                                borderRadius: 5,
                            }} onPress={handleAddImage}>
                                <Icon name={'plus'} size={30} color={theme.colors.primary}/>
                            </TouchableOpacity>}
                    </View>
                    {shopDto.images.length > 0 ?
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
                        {auth.user?.id === shopDto.userId &&
                            <TouchableOpacity style={{
                                borderWidth: 1,
                                borderColor: theme.colors.primary,
                                borderRadius: 5,
                                padding: 2,
                            }} onPress={() => setOpenEditDescriptionModal(true)}>
                                <Icon name={'pencil'} size={25} color={theme.colors.primary}/>
                            </TouchableOpacity>}
                    </View>
                    <Text style={styles.descriptionText}>{shopDto.description || 'No description available.'}</Text>
                    <Text style={styles.descriptionText}>We offer products from the following brands: {shopDto.brands.map((brand, index) => {
                        return <Text style={{fontWeight: 'bold'}} key={index}>{brand}{shopDto.brands.length !== index + 1 ? ", " : ""}</Text>}
                    )}
                    </Text>
                    <Text style={styles.descriptionText}>We offer products from the following categories: {shopDto.categories.map((cat, index) => {
                        return <Text style={{fontWeight: 'bold'}} key={index}>{cat}{shopDto.categories.length !== index + 1 ? ", " : ""}</Text>}
                    )}
                    </Text>
                </View>

                <View style={styles.contactContainer}>
                    <View style={styles.imageSectionTitleButton}>
                        <Text style={styles.sectionTitle}>Contact Information</Text>
                        {auth.user?.id === shopDto.userId &&
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
                        <Text style={styles.contactText}>{shopDto.contactNumber || 'N/A'}</Text>
                    </View>
                    <View style={styles.contactInfo}>
                        <Icon name="email" size={20} color={theme.colors.primary}/>
                        <Text style={styles.contactText}>{shopDto.contactEmail || 'N/A'}</Text>
                    </View>
                    <View style={styles.contactInfo}>
                        <Icon name="web" size={20} color={theme.colors.primary}/>
                        <Text style={styles.contactText}>{shopDto.businessWebsite || 'N/A'}</Text>
                    </View>
                </View>

                <ReviewsModal
                    visible={showReviewsModal}
                    onClose={closeReviewsModal}
                    reviews={reviews}
                    userId={shopDto.userId}
                    venueId={shopDto.id}
                    getReviews={resetDto}
                />

                <ImageModal
                    showImageModal={showImageModal}
                    setShowImageModal={setShowImageModal}
                    selectedImage={selectedImage ?? ''}
                    currentImageIndex={currentImageIndex}
                    imageDtos={shopDto.images}
                    setImages={setShopImages}
                    venueUserId={shopDto.userId}
                    showPreviousImage={showPreviousImage}
                    showNextImage={showNextImage}/>

                <VenueMapModal
                    visible={showVenueModal}
                    onClose={() => setShowVenueModal(false)}
                    venue={shopDto}
                />

                <EditDescriptionModal
                    visible={openEditDescriptionModal}
                    onClose={() => setOpenEditDescriptionModal(false)}
                    venueId={shopId}
                    description={shopDto.description ?? ''}
                    updateDescription={updateDescription}
                />
                <ContactInformationModal
                    visible={openContactInformationModal}
                    onClose={() => setOpenContactInformationModal(false)}
                    venueId={shopId}
                    contactInformation={{
                        contactEmail: shopDto.contactEmail,
                        contactNumber: shopDto.contactNumber,
                        businessWebsite: shopDto.businessWebsite,
                    } as ContactInformationDto}
                    updateContactInformation={updateContactInformation}
                />
            </CustomView>
        </ScrollView>
    );
};
