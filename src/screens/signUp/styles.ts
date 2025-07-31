import {StyleSheet} from "react-native";
import {theme} from "../../theme/theme.ts";

export const styles = StyleSheet.create({
    input: {
        marginBottom: 10,
        paddingHorizontal: 8,
    },
    pickerContainer: {
        marginBottom: 20,
    },
    pickerLabel: {
        color: theme.colors.primary,
        marginBottom: 5,
    },
    pickerLabelScreen2: {
        color: theme.colors.primary,
        marginLeft: 10,
    },
    radioGroupContainer: {
        marginTop: 10,
    },
    radioButton: {
        padding: 10,
        borderRadius: 2,
        borderColor: theme.colors.primary,
        borderWidth: 1,
        backgroundColor: '#f9f9f9',
        marginBottom: 5,
    },
    radioButtonScreen2: {
        padding: 10,
        margin:10,
        borderRadius: 2,
        borderColor: theme.colors.primary,
        borderWidth: 1,
        backgroundColor: '#f9f9f9',
        marginBottom: 5,
    },
    button: {
        marginTop: 50,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
    },
    goalButton: {
        borderColor: theme.colors.primary,
        borderWidth: 1,
        borderRadius: 1,
        backgroundColor: 'white',
        marginTop: 5,
    },
    avatarContainer: {
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 40,
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 1000,
    },
    avatarPlaceholder: {
        color: theme.colors.primary,
        textAlign: 'center',
        fontSize: 16,
        borderColor: theme.colors.primary,
        borderWidth: 1,
        padding: 10,
        borderRadius: 50,
    },
});
