import React from 'react';
import {useForm} from '@tanstack/react-form';
import {Modal, View} from 'react-native';
import {Button, IconButton, Text} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {CustomTextInput} from '../CustomTextInput/CustomTextInput.tsx';
import {styles} from './styles.ts';
import {editDescription} from '../../services/venueService.ts';
import {ErrorDisplayComponent} from "../ErrorDisplay/ErrorDisplayComponent.tsx";

interface EditDescriptionModalProps {
    visible: boolean;
    onClose: () => void;
    venueId: number;
    description: string;
    updateDescription: (description: string) => void;
}

export const EditDescriptionModal: React.FC<EditDescriptionModalProps> = ({
                                                                              visible,
                                                                              onClose,
                                                                              venueId,
                                                                              description,
                                                                              updateDescription,
                                                                          }) => {
    const form = useForm({
        defaultValues: {
            description: description,
        },
        onSubmit: ({value}): void => {
            editDescription(venueId, value.description).then(desc => {
                    updateDescription(desc);
                    onClose();
                    form.reset();
                }
            );
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

                    <Text style={styles.modalTitle}>Edit description</Text>

                    <form.Field name={'description'}
                                validators={{
                                    onChange: ({value}) => {
                                        if (value.length > 500) {
                                            return 'Description cannot be longer than 500 characters.';
                                        }
                                    },
                                }}>
                        {(field) => (
                            <View>
                                <CustomTextInput
                                    label={'Description'}
                                    multiline
                                    numberOfLines={3}
                                    onChangeText={(text: string) => field.handleChange(text)}
                                    value={field.state.value.toString()}/>
                                {field.state.meta.errors.length > 0 && (
                                    <ErrorDisplayComponent errorMessages={field.state.meta.errors}/>
                                )}
                            </View>
                        )}
                    </form.Field>

                        <Button
                            mode="contained"
                            onPress={form.handleSubmit}
                            style={styles.modalButton}
                        >
                            Edit description
                        </Button>
                </View>
            </View>
        </Modal>
    );
};
