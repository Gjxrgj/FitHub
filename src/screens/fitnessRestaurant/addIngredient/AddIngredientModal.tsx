import React from 'react';
import {useForm} from '@tanstack/react-form';
import {Modal, View} from 'react-native';
import {Button, IconButton, Text} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ErrorDisplayComponent} from '../../../components/ErrorDisplay/ErrorDisplayComponent.tsx';
import {CustomTextInput} from '../../../components/CustomTextInput/CustomTextInput.tsx';
import {styles} from './styles.ts';
import {UpsertIngredientDto} from '../../../dto/types.ts';

interface AddIngredientModalProps {
    visible: boolean;
    onClose: () => void;
    updateIngredients: (ingredient: UpsertIngredientDto) => void;
}

export const AddIngredientModal: React.FC<AddIngredientModalProps> = ({
                                                                          visible,
                                                                          onClose,
                                                                          updateIngredients,
                                                                      }) => {
    const isNumber = (value: string) => /^-?\d+(\.\d+)?$/.test(value);
    const form = useForm({
        defaultValues: {
            name: '',
            quantity: '',
        },
        onSubmit: ({value}): void => {
            const upsertIngredient: UpsertIngredientDto = {
                name: value.name,
                quantity: parseFloat(value.quantity),
            };
            updateIngredients(upsertIngredient);
            onClose();
            form.reset();
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

                    <Text style={styles.modalTitle}>Add Ingredient</Text>

                    <form.Field name={'name'}
                                validators={{
                                    onChange: ({value}) => {
                                        if (value.length === 0) {
                                            return 'Name cannot be empty';
                                        }
                                    },
                                }}>
                        {(field) => (
                            <View>
                                <CustomTextInput
                                    label={'Name'}
                                    onChangeText={(name: string) => field.handleChange(name)}
                                    value={field.state.value}/>
                                <ErrorDisplayComponent errorMessages={field.state.meta.errors}/>
                            </View>
                        )}
                    </form.Field>

                    <form.Field name={'quantity'}
                                validators={{
                                    onChange: ({value}) => {
                                        if (!isNumber(value)) {
                                            return 'Quantity has to be a valid number';
                                        }
                                    },
                                }}>
                        {(field) => (
                            <View>
                                <CustomTextInput
                                    label={'Quantity'}
                                    keyboardType={'numeric'}
                                    onChangeText={(quantity: string) => field.handleChange(quantity)}
                                    value={field.state.value.toString()}/>
                                <ErrorDisplayComponent errorMessages={field.state.meta.errors}/>
                            </View>
                        )}
                    </form.Field>

                    <Button
                        mode="contained"
                        onPress={form.handleSubmit}
                        style={styles.modalButton}
                    >
                        Add Ingredient
                    </Button>
                </View>
            </View>
        </Modal>
    );
};
