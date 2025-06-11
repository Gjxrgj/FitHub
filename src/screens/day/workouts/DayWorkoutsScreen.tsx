import {ScrollView, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {theme} from '../../../theme/theme.ts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment/moment';
import {useAuth} from '../../../context/AuthProvider.tsx';
import {Card, Divider, Menu, Text} from 'react-native-paper';
import {deleteWorkout, getWorkoutsByNameOrDate, removeExerciseFromWorkout} from '../../../services';
import {RootStackParamList, UpsertPostDto, WorkoutDto} from '../../../dto/types.ts';
import {RouteProp, useFocusEffect, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {styles} from './styles.ts';
import {CustomBottomNavigation} from "../../../components/BottomNavigation/CustomBottomNavigation";
import {CopyOrEditWorkout} from "../../../enums/enums";

type DayWorkoutsScreenRouteProp = RouteProp<RootStackParamList, 'DayWorkoutsScreen'>;
type DayWorkoutsScreenNavigation = StackNavigationProp<RootStackParamList, 'DayWorkoutsScreen'>;

export const DayWorkoutsScreen = () => {
    const auth = useAuth();
    const route = useRoute<DayWorkoutsScreenRouteProp>();
    const upsertPostDto = route.params?.upsertPostDto ?? null;
    const dayDate = route.params?.dayDate ?? null;
    const [date, setDate] = useState<moment.Moment>(moment());
    const [workouts, setWorkouts] = useState<Array<WorkoutDto>>([]);
    const navigation = useNavigation<DayWorkoutsScreenNavigation>();
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);

    useFocusEffect(
        useCallback(() => {
            if (dayDate) {
                setDate(dayDate);
                loadWorkoutsForDay(dayDate);
                navigation.setParams({ dayDate: undefined });
            } else {
                loadWorkoutsForDay(date);
            }
        }, [date, dayDate]),
    );
    const openMenu = (postId: number) => setOpenMenuId(postId);
    const closeMenu = () => setOpenMenuId(null);

    const loadWorkoutsForDay = useCallback((dateParam: moment.Moment) => {
        if (auth.user?.id) {
            getWorkoutsByNameOrDate(auth.user.id, dateParam.format('YYYY-MM-DD'), undefined)
                .then(w => {
                    setWorkouts(w);
                });
        }
    }, [auth.user?.id]);

    return (
        <View style={{flex: 1, backgroundColor: theme.colors.background}}>
            <ScrollView>
                <View style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginVertical: 10,
                    paddingHorizontal: 15,
                }}>
                    <TouchableOpacity onPress={() => {
                        setDate(moment(date).subtract(1, 'days'));
                        loadWorkoutsForDay(moment(date).subtract(1, 'days'));
                    }}>
                        <Icon name="chevron-left" size={40} color={theme.colors.primary}/>
                    </TouchableOpacity>
                    <View style={{paddingTop: 5}}>
                        <Text style={{textAlign: 'center', fontSize: 18}}>
                            {(() => {
                                if (date.format('DD.MM.YYYY') === moment().format('DD.MM.YYYY')) {
                                    return 'Today';
                                } else if (date.format('DD.MM.YYYY') === moment().subtract(1, 'days').format('DD.MM.YYYY')) {
                                    return 'Yesterday';
                                } else if (date.format('DD.MM.YYYY') === moment().add(1, 'days').format('DD.MM.YYYY')) {
                                    return 'Tomorrow';
                                } else {
                                    return date.format('DD.MM.YYYY');
                                }
                            })()}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                        setDate(moment(date).add(1, 'days'));
                        loadWorkoutsForDay(moment(date).add(1, 'days'));

                    }}>
                        <Icon name="chevron-right" size={40} color={theme.colors.primary}/>
                    </TouchableOpacity>
                </View>

                <View style={{flex: 1, padding: 15, marginBottom: 50}}>
                    {workouts.map(workout => (
                        <Card key={workout.id} style={{marginBottom: 15}}>
                            <Card.Content>
                                <View style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                }}>
                                    <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
                                        {workout.name}
                                    </Text>
                                    <Menu
                                        visible={openMenuId === workout.id}
                                        onDismiss={closeMenu}
                                        anchor={
                                            <TouchableOpacity onPress={() => openMenu(workout.id)}>
                                                <Icon name="dots-vertical" size={24} color={"black"}/>
                                            </TouchableOpacity>
                                        }
                                    >
                                        <Menu.Item
                                            onPress={() => {
                                                closeMenu();
                                                navigation.navigate("CopyEditWorkout", {
                                                    workout: workout,
                                                    copyEditWorkout: CopyOrEditWorkout.COPY
                                                });
                                            }}
                                            title="Copy Workout"
                                        />
                                        <Divider/>
                                        <Menu.Item
                                            onPress={() => {
                                                closeMenu();
                                                navigation.navigate("CopyEditWorkout", {
                                                    workout: workout,
                                                    copyEditWorkout: CopyOrEditWorkout.EDIT
                                                });
                                            }}
                                            title="Edit Workout"
                                        />
                                        <Divider/>
                                        <Menu.Item
                                            onPress={() => {
                                                closeMenu();
                                                deleteWorkout(workout.id).then((workoutId) => {
                                                    setWorkouts(prevWorkouts => prevWorkouts.filter(w => w.id !== workoutId));
                                                });
                                            }}
                                            title="Delete Workout"
                                        />
                                    </Menu>
                                </View>
                                <Divider style={{marginBottom: 10}}/>
                                {workout.exercises.map(exercise => (
                                    <View key={exercise.id} style={{marginBottom: 15}}>
                                        <View style={{
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                            <Text style={{
                                                fontSize: 16,
                                                fontWeight: 'bold',
                                                textAlign: 'center',
                                                marginBottom: 25,
                                                marginTop: 10,
                                            }}>
                                                {exercise.name}
                                            </Text>
                                            <TouchableOpacity style={{position: "absolute", right: 0}} onPress={() => {
                                                removeExerciseFromWorkout(exercise.id).then((exerciseId) => {
                                                    setWorkouts(prevWorkouts => prevWorkouts.map(w =>
                                                        w.id === workout.id
                                                            ? {
                                                                ...w,
                                                                exercises: w.exercises.filter(e => e.id !== exerciseId)
                                                            }
                                                            : w
                                                    ));
                                                });
                                            }}>
                                                <Icon name="delete" size={20}
                                                      color={theme.colors.error}/>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}>
                                            <Text style={{fontSize: 14, textAlign: 'center', flex: 1}}>
                                                {exercise.sets} sets
                                            </Text>
                                            <Text style={{fontSize: 14, textAlign: 'center', flex: 1}}>
                                                {exercise.reps} reps
                                            </Text>
                                            <Text style={{fontSize: 14, textAlign: 'center', flex: 1}}>
                                                {exercise.weight}kg
                                            </Text>
                                            {exercise.timeInMins > 0 && (
                                                <Text style={{fontSize: 14, textAlign: 'center', flex: 1}}>
                                                    {Math.floor(exercise.timeInMins)} min
                                                </Text>

                                            )}
                                        </View>
                                        <Divider style={{marginTop: 10}}/>
                                    </View>
                                ))}
                                {!upsertPostDto && <TouchableOpacity
                                    style={styles.addButton}
                                    onPress={() => {
                                        navigation.navigate("SearchExerciseScreen")
                                    }}>
                                    <Icon name="plus" size={20} color={'white'}/>
                                    <Text style={styles.addButtonText}>Add exercise</Text>
                                </TouchableOpacity>}
                                {upsertPostDto && <TouchableOpacity
                                    style={styles.addButton}
                                    onPress={() => {
                                        if (!upsertPostDto?.userId) {
                                            return;
                                        }

                                        const updatedPostDto: UpsertPostDto = {
                                            userId: upsertPostDto?.userId,
                                            mealId: upsertPostDto?.mealId,
                                            image: upsertPostDto?.image,
                                            description: upsertPostDto?.description,
                                            title: upsertPostDto?.title,
                                            workoutId: workout.id,
                                        };
                                        navigation.navigate('AddEditPostScreen', {upsertPostDto: updatedPostDto});
                                    }}>
                                    <Icon name="plus" size={20} color={'white'}/>
                                    <Text style={styles.addButtonText}>Link to post</Text>
                                </TouchableOpacity>}
                            </Card.Content>
                        </Card>
                    ))}

                    {workouts.length === 0 && (
                        <View>
                            <TouchableOpacity
                                style={styles.addButton}
                                onPress={() => {navigation.navigate('SearchExerciseScreen')}}>
                                <Icon name="plus" size={20} color={'white'}/>
                                <Text style={styles.addButtonText}>Add Exercise</Text>
                            </TouchableOpacity>
                            <Text style={{textAlign: 'center', marginTop: 20, fontSize: 16}}>
                                No workouts for this day.
                            </Text>
                        </View>
                    )}
                </View>
            </ScrollView>

            <CustomBottomNavigation/>
        </View>
    );
};
