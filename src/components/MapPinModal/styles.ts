import {StyleSheet} from 'react-native';
import {theme} from '../../theme/theme.ts';

export const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        color: theme.colors.primary,
    },
    cardDescription: {
        fontSize: 14,
        textAlign: 'center',
        color: '#555',
        flexWrap: 'wrap',
        paddingBottom: 10,
    },
    descriptionContainer: {
        width: '100%',
        maxHeight: 150,
        marginVertical: 10,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
    },
});
