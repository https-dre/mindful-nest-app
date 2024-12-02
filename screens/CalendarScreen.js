import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Calendar } from 'react-native-calendars';

const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export const CalendarScreen = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState('');

  const getMonthData = (monthIndex) => {
    const year = new Date().getFullYear(); // Use o ano atual
    return {
      month: `${year}-${monthIndex + 1 < 10 ? '0' : ''}${monthIndex + 1}`,
      name: months[monthIndex],
    };
  };

  const currentMonthData = getMonthData(selectedMonth);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{fontFamily: "SpaceGroteskMedium", fontSize: 20, margin: 20}}>Calendário</Text>
      <ScrollView style={styles.buttonContainer} horizontal={true}>
        {months.map((month, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.button, selectedMonth === index && styles.selectedButton]}
            onPress={() => setSelectedMonth(index)}
          >
            <Text style={[styles.buttonText, selectedMonth === index && styles.selectedButtonText]}>
              {month}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.calendarContainer}>
        <Calendar
          key={currentMonthData.month} // Força a recriação do componente
          current={currentMonthData.month}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={{
            [selectedDate]: {
              selected: true,
              selectedColor: 'blue',
              selectedTextColor: 'white',
            },
          }}
          hideExtraDays={false}
          theme={{
            weekDayNames: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
            selectedDayBackgroundColor: '#007AFF',
            todayTextColor: '#007AFF',
            monthTextColor: 'white',
            dayTextColor: 'black',
          }}
          
          renderArrow={() => null}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  buttonContainer: {
    flexDirection: 'row',
    maxHeight: 45,
    marginLeft: 10
  },
  button: {
    minWidth: 100,
    maxHeight: 30,
    margin: 5,
    borderRadius: 100,
    height: 40,
    borderWidth: 2,
    borderColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center"
  },
  selectedButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: "bold"
  },
  selectedButtonText: {
    color: 'white',
  },
  calendarContainer: {
    width: '80%',
    alignSelf: "center"
  },
  calendarTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
});