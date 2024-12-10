import React, { useEffect, useState, useRef } from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    StyleSheet,
    Animated,
    TextInput,
    Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { HorizontalColorSelector } from './HorizontalColorSelector';

export const ModalCreateProject = ({
    extVisible,
    onClose,
    style,
    projectHold,
}) => {
    const [visible, setVisible] = useState(extVisible);
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    
    const colorOptions = [
        '#3D7DE5',
        '#59c9e2',
        '#cb38e8',
        '#4FAE5B',
        '#f38407',
        '#22272F'
    ];

    const [color, setColor] = useState(colorOptions[0]);

    const fadeAnim = useRef(new Animated.Value(0)).current;

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start(() => {
            setVisible(false);
            if (onClose) onClose();
        });
    };

    useEffect(() => {
        if (extVisible) {
            setVisible(true);
            fadeIn();
        } else {
            fadeOut();
        }
    }, [extVisible]);

    const resetFields = () => {
        setName('');
        setDate(new Date());
        setColor(colorOptions[0])
    };

    const saveProject = () => {
        const projectData = {
            name: name,
            date: date,
            backColor: color
        }
        projectHold(projectData);
        resetFields();
        fadeOut();
    };

    const onChangeDate = (event, selectedDate) => {
        if (event.type === 'set') {
            const currentDate = selectedDate || date;
            setDate(currentDate);
        }
        setOpen(false);
    };

    return (
        <Animated.View
            style={[
                styles.mainView,
                { opacity: fadeAnim, height: visible ? '100%' : 0 },
                style,
            ]}
        >
            <View style={styles.headerView}>
                <TouchableOpacity onPress={() => fadeOut()} style={{marginLeft: 10, marginTop: 20}}>
                    <Icon name="close" size={25} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.contentView}>
                <Text
                    style={{
                        fontFamily: 'SpaceGroteskMedium',
                        fontSize: 20,
                        marginVertical: 10,
                    }}
                >
                    Criar Projeto!
                </Text>
                <TextInput
                    style={[styles.textInput]}
                    placeholder="Nome Do Projeto*"
                    value={name}
                    onChangeText={setName}
                />

                <TouchableOpacity
                    style={[
                        styles.textInput,
                        {
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        },
                    ]}
                    onPress={() => setOpen(true)}
                >
                    {!open && (
                        <Text>
                            {date.toLocaleDateString('pt-BR', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                            })}
                        </Text>
                    )}
                    {Platform.OS === 'ios' && open && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            onChange={onChangeDate}
                        />
                    )}
                    <Icon name="calendar-outline" size={20} color={'black'} />
                </TouchableOpacity>
                {Platform.OS === 'android' && open && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                        onChange={onChangeDate}
                    />
                )}

                <Text style={styles.label}>Selecione uma cor:</Text>

                <HorizontalColorSelector
                    colors={colorOptions}
                    selectedColor={color}
                    onColorSelect={setColor}
                />

                <TouchableOpacity
                    style={styles.footerView}
                    onPress={() => saveProject()}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                        Criar
                    </Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    textInput: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#8991A1',
        padding: 15,
        marginBottom: 10,
    },
    mainView: {
        alignSelf: 'center',
        position: 'absolute',
        width: '100%',
        borderRadius: 10,
        zIndex: 3,
        backgroundColor: 'white',
        overflow: 'hidden',
        marginVertical: '45%',
        maxHeight: 350,
        width: '90%',
        borderWidth: 1,
        borderColor: "gray"
    },
    headerView: {
        width: '90%',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
    },
    contentView: {
        paddingHorizontal: 15,
        width: '100%',
        alignItems: 'center',
    },
    footerView: {
        width: '100%',
        marginTop: 15,
        padding: 15,
        alignItems: 'center',
        backgroundColor: 'black',
        alignSelf: 'center',
        borderRadius: 100,
    },
    textTitle: {
        marginLeft: -80,
        fontColor: 'red',
    },
    pickerWraper: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
    },
    projectsPicker: {
        flex: 1,
        width: '100%',
        alignSelf: 'center',
    },
    pPickerItem: {
        fontSize: 16,
    },
    dateInput: {
        width: '80%',
        borderRadius: 8,
        padding: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContainer: {
        flexDirection: 'row',
        paddingVertical: 8,
    },
    button: {
        marginRight: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#e0e0e0',
        borderRadius: 16,
    },
    selectedButton: {
        backgroundColor: '#6200ee',
    },
    buttonText: {
        color: '#000',
        fontSize: 14,
    },
    selectedButtonText: {
        color: '#fff',
    },
    label: {
        fontSize: 16,
    },
});
