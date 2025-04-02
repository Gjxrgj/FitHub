import {StyleSheet} from 'react-native';
import {theme} from '../../theme/theme.ts';

export const styles = StyleSheet.create({
    bioContainer: {
        marginVertical: 20,
    },
    professionalTrainerContainer: {
        marginBottom: 20,
    },
    bioCard: {
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // Android shadow
    },
    bioText: {
        fontSize: 16,
        lineHeight: 22,
        color: '#333', // Darker text for better readability
        marginTop: 10,
    },
    line: {
        height: 1,
        backgroundColor: '#ddd',
        marginVertical: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#444',
    },
    statsNumber: {
        fontSize: 24,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
    },
    statsLabel: {
        textAlign: 'center',
        color: 'white',
        width: '100%',
        fontSize: 12,
    },
    statsContainer: {
        backgroundColor: theme.colors.primary,
        borderRadius: 15,
        width: 110,
        height: 80,
        padding: 20,
        elevation: 10,
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 40,
        marginTop: 30,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        resizeMode: 'cover',
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
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#555'
    },
    username: {
        fontSize: 18,
        color: '#888',
    },
    bio: {
        fontSize: 16,
        color: '#555',
        paddingLeft: 15,
    },
    defaultIconContainer: {
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navigationContainer: {
        backgroundColor: theme.colors.background,
        height: '100%',
    },
    drawerItem: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#555',
        marginLeft: 10,
    },
    disableAccount: {
        fontWeight: 'bold',
        fontSize: 18,
        color: theme.colors.error,
        marginLeft: 10,
    },
    drawerBox: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: '#555',
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
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
    postsContainer: {
        marginHorizontal: 10,
        marginBottom: 50,
    },
    editIconContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: theme.colors.primary,
        borderRadius: 20,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    about: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    pressable: {
        marginHorizontal: 10,
    },
    pickAnImageText: {
        margin: 'auto',
        color: theme.colors.primary,
    },
    pickAnImage: {
        height: 60,
        width: "100%",
        marginHorizontal: 'auto',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: theme.colors.primary,
        borderRadius: 10,
        backgroundColor: 'white',
    },
});
