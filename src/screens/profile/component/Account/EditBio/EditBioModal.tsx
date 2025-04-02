import React from 'react';
import {useForm} from '@tanstack/react-form';
import {Modal, View} from 'react-native';
import {Button, IconButton, Text} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {CustomTextInput} from "../../../../../components/CustomTextInput/CustomTextInput";
import {ErrorDisplayComponent} from "../../../../../components/ErrorDisplay/ErrorDisplayComponent";
import {styles} from "./styles";
import {updateUsersBio} from "../../../../../services";

interface EditBioModalProps {
    visible: boolean;
    onClose: () => void;
    userId: number;
    bio: string;
    updateBio: (bio: string) => void;
}

export const EditBioModal: React.FC<EditBioModalProps> = ({
                                                              visible,
                                                              onClose,
                                                              userId,
                                                              bio,
                                                              updateBio,
                                                          }) => {
    const form = useForm({
        defaultValues: {
            bio: bio,
        },
        onSubmit: ({value}): void => {
            updateUsersBio(userId, value.bio)
                .then(updatedUser => {
                    updateBio(updatedUser.bio);
                    form.reset();
                    onClose();
                })
        },
    });

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <IconButton
                        icon={() => <MaterialCommunityIcons name="close" size={30} color="black"/>}
                        onPress={() => {
                            form.reset();
                            onClose();
                        }}
                        style={styles.closeIcon}
                    />

                    <Text style={styles.modalTitle}>Edit bio</Text>

                    <form.Field name={'bio'}
                                validators={{
                                    onChange: ({value}) => {
                                        if (value.length > 500) {
                                            return 'Bio cannot be longer than 500 characters.';
                                        }
                                    },
                                }}>
                        {(field) => (
                            <View>
                                <CustomTextInput
                                    label={'Bio'}
                                    multiline
                                    numberOfLines={20}
                                    onChangeText={(text: string) => field.handleChange(text)}
                                    value={field.state.value}/>
                                {field.state.meta.errors.length > 0 && (
                                    <ErrorDisplayComponent errorMessages={field.state.meta.errors}/>
                                )}
                            </View>
                        )}
                    </form.Field>

                    <View style={styles.modalButtons}>
                        <Button
                            mode="contained"
                            onPress={form.handleSubmit}
                            style={styles.modalButton}
                        >
                            Edit Bio
                        </Button>
                    </View>
                </View>
            </View>
        </Modal>
    );
};
