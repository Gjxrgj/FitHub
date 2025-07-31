import React, {useCallback, useEffect, useState} from 'react';
import {Image, Pressable, ScrollView, TouchableOpacity, View} from 'react-native';
import {useForm} from '@tanstack/react-form';
import {MealTrackDto, RootStackParamList, UpsertPostDto, WorkoutDto} from '../../dto/types.ts';
import {useAuth} from '../../context/AuthProvider.tsx';
import {NavigationProp, RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {CustomTextInput} from '../../components/CustomTextInput/CustomTextInput.tsx';
import {Button, Snackbar, Text} from 'react-native-paper';
import {addPost, editPost, getMealById, getWorkoutById} from '../../services';
import {styles} from './styles.ts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../theme/theme.ts';
import {formatBase64Image} from '../../util/formatBase64Image.ts';
import {pickImage} from "../../util/imageUtil";
import moment from "moment";
import {capitalizeFirstLetter} from "../../util/stringUtil";

type AddEditPostScreenProps = RouteProp<RootStackParamList, 'AddEditPostScreen'>;
type AddEditPostNavigationProps = NavigationProp<RootStackParamList, 'AddEditPostScreen'>;

export const AddEditPostScreen = () => {
    const auth = useAuth();
    const route = useRoute<AddEditPostScreenProps>();
    const {postDto} = route.params;
    const updatedPostDto = route.params.upsertPostDto;
    const navigation = useNavigation<AddEditPostNavigationProps>();
    const [mealDto, setMealDto] = useState<MealTrackDto | undefined>(undefined);
    const [workoutDto, setWorkoutDto] = useState<WorkoutDto | undefined>(undefined);
    const [showSnackbar, setShowSnackbar] = useState(false);

    const form = useForm({
        defaultValues: {
            title: updatedPostDto?.title ?? postDto?.title ?? '',
            description: updatedPostDto?.description ?? postDto?.description ?? '',
            image: updatedPostDto?.image ?? postDto?.image ?? '',
            workoutId: updatedPostDto?.workoutId ?? postDto?.workoutId ?? undefined,
            mealId: updatedPostDto?.mealId ?? postDto?.mealId ?? undefined,
        },
        onSubmit: ({value}): void => {
            if (!auth.user?.id) {
                return;
            }

            const upsertPostDto: UpsertPostDto = {
                userId: auth.user?.id,
                title: value.title,
                description: value.description,
                image: value.image,
                workoutId: updatedPostDto?.workoutId ?? form.getFieldValue('workoutId'),
                mealId: updatedPostDto?.mealId ?? form.getFieldValue('mealId'),
            };

            if (postDto) {
                editPost(postDto.id, upsertPostDto)
                    .then(() => {
                        setShowSnackbar(true);
                    })
            } else {
                addPost(upsertPostDto)
                    .then(() => {
                        setShowSnackbar(true);
                    });
            }
        },
    });

    useEffect(() => {
        if (postDto?.mealId) {
            getMealById(postDto.mealId)
                .then((meal) => setMealDto(meal))
        }
        if (postDto?.workoutId) {
            getWorkoutById(postDto.workoutId)
                .then((workout) => setWorkoutDto(workout))
        }
    }, []);

    useEffect(() => {
        if (updatedPostDto?.mealId !== undefined) {
            getMealById(updatedPostDto?.mealId).then(meal => {
                setMealDto(meal);
            });
        }
    }, [updatedPostDto]);

    useEffect(() => {
        if (updatedPostDto?.workoutId !== undefined) {
            getWorkoutById(updatedPostDto?.workoutId).then(workout => {
                setWorkoutDto(workout);
            });
        }
    }, [updatedPostDto]);


    const navigateToDayMealScreen = useCallback(() => {
        if (!auth.user?.id) {
            return;
        }
        const upsertPostDto: UpsertPostDto = {
            userId: auth.user?.id,
            title: form.getFieldValue('title'),
            description: form.getFieldValue('description'),
            image: form.getFieldValue('image'),
            workoutId: updatedPostDto?.workoutId ?? form.getFieldValue('workoutId'),
            mealId: updatedPostDto?.mealId ?? form.getFieldValue('mealId'),
        };

        navigation.navigate('DayMealsScreen', {upsertPostDto: upsertPostDto});
    }, [auth.user?.id, form, navigation, updatedPostDto?.mealId, updatedPostDto?.workoutId]);

    const navigateToDayWorkoutsScreen = useCallback(() => {
        if (!auth.user?.id) {
            return;
        }
        const upsertPostDto: UpsertPostDto = {
            userId: auth.user?.id,
            title: form.getFieldValue('title'),
            description: form.getFieldValue('description'),
            image: form.getFieldValue('image'),
            workoutId: updatedPostDto?.workoutId ?? form.getFieldValue('workoutId'),
            mealId: updatedPostDto?.mealId ?? form.getFieldValue('mealId'),
        };

        navigation.navigate('DayWorkoutsScreen', {upsertPostDto: upsertPostDto});
    }, [auth.user?.id, form, navigation, updatedPostDto?.mealId, updatedPostDto?.workoutId]);

    const handleImagePicker = () => {
        pickImage()
            .then((data) => {
                form.setFieldValue('image', data);
            })
    };

    return (
        <ScrollView style={styles.scrollView}>
            {postDto ? <Text style={styles.titleText}>Edit Post</Text> :
                <Text style={styles.titleText}>Add New Post</Text>}

            <form.Field name={'image'}>
                {(field) => (
                    <Pressable style={styles.pressable} onPress={handleImagePicker}>
                        {field.state.value !== '' ? (
                                <Image
                                    source={{uri: formatBase64Image(field.state.value)}}
                                    style={styles.image}
                                />
                            ) :
                            <View style={styles.pickAnImage}>
                                <Text style={styles.pickAnImageText}>
                                    Pick an image
                                </Text>
                            </View>
                        }
                    </Pressable>
                )}
            </form.Field>

            <form.Field name={'title'}>
                {(field) => (
                    <CustomTextInput
                        label="Title"
                        value={field.state.value}
                        onChangeText={(text) => field.handleChange(text)}
                    />
                )}
            </form.Field>

            <form.Field name={'description'}>
                {(field) => (
                    <CustomTextInput
                        label="Description"
                        multiline
                        numberOfLines={4}
                        value={field.state.value}
                        onChangeText={(text) => field.handleChange(text)}
                    />
                )}
            </form.Field>

            <View style={styles.cardRow}>
                <View style={styles.cardContainer}>
                    <View style={styles.card} onTouchEnd={navigateToDayMealScreen}>
                        <Icon name="food" size={30} color={theme.colors.primary}/>
                        <Text style={styles.cardText}>Choose a meal</Text>
                    </View>
                </View>

                <View style={styles.cardContainer}>
                    <View style={styles.card} onTouchEnd={navigateToDayWorkoutsScreen}>
                        <Icon name="dumbbell" size={30} color={theme.colors.primary}/>
                        <Text style={styles.cardText}>Choose a workout</Text>
                    </View>

                </View>
            </View>
            {mealDto && (
                <View style={styles.linkedContainer}>
                    <Icon name="silverware-fork-knife" size={18} color={theme.colors.primary}/>
                    <Text style={styles.linkedText}>
                        Linked <Text style={styles.boldText}>{capitalizeFirstLetter(mealDto?.mealType)}</Text>
                        {" "}from <Text
                        style={styles.boldText}>{moment(mealDto?.dayDate, "YYYYMMDD").format("DD.MM.YYYY")}</Text>
                    </Text>
                    <TouchableOpacity onPress={() => {
                        setMealDto(undefined);
                        form.setFieldValue("mealId", undefined);
                    }} style={styles.removeButton}>
                        <Icon name="close" size={20} color="#888"/>
                    </TouchableOpacity>
                </View>
            )}

            {workoutDto && (
                <View style={styles.linkedContainer}>
                    <Icon name="dumbbell" size={18} color={theme.colors.primary}/>
                    <Text style={styles.linkedText}>
                        Linked <Text style={styles.boldText}>{capitalizeFirstLetter(workoutDto?.name)}</Text>
                        {" "}from <Text
                        style={styles.boldText}>{moment(workoutDto?.dayDate, "YYYYMMDD").format("DD.MM.YYYY")}</Text>
                    </Text>
                    <TouchableOpacity onPress={() => {
                        setWorkoutDto(null);
                        form.setFieldValue("workoutId", undefined);
                    }} style={styles.removeButton}>
                        <Icon name="close" size={20} color="#888"/>
                    </TouchableOpacity>
                </View>
            )}
            <Button mode={'contained'} style={styles.button} onPress={form.handleSubmit}>
                {postDto ? "Edit post" : "Submit Post"}
            </Button>
            <Snackbar
                visible={showSnackbar}
                onDismiss={() => {
                    setShowSnackbar(false);
                    navigation.navigate('Profile', {userId: auth.user?.id});
                }}
                duration={2000}
                style={styles.snackbar}
            >
                {postDto ? 'Post has been successfully edited.' : 'Post has been successfully added.'}
            </Snackbar>
        </ScrollView>
    );
};
