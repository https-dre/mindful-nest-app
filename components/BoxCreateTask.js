import React, { useEffect, useState, useRef } from "react";
import { TouchableOpacity, Text, View, StyleSheet, Animated } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome6';


export const BoxCreateTask = ({
    extVisible,
    onClose
}) => {
    const [visible, setVisible] = useState(extVisible)
    const [heightFull, setHeightFull] = useState(false)
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
        <Animated.View style={[{marginTop: (height/2)*(-1), opacity: fadeAnim, height: heightFull? "auto":0}, styles.mainView]}>
            <View style={[styles.headerView]}>
                <TouchableOpacity
                    onPress={()=>{
                        setVisible(false)
                        fadeOut()
                    }}
                >
                    <Icon size={20} name="x" color="red"/>
                </TouchableOpacity>
                <Text style={{marginLeft: 2, fontColor: "red"}}>Teste</Text>
            </View>
            <View style={[styles.contentView]}>
                <Text style={{fontSize: 18, color: "blue"}}>Algum texto</Text>
            </View>
            <TouchableOpacity 
                style={[{display: "flex"}, styles.footerView]}
                onPress={()=>{
                    setVisible(false)
                    fadeOut()
                }}
            >
                <Text style={{fontWeight: "900", fontSize: 15}}>Continuar</Text>
            </TouchableOpacity>
        </Animated.View>
    )
}


const styles = StyleSheet.create({
    mainView: {
        position: "absolute",
        top: "50%",
        left: "10%",
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
    }
})