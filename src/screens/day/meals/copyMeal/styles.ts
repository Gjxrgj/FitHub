import {StyleSheet} from "react-native";
import {theme} from "../../../../theme/theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    snackbar: {
        backgroundColor: theme.colors.tertiary,
        width: '75%',
        marginHorizontal: 'auto',
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 2,
        borderWidth: 1,
        borderColor: theme.colors.primary,
        padding: 15,
        marginVertical: 8,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    foodName: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 10,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    quantityContainer: {
        flex: 1,
        marginRight: 10,
    },
    nutrientContainer: {
        flex: 2,
        justifyContent: "center",
        alignItems: "flex-start",
    },
    nutrient: {
        fontSize: 14,
        fontWeight: "500",
        marginVertical: 2,
        marginRight: 30,
        color: "#555",
    },
    mealTypeContainer: {
        marginTop: 15,
        marginBottom: 15,
    },
    mealLabelContainer: {
        position: 'absolute',
        top: -10,
        left: 10,
        zIndex: 1,
        backgroundColor: "#f6f6f6",
        paddingHorizontal: 5,
    },
    mealLabelText: {
        color: '#555',
        fontWeight: '400',
        fontSize: 11,
    },
});

