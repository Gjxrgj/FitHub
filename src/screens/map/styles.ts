import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    customMarker: {
        backgroundColor: 'red',
        padding: 5,
        borderRadius: 5,
    },
    markerText: {
        color: 'white',
    },
    buttonContainer: {
        position: 'absolute',
        top: 10,
        right: 60,
        flexDirection: 'row',
        width: '75%',
        height: 40,
        justifyContent: 'space-around',
        backgroundColor: 'rgba(255,255,255,0.76)',
        zIndex: 1,
        elevation: 1,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginBottom: 8,
    },
    cardTitle: {
        fontWeight: 'bold',
        marginBottom: 4,
    },
    markerCard: {
        width: 300,
        height: 300,
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 10,
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 2
    },
});
