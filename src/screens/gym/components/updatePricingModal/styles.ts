import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 20,
        position: 'relative',
        paddingVertical: 40
    },
    closeIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 999,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    modalInput: {
        marginBottom: 10,
        marginHorizontal: 10,
    },
    modalButton: {
        marginTop: 20,
        marginHorizontal: 10,
        borderRadius: 2,
    },
});
