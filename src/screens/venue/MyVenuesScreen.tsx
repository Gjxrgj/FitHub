import React, {useEffect, useState} from 'react';
import {getVenuesForUser} from '../../services';
import {useAuth} from '../../context/AuthProvider.tsx';
import {VenueType} from '../../enums/enums.ts';
import {FitnessRestaurantDto, FitnessShopDto, GymDto, RootStackParamList} from '../../dto/types.ts';
import {Card, List, Text, Title} from 'react-native-paper';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {theme} from '../../theme/theme.ts';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {LoadingSpinner} from '../../components/LoadingSpinner/LoadingSpinner.tsx';
import {styles} from './myVenuesStyles.ts';
import {formatDate} from "../../util/dateUtil";
import moment from "moment";

type MyVenuesNavigation = StackNavigationProp<RootStackParamList, 'MyVenues'>;

export const MyVenuesScreen = () => {
    const [gyms, setGyms] = useState<Array<GymDto>>([]);
    const [shops, setShops] = useState<Array<FitnessShopDto>>([]);
    const [restaurants, setRestaurants] = useState<Array<FitnessRestaurantDto>>([]);
    const navigation = useNavigation<MyVenuesNavigation>();
    const auth = useAuth();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (auth.user && auth.user.id) {
            getVenuesForUser(auth.user.id)
                .then(venueMap => {
                    const gymList = venueMap[VenueType.GYM]?.flat() as Array<GymDto> || [];
                    const shopList = venueMap[VenueType.SHOP]?.flat() as Array<FitnessShopDto> || [];
                    const restaurantList = venueMap[VenueType.RESTAURANT]?.flat() as Array<FitnessRestaurantDto> || [];

                    setGyms(gymList);
                    setShops(shopList);
                    setRestaurants(restaurantList);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching venues:', error);
                });
        }
    }, [auth.user]);

    if (isLoading) {
        return (
            <LoadingSpinner/>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Title style={styles.screenTitle}>My Venues</Title>
            {gyms.length === 0 && shops.length === 0 && restaurants.length === 0 &&
                <Text style={{color: '#555', marginTop: 100, fontSize: 16, marginLeft: 10}}>You haven't added venues
                    yet.</Text>}
            {gyms.length !== 0 && <Title style={styles.sectionTitle}>Gyms</Title>}
            {gyms.map((gym) => (
                <TouchableOpacity key={`gym-${gym.id}`} onPress={() => {
                    navigation.navigate('GymScreen', {gymId: gym.id});
                }}>
                    <Card style={styles.card}>
                        <Card.Content>
                            <View style={styles.row}>
                                <Title style={styles.title}>{gym.name}</Title>
                                <Text style={[styles.date, {
                                    color: moment(gym.subscriptionExpirationDate, "YYYYMMDD").diff(moment(), "days") > 7
                                        ? theme.colors.tertiary
                                        : moment(gym.subscriptionExpirationDate, "YYYYMMDD").diff(moment(), "days") < 0
                                            ? theme.colors.error
                                            : theme.colors.warning
                                }]}>
                                    Valid until {moment(gym.subscriptionExpirationDate, "YYYYMMDD").format("DD.MM.YYYY")}
                                </Text>
                            </View>

                            <List.Item
                                title={`Location: ${gym.vicinity}`}
                                description={`Description: ${gym.description}`}
                                left={() => <List.Icon color={theme.colors.primary} icon="dumbbell"/>}
                            />
                        </Card.Content>
                    </Card>
                </TouchableOpacity>
            ))}

            {shops.length !== 0 && <Title style={styles.sectionTitle}>Shops</Title>}
            {shops.map((shop) => (
                <TouchableOpacity key={`shop-${shop.id}`} onPress={() => {
                    navigation.navigate('FitnessShopScreen', {shopId: shop.id});
                }}>
                    <Card style={styles.card}>
                        <Card.Content>
                            <View style={styles.row}>
                                <Title style={styles.title}>{shop.name}</Title>
                                <Text style={[styles.date, {
                                    color: moment(shop.subscriptionExpirationDate).diff(moment(), "days") > 7
                                        ? theme.colors.tertiary
                                        : moment(shop.subscriptionExpirationDate).diff(moment(), "days") < 0
                                            ? theme.colors.error
                                            : theme.colors.warning
                                }]}>
                                    Valid until {moment(shop.subscriptionExpirationDate, "YYYYMMDD").format("DD.MM.YYYY")}
                                </Text>
                            </View>

                            <List.Item
                                title={`Location: ${shop.vicinity}`}
                                description={`Description: ${shop.description}`}
                                left={() => <List.Icon color={theme.colors.primary} icon="dumbbell"/>}
                            />
                        </Card.Content>
                    </Card>
                </TouchableOpacity>
            ))}

            {restaurants.length !== 0 && <Title style={styles.sectionTitle}>Restaurants</Title>}
            {restaurants.map((restaurant) => (
                <TouchableOpacity key={`shop-${restaurant.id}`} onPress={() => {
                    navigation.navigate('FitnessRestaurantScreen', {restaurantId: restaurant.id});
                }}>
                    <Card style={styles.card}>
                        <Card.Content>
                            <View style={styles.row}>
                                <Title style={styles.title}>{restaurant.name}</Title>
                                <Text style={[styles.date, {
                                    color: moment(restaurant.subscriptionExpirationDate).diff(moment(), "days") > 7
                                        ? theme.colors.tertiary
                                        : moment(restaurant.subscriptionExpirationDate).diff(moment(), "days") < 0
                                            ? theme.colors.error
                                            : theme.colors.warning
                                }]}>
                                    Valid until {moment(restaurant.subscriptionExpirationDate, "YYYYMMDD").format("DD.MM.YYYY")}

                                </Text>
                            </View>

                            <List.Item
                                title={`Location: ${restaurant.vicinity}`}
                                description={`Description: ${restaurant.description}`}
                                left={() => <List.Icon color={theme.colors.primary} icon="dumbbell"/>}
                            />
                        </Card.Content>
                    </Card>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

