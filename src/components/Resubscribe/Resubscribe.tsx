import {FitnessRestaurantDto, FitnessShopDto, GymDto, ResubscribeRequest, RootStackParamList} from "../../dto/types";
import {resubscribe, updateSubscription} from "../../services/paymentService";
import {Alert, View, StyleSheet} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import {initPaymentSheet, presentPaymentSheet} from "@stripe/stripe-react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import React, {useState} from "react";
import {Avatar, Button, Text} from 'react-native-paper';
import {LoadingSpinner} from "../LoadingSpinner/LoadingSpinner";
import {VenueType} from "../../enums/enums";
import moment from "moment";
import {CustomView} from "../CustomView/CustomView";
import {formatBase64Image} from "../../util/formatBase64Image";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type ResubscribeNavigation = StackNavigationProp<RootStackParamList, 'Resubscribe'>;

export const Resubscribe = () => {
    const route = useRoute<ResubscribeNavigation>();
    const {venue, venueType}: GymDto | FitnessShopDto | FitnessRestaurantDto = route.params;
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<ResubscribeNavigation>();

    const resubscribeForVenue = async () => {
        try {
            setLoading(true);

            const resubscriptionRequest: ResubscribeRequest = {
                venueId: venue.id,
                priceId: 'price_1QqfIS3BIkPNr9Q8KBgzA1iv'
            }
            const response = await resubscribe(resubscriptionRequest);

            if (!response?.clientSecret) {
                Alert.alert('Error', 'Failed to resubscribe.');
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
                Alert.alert('Success', 'You have successfully resubscribed!');
                updateSubscription(venue.id).then(() => {
                    if (venueType === VenueType.GYM) {
                        navigation.navigate('GymScreen', {gymId: venue.id});
                    } else if (venueType === VenueType.SHOP) {
                        navigation.navigate("FitnessShopScreen", {shopId: venue.id});
                    } else {
                        navigation.navigate("FitnessRestaurantScreen", {restaurantId: venue.id});
                    }
                });
            }
        } catch
            (err) {
            setLoading(false)
            console.error(err);
            Alert.alert('Error', 'Something went wrong.');
            setLoading(false);
        }
        setLoading(false)
    };

    return (
        loading ? (
            <LoadingSpinner/>
        ) : (
            <CustomView>
                <View style={{marginHorizontal: "auto", marginBottom: 60}}>
                    {venue?.avatar ? (
                        <View style={styles.shadowContainer}>
                            <Avatar.Image size={150} source={{uri: formatBase64Image(venue.avatar)}}/>
                        </View>
                    ) : (
                        <View style={[styles.shadowContainer, styles.defaultIconContainer]}>
                            <Icon name="account" size={150} color="#ccc"/>
                        </View>
                    )}
                </View>
                <Text style={styles.headerText}>Resubscription for {venue.name}</Text>
                <Text style={styles.dateText}>
                    Expiration date of subscription: <Text style={styles.boldText}>
                        {moment(venue.subscriptionExpirationDate, "YYYYMMDD").format("DD.MM.YYYY")}
                    </Text>
                </Text>

                <Text style={styles.dateText}>
                    After resubscribing, your subscription will last until: <Text style={styles.boldText}>
                        {moment(venue.subscriptionExpirationDate, "YYYYMMDD")
                            .add(1, 'months')
                            .format("DD.MM.YYYY")}
                    </Text>
                </Text>

                <Button mode="contained" onPress={() => resubscribeForVenue()} style={styles.button}>
                    Resubscribe
                </Button>
            </CustomView>
        )
    );
}

const styles = StyleSheet.create({
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    dateText: {
        fontSize: 16,
        color: '#666',
        marginVertical: 10,
        textAlign: 'center',
    },
    boldText: {
        fontWeight: 'bold',
        color: '#333',
    },
    button: {
        marginTop: 40,
        marginHorizontal: 'auto',
        paddingHorizontal: 30,
        width: "60%"
    },
    shadowContainer: {
        borderRadius: 50,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 1,
        shadowRadius: 15,
        elevation: 10,
    },
    defaultIconContainer: {
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
