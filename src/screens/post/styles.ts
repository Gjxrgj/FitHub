import {StyleSheet} from 'react-native';
import {theme} from '../../theme/theme.ts';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 50,
        marginTop: 50,
        textAlign: 'center',
    },
    button: {
        marginVertical: 20,
        borderRadius: 2,
    },
    imageContainer: {
        marginTop: 10,
        alignSelf: 'center',
    },
    cardContainer: {
        marginVertical: 10,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    card: {
        backgroundColor: theme.colors.primaryLight,
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.3,
        shadowRadius: 2,
        width: 170,
    },
    cardIcon: {
        width: 50,
        height: 50,
        marginBottom: 10,
    },
    cardText: {
        fontSize: 16,
        color: '#555',
    },
    imagePlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 10,
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginHorizontal: 'auto',
    },
    imageSelected: {
        borderColor: '#4caf50',
        borderWidth: 2,
    },
    placeholderText: {
        fontSize: 14,
        color: '#999',
    },
    image: {
        width: '100%',
        height: 600,
        borderRadius: 10,
    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20,
    },
    pickAnImage: {
        height: 60,
        width: 200,
        marginHorizontal: 'auto',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: theme.colors.primary,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    pressable: {
        marginHorizontal: 10,
    },
    pickAnImageText: {
        margin: 'auto',
        color: theme.colors.primary,
    },
    scrollView: {
        marginHorizontal: 10,
    },
    linkedContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        padding: 8,
        borderRadius: 8,
        marginTop: 6,
        width: '100%',
        justifyContent: 'space-between',
        paddingLeft: 20
    },

    linkedText: {
        fontSize: 14,
        color: '#444',
        marginLeft: 6,
        flex: 1,
    },

    boldText: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    snackbar: {
        backgroundColor: theme.colors.tertiary,
        width: '75%',
        marginHorizontal: 'auto',
    },
});
