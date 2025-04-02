import {StyleSheet} from 'react-native';
import {theme} from "../../theme/theme.ts";

export const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 100,
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        color: theme.colors.primary,
        marginBottom: 30,
    },
    progressBar: {
        width: '100%',
        height: 8,
        borderRadius: 4,
    },
});
