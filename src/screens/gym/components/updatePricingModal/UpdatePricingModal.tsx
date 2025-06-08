import React from 'react';
import {useForm} from '@tanstack/react-form';
import {Modal, View} from 'react-native';
import {Button, IconButton, Text} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from './styles.ts';
import {PricingDto} from '../../../../dto/types.ts';
import {editPricing} from '../../../../services/gymService.ts';
import {CustomTextInput} from '../../../../components/CustomTextInput/CustomTextInput.tsx';

interface ContactInformationModalProps {
    visible: boolean;
    onClose: () => void;
    venueId: number;
    pricing: PricingDto;
    updatePricing: (pricing: PricingDto) => void;
}

export const UpdatePricingModal: React.FC<ContactInformationModalProps> = ({
                                                                               visible,
                                                                               onClose,
                                                                               venueId,
                                                                               pricing,
                                                                               updatePricing,
                                                                           }) => {
    const form = useForm({
        defaultValues: {
            dailyPrice: pricing.dailyPass,
            monthlySubscription: pricing.monthlySubscription,
        },
        onSubmit: ({value}): void => {
            const pricingDto: PricingDto = {
                dailyPass: value.dailyPrice,
                monthlySubscription: value.monthlySubscription,
            };
            editPricing(venueId, pricingDto)
                .then(newPricing => {
                        updatePricing(newPricing);
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

                    <Text style={styles.modalTitle}>Update Pricing</Text>

                    <form.Field name={'dailyPrice'}>
                        {(field) => (
                            <View>
                                <CustomTextInput
                                    label={'Daily pass price'}
                                    onChangeText={(text: string) => form.setFieldValue('dailyPrice', parseFloat(text) || 0)}
                                    value={field.state.value.toString()}/>
                            </View>
                        )}
                    </form.Field>

                    <form.Field name={'monthlySubscription'}>
                        {(field) => (
                            <View>
                                <CustomTextInput
                                    label={'Monthly subscription price'}
                                    onChangeText={(text: string) => form.setFieldValue('monthlySubscription', parseFloat(text) || 0)}
                                    value={field.state.value.toString()}/>
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
