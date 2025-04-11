import {StyleSheet} from 'react-native';
import {theme} from '../../../theme/theme.ts';

export const styles = StyleSheet.create({
    titleContainer: {
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 60
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: theme.colors.primary,
        textAlign: 'center',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'normal',
        color: '#666',
        textAlign: 'center',
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    caloriesContainer: {
        backgroundColor: '#f8f8f8',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        marginHorizontal: 100,
        borderBottomWidth: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    caloriesText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#85d585',

    },
    caloriesLabel: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#666',
    },
    nutritionContainer: {
        padding: 20,
        paddingBottom: 40,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 3,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 20,
        marginTop: 90
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.primary,
        marginBottom: 15,
    },
    macroRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        backgroundColor: '#f8f8f8',
    },
    macroColumn: {
        alignItems: 'center',
    },
    macroValue: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    macroLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#666',
    },
    per100gLabel: {
        position: 'absolute',
        top: -20,
        left: 20,
        padding: 5,
        backgroundColor: '#f8f8f8',
        width: 90,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    modalInput: {
        marginBottom: 10,
        marginHorizontal: 10,
    },
    fullWidth: {
        width: '100%',
    },
    addMealText: {
        color: '#555',
        textAlign: 'center',
        marginTop: 30,
        fontSize: 20,
        width: '100%',
    },
    mealTypeContainer: {
        marginTop: 30,
        marginBottom: 15,
        marginHorizontal: 10,
    },
    mealLabelContainer: {
        position: 'absolute',
        top: -10,
        left: 10,
        zIndex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 5,
    },
    mealLabelText: {
        color: '#555',
        fontWeight: '400',
        fontSize: 11,
    },
});
