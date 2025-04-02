import React, {FC, useEffect, useState} from "react";
import {TypeOfOptions} from "./CreateNewExercise";
import {Modal, RadioButton, Text} from "react-native-paper";
import {styles} from "../../signUp/styles";
import {View} from "react-native";
import {ExerciseCategory, ExerciseLevel, Force, Mechanic} from "../../../enums/enums";
import {theme} from "../../../theme/theme";
import {formatEnumLabel} from "../../../util/stringUtil";

interface RadioSelectModalProps {
    typeOfOptions: TypeOfOptions,
    visible: boolean
    onClose: (selectedValue?: Force | ExerciseLevel | ExerciseCategory | Mechanic) => void,
}

export const RadioSelectModal: FC<RadioSelectModalProps> = ({
                                                                typeOfOptions,
                                                                visible,
                                                                onClose,
                                                            }) => {
    const [options, setOptions] = useState<Array<Force | ExerciseLevel | ExerciseCategory | Mechanic>>([]);
    const [selectedValue, setSelectedValue] = useState<string>('');
    const [title, setTitle] = useState<string>('');

    useEffect(() => {
        if (typeOfOptions === TypeOfOptions.FORCE) {
            setOptions(Object.values(Force));
            setTitle("Select Force");
        } else if (typeOfOptions === TypeOfOptions.LEVEl) {
            setOptions(Object.values(ExerciseLevel));
            setTitle("Select Exercise Level");
        } else if (typeOfOptions === TypeOfOptions.CATEGORY) {
            setOptions(Object.values(ExerciseCategory));
            setTitle("Select Exercise Category");
        } else if (typeOfOptions === TypeOfOptions.MECHANIC) {
            setOptions(Object.values(Mechanic));
            setTitle("Select Mechanic");
        }
    }, [typeOfOptions]);
    return (
        <Modal visible={visible} onDismiss={() => onClose()} contentContainerStyle={styles.modalContainer}>
            <Text style={styles.modalTitle}>{title}</Text>
            <RadioButton.Group
                onValueChange={(value) => {
                    onClose(value);
                    setSelectedValue(value);
                }}
                value={selectedValue}
            >
                <View style={styles.radioGroupContainer}>
                    {options.map((option, index) => (
                        <RadioButton.Item
                            key={index}
                            label={formatEnumLabel(option)}
                            value={option}
                            color={theme.colors.primary}
                            style={styles.radioButton}
                        />
                    ))}
                </View>
            </RadioButton.Group>
        </Modal>
    );
}
