import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {ExerciseInWorkoutDto, RootStackParamList, UpsertExerciseInWorkoutDto, WorkoutDto} from "../../../../dto/types";
import {FlatList, Text, View} from "react-native";
import {CustomTextInput} from "../../../../components/CustomTextInput/CustomTextInput";
import {Button} from "react-native-paper";
import React, {useEffect, useRef, useState} from "react";
import {useForm} from "@tanstack/react-form";
import {CopyOrEditWorkout} from "../../../../enums/enums";
import moment from "moment/moment";
import _ from "lodash";
import {addMultipleExercisesInWorkout, editMultiple, getWorkoutsByNameOrDate} from "../../../../services";
import {AddWorkoutModal} from "../../../exercise/coponents/AddWorkoutModal";
import {useAuth} from "../../../../context/AuthProvider";
import {StackNavigationProp} from "@react-navigation/stack";
import {styles} from "./styles";
import {ErrorDisplayComponent} from "../../../../components/ErrorDisplay/ErrorDisplayComponent";

type CopyEditWorkoutScreenRootProp = RouteProp<RootStackParamList, "CopyEditWorkout">;
type CopyEditWorkoutScreenNavigation = StackNavigationProp<RootStackParamList, 'CopyEditWorkout'>;

export const CopyEditWorkoutScreen = () => {
    const route = useRoute<CopyEditWorkoutScreenRootProp>();
    const {params} = route || {};
    const workout = params?.workout;
    const copyEditWorkout = params?.copyEditWorkout;
    const [suggestions, setSuggestions] = useState<Array<WorkoutDto>>([]);
    const [query, setQuery] = useState('');
    const [openAddWorkoutModal, setOpenAddWorkoutModal] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const auth = useAuth();
    const navigation = useNavigation<CopyEditWorkoutScreenNavigation>();

    const form = useForm({
        defaultValues: {
            exercises: workout.exercises.reduce((acc, exercise) => {
                acc[exercise.id] = {
                    id: exercise.id || 0,
                    reps: exercise.reps || 0,
                    name: exercise.name || '',
                    sets: exercise.sets || 0,
                    weight: exercise.weight || 0,
                    exerciseId: exercise.exerciseId || 0,
                    hours: Math.floor(exercise.timeInMins / 60) || 0,
                    mins: Math.floor(exercise.timeInMins % 60) || 0,
                    secs: Math.round((exercise.timeInMins % 1) * 60) || 0,
                };
                return acc;
            }, {} as Record<number, UpsertExerciseInWorkoutDto>),
            workoutId: 0,
        },
        onSubmit: ({value}) => {
            if (copyEditWorkout === CopyOrEditWorkout.EDIT) {
                const transformedExercises: Array<ExerciseInWorkoutDto> = Object.entries(value.exercises).map(([id, exercise]) => ({
                    id: exercise.id,
                    name: exercise.name,
                    exerciseId: exercise.exerciseId,
                    reps: exercise.reps,
                    sets: exercise.sets,
                    weight: exercise.weight,
                    timeInMins: exercise.hours * 60 + exercise.mins + exercise.secs / 60,
                }));
                editMultiple(transformedExercises)
                    .then(workout => navigation.navigate("DayWorkoutsScreen"));
            } else {
                const transformedExercises: Array<UpsertExerciseInWorkoutDto> = Object.entries(value.exercises).map(([id, exercise]) => ({
                    reps: exercise.reps,
                    sets: exercise.sets,
                    weight: exercise.weight,
                    timeInMins: exercise.hours * 60 + exercise.mins + exercise.secs / 60,
                    exerciseId: exercise.exerciseId,
                    workoutId: value.workoutId
                }));
                addMultipleExercisesInWorkout(transformedExercises)
                    .then(workout => {
                        const correctedDate = moment([workout.dayDate[0], workout.dayDate[1] - 1, workout.dayDate[2]]);
                        navigation.navigate("DayWorkoutsScreen", {dayDate: correctedDate});
                    });
            }
        },
    });


    useEffect(() => {
        if (copyEditWorkout === CopyOrEditWorkout.COPY) {
            if (query.length > 1) {
                debouncedFetchSuggestions(query);
            } else {
                setSuggestions([]);
            }
        }
    }, [query]);

    const debouncedFetchSuggestions = useRef(
        _.debounce(async (input: string) => {
            setLoading(true);
            try {
                if (auth.user?.id) {
                    getWorkoutsByNameOrDate(auth.user.id, undefined, input).then(workouts => {
                        setSuggestions(workouts);
                    });
                }
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        }, 500),
    ).current;

    const handleUpdate = (exerciseId: number, fieldName: string, newValue: number) => {
        const currentExercise = form.state.values.exercises[exerciseId];
        const updatedExercise = {
            ...currentExercise,
            [fieldName]: newValue,
        };

        const updatedExercises = {
            ...form.state.values.exercises,
            [exerciseId]: updatedExercise,
        };

        form.setFieldValue("exercises", updatedExercises);
    };

    return (
        <FlatList
            keyboardDismissMode="onDrag"
            style={styles.container}
            data={workout.exercises}
            ListHeaderComponent={
                <View style={{marginBottom: 10}}>
                    <Text style={styles.title}>
                        {copyEditWorkout === CopyOrEditWorkout.COPY ? "Copy " : "Edit "} {workout.name}
                    </Text>
                    {copyEditWorkout === CopyOrEditWorkout.COPY ? <form.Field
                        name={'workoutId'}
                        validators={{
                            onChange: ({value}: { string }) => {
                                if (value === 0) {
                                    return 'Please select a workout.';
                                }
                            },
                        }}
                    >
                        {(field) => (
                            <View>
                                <View style={{width: '100%', marginBottom: 15}}>
                                    <Button style={{borderRadius: 0, height: 42}} mode={'contained'}
                                            onPress={() => setOpenAddWorkoutModal(true)}>
                                        Add New Workout
                                    </Button>
                                </View>
                                <View style={styles.rowContainer}>
                                    <View style={{width: '100%'}}>
                                        <CustomTextInput
                                            label="Search workout by date or name"
                                            style={{margin: 0}}
                                            value={query}
                                            onChangeText={setQuery}
                                        />
                                    </View>
                                </View>
                                {loading ? (
                                    <Text style={styles.loadingText}>Loading...</Text>
                                ) : (
                                    <FlatList
                                        style={[styles.autoComplete, {display: suggestions.length === 0 ? 'none' : 'flex'}]}
                                        data={suggestions}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({item}) => (
                                            <Text
                                                style={styles.item}
                                                onPress={() => {
                                                    field.handleChange(item.id);
                                                    setQuery(item.name + ' - ' + moment(item.dayDate, "YYYY,MM,DD").format("DD.MM.YYYY"));
                                                    setSuggestions([]);
                                                }}>
                                                {item.name + ' - ' + moment(item.dayDate, "YYYY,MM,DD").format("DD.MM.YYYY")}
                                            </Text>
                                        )}
                                    />
                                )}
                                <ErrorDisplayComponent errorMessages={field.state.meta.errors}/>
                            </View>
                        )}
                    </form.Field> : ''}
                    <AddWorkoutModal
                        visible={openAddWorkoutModal}
                        onClose={() => setOpenAddWorkoutModal(false)}/>
                </View>
            }
            renderItem={({item: exerciseDto}) => (
                <View key={exerciseDto.id}>
                    <View style={styles.formFieldContainer}>
                        <Text style={{textAlign: "center"}}>{exerciseDto.name}</Text>
                        {["reps", "sets", "weight", "hours", "mins", "secs"].map((fieldName) => (
                            <form.Field key={exerciseDto.id + '.' + fieldName} name={'exercises'}>
                                {(field) => {
                                    return (
                                        <CustomTextInput
                                            label={fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                                            keyboardType="numeric"
                                            onChangeText={(text) => handleUpdate(exerciseDto.id, fieldName, parseFloat(text) || 0)}
                                            value={field.state.value[exerciseDto.id]?.[fieldName]?.toString() || ""}
                                        />
                                    );
                                }}
                            </form.Field>
                        ))}
                    </View>
                </View>
            )}
            ListFooterComponent={
                <Button style={{marginTop: 10, marginBottom: 40, borderRadius: 2}} onPress={form.handleSubmit}
                        mode="contained">
                    {copyEditWorkout === CopyOrEditWorkout.COPY ? "Copy " : "Edit "}
                </Button>
            }
            keyExtractor={(item) => item.id.toString()}
        />
    );
};
