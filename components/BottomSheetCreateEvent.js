import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { Modalize } from "react-native-modalize";
import Icon from "react-native-vector-icons/Ionicons";

export const BottomSheetCreateEvent = ({ modalizeRef }) => {
    const localModalizeRef = useRef(null);
    const [currentData, setCurrentData] = useState({});

    const sendData = (data) => {
        console.log(data);
        setCurrentData(data);
        localModalizeRef.current?.open();
    }

    const close = () => {

    }

    React.useImperativeHandle(modalizeRef, () => ({
        sendData,
        close
    }))

    return (
        <Modalize
            ref={localModalizeRef}
            snapPoint={600}
            maxHeight={600}
            panGestureEnabled={true}
            closeOnOverlayTap={true}
            dragToss={0.6}
            modalStyle={{
                backgroundColor: "white", // Fundo do modal
                borderTopLeftRadius: 40, // Cantos arredondados
                borderTopRightRadius: 40,
            }}
            handleStyle={{
                backgroundColor: "#ccc", // Barra de puxar
                width: 80,
                height: 6,
                borderRadius: 3,
                margin: 25
            }}
        /* overlayStyle={{
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay escurecido
        }} */
        >
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Adicionar Novo Evento</Text>

                {/* Form */}
                <View>
                    <TextInput placeholder="Nome do Evento*" style={styles.modalInput} />
                    <TextInput placeholder="Digite a Descrição Do Evento Aqui" style={styles.modalInput} />
                    <TextInput placeholder="Data" style={styles.modalInput} />
                    <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
                        <View style={styles.textBoxView}>
                            <TextInput placeholder="Começo" style={{ width: "100%" }} placeholderTextColor="#8F9BB3" />
                            <View style={{ justifyContent: "center" }}>
                                <Icon name="search" color="#8F9BB3" size={20} />
                            </View>
                        </View>

                        <View style={styles.textBoxView}>
                            <TextInput placeholder="Fim" style={{ width: "100%" }} placeholderTextColor="#8F9BB3" />
                            <View style={{ justifyContent: "center" }}>
                                <Icon name="search" color="#8F9BB3" size={20} />
                            </View>
                        </View>

                    </View>
                </View>
            </View>
        </Modalize>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalTitle: {
        fontFamily: "SpaceGroteskMedium",
        alignSelf: "center",
        fontSize: 20,
        marginVertical: 20
    },
    modalContent: {
        padding: 20
    },
    modalInput: {
        borderWidth: 1,
        borderColor: "#8F9BB3",
        padding: 20,
        borderRadius: 10,
        marginBottom: 15
    },
    textBoxView: {
        borderWidth: 1,
        borderColor: "#8F9BB3",
        alignSelf: "center",
        flexDirection: "row",
        height: 50,
        borderRadius: 10,
        width: "48%"
    }
});
