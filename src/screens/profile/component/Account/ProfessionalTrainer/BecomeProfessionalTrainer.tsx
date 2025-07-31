import React from "react";
import {View} from "react-native";
import {useForm} from "@tanstack/react-form";
import {CustomTextInput} from "../../../../../components/CustomTextInput/CustomTextInput";
import {ErrorDisplayComponent} from "../../../../../components/ErrorDisplay/ErrorDisplayComponent";
import {useAuth} from "../../../../../context/AuthProvider";
import {Button, Text} from 'react-native-paper';
import {CustomView} from "../../../../../components/CustomView/CustomView";
import {RootStackParamList, UpsertProfessionalTrainerDto} from "../../../../../dto/types";
import {becomeProfessionalTrainer, linkProfessionalTrainerToUser} from "../../../../../services";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";

type BecomeProfessionalTrainerNavigation = StackNavigationProp<RootStackParamList, 'BecomeProfessionalTrainer'>;
type BecomeProfessionalTrainerRootProp = RouteProp<RootStackParamList, 'BecomeProfessionalTrainer'>;

export const BecomeProfessionalTrainer = () => {
    const {user, setUser} = useAuth();
    const navigation = useNavigation<BecomeProfessionalTrainerNavigation>();
    const route = useRoute<BecomeProfessionalTrainerRootProp>();
    const {params} = route || {};
    const professionalTrainer = params?.professionalTrainer;

    const form = useForm({
        defaultValues: {
            username: professionalTrainer ? professionalTrainer.username : user?.username || '',
            phoneNumber: professionalTrainer ? professionalTrainer.phoneNumber : '',
            email: professionalTrainer ? professionalTrainer.email : user?.email || '',
        },
        onSubmit: ({value}): void => {
            if (user?.id) {
                const upsertProfessionalTrainerDto: UpsertProfessionalTrainerDto = {
                    userId: user.id,
                    username: value.username,
                    email: value.email,
                    phoneNumber: value.phoneNumber,
                }
                becomeProfessionalTrainer(upsertProfessionalTrainerDto)
                    .then((professionalTrainerDto) => {
                        linkProfessionalTrainerToUser(user.id, professionalTrainerDto.id)
                            .then((usr) => {
                                setUser(usr);
                                navigation.navigate("Profile", { userId: usr?.id })
                            });
                    });
            }
        },
    });

    return (<CustomView>
        <Text style={{fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 70}}>
            {professionalTrainer ? "Edit Professional Trainer Info" : "Become a Professional Trainer"}
        </Text>
        <form.Field
            name={'username'}
            validators={{
                onChange: ({value}: { string }) => {
                    if (value.length <= 3) {
                        return 'Name must be longer than 3 letters.';
                    }
                },
            }}
        >
            {(field) => (
                <View>
                    <CustomTextInput
                        label={'Username'}
                        onChangeText={(text) => field.handleChange(text)}
                        value={field.state.value}/>
                    {field.state.meta.errors.length > 0 && (
                        <ErrorDisplayComponent errorMessages={field.state.meta.errors}/>
                    )}
                </View>
            )}
        </form.Field>
        <form.Field
            name={'email'}
            validators={{
                onChange: ({value}: { string }) => {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (value.length === 0) {
                        return "Email can't be blank.";
                    }
                    if (!emailRegex.test(value)) {
                        return 'Email must be valid.';
                    }
                },
            }}

        >
            {(field) => (
                <View>
                    <CustomTextInput
                        label={'Contact email'}
                        onChangeText={(text) => field.handleChange(text)}
                        value={field.state.value}/>
                    {field.state.meta.errors.length > 0 && (
                        <ErrorDisplayComponent errorMessages={field.state.meta.errors}/>
                    )}
                </View>
            )}
        </form.Field>
        <form.Field
            name={'phoneNumber'}
            validators={{
                onChange: ({value}: { string }) => {
                    const regex = /^\+?[1-9]\d{1,14}$/;
                    if (!regex.test(value)) {
                        return 'Phone number cannot start with 0. Use an international format like +123456789.';
                    }
                },
            }}>
            {(field) => (
                <View>
                    <CustomTextInput
                        label={'Contact number'}
                        onChangeText={(text) => field.handleChange(text)}
                        value={field.state.value}/>
                    {field.state.meta.errors.length > 0 && (
                        <ErrorDisplayComponent errorMessages={field.state.meta.errors}/>
                    )}
                </View>
            )}
        </form.Field>
        <Button style={{
            margin: 10,
            borderRadius: 2
        }} mode={'contained'} onPress={form.handleSubmit}>
            {professionalTrainer ? "Edit" : "Enroll"}
        </Button>
    </CustomView>);
}
