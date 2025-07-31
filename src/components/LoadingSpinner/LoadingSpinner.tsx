import {CustomView} from '../CustomView/CustomView.tsx';
import React from 'react';
import {ActivityIndicator} from 'react-native';
import {theme} from '../../theme/theme.ts';

type SpinnerProps = {
    size?: 'small' | 'large';
    color?: string;
};
export const LoadingSpinner = ({size = 'large', color = theme.colors.primary}: SpinnerProps) => {
    return (
        <CustomView>
            <ActivityIndicator size={size} color={color}/>
        </CustomView>
    );
};
