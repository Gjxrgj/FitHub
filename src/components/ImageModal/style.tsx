import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalForImageContent: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullImage: {
        width: '100%',
        height: '80%',
        resizeMode: 'contain',
    },
    closeButtonImage: {
        position: 'absolute',
        top: 30,
        right: 20,
        zIndex: 999,
    },
    prevButton: {
        position: 'absolute',
        left: 20,
        top: '50%',
    },
    nextButton: {
        position: 'absolute',
        right: 20,
        top: '50%',
    },
    removeButton: {
        position: 'absolute',
        bottom: 30,
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
    },
    removeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
