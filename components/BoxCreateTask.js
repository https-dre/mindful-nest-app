import React, { useEffect, useState, useRef } from "react";
import { TouchableOpacity, Text, View, StyleSheet, Animated, TextInput } from "react-native";
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { projects } from "../exampledata";
import DatePicker from "react-native-date-picker";


export const BoxCreateTask = ({
    extVisible,
    onClose,
    style
}) => {
    const [visible, setVisible] = useState(extVisible)
    const [heightFull, setHeightFull] = useState(false)
    const [projectsAll, setProjectsAll] = useState(null)
    const [selectedProject, setSelectedProject] = useState(null)
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
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
                <TextInput style={{backgroundColor: "white", width: "80%", height: 40, borderRadius: 20, alignItems: "center"}}/>
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
                        onValueChange={(itemValue) => setSelectedProject(itemValue)}
                    >
                        <Picker.Item label="Aberto" value={0} style={styles.pPickerItem}/>
                        <Picker.Item label="Em andamento" value={1} style={styles.pPickerItem}/>
                        <Picker.Item label="Aberto" value={2} style={styles.pPickerItem}/>
                        <Picker.Item label="Arquivada" value={3} style={styles.pPickerItem}/>
                    </Picker>
                </View>
                <TouchableOpacity onPress={()=>{setOpen(true)}}>
                    <Text>{date.toLocaleDateString()}</Text>
                </TouchableOpacity>
                <DatePicker
                    modal
                    open={open}
                    date={date}
                    onConfirm={(selectedDate)=>{
                        setOpen(false)
                        setDate(selectedDate)
                    }}
                    onCancel={()=>{
                        setOpen(false)
                    }}
                />
            </View>
            <TouchableOpacity 
                style={[{display: "flex"}, styles.footerView]}
                onPress={()=>{
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
        top: "50%",
        left: "10%",
        right: "10%",
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

    }
})