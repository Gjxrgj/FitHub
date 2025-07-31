import {StyleSheet} from 'react-native';
import {theme} from "../../theme/theme";

export const styles = StyleSheet.create({

    post: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    postImage: {
        width: '100%',
        height: 600,
        borderRadius: 8,
    },
    postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    postDescription: {
        fontSize: 14,
        color: '#666',
    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    card: {
        backgroundColor: theme.colors.primaryLight,
        borderRadius: 10,
        padding: 10,
        justifyContent: "flex-start",
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.3,
        shadowRadius: 2,
        width: 160,
        flexDirection:"row"
    },
    cardText: {
        fontSize: 16,
        color: '#555',
        marginLeft: 10
    },
    cardContainer: {
        marginTop: 10,
        alignItems: 'center',
    },
    postAvatar: {
        width: 30,
        height: 30,
        borderRadius: 50,
        resizeMode: 'cover',
    },
    shadowContainer: {
        borderRadius: 50,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 1,
        shadowRadius: 15,
        elevation: 10,
    },
    defaultIconContainer: {
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


