import React, {useEffect, useRef, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {ExerciseDto, RootStackParamList} from '../../../dto/types.ts';
import {useAuth} from '../../../context/AuthProvider.tsx';
import {CustomView} from '../../../components/CustomView/CustomView.tsx';
import {ScrollView, TextInput, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import {styles} from './styles.ts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../../theme/theme.ts';
import {LoadingSpinner} from '../../../components/LoadingSpinner/LoadingSpinner.tsx';
import {CustomBottomNavigation} from '../../../components/BottomNavigation/CustomBottomNavigation.tsx';
import _ from 'lodash';
import {getExercisesByNameAndCategory, getRecentExercises} from '../../../services';
import {ExerciseCategory} from '../../../enums/enums.ts';


type SearchExerciseScreenNavigation = StackNavigationProp<RootStackParamList, 'SearchExerciseScreen'>;

export const SearchExerciseScreen = () => {
    const navigation = useNavigation<SearchExerciseScreenNavigation>();
    const [loading, setLoading] = useState(false);
    const [exercises, setExercises] = useState<Array<ExerciseDto>>([]);
    const [historyExercises, setHistoryExercises] = useState<Array<ExerciseDto>>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [category, setCategory] = useState<ExerciseCategory | undefined>(undefined);
    const auth = useAuth();

    const debouncedFetchExercises = useRef(
        _.debounce(async (input: string) => {
            setExercises([]);
            setLoading(true);
            try {
                getExercisesByNameAndCategory(input, category)
                    .then(ex => setExercises(ex));
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        }, 500),
    ).current;

    useEffect(() => {
        if (searchTerm.length > 1) {
            debouncedFetchExercises(searchTerm);
        } else {
            debouncedFetchExercises.cancel();
            setExercises(historyExercises);
            setLoading(false);
        }
    }, [debouncedFetchExercises, historyExercises, searchTerm]);

     useEffect(() => {
         if (auth.user?.id) {
             getRecentExercises(auth.user?.id)
                 .then(exe => {
                     setExercises(exe);
                     setHistoryExercises(exe);
                 });
         }
     }, [auth.user?.id]);

    return (
        <CustomView>
            <Text style={{
                fontSize: 30,
                fontWeight: 'normal',
                color: theme.colors.primary,
                marginHorizontal: 'auto',
                paddingTop: 20,
                paddingBottom: 20
            }}>Exercises</Text>
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
                <TouchableOpacity style={styles.addExerciseButton} onPress={() => navigation.navigate('MyExercises')}>
                    <Icon name="weight-lifter" size={30} color={theme.colors.primary}/>
                </TouchableOpacity>
            </View>
            <View style={styles.scrollContainer}>
                <ScrollView>
                    {exercises.length === 0 && !loading && (
                        <Text style={styles.noResultsText}>No results found</Text>
                    )}
                    {loading && (
                        <LoadingSpinner/>
                    )}
                    {exercises.map((item, index) => {
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
};
