import React, {useEffect, useState} from 'react';
import {BarcodeType, CameraType, CameraView, useCameraPermissions} from 'expo-camera';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../dto/types.ts';
import {getFoodByQR} from '../../services';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../theme/theme.ts';
import {styles} from './styles.ts';

type MapNavigation = StackNavigationProp<RootStackParamList, 'BarcodeScanner'>;

export const BarcodeScanner = () => {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const navigation = useNavigation<MapNavigation>();
    const [loading, setLoading] = useState(true);
    const [activateTorch, setActivateTorch] = useState<boolean>(false);
    const barcodeTypes: BarcodeType[] = [
        'aztec',
        'ean13',
        'ean8',
        'qr',
        'pdf417',
        'upc_e',
        'datamatrix',
        'code39',
        'code93',
        'itf14',
        'codabar',
        'code128',
        'upc_a',
    ];
    useEffect(() => {
        if (permission) {
            setLoading(false);
        }
    }, [permission]);

    if (loading || !permission) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>Loading...</Text>
            </View>
        );
    }
    if (!permission.granted) {
        return (
            <Modal
                visible={!permission.granted}
                animationType="fade"
                transparent={true}
                onRequestClose={() => {
                }}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Camera Permission Required</Text>
                        <Text style={styles.modalMessage}>
                            We need your permission to access the camera in order to proceed.
                        </Text>
                        <View style={styles.flipCameraButton}>
                            <Button mode={"contained"} onPress={requestPermission}>Grant Permission</Button>
                            <Button mode={"contained"} onPress={() => navigation.navigate("SearchMealScreen")}>Cancel</Button>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }

    const toggleCameraFacing = () => {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    };

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                facing={facing}
                barcodeScannerSettings={{
                    barcodeTypes: barcodeTypes,
                }}
                onBarcodeScanned={(barcode) => {
                    getFoodByQR(barcode.data, ['product_name', 'nutriments', 'nutrition_grades'])
                        .then(foodItem => {
                            navigation.navigate('MealScreen', {foodItem: foodItem});
                        });
                }}
                enableTorch={activateTorch}
            />

            <View style={styles.topBox}/>
            <View style={styles.middleRow}>
                <View style={styles.sideBox}/>
                <View style={styles.middleBox}/>
                <View style={styles.sideBox}/>
            </View>
            <View style={styles.bottomBox}/>

            <View style={styles.buttonContainer}>
                <View style={styles.torchButton}>
                    <TouchableOpacity
                        onPress={() => setActivateTorch(prevState => !prevState)}>
                        <Icon name="flashlight" size={40} color={theme.colors.secondary}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.flipCameraButton}>
                    <TouchableOpacity
                        onPress={toggleCameraFacing}>
                        <Icon name="camera-flip-outline" size={40} color={theme.colors.secondary}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
