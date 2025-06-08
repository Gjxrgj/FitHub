import {FlatList, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {styles} from './styles.ts';
import {CustomTextInput} from '../../../components/CustomTextInput/CustomTextInput.tsx';
import {ErrorDisplayComponent} from '../../../components/ErrorDisplay/ErrorDisplayComponent.tsx';
import {Button} from 'react-native-paper';
import {useForm} from '@tanstack/react-form';
import {RootStackParamList, UpsertExerciseInWorkoutDto, WorkoutDto} from '../../../dto/types.ts';
import {NavigationProp, RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import _ from 'lodash';
import {getWorkoutsByNameOrDate} from '../../../services';
import {AddWorkoutModal} from '../coponents/AddWorkoutModal.tsx';
import {addExerciseInWorkout} from '../../../services';
import {useAuth} from '../../../context/AuthProvider.tsx';
import moment from "moment";

type AddExerciseToWorkoutProps = RouteProp<RootStackParamList, 'AddExerciseToWorkoutScreen'>;
type AddExerciseToWorkoutNavigationProps = NavigationProp<RootStackParamList, 'AddExerciseToWorkoutScreen'>;


export const AddExerciseToWorkoutScreen = () => {
    const route = useRoute<AddExerciseToWorkoutProps>();
    const {exerciseDto} = route.params;
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState<Array<WorkoutDto>>([]);
    const [openAddWorkoutModal, setOpenAddWorkoutModal] = useState<boolean>(false);
    const auth = useAuth();
    const navigation = useNavigation<AddExerciseToWorkoutNavigationProps>();

    const form = useForm({
        defaultValues: {
            reps: 0,
            sets: 0,
            weight: 0,
            hours: 0,
            mins: 0,
            secs: 0,
            workoutId: 0,
        },
        onSubmit: ({value}): void => {
            const timeInMinutes = (value.hours * 60) + (value.mins) + (value.secs / 60);
            const upsertExerciseInWorkoutDto: UpsertExerciseInWorkoutDto = {
                workoutId: value.workoutId,
                exerciseId: exerciseDto.id,
                reps: value.reps,
                sets: value.sets,
                weight: value.weight,
                timeInMins: timeInMinutes,
            };
            addExerciseInWorkout(upsertExerciseInWorkoutDto)
                .then(() => {
                    navigation.navigate('DayWorkoutsScreen', {});
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

    return (
        <FlatList
            style={styles.container}
            data={[{}]}
            renderItem={() => (
                <View>
                    <View style={styles.formFieldContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{exerciseDto.name}</Text>
                        </View>
                        <form.Field
                            name={'reps'}>
                            {(field) => (
                                <View style={{marginBottom: 15}}>
                                    <CustomTextInput
                                        label={'Repetitions'}
                                        keyboardType="numeric"
                                        onChangeText={(text) => field.handleChange(parseInt(text, 10) || 0)}
                                        value={field.state.value.toString()}/>
                                    <ErrorDisplayComponent errorMessages={field.state.meta.errors}/>
                                </View>
                            )}
                        </form.Field>
                        <form.Field
                            name={'sets'}>
                            {(field) => (
                                <View style={{marginBottom: 15}}>
                                    <CustomTextInput
                                        label={'Sets'}
                                        keyboardType="numeric"
                                        onChangeText={(text) => field.handleChange(parseInt(text, 10) || 0)}
                                        value={field.state.value.toString()}/>
                                    <ErrorDisplayComponent errorMessages={field.state.meta.errors}/>
                                </View>
                            )}
                        </form.Field>
                        <form.Field
                            name={'weight'}>
                            {(field) => (
                                <View style={{marginBottom: 15}}>
                                    <CustomTextInput
                                        keyboardType="numeric"
                                        label={'Weight'}
                                        onChangeText={(text) => field.handleChange(parseFloat(text) || 0)}
                                        value={field.state.value.toString()}/>
                                    <ErrorDisplayComponent errorMessages={field.state.meta.errors}/>
                                </View>
                            )}
                        </form.Field>
                        <Text style={styles.label}>Exercise Duration</Text>
                        <View style={styles.inputContainer}>
                            <form.Field
                                name={'hours'}>
                                {(field) => (
                                    <View>
                                        <CustomTextInput
                                            style={{width: "100%"}}
                                            value={field.state.value.toString()}
                                            label={'Hours'}
                                            onChangeText={(text) => field.handleChange(parseInt(text, 10))}
                                            keyboardType="numeric"
                                            maxLength={2}
                                        />
                                    </View>
                                )}
                            </form.Field>
                            <Text style={styles.punctuationMark}>:</Text>
                            <form.Field
                                name={'mins'}>
                                {(field) => (
                                    <View>
                                        <CustomTextInput
                                            style={{width: "100%"}}
                                            label={'Minutes'}
                                            value={field.state.value.toString()}
                                            onChangeText={(text) => field.handleChange(parseInt(text, 10))}
                                            keyboardType="numeric"
                                            maxLength={2}
                                        />
                                    </View>
                                )}
                            </form.Field>
                            <Text style={styles.punctuationMark}>:</Text>
                            <form.Field
                                name={'secs'}>
                                {(field) => (
                                    <View>
                                        <CustomTextInput
                                            style={{width: "100%"}}
                                            label={'Seconds'}
                                            value={field.state.value.toString()}
                                            onChangeText={(text) => field.handleChange(parseInt(text, 10))}
                                            keyboardType="numeric"
                                            maxLength={2}
                                        />
                                    </View>
                                )}
                            </form.Field>
                        </View>
                        <form.Field
                            name={'workoutId'}>
                            {(field) => (
                                <View style={{marginHorizontal: 10}}>
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
                                </View>
                            )}
                        </form.Field>
                        <AddWorkoutModal
                            visible={openAddWorkoutModal}
                            onClose={() => setOpenAddWorkoutModal(false)}/>
                        <Button style={{marginTop: 10, marginHorizontal: 10, borderRadius: 2}} onPress={form.handleSubmit} mode={"contained"}>
                            Add To Workout
                        </Button>
                    </View>
                </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={<View/>}
        />
    );
};
