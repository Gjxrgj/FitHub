import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    screenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 0,
        marginTop: 40,
        textAlign: 'center',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 20,
        marginTop: 40,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    card: {
        margin: 10,
        padding: 10,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap", // Allows text to wrap instead of cutting off
    },
    title: {
        flex: 1, // Allows gym name to take available space
        fontSize: 18,
    },
    date: {
        fontSize: 14,
        marginLeft: 10, // Adds spacing between name and date
        flexShrink: 1, // Prevents date from pushing the title
    },
});
