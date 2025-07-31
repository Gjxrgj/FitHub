import React, {FC, useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE, Region} from 'react-native-maps';
import * as Location from 'expo-location';
import {FitnessRestaurantDto, FitnessShopDto, GymDto, RootStackParamList} from '../../dto/types.ts';
import {CustomBottomNavigation} from '../../components/BottomNavigation/CustomBottomNavigation.tsx';
import {Button, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {fetchNearbyGyms, fetchNearbyRestaurants, fetchNearbyShops} from '../../services';
import {styles} from './styles.ts';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MapPinModal} from '../../components/MapPinModal/MapPinModal.tsx';
import Constants from "expo-constants";

type MapNavigation = StackNavigationProp<RootStackParamList, 'MapScreen'>;

export const MapScreen: FC = () => {
    const [currentRegion, setCurrentRegion] = useState<Region | null>(null);
    const [gyms, setGyms] = useState<Array<GymDto>>([]);
    const [fitnessShops, setFitnessShops] = useState<Array<FitnessShopDto>>([]);
    const [fitnessRestaurants, setFitnessRestaurants] = useState<Array<FitnessRestaurantDto>>([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<{
        name: string;
        avatar: string | undefined;
        description: string | undefined;
        onViewDetails: () => void;
    } | null>(null);
    const navigation = useNavigation<MapNavigation>();
    const {colors} = useTheme();

    useEffect(() => {
        void requestLocationPermission();
    }, []);


    const requestLocationPermission = async () => {
        try {
            const {status: foregroundStatus} = await Location.requestForegroundPermissionsAsync();
            if (foregroundStatus !== 'granted') {
                console.error('Foreground location permission denied');
                return;
            }
            void getCurrentLocation();
        } catch (error) {
            console.error('Permission error:', error);
        }
    }

    const getCurrentLocation = async () => {
        try {
            setLoading(true);
            const location = await Location.getCurrentPositionAsync({});

            const {latitude, longitude} = location.coords;

            fetchNearbyGyms(latitude, longitude)
                .then(fetchedGyms => {
                    if (fetchedGyms) {
                        setGyms(fetchedGyms);
                        setCurrentRegion({
                            latitude,
                            longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        });
                        setLoading(false);
                    } else {
                        console.warn("No gyms found or fetched data is null");
                    }
                });

        } catch (error) {
            console.error('Error getting current location:', error);
            setLoading(false);
        }
    };

    const handleMarkerPress = (item: {
        name: string;
        avatar: string | undefined;
        description: string | undefined;
        onViewDetails: () => void;
    }) => {
        setSelectedItem(item);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedItem(null);
    };

    const mapView = useCallback(() => {
        return (
            <MapView
                style={StyleSheet.absoluteFillObject}
                provider={PROVIDER_GOOGLE}
                region={currentRegion}
                showsUserLocation={true}
                followsUserLocation={true}
                googleMapsApiKey={Constants.expoConfig.extra.MAPS_API_KEY}
            >
                {!loading && gyms.length > 0 && gyms.map((gym) => (
                    <Marker
                        key={gym.id}
                        coordinate={{
                            latitude: gym.latitude,
                            longitude: gym.longitude,
                        }}
                        onPress={() => handleMarkerPress({
                            name: gym.name,
                            avatar: gym.avatar,
                            description: gym.description,
                            onViewDetails: () => {
                                navigation.navigate('GymScreen', {gymId: gym.id});
                                closeModal();
                            },
                        })}
                    />
                ))}
                {!loading && fitnessRestaurants.length > 0 && fitnessRestaurants.map((restaurant) => (
                    <Marker
                        key={restaurant.id}
                        coordinate={{
                            latitude: restaurant.latitude,
                            longitude: restaurant.longitude,
                        }}
                        onPress={() => handleMarkerPress({
                            name: restaurant.name,
                            avatar: restaurant.avatar,
                            description: restaurant.description,
                            onViewDetails: () => {
                                navigation.navigate('FitnessRestaurantScreen', {restaurantId: restaurant.id});
                                closeModal();
                            },
                        })}
                    />
                ))}
                {!loading && fitnessShops.length > 0 && fitnessShops.map((shop) => (
                    <Marker
                        key={shop.id}
                        coordinate={{
                            latitude: shop.latitude,
                            longitude: shop.longitude,
                        }}
                        onPress={() => handleMarkerPress({
                            name: shop.name,
                            avatar: shop.avatar,
                            description: shop.description,
                            onViewDetails: () => {
                                navigation.navigate('FitnessShopScreen', {shopId: shop.id});
                                closeModal();
                            },
                        })}
                    />
                ))}
            </MapView>
        );
    }, [currentRegion, gyms, fitnessShops, fitnessRestaurants, loading]);

    return (
        <View style={{flex: 1}}>
            {currentRegion && mapView()}

            {loading && (
                <View style={[StyleSheet.absoluteFillObject, styles.loadingContainer]}>
                    <ActivityIndicator size="large" color={colors.primary}/>
                </View>
            )}

            <View style={styles.buttonContainer}>
                <Button onPress={async () => {
                    setLoading(true);
                    const gymData = await fetchNearbyGyms(currentRegion.latitude, currentRegion.longitude);
                    if (gymData && gymData.length > 0) {
                        setGyms(gymData);
                    } else {
                        console.warn("No gyms found or fetched data is null");
                    }

                    setFitnessRestaurants([]);
                    setFitnessShops([]);
                    setLoading(false);
                }}>
                    <Icon name="dumbbell" size={20} color={colors.primary}/>
                </Button>
                <Button onPress={async () => {
                    setLoading(true);
                    const rest = await fetchNearbyRestaurants(currentRegion.latitude, currentRegion.longitude);
                    if (rest && rest.length > 0) {
                        setFitnessRestaurants(rest);
                    } else {
                        console.warn("No restaurants found or fetched data is null");
                    }

                    setGyms([]);
                    setFitnessShops([]);
                    setLoading(false);
                }}>
                    <Icon name="food" size={20} color={colors.primary}/>
                </Button>
                <Button onPress={async () => {
                    setLoading(true);
                    const shopData = await fetchNearbyShops(currentRegion.latitude, currentRegion.longitude);
                    if (shopData && shopData.length > 0) {
                        setFitnessShops(shopData);
                    } else {
                        console.warn("No shops found or fetched data is null");
                    }

                    setGyms([]);
                    setFitnessRestaurants([]);
                    setLoading(false);
                }}>
                    <Icon name="shopping" size={30} color={colors.primary}/>
                </Button>
            </View>
            <CustomBottomNavigation/>
            {selectedItem && (
                <MapPinModal
                    visible={modalVisible}
                    name={selectedItem.name}
                    avatar={selectedItem.avatar}
                    description={selectedItem.description}
                    onClose={closeModal}
                    onViewDetails={selectedItem.onViewDetails}
                />
            )}
        </View>
    );
};
