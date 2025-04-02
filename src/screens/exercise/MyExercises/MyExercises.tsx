import {CustomView} from "../../../components/CustomView/CustomView";
import {Text} from "react-native-paper";
import {theme} from "../../../theme/theme";
import {ScrollView, TextInput, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {LoadingSpinner} from "../../../components/LoadingSpinner/LoadingSpinner";
import {CustomBottomNavigation} from "../../../components/BottomNavigation/CustomBottomNavigation";
import React, {useCallback, useEffect, useState} from "react";
import {ExerciseDto, RootStackParamList} from "../../../dto/types";
import {getAllCreatedByUser} from "../../../services";
import {useAuth} from "../../../context/AuthProvider";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {styles} from "./styles";
import moment from "moment/moment";

type MyExercisesNavigation = StackNavigationProp<RootStackParamList, 'MyExercises'>;

export const MyExercises = () => {
    const [exercises, setExercises] = useState<ExerciseDto>([]);
    const [filteredExercises, setFilteredExercises] = useState<ExerciseDto>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const auth = useAuth();
    const navigation = useNavigation<MyExercisesNavigation>();

    useFocusEffect(
        useCallback(() => {
            if (auth.user?.id) {
                getAllCreatedByUser(auth.user?.id)
                    .then(exercises => {
                        setExercises(exercises);
                        setFilteredExercises(exercises);
                    });
            }
        }, []),
    );

    useEffect(() => {
        if (searchTerm) {
            const filtered = exercises.filter(exercise => {
                return exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
            });
            setFilteredExercises(filtered);
        } else {
            setFilteredExercises(exercises);
        }
    }, [searchTerm, exercises]);

    return (
        <CustomView>
            <Text style={{
                fontSize: 30,
                fontWeight: 'normal',
                color: theme.colors.primary,
                marginHorizontal: 'auto',
                paddingTop: 20,
                paddingBottom: 20
            }}>My Exercises</Text>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 20,
                marginRight: 20,
            }}>
                <View style={styles.searchContainer}>
                    <View style={styles.iconContainer}>
                        <Icon name="magnify" size={20} color={theme.colors.primary}/>
                    </View>
                    <TextInput
                        style={styles.searchBar}
                        placeholder=""
                        placeholderTextColor={'#555'}
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                    />
                    <View style={styles.IconXContainer}>
                        <TouchableOpacity onPress={() => setSearchTerm('')}>
                            <Icon name="close" size={20} color={theme.colors.primary}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={styles.addExerciseButton}
                                  onPress={() => navigation.navigate('CreateNewExercise')}>
                    <Icon name="plus" size={30} color={theme.colors.primary}/>
                </TouchableOpacity>
            </View>
            <View style={styles.scrollContainer}>
                <ScrollView>
                    {filteredExercises.length === 0 && !loading && (
                        <Text style={styles.noResultsText}>No results found</Text>
                    )}
                    {loading && (
                        <LoadingSpinner/>
                    )}
                    {filteredExercises.map((item, index) => {
                        const exerciseName = item.name;
                        const exerciseCategory = item.category;
                        const primaryMuscles = item.primaryMuscles;

                        return (
                            <TouchableOpacity key={index}
                                              onPress={() => navigation.navigate('AddExerciseToWorkoutScreen', {exerciseDto: item})}>
                                <View style={styles.exerciseContainer}>
                                    <Text style={styles.exerciseName}>{exerciseName}</Text>
                                    <Text style={styles.exerciseText}>Category {exerciseCategory.toLowerCase()},
                                        focusing {primaryMuscles.map(muscle => muscle + ' ')}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>
            <CustomBottomNavigation/>
        </CustomView>
    );
}
