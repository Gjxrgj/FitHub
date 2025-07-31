import React from 'react';
import {Text, View} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import {styles} from "./styles.ts";

export const SignUpHeader: React.FC<{ currentStep: number; totalSteps: number }> = ({currentStep, totalSteps}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up {currentStep}/{totalSteps}</Text>
            <ProgressBar
                progress={currentStep / totalSteps}
                color="#b273e5"
                style={styles.progressBar}/>
        </View>
    );
};
