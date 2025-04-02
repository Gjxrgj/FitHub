import React, {useState} from 'react';
import {Modal, TouchableOpacity, View} from 'react-native';
import {Button, IconButton, Text, TextInput} from 'react-native-paper';
import {styles} from './styles.ts';
import {Currency} from '../../../../enums/enums.ts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useForm} from '@tanstack/react-form';
import {Picker} from '@react-native-picker/picker';
import {CustomTextInput} from '../../../../components/CustomTextInput/CustomTextInput.tsx';
import DateTimePicker from '@react-native-community/datetimepicker';
import {PromotionDto, UpsertPromotionDto} from '../../../../dto/types.ts';
import {addPromotionToGym} from '../../../../services';
import {theme} from '../../../../theme/theme.ts';

interface AddPromotionModalProps {
    visible: boolean;
    onClose: () => void;
    gymId: number;
    updatePromotions: (promotions: Array<PromotionDto>) => void;
}

export const AddPromotionModal: React.FC<AddPromotionModalProps> = ({visible, onClose, gymId, updatePromotions}) => {
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
    const form = useForm({
        defaultValues: {
            price: 0,
            amountOfMonths: 0,
            currency: Currency.MKD,
            validUntil: new Date(),
        },
        onSubmit: ({value}): void => {
            const upsertPromotionDto: UpsertPromotionDto = {
                amountOfMonths: value.amountOfMonths,
                price: value.price,
                validUntil: value.validUntil,
                currency: value.currency,
            };
            addPromotionToGym(gymId, upsertPromotionDto)
                .then(promotions => {
                    updatePromotions(promotions);
                    onClose();
                    form.reset();
                });
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

                    <Text style={styles.modalTitle}>Add Promotion</Text>

                    <form.Field name={'price'}>
                        {(field) => (
                            <View>
                                <CustomTextInput
                                    label={'Price'}
                                    keyboardType={"numeric"}
                                    onChangeText={(text) => field.handleChange(parseFloat(text) || 0)}
                                    value={field.state.value.toString()}/>
                            </View>
                        )}
                    </form.Field>

                    <form.Field name={'amountOfMonths'}>
                        {(field) => (
                            <View>
                                <CustomTextInput
                                    keyboardType={"numeric"}
                                    label={'Amount of months'}
                                    onChangeText={(text) => field.handleChange(parseInt(text) || 0)}
                                    value={field.state.value.toString()}/>
                            </View>
                        )}
                    </form.Field>

                    <form.Field name={'currency'}>
                        {(field) => (
                            <View style={{marginBottom: 15, marginHorizontal: 10}}>
                                <Text style={{marginBottom: 5}}>
                                    Currency
                                </Text>
                                <View
                                    style={{
                                        overflow: 'hidden',
                                        borderWidth: 1,
                                        borderRadius: 2,
                                        borderColor: theme.colors.primary,
                                    }}
                                >
                                    <Picker
                                        placeholder={'Currency'}
                                        selectedValue={field.getValue()}
                                        onValueChange={(itemValue) => form.setFieldValue('currency', itemValue)}
                                        style={{
                                            height: 55,
                                            color: '#555',
                                        }}
                                        itemStyle={{height: 40, fontWeight: 'normal'}}

                                    >
                                        <Picker.Item label="Select currency" value=""/>
                                        {Object.entries(Currency).map(([key, value]) => (
                                            <Picker.Item key={key} label={`${value}`} value={value}/>
                                        ))}
                                    </Picker>
                                </View>
                            </View>
                        )}
                    </form.Field>

                    <form.Field name={'validUntil'}>
                        {(field) => (
                            <View>
                                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                                    <TextInput
                                        label="Valid Until"
                                        value={
                                            field.state.value
                                                ? new Date(field.state.value).toLocaleDateString('en-GB')
                                                : ''
                                        }
                                        editable={false}
                                        mode="outlined"
                                        outlineColor={theme.colors.primary}
                                        style={styles.modalInput}
                                    />
                                </TouchableOpacity>

                                {showDatePicker && (
                                    <DateTimePicker
                                        value={field.state.value || new Date()}
                                        mode="date"
                                        display="compact"
                                        onChange={(event, date) => {
                                            field.handleChange(date || new Date());
                                            setShowDatePicker(false);
                                        }}
                                        minimumDate={new Date()}
                                    />
                                )}
                            </View>
                        )}
                    </form.Field>

                    <Button
                        mode="contained"
                        onPress={form.handleSubmit}
                        style={styles.modalButton}
                    >
                        Add Promotion
                    </Button>
                </View>
            </View>
        </Modal>
    );
};
