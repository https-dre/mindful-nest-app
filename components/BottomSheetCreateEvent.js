import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Modalize } from 'react-native-modalize';
import Icon from 'react-native-vector-icons/Ionicons';
import { TimePickerInput } from './TimePickerInput';

export const BottomSheetCreateEvent = ({ modalizeRef, calendarRef }) => {
    const localModalizeRef = useRef(null);
    const navigation = useNavigation();
    const [formData, setFormData] = useState({
        eventName: '',
        eventDescription: '',
        eventDate: '',
        eventStart: new Date(),
        eventEnd: new Date(),
        id: null
    });

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    React.useImperativeHandle(modalizeRef, () => ({
        sendToModal: (data) => {
            
            handleInputChange('eventDate', data.dayInfo.dateString);
            handleInputChange('id', Math.random());
            localModalizeRef.current?.open();
        },
    }));

    const handleCreateEvent = () => {
        if (formData.eventName === '' || formData.eventName === null) {
            Alert.alert("Atenção!", "Preencha o nome do Evento!");
            return;
        }
        if (formData.eventStart > formData.eventEnd) {
            Alert.alert("Atenção!", "O horário de início deve ser menor do que o horário de término!")
            return;
        }
        calendarRef.current?.addEvent(formData);
        localModalizeRef.current.close();
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

        setFormData({
            eventName: '',
            eventDescription: '',
            eventDate: '',
            eventStart: new Date(),
            eventEnd: new Date(),
            id: null
        });
    };

    const open = () => {
        navigation.setOptions({
            tabBarStyle: {
                display: 'none',
            },
        });
    };

    return (
        <Modalize
            ref={localModalizeRef}
            snapPoint={550}
            maxHeight={600}
            panGestureEnabled={true}
            closeOnOverlayTap={true}
            handlePosition="top"
            dragToss={0.6}
            onClose={close}
            onOpen={open}
            modalStyle={{
                backgroundColor: 'white',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
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
                        onChangeText={(text) =>
                            handleInputChange('eventName', text)
                        }
                        value={formData.eventName}
                    />
                    <TextInput
                        placeholder="Digite a Descrição Do Evento Aqui"
                        style={styles.modalInput}
                        placeholderTextColor="#8F9BB3"
                        onChangeText={(text) =>
                            handleInputChange('eventDescription', text)
                        }
                        value={formData.eventDescription}
                    />

                    <View style={[styles.textBoxView, { width: '100%' }]}>
                        <Text style={{ color: 'black', alignSelf: 'center' }}>
                            {formData.eventDate}
                        </Text>
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
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <TimePickerInput
                            onChange={(selectedTime) =>
                                handleInputChange('eventStart', selectedTime)
                            }
                            value={formData.eventStart}
                        />

                        <TimePickerInput
                            onChange={(selectedTime) =>
                                handleInputChange('eventEnd', selectedTime)
                            }
                            value={formData.eventEnd}
                        />
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.createEventButton}
                    onPress={handleCreateEvent}
                >
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 18,
                            fontWeight: 'bold',
                        }}
                    >
                        Criar Evento
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.createEventButton, {backgroundColor: "white"}]}
                    onPress={localModalizeRef.current?.close}
                >
                    <Text
                        style={{
                            color: '#1D1F24',
                            fontSize: 18,
                            fontWeight: 'bold',
                        }}
                    >
                        Cancelar
                    </Text>
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
        color: 'black',
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
        backgroundColor: '#1D1F24',
        padding: 20,
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 30,
    },
});
