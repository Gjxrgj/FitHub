import {StyleSheet} from 'react-native';
import {theme} from "../../../theme/theme.ts";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    label: {
        fontSize: 13,
        fontWeight: 'normal',
        marginLeft: 10,
        color: '#555',
    },
    rowContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 5,
    },
    titleContainer: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 60,
        paddingVertical: 10,
        borderRadius: 10,
    },
    item: {
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        color: '#555',
        fontWeight: 'normal',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: theme.colors.primary,
        textAlign: 'center',
        marginVertical: 40
    },
    loadingText: {
        textAlign: 'center',
        color: 'gray',
    },
    autoComplete: {
        borderWidth: 1,
        borderColor: theme.colors.primary,
    },
    formFieldContainer: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 3,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 20,
    },
    timeInputs: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    picker: {
        width: 100,
        height: 50,
    },
    input: {
        width: '63%',
        textAlign: 'center',
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row', // Align items horizontally
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    punctuationMark: {
        color: '#555',
        fontSize: 20,
        marginTop: 20,
    },

});
