import {Text, useTheme} from 'react-native-paper';
import {FC} from 'react';
import {ValidationError} from '@tanstack/react-form';


interface ErrorDisplayComponentProps {
    errorMessages: ValidationError[];
}

export const ErrorDisplayComponent: FC<ErrorDisplayComponentProps> = ({ errorMessages}) => {
    const theme = useTheme();
    return (
        <Text style={{ marginHorizontal: 10, color: theme.colors.error, display: errorMessages.length === 0 ? 'none' : 'flex'}}>
            {errorMessages}
        </Text>
    );
};
