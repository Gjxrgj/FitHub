import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    torchButton: {
        position: 'absolute',
        bottom: 5,
        right: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flipCameraButton: {
        position: 'absolute',
        bottom: 5,
        left: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    topBox: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '30%',
        backgroundColor: 'rgba(0,0,0,0.65)',
    },
    middleRow: {
        position: 'absolute',
        top: '30%',
        left: 0,
        right: 0,
        height: '30%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sideBox: {
        width: '20%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.65)',
    },
    middleBox: {
        width: '60%',
        height: '100%',
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderRadius: 2,
        borderColor: 'white',
    },
    bottomBox: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '40%',
        backgroundColor: 'rgba(0,0,0,0.65)',
    },
    button: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    text: {
        color: 'black',
    },
    message: {
        fontSize: 16,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent background to darken screen
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
        elevation: 5, // Adds shadow for iOS
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    modalMessage: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
});
