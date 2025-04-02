import React, {FC, useState} from 'react';
import {Modal, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ErrorDisplayComponent} from '../../../components/ErrorDisplay/ErrorDisplayComponent.tsx';
import {CustomTextInput} from '../../../components/CustomTextInput/CustomTextInput.tsx';
import {UpsertWorkoutDto} from '../../../dto/types.ts';
import {useForm} from '@tanstack/react-form';
import {addWorkout} from '../../../services';
import {useAuth} from '../../../context/AuthProvider.tsx';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Button, TextInput} from 'react-native-paper';
import {theme} from '../../../theme/theme.ts';
import {styles} from './styles.ts';

interface AddWorkoutModal {
    visible: boolean;
    onClose: () => void;
}

export const AddWorkoutModal: FC<AddWorkoutModal> = ({
                                                         visible,
                                                         onClose,
                                                     }) => {
    const auth = useAuth();
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
    const form = useForm({
        defaultValues: {
            name: '',
            date: new Date(),
        },
        onSubmit: async ({value}) => {
            const upsertWorkoutDto: UpsertWorkoutDto = {
                name: value.name,
                dayDate: value.date,
            };

            if (auth.user?.id) {
                addWorkout(auth.user?.id, upsertWorkoutDto)
                    .then(() => {
                        onClose();
                        form.reset();
                    });
            }
        },
    });

    return (
        <Modal visible={visible} animationType="fade" transparent={true}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <TouchableWithoutFeedback onPress={() => {
                    form.reset();
                    onClose();
                }}>
                    <View style={styles.modalContainer}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalContent}>
                                <TouchableOpacity
                                    onPress={() => {
                                        form.reset();
                                        onClose();
                                    }}
                                    style={styles.closeButtonReviews}
                                >
                                    <Icon style={{margin: 'auto'}} name="close" size={30} color="#555"/>
                                </TouchableOpacity>

                                <Text style={styles.modalTitle}>Add New Workout</Text>
                                <View>
                                    <form.Field name={'name'}>
                                        {(field) => (
                                            <View>
                                                <CustomTextInput
                                                    label={'Workout name'}
                                                    multiline
                                                    onChangeText={(text) => field.handleChange(text)}
                                                    value={field.state.value}/>
                                                {field.state.meta.errors.length > 0 && (
                                                    <ErrorDisplayComponent errorMessages={field.state.meta.errors}/>
                                                )}
                                            </View>
                                        )}
                                    </form.Field>
                                    <form.Field name={'date'}>
                                        {(field) => (
                                            <View>
                                                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                                                    <TextInput
                                                        label="Date"
                                                        value={
                                                            field.state.value
                                                                ? new Date(field.state.value).toLocaleDateString('mk-MK')
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
                                    <Button style={{marginVertical: 10, borderRadius: 2, marginHorizontal: 10}} mode="contained"
                                            onPress={form.handleSubmit}>
                                        Add
                                    </Button>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </Modal>
    );
};
