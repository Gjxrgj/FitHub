import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { styles } from './style'; // Ensure this path is correct

interface CustomViewProps {
    children?: ReactNode;
}

export const CustomView: React.FC<CustomViewProps> = ({ children }) => {
    return (
        <View style={[styles.container]}>
            {children}
        </View>
    );
};
