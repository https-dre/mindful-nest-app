import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Modalize } from 'react-native-modalize';
import Icon from 'react-native-vector-icons/Ionicons';
import { Category } from './Category';

export const BottomSheetCreateEvent = ({ modalizeRef }) => {
    const localModalizeRef = useRef(null);
    const [currentData, setCurrentData] = useState({});
    const navigation = useNavigation();

    const sendData = (data) => {
        navigation.setOptions({
            tabBarStyle: { display: 'none' }, // Oculta a Tab Bar
        });
        setCurrentData(data);
        localModalizeRef.current?.open();
    };

    const close = () => {
        navigation.setOptions({
            tabBarStyle: {
                display: 'flex',
                backgroundColor: '#F8F8F8',
                height: 70,
                borderTopWidth: 0,
            },
        });
    };

    React.useImperativeHandle(modalizeRef, () => ({
        sendData,
        close,
    }));

    return (
        <Modalize
            ref={localModalizeRef}
            snapPoint={600}
            maxHeight={600}
            panGestureEnabled={true}
            closeOnOverlayTap={true}
            handlePosition="top"
            dragToss={0.6}
            onClose={close}
            modalStyle={{
                backgroundColor: 'white',
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
            }}
            handleStyle={{
                // Barra de puxar
                backgroundColor: '#ccc',
                width: 80,
                height: 6,
                borderRadius: 3,
                marginBottom: 25,
            }}
            overlayStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay escurecido
            }}
        >
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Adicionar Novo Evento</Text>

                {/* Form */}
                <View style={{ gap: 15 }}>
                    <TextInput
                        placeholder="Nome do Evento*"
                        style={styles.modalInput}
                        placeholderTextColor="#8F9BB3"
                    />
                    <TextInput
                        placeholder="Digite a Descrição Do Evento Aqui"
                        style={styles.modalInput}
                        placeholderTextColor="#8F9BB3"
                    />

                    <View style={[styles.textBoxView, { width: '100%' }]}>
                        <TextInput
                            placeholder="dd/mm/aaaa"
                            style={{ width: '90%' }}
                            placeholderTextColor="#8F9BB3"
                        />
                        <View style={{ justifyContent: 'center' }}>
                            <Icon
                                name="calendar-outline"
                                color="#8F9BB3"
                                size={20}
                            />
                        </View>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            width: '100%',
                            justifyContent: 'space-between',
                        }}
                    >
                        <View style={styles.textBoxView}>
                            <TextInput
                                placeholder="Começo"
                                placeholderTextColor="#8F9BB3"
                            />
                            <View style={{ justifyContent: 'center' }}>
                                <Icon
                                    name="time-outline"
                                    color="#8F9BB3"
                                    size={20}
                                />
                            </View>
                        </View>

                        <View style={styles.textBoxView}>
                            <TextInput
                                placeholder="Fim"
                                placeholderTextColor="#8F9BB3"
                            />
                            <View style={{ justifyContent: 'center' }}>
                                <Icon
                                    name="time-outline"
                                    color="#8F9BB3"
                                    size={20}
                                />
                            </View>
                        </View>
                    </View>
                </View>

                {/* Categoria */}
                <View style={{marginTop: 20}}>
                    <Text style={[styles.modalTitle, {alignSelf: "left"}]}>Categoria</Text>

                    <ScrollView horizontal={true}>
                       {/*  <Category /> */}
                    </ScrollView>

                    <TouchableOpacity style={{flexDirection: "row", alignItems: "center", marginVertical: 10}}>
                        <Icon name="add" color="#007AFF" size={20}/>
                        <Text style={{color: "#007AFF", fontWeight: "bold"}}>Adicionar</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.createEventButton}>
                    <Text style={{color: "white", fontSize: 18, fontWeight: "bold"}}>Criar Evento</Text>
                </TouchableOpacity>
            </View>
        </Modalize>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalTitle: {
        fontFamily: 'SpaceGroteskMedium',
        alignSelf: 'center',
        fontSize: 20,
        marginVertical: 20,
    },
    modalContent: {
        padding: 20,
    },
    modalInput: {
        borderWidth: 1,
        borderColor: '#8F9BB3',
        padding: 20,
        borderRadius: 10,
    },
    textBoxView: {
        borderWidth: 1,
        borderColor: '#8F9BB3',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50,
        borderRadius: 10,
        width: '48%',
        padding: 10,
    },
    createEventButton: {
        backgroundColor: "#1D1F24",
        padding: 20,
        alignItems: "center",
        borderRadius: 10,
        marginTop: 30
    }
});
