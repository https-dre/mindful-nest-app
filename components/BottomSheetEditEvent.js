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

export const BottomSheetEditEvent = ({ modalizeRef, calendarRef }) => {
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
            setFormData(data)
            
            localModalizeRef.current?.open();
        },
    }));

    const handleEditEvent = () => {
        if (formData.eventName === '' || formData.eventName === null) {
            Alert.alert("Atenção!", "Preencha o nome do Evento!");
            return;
        }
        if (formData.eventStart > formData.eventEnd) {
            Alert.alert("Atenção!", "O horário de início deve ser menor do que o horário de término!")
            return;
        }
        calendarRef.current?.editEvent(formData);
        localModalizeRef.current?.close();
    }

    const handleDeleteEvent = () => {
        calendarRef.current?.deleteEvent(formData.id);
        localModalizeRef.current?.close();
    }

    const close = () => {
        navigation.setOptions({
            tabBarStyle: {
                tabBarStyle: {
                    display: 'flex',
                    backgroundColor: "#F8F8F8"
                },
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
                backgroundColor: '#ccc',
                width: 80,
                height: 6,
                borderRadius: 3,
                marginBottom: 25,
            }}
            overlayStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
        >
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Sobre o evento</Text>

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
                    style={styles.editEventButton}
                    onPress={handleEditEvent}
                >
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 18,
                            fontWeight: 'bold',
                        }}
                    >
                        Concluir
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.editEventButton, {backgroundColor: "#f4adad"}]}
                    onPress={handleDeleteEvent}
                >
                    <Text
                        style={{
                            color: "#ff3737",
                            fontSize: 18,
                            fontWeight: 'bold',
                        }}
                    >
                        Excluir
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
    editEventButton: {
        backgroundColor: '#1D1F24',
        padding: 20,
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 30,
    }
});
