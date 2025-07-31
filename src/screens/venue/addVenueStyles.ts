import {StyleSheet} from 'react-native';
import {theme} from '../../theme/theme.ts';

export const styles = StyleSheet.create({
    avatarContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    avatarPlaceholder: {
        color: theme.colors.primary,
        textAlign: 'center',
        fontSize: 16,
        borderColor: theme.colors.primary,
        borderWidth: 1,
        padding: 10,
        borderRadius: 50,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tag: {
        flexDirection: 'row',
        backgroundColor: theme.colors.secondary,
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginRight: 5,
        marginBottom: 5,
        alignItems: 'center',
    },
    tagText: {
        marginRight: 5,
    },
    removeTag: {
        color: 'red',
        fontWeight: 'bold',
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
});
