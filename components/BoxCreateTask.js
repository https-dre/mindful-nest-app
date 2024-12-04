import React, { useEffect, useState, useRef } from "react";
import {
    TouchableOpacity,
    Text,
    View,
    StyleSheet,
    Animated,
    TextInput,
    ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { projects } from "../exampledata";
import DateTimePicker from '@react-native-community/datetimepicker';
import { HorizontalSelector } from "./HorizontalSelector";

export const BoxCreateTask = ({
    extVisible,
    onClose,
    style,
    taskHold,
}) => {
    const [visible, setVisible] = useState(extVisible);
    const [heightFull, setHeightFull] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [openTime, setOpenTime] = useState(false);
    const [name, setName] = useState("");
    const [status, setStatus] = useState(0);

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
        setName("");
        setSelectedProject(null);
        setDate(new Date());
        setTime(new Date());
        setStatus(0);
    };

    const taskSave = () => {
        if (!selectedProject || selectedProject === "default") {
            console.error("Selecione um projeto.");
            return;
        }
        if (status === "default") {
            console.error("Selecione um status.");
            return;
        }

        const taskData = {
            task: {
                name,
                date: new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate(),
                    time.getHours(),
                    time.getMinutes()
                ).toISOString(),
                status: parseInt(status, 10),
            },
            project: { name: selectedProject },
        };

        taskHold(taskData);
        resetFields();
        fadeOut();
    };

    const projectItems = projects.map(p => ({ label: p.name, value: p.name }));
    const statusItems = [
        { label: 'Aberto', value: '0' },
        { label: 'Em andamento', value: '1' },
        { label: 'Concluído', value: '2' },
        { label: 'Arquivado', value: '3' },
    ];

    return (
        <Animated.View
            style={[
                styles.mainView,
                { opacity: fadeAnim, height: visible ? "100%" : 0 },
                style,
            ]}
        >
            <View style={styles.headerView}>
                <TouchableOpacity onPress={() => fadeOut()}>
                    <Icon name="close" size={20} color="red" />
                </TouchableOpacity>
            </View>
            <View style={styles.contentView}>
                
                <View style={[styles.pickerWraper, styles.border]}>
                    <Text style={styles.label}>PROJETO</Text>
                    <HorizontalSelector
                        items={projectItems}
                        selectedValue={selectedProject}
                        onValueChange={setSelectedProject}
                    />
                </View>
                <View style={[styles.pickerWraper, styles.border]}>
                    <Text style={styles.label}>STATUS</Text>
                    <HorizontalSelector
                        items={statusItems}
                        selectedValue={status}
                        onValueChange={setStatus}
                    />
                </View>
                <TextInput
                    style={[styles.textInput]}
                    placeholder="Nome da Task*"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={[styles.textInput]}
                    placeholder="Descrição"
                />
                <TouchableOpacity
                    style={[styles.textInput, {flexDirection: "row", alignItems: "center", justifyContent: "space-between"}]}
                    onPress={() => setOpen(true)}
                >
                    {!open && <Text>
                        {date.toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                        })}
                    </Text>}
                    {open && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                        onChange={(_, selectedDate) =>
                            selectedDate && setDate(selectedDate)
                        }
                    />
                )}
                    <Icon name="calendar-outline" size={20} color={"black"} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.footerView}
                    onPress={() => taskSave()}
                >
                    <Text style={{color: "white", fontWeight: "bold"}}>Criar</Text>
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
        borderColor: "#8991A1",
        padding: 15,
        marginBottom: 10
    },
    mainView: {
        alignSelf: "center",
        position: 'absolute',
        width: '100%',
        borderRadius: 10,
        zIndex: 3,
        backgroundColor: 'white',
    },
    headerView: {
        width: '90%',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginTop: 5,
    },
    contentView: {
        paddingHorizontal: 15,
        width: '100%',
        alignItems: 'center',
        marginTop: 5,
        justifyContent: "center",
        height: "90%"
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
        overflow: "hidden",
    },
    projectsPicker: {
        flex: 1,
        width: '100%',
        alignSelf: "center"
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
    }
});
