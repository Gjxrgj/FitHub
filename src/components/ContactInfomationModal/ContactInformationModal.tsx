import React from 'react';
import {useForm} from '@tanstack/react-form';
import {Modal, View} from 'react-native';
import {Button, IconButton, Text} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {CustomTextInput} from '../CustomTextInput/CustomTextInput.tsx';
import {ContactInformationDto} from '../../dto/types.ts';
import {editContactInformation} from '../../services';
import {styles} from './styles.ts';
import {ErrorDisplayComponent} from '../ErrorDisplay/ErrorDisplayComponent.tsx';

interface ContactInformationModalProps {
    visible: boolean;
    onClose: () => void;
    venueId: number;
    contactInformation: ContactInformationDto;
    updateContactInformation: (contactInformation: ContactInformationDto) => void;
}

export const ContactInformationModal: React.FC<ContactInformationModalProps> = ({
                                                                                    visible,
                                                                                    onClose,
                                                                                    venueId,
                                                                                    contactInformation,
                                                                                    updateContactInformation,
                                                                                }) => {
    const form = useForm({
        defaultValues: {
            contactNumber: contactInformation.contactNumber,
            contactEmail: contactInformation.contactEmail,
            businessWebsite: contactInformation.businessWebsite,
        },
        onSubmit: ({value}): void => {
            const contactInformationDto: ContactInformationDto = {
                contactNumber: value.contactNumber,
                businessWebsite: value.businessWebsite,
                contactEmail: value.contactEmail,
            };
            editContactInformation(venueId, contactInformationDto)
                .then(contactInfo => {
                        updateContactInformation(contactInfo);
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
                    <Text style={styles.modalTitle}>Update Contact Information</Text>
                    <form.Field name={'contactNumber'}
                                validators={{
                                    onChange: ({value}) => {
                                        const regex = /^\+?[1-9]\d{1,14}$/;
                                        if (!regex.test(value)) {
                                            return 'Contact number should be in format +XXXXXXXXX';
                                        }
                                    },
                                }}>
                        {(field) => (
                            <View>
                                <CustomTextInput
                                    label={'Contact number'}
                                    onChangeText={(text: string) => field.handleChange(text)}
                                    value={field.state.value}/>
                                {field.state.meta.errors.length > 0 && (
                                    <ErrorDisplayComponent errorMessages={field.state.meta.errors}/>
                                )}
                            </View>
                        )}
                    </form.Field>

                    <form.Field name={'contactEmail'}
                                validators={{
                                    onChange: ({value}) => {
                                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                        if (value.length === 0) {
                                            return "Email can't be blank.";
                                        }
                                        if (!emailRegex.test(value)) {
                                            return 'Email must be valid.';
                                        }
                                    },
                                }}
                    >
                        {(field) => (
                            <View>
                                <CustomTextInput
                                    label={'Email'}
                                    onChangeText={(text: string) => field.handleChange(text)}
                                    value={field.state.value}/>
                                {field.state.meta.errors.length > 0 && (
                                    <ErrorDisplayComponent errorMessages={field.state.meta.errors}/>
                                )}
                            </View>
                        )}
                    </form.Field>

                    <form.Field name={'businessWebsite'}
                                validators={{
                                    onChange: ({value}) => {
                                        const websiteRegex = /^(https?:\/\/)?(www\.)?[^\s@]+\.[^\s@]+$/;
                                        if (value.length > 0 && !websiteRegex.test(value)) {
                                            return 'Website must be valid.';
                                        }
                                    },
                                }}>
                        {(field) => (
                            <View>
                                <CustomTextInput
                                    label={'Business website'}
                                    onChangeText={(text: string) => field.handleChange(text)}
                                    value={field.state.value}/>
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
                        Update
                    </Button>
                </View>
            </View>
        </Modal>
    );
};
