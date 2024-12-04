import React, { useEffect, useState, useRef } from "react";
import { TouchableOpacity, Text, View, StyleSheet, Animated, TextInput } from "react-native";
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { projects } from "../exampledata";
import DateTimePicker from '@react-native-community/datetimepicker';

export const BoxCreateTask = ({
    extVisible,
    onClose,
    style,
    taskHold
}) => {
    const [visible, setVisible] = useState(extVisible);
    const [heightFull, setHeightFull] = useState(false);
    const [projectsAll, setProjectsAll] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [openTime, setOpenTime] = useState(false);
    const [name, setName] = useState(null);
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

    const [height, setHeight] = useState(0);

    const handleLayout = (event) => {
        const { height } = event.nativeEvent.layout;
        setHeight(height);
    };

    const resetFields = () => {
        setName(null);  // Limpa o TextInput
        setSelectedProject(null); // Reseta o Picker de Projeto
        setDate(new Date()); // Reseta a data
        setTime(new Date()); // Reseta o tempo
        setStatus(0); // Reseta o status
    };

    useEffect(() => {
        if (extVisible) {
            setVisible(true);
            setHeightFull(true);
            fadeIn();
            let projectsArray = [];

            projects.map(p => {
                projectsArray.push(
                    <Picker.Item label={p.name} value={p.name} key={p.key} style={styles.pPickerItem} />
                );
            });

            setProjectsAll(projectsArray);
        } else {
            setHeightFull(false);
            fadeOut();
        }
    }, [extVisible]);

    const onChangeDate = (event, selectedDate) => {
        if (event.type === "set") {
            const currentDate = selectedDate || date;
            setDate(currentDate);
        }
        setOpen(false);
    };

    const onChangeTime = (event, selectedTime) => {
        if (event.type === "set") {
            const currentTime = selectedTime || time;
            setTime(currentTime);
        }
        setOpenTime(false);
    };

    const taskSave = () => {
        if (selectedProject === "default" || !selectedProject) {
            console.error("Projeto não selecionado");
            return;
        }
        if (status === "default") {
            console.error("Status não selecionado");
            return;
        }
    
        const data = {
            task: {
                name: name,
                date: new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate(),
                    time.getHours(),
                    time.getMinutes()
                ).toISOString(),
                status: parseInt(status, 10), // Converte para número
            },
            project: {
                name: selectedProject,
            },
        };
    
        taskHold(data);
    };

    return (
        <Animated.View style={[{ marginTop: (height / 2) * (-1), opacity: fadeAnim, height: heightFull ? "auto" : 0 }, styles.mainView, styles.style]}>
            <View style={[styles.headerView]}>
                <TouchableOpacity
                    onPress={() => {
                        setVisible(false);
                        fadeOut();
                    }}
                >
                    <Icon size={20} name="x" color="red" />
                </TouchableOpacity>
            </View>
            <View style={[styles.contentView]}>
                <TextInput
                    style={[{ backgroundColor: "white", width: "80%", height: 40, borderRadius: 10, alignItems: "center", fontSize: 16 }, styles.border]}
                    onChangeText={(text) => { setName(text) }}
                    value={name} // Vincula o valor ao estado
                    placeholder="Nome da Task"
                />
                <View style={[styles.pickerWraper, styles.border]}>
                    <Picker
                        selectedValue={selectedProject} // Liga o valor ao estado
                        style={styles.projectsPicker}
                        onValueChange={(itemValue) => setSelectedProject(itemValue)}
                    >
                        <Picker.Item label="Projeto" value={"default"} style={styles.pPickerItem} />
                        {projectsAll}
                    </Picker>
                </View>
                <View style={[styles.pickerWraper, styles.border]}>
                <Picker
                    selectedValue={status} // The state for status, which is numeric
                    style={styles.projectsPicker}
                    onValueChange={(itemValue) => setStatus(itemValue)} // Updates the state with string values
                >
                    <Picker.Item label="Status" value={"default"} style={styles.pPickerItem} />
                    <Picker.Item label="Aberto" value="0" style={styles.pPickerItem} />
                    <Picker.Item label="Em andamento" value="1" style={styles.pPickerItem} />
                    <Picker.Item label="Concluído" value="2" style={styles.pPickerItem} />
                    <Picker.Item label="Arquivada" value="3" style={styles.pPickerItem} />
                </Picker>
                </View>
                <TouchableOpacity onPress={() => { setOpen(true) }} style={[styles.dateInput, styles.border]}>
                    <Text style={{ fontSize: 18 }}>{date.toLocaleDateString(
                        "pt-BR",
                        {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric"
                        }
                    )}</Text>
                </TouchableOpacity>
                {open && <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onChangeDate}
                />}
                <TouchableOpacity onPress={() => { setOpenTime(true) }} style={[styles.dateInput, styles.border]}>
                    <Text style={{ fontSize: 18 }}>{date.toLocaleTimeString(
                        "pt-BR",
                        {
                            hour: "2-digit",
                            minute: "2-digit",
                            dayPeriod: "short",
                            hour12: true
                        }
                    )}</Text>
                </TouchableOpacity>
                {openTime && <DateTimePicker
                    value={date}
                    mode="time"
                    display="default"
                    onChange={onChangeTime}
                />}
            </View>
            <TouchableOpacity
                style={[{ display: "flex" }, styles.footerView]}
                onPress={() => {
                    taskSave();
                    resetFields(); // Reseta os campos
                    setVisible(false);
                    fadeOut();
                }}
            >
                <Text style={{ fontWeight: "900", fontSize: 15, color: "white" }}>Adicionar Task</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    border: {
        borderWidth: 2,
        borderColor: "grey",
        marginBottom: 15
    },
    mainView: {
        position: "absolute",
        top: "20%",
        left: "15%",
        width: "80%",
        borderRadius: 10,
        zIndex: 3,
        backgroundColor: "white"
    },
    headerView: {
        width: "90%",
        justifyContent: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10,
        marginTop: 5
    },
    contentView: {
        paddingHorizontal: 15,
        width: "100%",
        alignItems: "center",
        marginTop: 5
    },
    footerView: {
        width: "80%",
        marginTop: 15,
        padding: 10,
        alignItems: "center",
        backgroundColor: "black",
        alignSelf: "center",
        borderRadius: 10
    },
    textTitle: {
        marginLeft: -80,
        fontColor: "red"
    },
    pickerWraper: {
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 10
    },
    projectsPicker: {
        flex: 1,
        width: "100%",
        height: "100%"
    },
    pPickerItem: {
        fontSize: 16
    },
    dateInput: {
        width: "80%",
        borderRadius: 8,
        padding: 10,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
    }
});
