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
    review: {
        marginVertical: 10,
    },
    starsAndDateContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginBottom: 5,
        marginVertical: 10,
    },
    reviewRating: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
    },
    reviewDate: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#555',
    },
    reviewComment: {
        fontWeight: 'normal',
        fontSize: 14,
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
    starsContainer: {
        flexDirection: 'row',
    },
    setRatingStarsContainer: {
        flexDirection: 'row',
        margin: 'auto',
    },
    reviewInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    addReviewForm: {
        marginVertical: 10,
        padding: 15,
        borderRadius: 10,
        borderColor: theme.colors.primary,
        borderWidth: 0.5,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 15,
    },
    cancelButton: {
        marginLeft: 10,
    },
    reviewDivider: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginVertical: 10,
    },
    snackbar: {
        backgroundColor: theme.colors.tertiary,
        width: '75%',
        marginHorizontal: 'auto',
    },
    reviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    reviewUsername: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    noResultsText: {
        fontSize: 18,
        color: '#777',
        textAlign: 'center',
    },
});
