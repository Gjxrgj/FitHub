import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../dto/types.ts';
import {styles} from './style.ts';
import {useTheme} from 'react-native-paper';
import {useAuth} from "../../context/AuthProvider";

type BottomNavigationScreenNavigator = StackNavigationProp<RootStackParamList, 'BottomNavigation'>;

export const CustomBottomNavigation = () => {

    const navigation = useNavigation<BottomNavigationScreenNavigator>();
    const auth = useAuth();
    const { colors } = useTheme();
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                <Icon name="home" size={30} color={colors.primary}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Map')}>
                <Icon name="google-maps" size={30} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SearchMealScreen')}>
                <Icon name="food" size={30} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SearchExerciseScreen')}>
                <Icon name="dumbbell" size={30} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SearchFriends')}>
                <Icon name="account-plus" size={30} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile', {userId: auth.user?.id})}>
                <Icon name="account" size={30} color={colors.primary} />
            </TouchableOpacity>
        </View>
    );
};


