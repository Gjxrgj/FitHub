import React, { FC } from 'react';
import { Image, Modal, Text, View, ScrollView } from 'react-native';
import { formatBase64Image } from '../../util/formatBase64Image.ts';
import { styles } from './styles.ts';
import { Button } from 'react-native-paper';

interface MapPinModalProps {
    visible: boolean;
    name: string;
    avatar: string | undefined;
    description: string | undefined;
    onClose: () => void;
    onViewDetails: () => void;
}

export const MapPinModal: FC<MapPinModalProps> = ({
                                                      visible,
                                                      name,
                                                      avatar,
                                                      description,
                                                      onClose,
                                                      onViewDetails,
                                                  }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    {avatar && (
                        <Image
                            source={{ uri: formatBase64Image(avatar) }}
                            style={styles.avatar}
                        />
                    )}
                    <Text style={styles.cardTitle}>{name}</Text>
                    <View style={styles.descriptionContainer}>
                        <ScrollView contentContainerStyle={styles.scrollContainer}>
                            <Text style={styles.cardDescription}>{description}</Text>
                        </ScrollView>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button mode={'contained'} onPress={onViewDetails} style={styles.button}>
                            View Details
                        </Button>
                        <Button mode={'contained'} onPress={onClose} style={styles.button}>
                            Close
                        </Button>
                    </View>
                </View>
            </View>
        </Modal>
    );
};
