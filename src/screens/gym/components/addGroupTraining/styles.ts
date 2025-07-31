import {StyleSheet} from 'react-native';
import {theme} from "../../../../theme/theme";

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
    modalButtons: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    modalButton: {
        marginHorizontal: 10,
        marginTop: 20,
        borderRadius: 2
    },
    input: {
        height: 50, 
        marginHorizontal: 10,
        marginBottom: -1,
    },
    loadingText: {
        textAlign: 'center',
        color: 'gray',
    },
    autoComplete: {
        borderWidth: 1,
        borderColor: theme.colors.primary,
        marginHorizontal: 10,
    },
    item: {
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },

});
