import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    modalInput: {
        marginBottom: 10,
        marginHorizontal: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        elevation: 5,
        marginVertical: 20,
    },
    modalTitle: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 30,
        color: '#555',
    },
    closeButtonReviews: {
        position: 'absolute',
        top: 0,
        right: 0,
        borderRadius: 15,
        width: 60,
        height: 60,
    },
});
