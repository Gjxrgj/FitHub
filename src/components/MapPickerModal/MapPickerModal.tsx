import React, {FC, useEffect, useState} from 'react';
import {Alert, Modal, StyleSheet, View} from 'react-native';
import MapView, {MapPressEvent, Marker, PROVIDER_GOOGLE, Region} from 'react-native-maps';
import {Button} from 'react-native-paper';
import * as Location from 'expo-location';
import axios from 'axios';
import Config from 'react-native-config';
import {LoadingSpinner} from '../LoadingSpinner/LoadingSpinner.tsx';


import {styles} from './styles.ts';
import Constants from "expo-constants";

interface MapPickerModalProps {
    visible: boolean;
    onClose: () => void;
    onSelectLocation: (latitude: number, longitude: number, vicinity: string) => void;
}

export const MapPickerModal: FC<MapPickerModalProps> = ({visible, onClose, onSelectLocation}) => {
    const [selectedLocation, setSelectedLocation] = useState<{
        latitude: number;
        longitude: number;
        vicinity: string;
    } | null>(null);
    const [currentRegion, setCurrentRegion] = useState<Region | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (visible) {
            const requestLocationPermission = async () => {
                try {
                    const {status} = await Location.requestForegroundPermissionsAsync();
                    if (status !== 'granted') {
                        Alert.alert('Permission Denied', 'Location permission is required to display the map.');
                        setLoading(false);
                        return;
                    }

                    getCurrentLocation();
                } catch (error) {
                    console.error('Permission error:', error);
                }
            };

            const getCurrentLocation = async () => {
                try {
                    const {coords} = await Location.getCurrentPositionAsync({
                        accuracy: Location.Accuracy.High,
                        timeInterval: 15000,
                        distanceInterval: 10,
                    });

                    const {latitude, longitude} = coords;
                    setCurrentRegion({
                        latitude,
                        longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
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

    const fetchVicinity = async (latitude: number, longitude: number) => {
        try {
            const response = await axios.get(
                'https://maps.googleapis.com/maps/api/geocode/json',
                {
                    params: {
                        latlng: `${latitude},${longitude}`,
                        key: Constants.expoConfig.extra.MAPS_API_KEY,
                    },
                },
            );

            if (response.data.results.length > 0) {
                return response.data.results[0].formatted_address;
            } else {
                console.log('No address found for the given coordinates.');
                return 'Unknown location';
            }
        } catch (error) {
            console.error('Error fetching address:', error);
            return 'Error fetching location';
        }
    };

    const handleMapPress = async (event: MapPressEvent) => {
        const {latitude, longitude} = event.nativeEvent.coordinate;
        const vicinity = await fetchVicinity(latitude, longitude);
        setSelectedLocation({latitude, longitude, vicinity});
    };

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
                        onPress={handleMapPress}
                        initialRegion={currentRegion}
                        showsUserLocation={true}
                    >
                        {selectedLocation && <Marker coordinate={selectedLocation}/>}
                    </MapView>
                )}
                <View style={styles.buttonContainer}>
                    <Button mode="contained" onPress={onClose}>
                        Cancel
                    </Button>
                    {selectedLocation && (
                        <Button
                            mode="contained"
                            onPress={() => {
                                onSelectLocation(
                                    selectedLocation.latitude,
                                    selectedLocation.longitude,
                                    selectedLocation?.vicinity
                                );
                                onClose();
                            }}
                        >
                            Confirm Location
                        </Button>
                    )}
                </View>
            </View>
        </Modal>
    );
};
