import {useForm} from '@tanstack/react-form';
import {Button, Text, useTheme} from 'react-native-paper';
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Image, Pressable, ScrollView, TouchableOpacity, View} from 'react-native';
import {CustomTextInput} from '../../components/CustomTextInput/CustomTextInput.tsx';
import {ErrorDisplayComponent} from '../../components/ErrorDisplay/ErrorDisplayComponent.tsx';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
    AddFitnessRestaurantRequest,
    AddFitnessShopRequest,
    AddGymRequest,
    RootStackParamList,
    SubscriptionRequest,
    UpsertFitnessRestaurantDto,
    UpsertFitnessShopDto,
    UpsertGymDto
} from '../../dto/types.ts';
import {Currency, VenueType} from '../../enums/enums.ts';
import {MapPickerModal} from '../../components/MapPickerModal/MapPickerModal.tsx';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Picker} from '@react-native-picker/picker';
import {addFitnessRestaurant, addFitnessShop, addGym} from '../../services';
import {StackNavigationProp} from '@react-navigation/stack';
import {useAuth} from '../../context/AuthProvider.tsx';
import {styles} from './addVenueStyles.ts';
import {pickImage} from "../../util/imageUtil";
import {formatBase64Image} from "../../util/formatBase64Image";
import {useStripe} from "@stripe/stripe-react-native";
import {subscribe} from "../../services/paymentService";
import {LoadingSpinner} from "../../components/LoadingSpinner/LoadingSpinner";


type AddVenueRouteProp = RouteProp<RootStackParamList, 'AddVenue'>;
type AddVenueNavigation = StackNavigationProp<RootStackParamList, 'AddVenue'>;

