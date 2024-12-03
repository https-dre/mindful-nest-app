import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';

/* CUIDADO!! Pra quebrar isso é aqui vai 2 segundos */

export const TimePickerInput = ({ onChange, value }) => {
    const [showPicker, setShowPicker] = useState(false);
    const [time, setTime] = useState(value || new Date());

    const onChangeTime = (event, selectedTime) => {
        if (event.type === 'set') {
            setTime(selectedTime);
            onChange(selectedTime);
            setShowPicker(false);
        }
    };

    return (
        <View style={styles.inputContainer}>
            <TouchableOpacity
                style={styles.inputButton}
                onPress={() => setShowPicker(true)}
            >
                {!showPicker && (
                    <Text style={styles.inputText}>
                        {time.toLocaleTimeString('pt-BR', {
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </Text>
                )}
                {showPicker && (
                    <DateTimePicker
                        value={time}
                        mode="time"
                        onChange={onChangeTime}
                    />
                )}
                <Icon name="time-outline" color="#8F9BB3" size={20} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#8F9BB3',
        borderRadius: 8,
        padding: 10,
        justifyContent: 'space-between',
        maxWidth: '48%',
        padding: 15
    },
    inputButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    inputText: {
        color: 'black',
        flex: 1,
        marginRight: 10,
    },
});
