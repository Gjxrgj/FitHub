import {StyleSheet} from 'react-native';
import {useTheme} from "react-native-paper";


export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        height: 60, // Set the height of the navigation bar
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0, // Ensure it stretches to full width
        zIndex: 3
    },
    button: {
        alignItems: 'center',
        flex: 1,
    },
    label: {
        marginTop: 4,
        fontSize: 12,
        color: '#000',
        overflow: 'visible',
        width: '100%',
        textAlign: 'center',
    },

});
