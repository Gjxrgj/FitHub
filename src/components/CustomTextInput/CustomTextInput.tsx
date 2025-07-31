import React from 'react';
import {TextInput as PaperTextInput, TextInputProps as PaperTextInputProps, useTheme} from 'react-native-paper';
import { styles } from './styles.ts';

interface CustomTextInputProps extends PaperTextInputProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    rightText?: string;
}

export const CustomTextInput: React.FC<CustomTextInputProps> = ({ label, value, onChangeText, rightText, ...props }) => {
    const colors = useTheme().colors;
    return (
        <PaperTextInput
            label={label}
            mode="outlined"
            outlineColor= {colors.primary}
            activeOutlineColor={colors.primary}
            value={value}
            onChangeText={onChangeText}
            style={styles.textField}
            right={rightText ? <PaperTextInput.Affix text={rightText} /> : undefined}
            {...props}
        />
    );
};
