import {useAuth} from "../../../context/AuthProvider";
import {useNavigation} from "@react-navigation/native";
import {useForm} from "@tanstack/react-form";
import {RootStackParamList, UpsertExerciseDto} from "../../../dto/types";
import {createExercise, createFoodItem} from "../../../services";
import {ScrollView, TouchableOpacity, View} from "react-native";
import {theme} from "../../../theme/theme";
import {Button, Text} from "react-native-paper";
import {CustomTextInput} from "../../../components/CustomTextInput/CustomTextInput";
import React, {useState} from "react";
import {StackNavigationProp} from "@react-navigation/stack";
import {styles} from "./styles";
import {RadioSelectModal} from "./RadioSelectModal";
import {formatEnumLabel} from "../../../util/stringUtil";
import {ErrorDisplayComponent} from "../../../components/ErrorDisplay/ErrorDisplayComponent";

type CreateNewExerciseNavigation = StackNavigationProp<RootStackParamList, 'CreateNewExercise'>;

export enum TypeOfOptions {
    FORCE,
    LEVEl,
    MECHANIC,
    CATEGORY
}

export const CreateNewExercise = () => {
    const auth = useAuth();
    const navigation = useNavigation<CreateNewExerciseNavigation>();
    const [primaryMuscleBeingAdded, setPrimaryMuscleBeingAdded] = useState<string>('');
    const [secondaryMuscleBeingAdded, setSecondaryMuscleBeingAdded] = useState<string>('');
    const [openRadioSelectModal, setOpenRadioSelectModal] = useState<boolean>(false);
    const [optionType, setOptionType] = useState<TypeOfOptions>(TypeOfOptions.LEVEl);
    const [handleChangeFn, setHandleChangeFn] = useState<((value: string) => void) | null>(null);

    const form = useForm({
        defaultValues: {
            name: '',
            force: '',
            level: '',
            category: '',
            mechanic: '',
            instructions: '',
            primaryMuscles: [],
            secondaryMuscles: [],
        },
        onSubmit: async ({value}) => {
            if (auth.user?.id) {
                const upsertExerciseDto: UpsertExerciseDto = {
                    name: value.name,
                    userId: auth.user.id,
                    force: value.force,
                    level: value.level,
                    category: value.category,
                    mechanic: value.mechanic,
                    instructions: value.instructions,
                    primaryMuscles: value.primaryMuscles,
                    secondaryMuscles: value.secondaryMuscles,
                }
                console.log(upsertExerciseDto)
                createExercise(upsertExerciseDto)
                    .then(() => navigation.navigate("MyExercises"));
            }
        },
    });

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={{
                borderWidth: 1,
                borderColor: theme.colors.primary,
                borderRadius: 10,
                padding: 10,
                paddingVertical: 20,
                marginTop: '15%',
                margin: 10,
                backgroundColor: 'white'
            }}>
                <Text style={styles.title}>Create Exercise</Text>

                <form.Field name="name"
                            validators={{
                                onChange: ({value}) => {
                                    if (value === '') {
                                        return 'Name cannot be blank.';
                                    }
                                },
                            }}>
                    {(field) => (
                        <View style={styles.inputContainer}>
                            <CustomTextInput
                                label="Name"
                                onChangeText={field.handleChange}
                                value={field.state.value}
                            />
                            <ErrorDisplayComponent errorMessages={field.state.meta.errors}/>
                        </View>
                    )}
                </form.Field>
                <form.Field name="instructions">
                    {(field) => (
                        <View style={styles.inputContainer}>
                            <CustomTextInput
                                multiline
                                numberOfLines={4}
                                label="Instructions"
                                onChangeText={field.handleChange}
                                value={field.state.value}
                            />
                        </View>
                    )}
                </form.Field>
                <form.Field name={'primaryMuscles'}
                            validators={{
                                onChange: ({value}) => {
                                    if (value.length === 0) {
                                        return 'Primary muscles cannot be blank.';
                                    }
                                },
                            }}>
                    {(field) => (
                        <View style={{marginHorizontal: 10}}>
                            <CustomTextInput
                                value={primaryMuscleBeingAdded}
                                onChangeText={(text) => setPrimaryMuscleBeingAdded(text)}
                                label="Primary muscles"
                                onSubmitEditing={() => {
                                    if (primaryMuscleBeingAdded !== '') {
                                        const updatedPrimaryMuscles = [...field.state.value, primaryMuscleBeingAdded.trim()];
                                        field.handleChange(updatedPrimaryMuscles);
                                        setPrimaryMuscleBeingAdded('');
                                    }
                                }}
                                blurOnSubmit={false}
                            />
                            <View style={styles.tagsContainer}>
                                <ScrollView horizontal>
                                    {field.state.value && field.state.value.map((tag, index) => (
                                        <View key={index} style={styles.tag}>
                                            <TouchableOpacity onPress={() => {
                                                const updatedPrimaryMuscles = [...field.state.value];
                                                const indexToRemove = updatedPrimaryMuscles.findIndex(muscle => muscle === tag);
                                                if (indexToRemove !== -1) {
                                                    updatedPrimaryMuscles.splice(indexToRemove, 1);
                                                }
                                                field.handleChange(updatedPrimaryMuscles);
                                            }}>
                                                <Text style={styles.tagText}>{tag}
                                                    <Text style={styles.removeTag}> ×</Text>
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </ScrollView>
                            </View>
                            <ErrorDisplayComponent errorMessages={field.state.meta.errors}/>
                        </View>
                    )}
                </form.Field>

                <form.Field name={'secondaryMuscles'}>
                    {(field) => (
                        <View style={{marginHorizontal: 10}}>
                            <CustomTextInput
                                value={secondaryMuscleBeingAdded}
                                style={{marginVertical: 10, marginHorizontal: 10}}
                                onChangeText={(text) => setSecondaryMuscleBeingAdded(text)}
                                label="Secondary muscles"
                                onSubmitEditing={() => {
                                    if (secondaryMuscleBeingAdded !== '') {
                                        const updatedSecondaryMuscles = [...field.state.value, secondaryMuscleBeingAdded.trim()];
                                        field.handleChange(updatedSecondaryMuscles);
                                        setSecondaryMuscleBeingAdded('');
                                    }
                                }}
                                blurOnSubmit={false}
                            />
                            <View style={styles.tagsContainer}>
                                <ScrollView horizontal>
                                    {field.state.value && field.state.value.map((tag, index) => (
                                        <View key={index} style={styles.tag}>
                                            <TouchableOpacity onPress={() => {
                                                const updatedSecondaryMuscles = [...field.state.value];
                                                const indexToRemove = updatedSecondaryMuscles.findIndex(muscle => muscle === tag);
                                                if (indexToRemove !== -1) {
                                                    updatedSecondaryMuscles.splice(indexToRemove, 1);
                                                }
                                                field.handleChange(updatedSecondaryMuscles);
                                            }}>
                                                <Text style={styles.tagText}>{tag}
                                                    <Text style={styles.removeTag}> ×</Text>
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </ScrollView>
                            </View>
                        </View>
                    )}
                </form.Field>


                <form.Field name="category">
                    {(field) => (
                        <View style={styles.inputContainer}>
                            <Button
                                mode="contained"
                                labelStyle={styles.buttonLabel}
                                style={styles.goalButton}
                                contentStyle={styles.leftAlignedButtonContent}
                                onPress={() => {
                                    setHandleChangeFn(() => field.handleChange);
                                    setOptionType(TypeOfOptions.CATEGORY);
                                    setOpenRadioSelectModal(true);
                                }}>
                                {formatEnumLabel(field.state.value) || 'Select category'}
                            </Button>
                        </View>
                    )}
                </form.Field>

                <form.Field name="level">
                    {(field) => (
                        <View style={styles.inputContainer}>
                            <Button
                                mode="contained"
                                labelStyle={styles.buttonLabel}
                                contentStyle={styles.leftAlignedButtonContent}
                                style={styles.goalButton}
                                onPress={() => {
                                    setHandleChangeFn(() => field.handleChange);
                                    setOptionType(TypeOfOptions.LEVEl);
                                    setOpenRadioSelectModal(true);
                                }}>
                                {formatEnumLabel(field.state.value) || 'Select level'}
                            </Button>
                        </View>
                    )}
                </form.Field>

                <form.Field name="force">
                    {(field) => (
                        <View style={styles.inputContainer}>
                            <Button
                                mode="contained"
                                labelStyle={styles.buttonLabel}
                                contentStyle={styles.leftAlignedButtonContent}
                                style={styles.goalButton}
                                onPress={() => {
                                    setHandleChangeFn(() => field.handleChange);
                                    setOptionType(TypeOfOptions.FORCE);
                                    setOpenRadioSelectModal(true);
                                }}>
                                {formatEnumLabel(field.state.value) || 'Select force'}
                            </Button>
                        </View>
                    )}
                </form.Field>

                <form.Field name="mechanic">
                    {(field) => (
                        <View style={styles.inputContainer}>
                            <Button
                                mode="contained"
                                labelStyle={styles.buttonLabel}
                                contentStyle={styles.leftAlignedButtonContent}
                                style={styles.goalButton}
                                onPress={() => {
                                    setHandleChangeFn(() => field.handleChange);
                                    setOptionType(TypeOfOptions.MECHANIC);
                                    setOpenRadioSelectModal(true);
                                }}>
                                {formatEnumLabel(field.state.value) || 'Select mechanic'}
                            </Button>

                        </View>
                    )}
                </form.Field>


                <Button style={{borderRadius: 2, marginHorizontal: 20, marginTop: 50, marginBottom: 10}} mode={"contained"}
                        onPress={form.handleSubmit}>
                    Create
                </Button>
            </View>
            <RadioSelectModal
                typeOfOptions={optionType}
                visible={openRadioSelectModal} onClose={(selectedValue) => {
                if (handleChangeFn && selectedValue) {
                    handleChangeFn(selectedValue);
                }
                setOpenRadioSelectModal(false);
            }}/>
        </ScrollView>
    );
}
