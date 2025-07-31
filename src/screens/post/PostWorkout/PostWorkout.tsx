import {ScrollView, View} from "react-native";
import {theme} from "../../../theme/theme";
import {Card, Divider, Text} from "react-native-paper";
import {RootStackParamList, WorkoutDto} from "../../../dto/types";
import React, {useEffect, useState} from "react";
import {getWorkoutById} from "../../../services";
import {RouteProp, useRoute} from "@react-navigation/native";

type PostWorkoutRootProp = RouteProp<RootStackParamList, 'PostWorkout'>;
export const PostWorkout = () => {
    const route = useRoute<PostWorkoutRootProp>();
    const {params} = route || {};
    const workoutId = params?.workoutId;
    const [workout, setWorkout] = useState<WorkoutDto>({});

    useEffect(() => {
        getWorkoutById(workoutId)
            .then(workout => setWorkout(workout));
    }, [workoutId]);

    return (
        <View style={{flex: 1, backgroundColor: theme.colors.background}}>
            <ScrollView style={{flex: 1, padding: 15}}>
                <Card key={workout.id} style={{marginBottom: 15}}>
                    <Card.Content>
                        <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
                            {workout.name}
                        </Text>
                        <Divider style={{marginBottom: 10}}/>
                        {workout.exercises?.map(exercise => (
                            <View key={exercise.id} style={{marginBottom: 15}}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    marginBottom: 20,
                                }}>
                                    {exercise.name}
                                </Text>
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
                                            {exercise.timeInMins} min
                                        </Text>
                                    )}
                                </View>
                                <Divider style={{marginTop: 10}}/>
                            </View>
                        ))}
                    </Card.Content>
                </Card>
            </ScrollView>
        </View>
    );
}
