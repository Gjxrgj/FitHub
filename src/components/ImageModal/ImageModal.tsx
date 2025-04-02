import React, {useCallback} from 'react';
import {Image, Modal, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from './style.tsx';
import {removeImageFromVenue} from "../../services/venueService.ts";
import {ImageDto} from "../../dto/types.ts";
import {Button} from "react-native-paper";
import {useAuth} from "../../context/AuthProvider.tsx";
import {formatBase64Image} from "../../util/formatBase64Image.ts";

interface ImageModalProps {
    showImageModal: boolean;
    setShowImageModal: (visible: boolean) => void;
    setImages: (images: Array<ImageDto>) => void;
    selectedImage: string;
    currentImageIndex: number;
    imageDtos: Array<ImageDto>;
    showPreviousImage: () => void;
    showNextImage: () => void;
    venueUserId: number;
}

export const ImageModal: React.FC<ImageModalProps> = ({
                                                          showImageModal,
                                                          setShowImageModal,
                                                          selectedImage,
                                                          currentImageIndex,
                                                          imageDtos,
                                                          showPreviousImage,
                                                          showNextImage,
                                                          setImages,
                                                          venueUserId,
                                                      }) => {
    const auth = useAuth();
    const removeImage = useCallback(() => {
        const imageToDeleteId = imageDtos.find(image => formatBase64Image(image.data ) === selectedImage)?.id;
        if(imageToDeleteId){
            setShowImageModal(false);
            removeImageFromVenue(imageToDeleteId)
                .then(images => {
                    setImages(images);
                });
        }
    }, [imageDtos, selectedImage, setImages, setShowImageModal]);
    return (
        <Modal visible={showImageModal} animationType="fade" transparent={false}>
            <TouchableWithoutFeedback onPress={() => setShowImageModal(false)}>
                <View style={[styles.modalContainer, {backgroundColor: 'black'}]}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalForImageContent}>
                            {selectedImage && (
                                <Image style={styles.fullImage} source={{uri: selectedImage}}/>
                            )}
                            <TouchableOpacity
                                style={styles.closeButtonImage}
                                onPress={() => setShowImageModal(false)}
                            >
                                <Icon name="close" size={30} color="#fff"/>
                            </TouchableOpacity>

                            {currentImageIndex > 0 && (
                                <TouchableOpacity
                                    style={styles.prevButton}
                                    onPress={showPreviousImage}
                                >
                                    <Icon name="chevron-left" size={50} color="#fff"/>
                                </TouchableOpacity>
                            )}

                            {currentImageIndex < imageDtos.length - 1 && (
                                <TouchableOpacity
                                    style={styles.nextButton}
                                    onPress={showNextImage}
                                >
                                    <Icon name="chevron-right" size={50} color="#fff"/>
                                </TouchableOpacity>
                            )}
                            {auth.user?.id === venueUserId &&  <Button onPress={() => {
                                removeImage();
                            }}>Remove</Button>}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