export const AddVenueScreen = () => {
    const route = useRoute<AddVenueRouteProp>();
    const {venueType} = route.params;
    const [isMapModalVisible, setMapModalVisible] = useState(false);
    const colors = useTheme().colors;
    const [title, setTitle] = useState<string>('');
    const [categoryBeingAdded, setCategoryBeingAdded] = useState<string>('');
    const [brandBeingAdded, setBrandBeingAdded] = useState<string>('');
    const navigation = useNavigation<AddVenueNavigation>();
    const {user} = useAuth();
    const {initPaymentSheet, presentPaymentSheet} = useStripe();
    const [loading, setLoading] = useState(false);
    const form = useForm({
        defaultValues: {
            userId: user?.id,
            name: '',
            vicinity: '',
            latitude: 0,
            longitude: 0,
            description: '',
            contactNumber: '',
            contactEmail: '',
            businessWebsite: '',
            avatar: '',
            dailyPassPrice: 0,
            monthlySubscription: 0,
            currency: undefined,
            categories: [],
            brands: [],
        },
        onSubmit: ({value}): void => {
            subscribeUser(value);
        },
    });

    useEffect(() => {
        if (venueType === VenueType.GYM) {
            setTitle('Gym Registration');
        } else if (venueType === VenueType.SHOP) {
            setTitle('Shop Registration');
        } else if (venueType === VenueType.RESTAURANT) {
            setTitle('Restaurant Registration');
        }
    }, [venueType]);

    const subscribeUser = async (value) => {
        try {
            setLoading(true);

            const subscriptionRequest: SubscriptionRequest = {
                email: user?.email || '',
                priceId: 'price_1QqfIS3BIkPNr9Q8KBgzA1iv'
            }
            const response = await subscribe(subscriptionRequest);

            if (!response?.clientSecret) {
                Alert.alert('Error', 'Failed to create subscription.');
                setLoading(false);
                return;
            }

            const {error: initError} = await initPaymentSheet({
                paymentIntentClientSecret: response.clientSecret,
                merchantDisplayName: 'FitHub',
            });

            if (initError) {
                Alert.alert('Error', initError.message);
                setLoading(false);
                return;
            }

            const {error: paymentError} = await presentPaymentSheet();
            if (paymentError) {
                Alert.alert('Payment failed', paymentError.message);
            } else {
                Alert.alert('Success', 'Subscription completed and venue created!');
                switch (venueType) {
                    case VenueType.GYM:
                        const upsertGymDto: UpsertGymDto = {
                            userId: value.userId ? value.userId : 0,
                            name: value.name,
                            vicinity: value.vicinity,
                            latitude: value.latitude,
                            longitude: value.longitude,
                            description: value.description,
                            contactNumber: value.contactNumber,
                            contactEmail: value.contactEmail,
                            businessWebsite: value.businessWebsite,
                            avatar: value.avatar,
                            dailyPassPrice: value.dailyPassPrice,
                            monthlySubscription: value.monthlySubscription,
                            currency: value.currency ? value.currency : Currency.MKD,
                        };
                        const addGymRequest: AddGymRequest = {
                            upsertGymDto: upsertGymDto,
                            subscriptionResponse: response
                        }
                        addGym(addGymRequest).then(() => navigation.navigate('Profile'));
                        break;
                    case VenueType.SHOP:
                        const upsertFitnessShopDto: UpsertFitnessShopDto = {
                            userId: value.userId ? value.userId : 0,
                            name: value.name,
                            vicinity: value.vicinity,
                            latitude: value.latitude,
                            longitude: value.longitude,
                            description: value.description,
                            contactNumber: value.contactNumber,
                            contactEmail: value.contactEmail,
                            businessWebsite: value.businessWebsite,
                            avatar: value.avatar,
                            categories: value.categories,
                            brands: value.brands,
                        };
                        const addShopRequest: AddFitnessShopRequest = {
                            upsertFitnessShopDto: upsertFitnessShopDto,
                            subscriptionResponse: response
                        }
                        addFitnessShop(addShopRequest).then(() => navigation.navigate('Profile'));
                        break;
                    case VenueType.RESTAURANT:
                        const upsertFitnessRestaurantDto: UpsertFitnessRestaurantDto = {
                            userId: value.userId ? value.userId : 0,
                            name: value.name,
                            vicinity: value.vicinity,
                            latitude: value.latitude,
                            longitude: value.longitude,
                            description: value.description,
                            contactNumber: value.contactNumber,
                            contactEmail: value.contactEmail,
                            businessWebsite: value.businessWebsite,
                            avatar: value.avatar,
                        };
                        const addFitnessRestaurantRequest: AddFitnessRestaurantRequest = {
                            upsertFitnessRestaurantDto: upsertFitnessRestaurantDto,
                            subscriptionResponse: response
                        }
                        addFitnessRestaurant(addFitnessRestaurantRequest).then(() => navigation.navigate('Profile'));
                        break;
                    default:
                        console.error("Invalid venue type")
                }
            }

            setLoading(false);
        } catch (err) {
            console.error(err);
            Alert.alert('Error', 'Something went wrong.');
            setLoading(false);
        }
    };

    const handleSelectLocation = (latitude: number, longitude: number, vicinity: string) => {
        form.setFieldValue('vicinity', vicinity);
        form.setFieldValue('latitude', latitude);
        form.setFieldValue('longitude', longitude);
        form.validateField('vicinity', 'change');
    };

    const handleImagePick = () => {
        pickImage()
            .then((data) => {
                form.setFieldValue('avatar', data);
            })
    };

    const GymFields = useCallback(() => {
        return (
            <>
                <form.Field name={'currency'}>
                    {(field) => (
                        <View style={{marginBottom: 15, marginHorizontal: 10}}>
                            <Text style={{marginBottom: 5}}>
                                Currency
                            </Text>
                            <View style={{overflow: 'hidden'}}>
                                <Picker
                                    placeholder={'Currency'}
                                    selectedValue={field.getValue()}
                                    onValueChange={(itemValue) => field.handleChange(itemValue)}
                                    style={{
                                        height: 55,
                                        backgroundColor: colors.primary,
                                    }}
                                    itemStyle={{height: 40}}
                                >
                                    <Picker.Item label="Select currency" value=""/>
                                    {Object.entries(Currency).map(([key, value]) => (
                                        <Picker.Item key={key} label={`${value}`} value={value}/>
                                    ))}
                                </Picker>
                            </View>
                        </View>
                    )}
                </form.Field>
                <form.Field
                    name={'dailyPassPrice'}>
                    {(field) => (
                        <View>
                            <CustomTextInput
                                label={'Daily pass price'}
                                keyboardType={"numeric"}
                                onChangeText={(text) => field.handleChange(parseFloat(text) || 0)}
                                value={field.state.value.toString()}/>
                        </View>
                    )}
                </form.Field>

                <form.Field name={'monthlySubscription'}>
                    {(field) => (
                        <View>
                            <CustomTextInput
                                label={'Monthly subscription price'}
                                keyboardType={"numeric"}
                                onChangeText={(text) => field.handleChange(parseFloat(text) || 0)}
                                value={field.state.value.toString()}/>
                        </View>
                    )}
                </form.Field>
            </>
        );
    }, [form, colors]);

    const ShopFields = useCallback(() => {
        return (
            <>
                <form.Field name={'categories'}>
                    {(field) => (
                        <View style={{marginBottom: 15, marginHorizontal: 10}}>
                            <Text style={{marginBottom: 5}}>Categories</Text>
                            <View style={styles.tagsContainer}>
                                <ScrollView horizontal>
                                    {field.state.value.map((tag, index) => (
                                        <View key={index} style={styles.tag}>
                                            <TouchableOpacity onPress={() => {
                                                const updatedCategories = [...field.state.value];
                                                const indexToRemove = updatedCategories.findIndex(category => category === tag);
                                                if (indexToRemove !== -1) {
                                                    updatedCategories.splice(indexToRemove, 1);
                                                }
                                                form.setFieldValue('categories', updatedCategories);
                                            }}>
                                                <Text style={styles.tagText}>{tag}
                                                    <Text style={styles.removeTag}> ×</Text>
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </ScrollView>
                            </View>
                            <CustomTextInput
                                value={categoryBeingAdded}
                                onChangeText={(text) => setCategoryBeingAdded(text)}
                                label="Add a category"
                                onSubmitEditing={() => {
                                    if (categoryBeingAdded !== '') {
                                        const updatedCategories = [...field.state.value, categoryBeingAdded.trim()];
                                        form.setFieldValue('categories', updatedCategories);
                                        setCategoryBeingAdded('');
                                    }
                                }}
                                style={{marginHorizontal: 0, marginBottom: 15}}
                                blurOnSubmit={false}
                            />
                        </View>
                    )}
                </form.Field>
                <form.Field name={'brands'}>
                    {(field) => (
                        <View style={{marginBottom: 15, marginHorizontal: 10}}>
                            <Text style={{marginBottom: 5}}>Brands</Text>
                            <View style={styles.tagsContainer}>
                                <ScrollView horizontal>
                                    {field.state.value && field.state.value.map((tag, index) => (
                                        <View key={index} style={styles.tag}>
                                            <TouchableOpacity onPress={() => {
                                                const updatedBrands = [...field.state.value];
                                                const indexToRemove = updatedBrands.findIndex(brand => brand === tag);
                                                if (indexToRemove !== -1) {
                                                    updatedBrands.splice(indexToRemove, 1);
                                                }
                                                form.setFieldValue('brands', updatedBrands);
                                            }}>
                                                <Text style={styles.tagText}>{tag}
                                                    <Text style={styles.removeTag}> ×</Text>
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </ScrollView>
                            </View>
                            <CustomTextInput
                                value={brandBeingAdded}
                                onChangeText={(text) => setBrandBeingAdded(text)}
                                label="Add a brand"
                                onSubmitEditing={() => {
                                    if (brandBeingAdded !== '') {
                                        const updatedBrand = [...field.state.value, brandBeingAdded.trim()];
                                        form.setFieldValue('brands', updatedBrand);
                                        setBrandBeingAdded('');
                                    }
                                }}
                                style={{marginHorizontal: 0, marginBottom: 15}}
                                blurOnSubmit={false}
                            />
                        </View>
                    )}
                </form.Field>
            </>
        );
    }, [form, categoryBeingAdded, brandBeingAdded]);

    return (
        loading ? <LoadingSpinner/> :
            <>
                <ScrollView contentContainerStyle={{flexGrow: 1, padding: 16, paddingBottom: 60}}>
                    <Text
                        style={{fontSize: 40, textAlign: 'center', marginTop: 40, marginBottom: 30}}>
                        {title}
                    </Text>
                    <form.Field name={'avatar'}>
                        {(field) => (
                            <Pressable style={styles.avatarContainer} onPress={handleImagePick}>
                                {field.state.value !== '' ? (
                                        <Image
                                            source={{uri: formatBase64Image(field.state.value)}}
                                            style={styles.avatar}
                                        />
                                    ) :
                                    <Text style={styles.avatarPlaceholder}>
                                        Select a Photo
                                    </Text>
                                }
                            </Pressable>
                        )}
                    </form.Field>
                    <form.Field
                        name={'name'}
                        validators={{
                            onChange: ({value}: { string }) => {
                                if (value.length <= 3) {
                                    return 'Name must be longer than 3 letters.';
                                }
                            },
                        }}
                    >
                        {(field) => (
                            <View>
                                <CustomTextInput
                                    label={'Name'}
                                    onChangeText={(text) => field.handleChange(text)}
                                    value={field.state.value}/>
                                {field.state.meta.errors.length > 0 && (
                                    <ErrorDisplayComponent errorMessages={field.state.meta.errors}/>
                                )}
                            </View>
                        )}
                    </form.Field>
                    <form.Field
                        name={'description'}
                        validators={{
                            onChange: (value: string) => {
                                if (value.length > 500) {
                                    return 'Description cannot be longer than 500 characters.';
                                }
                            },
                        }}>

                        {(field) => (
                            <View>
                                <CustomTextInput
                                    multiline
                                    numberOfLines={3}
                                    label={'Short description'}
                                    onChangeText={(text) => field.handleChange(text)}
                                    value={field.state.value}/>
                                {field.state.meta.errors.length > 0 && (
                                    <ErrorDisplayComponent errorMessages={field.state.meta.errors}/>
                                )}
                            </View>
                        )}
                    </form.Field>
                    <form.Field
                        name={'contactNumber'}
                        validators={{
                            onChange: ({value}: { string }) => {
                                const regex = /^\+?[1-9]\d{1,14}$/;
                                if (!regex.test(value)) {
                                    return 'Contact number cannot start with 0. Use an international format like +123456789.';
                                }
                            },
                        }}>
                        {(field) => (
                            <View>
                                <CustomTextInput
                                    label={'Contact number'}
                                    onChangeText={(text) => field.handleChange(text)}
                                    value={field.state.value}/>
                                {field.state.meta.errors.length > 0 && (
                                    <ErrorDisplayComponent errorMessages={field.state.meta.errors}/>
                                )}
                            </View>
                        )}
                    </form.Field>
                    <form.Field
                        name={'contactEmail'}
                        validators={{
                            onChange: ({value}: { string }) => {
                                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                if (value.length === 0) {
                                    return "Email can't be blank.";
                                }
                                if (!emailRegex.test(value)) {
                                    return 'Email must be valid.';
                                }
                            },
                        }}

                    >
                        {(field) => (
                            <View>
                                <CustomTextInput
                                    label={'Contact email'}
                                    onChangeText={(text) => field.handleChange(text)}
                                    value={field.state.value}/>
                                {field.state.meta.errors.length > 0 && (
                                    <ErrorDisplayComponent errorMessages={field.state.meta.errors}/>
                                )}
                            </View>
                        )}
                    </form.Field>
                    <form.Field
                        name={'businessWebsite'}
                        validators={{
                            onChange: ({value}: { string }) => {
                                const websiteRegex = /^(https?:\/\/)?(www\.)?[^\s@]+\.[^\s@]+$/;
                                if (value.length > 0 && !websiteRegex.test(value)) {
                                    return 'Website must be valid.';
                                }
                            },
                        }}
                    >
                        {(field) => (
                            <View>
                                <CustomTextInput
                                    label={'Business website'}
                                    onChangeText={(text) => field.handleChange(text)}
                                    value={field.state.value}/>
                                {field.state.meta.errors.length > 0 && (
                                    <ErrorDisplayComponent errorMessages={field.state.meta.errors}/>
                                )}
                            </View>
                        )}
                    </form.Field>
                    <form.Field
                        name={'latitude'}
                        validators={{
                            onChange: ({value}) => {
                                if (value === 0) {
                                    return 'You have to select a place on the map.';
                                }
                            },
                        }}

                    >
                        {(field) => (
                            <View>
                                <TouchableOpacity style={{
                                    padding: 'auto',
                                    paddingVertical: 10,
                                    marginHorizontal: 10,
                                    marginVertical: 10,
                                    backgroundColor: colors.primary,
                                }} onPress={() => setMapModalVisible(true)}>
                                    <Text style={{fontSize: 16, textAlign: 'center', color: 'white'}}>
                                        <Icon name="google-maps" size={20} color={colors.secondary}/> Pick Location on
                                        Map
                                    </Text>
                                </TouchableOpacity>
                                {field.state.meta.errors.length > 0 && (
                                    <ErrorDisplayComponent errorMessages={field.state.meta.errors}/>
                                )}
                            </View>
                        )}
                    </form.Field>
                    <form.Field
                        name={"vicinity"}
                        validators={{
                            onChange: ({value}: { string }) => {
                                if (value.length === 0) {
                                    return 'Street address cannot be blank.';
                                }
                            },
                        }}

                    >
                        {(field) => (
                            <View>
                                <CustomTextInput
                                    label={'Street address'}
                                    onChangeText={(text) => field.handleChange(text)}
                                    value={field.state.value}/>
                                {field.state.meta.errors.length > 0 && (
                                    <ErrorDisplayComponent errorMessages={field.state.meta.errors}/>
                                )}
                            </View>
                        )}
                    </form.Field>
                    {venueType === VenueType.GYM && GymFields()}
                    {venueType === VenueType.SHOP && ShopFields()}
                    <MapPickerModal
                        visible={isMapModalVisible}
                        onClose={() => setMapModalVisible(false)}
                        onSelectLocation={handleSelectLocation}
                    />

                </ScrollView>
                <Button mode="contained"
                        style={{position: 'absolute', bottom: 0, borderRadius: 0, width: '100%'}}
                        onPress={form.handleSubmit}>
                    Submit
                </Button>
            </>
    );
};
