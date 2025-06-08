import {StyleSheet} from 'react-native';
import {theme} from "../../theme/theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchContainer: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        marginBottom: 10
    },
    iconContainer: {
        position: 'absolute',
        zIndex: 999,
        left: 20,
    },
    IconXContainer: {
        position: 'absolute',
        zIndex: 999,
        left: '95%',
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
    profileHeader: {
        alignItems: 'center',
        marginBottom: 40,
        marginTop: 30,
    },
    shadowContainer: {
        borderRadius: 50,
    },
    defaultIconContainer: {
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        borderRadius: 5,
        backgroundColor: '#f9eeff',
        marginVertical: 4,
    },
    avatarContainer: {
        marginRight: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    textContainer: {
        flex: 1,
    },
    exerciseName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    exerciseText: {
        fontSize: 14,
        color: "#666",
    },
});
