import {StyleSheet} from 'react-native';
import {theme} from "../../../theme/theme.ts";

export const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    title: {
        marginTop: 40,
        marginBottom: 90,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    inputContainer: {
        marginHorizontal: 10,
    },
    label: {
        marginBottom: 5,
        fontSize: 16,
        color: '#555',
    },
    picker: {
        height: 55,
        backgroundColor: 'white',
        color: theme.colors.primary,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: theme.colors.primary,
    },
    pickerView: {
        borderRadius: 3,
        borderWidth: 1,
        borderColor: theme.colors.primary,
        padding: 2,
    },
    submitButton: {
        marginVertical: 20,
        marginHorizontal: 20,
        borderRadius: 2
    },
    ingredientsContainer: {
        marginVertical: 20,
        marginHorizontal: 20,
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2, // For Android shadow effect
    },
    ingredientsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333', // Dark text color
    },
    ingredientItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        backgroundColor: '#fff', // White background for each item
        borderColor: '#ddd',
        borderWidth: 1,
    },
    ingredientsAddContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    quantity:{
        color: theme.colors.primary,
        fontWeight: 'bold'
    }
});
