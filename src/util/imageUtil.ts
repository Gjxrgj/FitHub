import * as ImagePicker from "expo-image-picker";
import {MediaType} from "expo-image-picker";
import * as FileSystem from "expo-file-system";

export const pickImage = async ():Promise<string> => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.status !== 'granted') {
        console.log('Permission to access camera roll is required!');
        return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"] as Array<MediaType>,
        quality: 0.5,
    });

    if (pickerResult.cancelled) {
        console.log('User cancelled image picker');
        return;
    }

    if (pickerResult.assets[0].uri) {
        try {
            const imageFile = await FileSystem.readAsStringAsync(pickerResult.assets[0].uri, {
                encoding: FileSystem.EncodingType.Base64,
            });

            return `data:image/jpeg;base64,${imageFile}`
        } catch (error) {
            console.log('Error reading image file:', error);
        }
    }
};
