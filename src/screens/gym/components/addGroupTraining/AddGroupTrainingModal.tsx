import {GroupTrainingDto, ProfessionalTrainerAutocompleteDto, UpsertGroupTrainingDto} from "../../../../dto/types.ts";
import React, {useEffect, useRef, useState} from "react";
import {useForm} from "@tanstack/react-form";
import {Currency} from "../../../../enums/enums.ts";
import {addGroupTrainingToGym, getProfessionalTrainerByQuery} from "../../../../services";
import {FlatList, Modal, View} from "react-native";
import {Button, IconButton, Text} from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {CustomTextInput} from "../../../../components/CustomTextInput/CustomTextInput.tsx";
import {Picker} from "@react-native-picker/picker";
import {styles} from "./styles.ts";
import {theme} from "../../../../theme/theme.ts";
import _ from "lodash";

interface AddGroupTrainingModalProps {
    visible: boolean;
    onClose: () => void;
    gymId: number;
    updateGroupTrainings: (promotions: Array<GroupTrainingDto>) => void;
}

export const AddGroupTrainingModal: React.FC<AddGroupTrainingModalProps> = ({
                                                                                visible,
                                                                                onClose,
                                                                                gymId,
                                                                                updateGroupTrainings
                                                                            }) => {
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<Array<ProfessionalTrainerAutocompleteDto>>([]);
    const form = useForm({
        defaultValues: {
            name: '',
            description: '',
            price: 0,
            currency: Currency.MKD,
            professionalTrainer: {
                professionalTrainerId: 0,
                username: '',
            } as ProfessionalTrainerAutocompleteDto,
        },
        onSubmit: ({value}): void => {
            const upsertGroupTrainingDto: UpsertGroupTrainingDto = {
                name: value.name,
                description: value.description,
                price: value.price,
                currency: value.currency,
                professionalTrainerId: value.professionalTrainer.professionalTrainerId,
            };
            addGroupTrainingToGym(gymId, upsertGroupTrainingDto)
                .then(groupTrainings => {
                    updateGroupTrainings(groupTrainings);
                    onClose();
                    form.reset();
                    setQuery('');
                });
        },
    });

    useEffect(() => {
        if (query.length > 1) {
            debouncedFetchSuggestions(query);
        } else {
            setSuggestions([]);
        }
    }, [query]);

    const debouncedFetchSuggestions = useRef(
        _.debounce(async (input: string) => {
            setLoading(true);
            try {
                getProfessionalTrainerByQuery(input).then(trainers => {
                    setSuggestions(trainers);
                });
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        }, 500)
    ).current;

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
                            setQuery('');
                            onClose();
                        }}
                        style={styles.closeIcon}
                    />

                    <Text style={styles.modalTitle}>Add Group Training</Text>

                    <form.Field name={'name'}>
                        {(field) => (
                            <View>
                                <CustomTextInput
                                    label={'Name'}
                                    onChangeText={(text) => field.handleChange(text)}
                                    value={field.state.value.toString()}/>
                            </View>
                        )}
                    </form.Field>

                    <form.Field name={'description'}>
                        {(field) => (
                            <View>
                                <CustomTextInput
                                    label={'Description'}
                                    multiline
                                    numberOfLines={3}
                                    onChangeText={(text) => field.handleChange(text)}
                                    value={field.state.value.toString()}/>
                            </View>
                        )}
                    </form.Field>

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
                    <form.Field
                        name={'professionalTrainer'}>
                        {(field) => (
                            <View>
                                <CustomTextInput
                                    style={styles.input}
                                    label="Type trainer's username..."
                                    value={query}
                                    onChangeText={setQuery}
                                />

                                {loading ? (
                                    <Text style={styles.loadingText}>Loading...</Text>
                                ) : (
                                    <FlatList
                                        style={[
                                            styles.autoComplete,
                                            {display: suggestions.length === 0 ? 'none' : 'flex'},
                                        ]}
                                        data={suggestions}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({item}) => (
                                            <Text
                                                style={styles.item}
                                                onPress={() => {
                                                    const selectedTrainer = {
                                                        professionalTrainerId: item.professionalTrainerId,
                                                        username: item.username,
                                                    };
                                                    field.handleChange(selectedTrainer);
                                                    setQuery(item.username);
                                                    setSuggestions([]);
                                                }}
                                            >
                                                @{item.username}
                                            </Text>
                                        )}
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
                        Add Group Training
                    </Button>
                </View>
            </View>
        </Modal>
    );
};
