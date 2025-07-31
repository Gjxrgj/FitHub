import {View} from 'react-native';
import React, {ReactNode} from 'react';
import {styles} from "./styles.ts";

interface CustomViewProps {
    children?: ReactNode;
}

export const MainPageView: React.FC<CustomViewProps> = ({children}) => {
    return (
        <View style={[styles.container]}>
            {children}
        </View>
    );
};
