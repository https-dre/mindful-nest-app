import React, { useEffect, useState, useRef } from "react";
import { TouchableOpacity, Text, View, StyleSheet, Animated, TextInput } from "react-native";
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { projects } from "../exampledata";
import DateTimePicker from '@react-native-community/datetimepicker';


export const BoxCreateTask = ({
    extVisible,
    onClose,
    style,
    taskHold
}) => {
    const [visible, setVisible] = useState(extVisible)
    const [heightFull, setHeightFull] = useState(false)
    const [projectsAll, setProjectsAll] = useState(null)
    const [selectedProject, setSelectedProject] = useState(null)
    const [date, setDate] = useState(new Date())
    const [time, setTime] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [openTime, setOpenTime] = useState(false)
    const [name, setName] = useState(null)
    const [status, setStatus] = useState(0)
    // const [hook, setHook] = useState(true)

    const fadeAnim = useRef(new Animated.Value(0)).current;

    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
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
            setVisible(false)
            if (onClose) onClose() // A função onClose é necessária
        }); // Oculta após a animação de fade-out
    };

    const [height, setHeight] = useState(0)

    const handleLayout = (event) => {
        const {height} = event.nativeEvent.layout

        setHeight(height);
    }

    useEffect(() => {
        if (extVisible) {
            setVisible(true);
            setHeightFull(true) // Torna o componente visível
            fadeIn(); // Executa fade-in
            let projectsArray = []
            
            projects.map(p => {
                projectsArray.push(
                    <Picker.Item label={p.name} value={p.name} key={p.key} style={styles.pPickerItem}/>
                )
            })

            setProjectsAll(projectsArray)
        } else {
            setHeightFull(false)
            fadeOut(); // Executa fade-out e oculta
        }
    }, [extVisible]);

    // useEffect(() => {
    //     if (!withButton && visible) {
    //         setTimeout(() => setVisible(false), time * 1000);
    //     }
    // }, [visible, withButton]);

    const onChangeDate = (event, selectedDate) => {
        if (event.type === "set") { // Verifica se foi confirmado
          const currentDate = selectedDate || date;
          setDate(currentDate);
        }
        setOpen(false); // Fecha o seletor em qualquer caso
    };

    const onChangeTime = (event, selectedTime) => {
        if (event.type === "set") { // Verifica se foi confirmado
          const currentTime = selectedTime || time;
          setTime(currentTime);
        }
        setOpenTime(false); // Fecha o seletor em qualquer caso
    };

    const taskSave = () => {
        if (!selectedProject) {
            console.error("Projeto não selecionado");
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
                status: status,
            },
            project: {
                name: selectedProject
            },
        };
    
        taskHold(data);
    };
    
      

    return (
        <Animated.View style={[{marginTop: (height/2)*(-1), opacity: fadeAnim, height: heightFull? "auto":0}, styles.mainView, styles.style]}>
            <View style={[styles.headerView]}>
                <TouchableOpacity
                    onPress={()=>{
                        setVisible(false)
                        fadeOut()
                    }}
                >
                    <Icon size={20} name="x" color="red"/>
                </TouchableOpacity>
                <Text style={styles.textTitle}>Adicionar task</Text>
            </View>
            <View style={[styles.contentView]}>
                <Text style={{fontSize: 18, color: "blue"}}>Nome</Text>
                <TextInput 
                    style={{backgroundColor: "white", width: "80%", height: 40, borderRadius: 10, alignItems: "center", fontSize: 16}}
                    onChangeText={(text)=>{setName(text)}}
                />
                <Text style={{fontSize: 18, color: "blue"}}>Projeto</Text>
                <View style={styles.pickerWraper}>
                    <Picker
                        selectedValue={selectedProject}
                        style={styles.projectsPicker}
                        onValueChange={(itemValue) => setSelectedProject(itemValue)}
                    >
                        {projectsAll}
                    </Picker>
                </View>
                <Text style={{fontSize: 18, color: "blue"}}>Status</Text>
                <View style={styles.pickerWraper}>
                    <Picker
                        selectedValue={selectedProject}
                        style={styles.projectsPicker}
                        onValueChange={(itemValue) => setStatus(itemValue)}
                    >
                        <Picker.Item label="Aberto" value={0} style={styles.pPickerItem}/>
                        <Picker.Item label="Em andamento" value={1} style={styles.pPickerItem}/>
                        <Picker.Item label="Concluído" value={2} style={styles.pPickerItem}/>
                        <Picker.Item label="Arquivada" value={3} style={styles.pPickerItem}/>
                    </Picker>
                </View>
                <Text style={{fontSize: 18, color: "blue"}}>Data</Text>
                <TouchableOpacity onPress={()=>{setOpen(true)}} style={styles.dateInput}>
                    <Text style={{fontSize: 18}}>{date.toLocaleDateString(
                        "pt-BR",
                        {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric"
                        }
                    )}</Text>
                </TouchableOpacity>
                {
                    open && <DateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                        onChange={onChangeDate}
                    />
                }
                <Text style={{fontSize: 18, color: "blue"}}>Horário</Text>
                <TouchableOpacity onPress={()=>{setOpenTime(true)}} style={styles.dateInput}>
                    <Text style={{fontSize: 18}}>{date.toLocaleTimeString(
                        "pt-BR",
                        {
                            hour: "2-digit",
                            minute: "2-digit",
                            dayPeriod: "short",
                            hour12: true
                        }
                    )}</Text>
                </TouchableOpacity>
                {
                    openTime && <DateTimePicker
                        value={date}
                        mode="time"
                        display="default"
                        onChange={onChangeTime}
                    />
                }

            </View>
            <TouchableOpacity 
                style={[{display: "flex"}, styles.footerView]}
                onPress={()=>{
                    taskSave()
                    setVisible(false)
                    fadeOut()
                }}
            >
                <Text style={{fontWeight: "900", fontSize: 15}}>Adicionar Task</Text>
            </TouchableOpacity>
        </Animated.View>
    )
}


const styles = StyleSheet.create({
    mainView: {
        position: "absolute",
        top: "20%",
        left: "15%",
        width: "80%",
        borderRadius: 10,
        zIndex: 3,
        backgroundColor: "green"
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
    footerView : {
        width: "100%",
        marginTop: 15,
        borderTopColor: "black",
        borderTopWidth: 2,
        padding: 10,
        alignItems: "center"
    },
    textTitle: {
        marginLeft: -80, 
        fontColor: "red"
    },
    pickerWraper: {
        borderRadius: 20,
        height: 50,
        width: "80%",
        backgroundColor: "white"
    },
    projectsPicker: {
        flex: 1
    },
    pPickerItem: {
        flex: 1

    },
    dateInput: {
        height: 40,
        backgroundColor: "white",
        width: "80%",
        alignItems: "center",
        textAlign: "center",
        borderRadius: 10
    }
})