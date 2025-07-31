import React, {FC} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {MealTrackDto, RootStackParamList} from "../../../dto/types.ts";
import {theme} from "../../../theme/theme.ts";
import {StackNavigationProp} from "@react-navigation/stack";

interface CalorieOverviewProps {
    date: moment.Moment;
    setDate: (newDate: moment.Moment) => void;
    loadMealsForDay: () => void;
    calorieIntake: number;
    showButtons: boolean;
    meals: MealTrackDto[];
    dailyCalories: number;
}

type HomeScreenNavigator = StackNavigationProp<RootStackParamList, 'CalorieOverview'>;

export const CalorieOverview: FC<CalorieOverviewProps> = ({
                                                              date,
                                                              setDate,
                                                              loadMealsForDay,
                                                              showButtons = false,
                                                              calorieIntake,
                                                              meals,
                                                              dailyCalories,
                                                          }) => {
    const navigation = useNavigation<HomeScreenNavigator>();

    return (
        <View style={{
            backgroundColor: theme.colors.background,
        }}>
            <View style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginVertical: 10,
            }}>
                <TouchableOpacity onPress={() => {
                    setDate(date.subtract(1, 'days'));
                    loadMealsForDay();
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
                    setDate(date.add(1, 'days'));
                    loadMealsForDay();
                }}>
                    <Icon name="chevron-right" size={40} color={theme.colors.primary}/>
                </TouchableOpacity>
            </View>
            <View style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
            }}>
                <View style={styles.calorieTextBox}>
                    <Text style={styles.calorieNumberText}>
                        {dailyCalories.toFixed(0) ?? 0}
                    </Text>
                    <Text style={{color: '#555'}}>
                        Total
                    </Text>
                </View>
                <View style={[styles.calorieTextBox, {width: '10%'}]}>
                    <Text style={styles.calorieNumberText}>
                        -
                    </Text>
                </View>
                <View style={styles.calorieTextBox}>
                    <Text style={styles.calorieNumberText}>
                        {calorieIntake.toFixed(0)}
                    </Text>
                    <Text style={{color: '#555'}}>
                        Consumed
                    </Text>
                </View>
                <View style={[styles.calorieTextBox, {width: '10%'}]}>
                    <Text style={styles.calorieNumberText}>
                        =
                    </Text>
                </View>
                <View style={styles.calorieTextBox}>
                    <Text style={[styles.calorieNumberText, {
                        color:
                            (dailyCalories - calorieIntake) < 0 ? theme.colors.error : theme.colors.tertiary,
                    }]}>
                        {(dailyCalories - calorieIntake).toFixed(0)}
                    </Text>
                    <Text style={{color: '#555'}}>
                        Remaining
                    </Text>
                </View>
            </View>
            {showButtons && <View style={{
                marginTop: 5,
                flexDirection: 'row',
            }}>
                <View style={{
                    borderWidth: 1,
                    borderColor: 'white',
                    borderRadius: 3,
                    paddingVertical: 10,
                    backgroundColor: theme.colors.primary,
                    width: '50%',
                }}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('DayMealsScreen', {meals: meals});
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }}>
                            <Icon name="food" size={20} color={'white'}/>
                            <Text style={{textAlign: 'center', color: 'white', marginLeft: 15}}>
                                Meals
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{
                    borderWidth: 1,
                    borderColor: 'white',
                    borderRadius: 3,
                    paddingVertical: 10,
                    backgroundColor: theme.colors.primary,
                    width: '50%',
                }}>
                    <TouchableOpacity onPress={() => navigation.navigate('DayWorkoutsScreen', {})}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }}>
                            <Icon name="dumbbell" size={20} color={'white'}/>
                            <Text style={{textAlign: 'center', color: 'white', marginLeft: 15}}>
                                Workouts
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>}
        </View>
    );
};

const styles = StyleSheet.create({
    calorieTextBox: {
        padding: 15,
        alignItems: 'center',
        width: '26.6%',
    },
    calorieNumberText: {
        fontSize: 20,
        color: '#555',
    },
});
