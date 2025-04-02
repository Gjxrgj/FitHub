import {StyleSheet} from 'react-native';
import {theme} from '../../../theme/theme.ts';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        marginVertical: 10
    },
    iconContainer: {
        position: 'absolute',
        zIndex: 999,
        left: 20,
    },
    IconXContainer: {
        position: 'absolute',
        zIndex: 999,
        left: '96%',
    },
    searchBar: {
        flex: 1,
        height: 40,
        borderColor: theme.colors.primary,
        fontWeight: '200',
        color: '#555',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingLeft: 35,
        backgroundColor: 'white',
    },
    qrButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 130,
        height: 80,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: theme.colors.primary,
        backgroundColor: 'white',
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: theme.colors.primary,
        marginHorizontal: 10,
        borderRadius: 5,
        padding: 10,
        marginBottom: '15%',
    },
    foodItemText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 4,
    },
    foodName: {
        fontSize: 16,
        color: '#333',
        marginBottom: 4,
        fontWeight: '700',
    },
    loadingText: {
        fontSize: 18,
        color: theme.colors.primary,
        textAlign: 'center',
        marginTop: 20,
    },
    noResultsText: {
        fontSize: 18,
        color: '#777',
        textAlign: 'center',
        marginTop: 200,
    },
    foodItemContainer: {
        marginVertical: 4,
        padding: 15,
        borderRadius: 5,
        backgroundColor: '#f9eeff',
    },
});
