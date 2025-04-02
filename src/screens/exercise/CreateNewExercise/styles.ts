import {StyleSheet} from 'react-native';
import {theme} from "../../../theme/theme";

export const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: theme.colors.red,
    },
    inputContainer: {
        marginHorizontal: 10,
    },
    title: {
        marginTop: 40,
        marginBottom: 50,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: 10
    },
    tag: {
        flexDirection: 'row',
        backgroundColor: theme.colors.secondary,
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginRight: 5,
        alignItems: 'center',
    },
    tagText: {
        marginRight: 5,
    },
    removeTag: {
        color: 'red',
        fontWeight: 'bold',
    },
    goalButton: {
        borderColor: theme.colors.primary,
        borderWidth: 1,
        borderRadius: 1,
        backgroundColor: theme.colors.background,
        marginTop: 20,
        marginBottom: 10,
        marginHorizontal: 10,
        textAlign: 'left',
        height: 45
    },
    leftAlignedButtonContent: {
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingTop:2,
        marginLeft: -7
    },
    buttonLabel: {
        color: '#555',
        fontSize: 16,
        fontFamily: 'System',
    },
});
