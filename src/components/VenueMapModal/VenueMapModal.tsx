import React, {FC, useEffect, useState} from 'react';
import {Alert, Modal, StyleSheet, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE, Region} from 'react-native-maps';
import {Button} from 'react-native-paper';
import * as Location from 'expo-location';
import {styles} from './styles.ts';
import {LoadingSpinner} from '../LoadingSpinner/LoadingSpinner.tsx';
import {FitnessRestaurantDto, FitnessShopDto, GymDto} from '../../dto/types.ts';

interface VenueMapModalProps {
    visible: boolean;
    onClose: () => void;
    venue: FitnessShopDto | GymDto | FitnessRestaurantDto;
}

export const VenueMapModal: FC<VenueMapModalProps> = ({visible, onClose, venue}) => {
    const [currentRegion, setCurrentRegion] = useState<Region | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (visible) {
            const requestLocationPermission = async () => {
                try {
                    const {status} = await Location.requestForegroundPermissionsAsync();
                    if (status === 'granted') {
                        getCurrentLocation();
                    } else {
                        Alert.alert('Permission Denied', 'Location permission is required to display the map.');
                        setLoading(false);
                    }
                } catch (error) {
                    console.error('Permission error:', error);
                    setLoading(false);
                }
            };

            const getCurrentLocation = async () => {
                try {
                    const location = await Location.getCurrentPositionAsync({
                        accuracy: Location.Accuracy.High,
                    });
                    const {latitude, longitude} = location.coords;
                    setCurrentRegion({
                        latitude,
                        longitude,
                        latitudeDelta: 0.05, // Larger delta to show more venues
                        longitudeDelta: 0.05,
                    });
                    setLoading(false);
                } catch (error) {
                    console.error('Error getting current location:', error);
                    Alert.alert('Error', 'Unable to fetch your current location.');
                    setLoading(false);
                }
            };

            requestLocationPermission();
        } else {
            setLoading(false);
        }
    }, [visible]);

    if (loading) {
        return <LoadingSpinner/>;
    }

    return (
        <Modal visible={visible} animationType="slide">
            <View style={styles.container}>
                {currentRegion && (
                    <MapView
                        style={StyleSheet.absoluteFillObject}
                        provider={PROVIDER_GOOGLE}
                        initialRegion={currentRegion}
                        showsUserLocation={true}
                    >
                        <Marker
                            key={venue.id}
                            coordinate={{latitude: venue.latitude, longitude: venue.longitude}}
                            title={venue.name}
                        />
                    </MapView>
                )}
                <View style={styles.buttonContainer}>
                    <Button mode="contained" onPress={onClose}>Close</Button>
                </View>
            </View>
        </Modal>
    );
};
