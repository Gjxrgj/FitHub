import {StyleSheet} from 'react-native';
import {theme} from "../../../theme/theme";

export const styles = StyleSheet.create({
    mealSection: {
        borderColor: theme.colors.primary,
        borderBottomWidth: 1,
        backgroundColor: 'white',
        marginBottom: 10,
    },
    mealTitle: {
        fontSize: 20,
        fontWeight: 'normal',
        color: theme.colors.primary,
        marginBottom: 10,
        paddingTop: 10,
    },
    foodItem: {
        marginTop: 10,
        borderBottomWidth: 0.5,
        borderColor: theme.colors.primary,
        paddingBottom: 10,
    },
    foodItemText: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#555',
        width: '80%',
    },
    foodItemDetails: {
        fontSize: 14,
        fontWeight: '200',
        color: '#555',
        flexShrink: 1,
        flexGrow: 1,
        marginTop: 10,
    },
    headersBox: {
        borderBottomWidth: 1,
        borderColor: theme.colors.primary,
        color: theme.colors.primary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    foodItemDetailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 10,
    },
});
