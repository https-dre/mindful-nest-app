import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { CalendarEvent } from '../components/CalendarEvent';
import { BottomSheetCreateEvent } from '../components/BottomSheetCreateEvent';
import { formatHours } from '../utilities';
import { BottomSheetEditEvent } from '../components/BottomSheetEditEvent';

const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
];

export const CalendarScreen = () => {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedDate, setSelectedDate] = useState('');
    const [markedDates, setMarkedDates] = useState({});
    const modalRef = useRef(null);
    const editModalRef = useRef(null);

    const calendarRef = useRef({
        addEvent: (eventInfo) => {
            setAllEvents((prev) => [...prev, eventInfo]);
        },
        editEvent: (eventInfo) => {
            console.log('editEvent: ', eventInfo);
            setAllEvents((prevEvents) => {
            
                const updatedEvents = prevEvents.map((event) =>
                    event.id === eventInfo.id
                        ? {
                              ...event,
                              eventName: eventInfo.eventName,
                              eventDescription: eventInfo.eventDescription,
                              eventDate: eventInfo.eventDate,
                              eventStart: eventInfo.eventStart,
                              eventEnd: eventInfo.eventEnd,
                          }
                        : event,
                );

                console.log('updatedEvents após atualização:', updatedEvents);
                return updatedEvents;
            });
        },
        deleteEvent: (eventId) => {
            console.log(eventId);
            setAllEvents(prevEvents => {
                const events = prevEvents.filter(e => e.id !== eventId);
                return events;
            })
        },
    });
    const [calendarEvents, setCalendarEvents] = useState([]);
    const [allEvents, setAllEvents] = useState([]);

    const dayPress = (dayInfo) => {
        const data = {
            dayInfo,
            id: null,
        };
        setSelectedDate(dayInfo);
        modalRef.current?.sendToModal(data);
    };

    const handleCalendarEventLongClick = (id) => {
        const eventInfo = allEvents.filter((e) => e.id === id)[0];
        editModalRef.current?.sendToModal(eventInfo);
    };

    useEffect(() => {
        setMarkedDates({});
        const components = allEvents.map((eventInfo) => {
            setMarkedDates((prev) => ({ ...prev, [eventInfo.eventDate]: { marked: true } }))
            const data = {
                id: eventInfo.id,
                eventName: eventInfo.eventName,
                eventDescription: eventInfo.eventDescription,
                deadline: `${formatHours(eventInfo.eventStart)} - ${formatHours(eventInfo.eventEnd)}`,
            };
            return (
                <CalendarEvent
                    data={data}
                    key={Math.random()}
                    longPress={handleCalendarEventLongClick}
                />
            );
        });

        setCalendarEvents(components);
    }, [allEvents]);

    const getMonthData = (monthIndex) => {
        const year = new Date().getFullYear();
        return {
            month: `${year}-${monthIndex + 1 < 10 ? '0' : ''}${monthIndex + 1}`,
            name: months[monthIndex],
        };
    };

    const currentMonthData = getMonthData(selectedMonth);

    return (
        <SafeAreaView style={styles.container}>
            <Text
                style={{
                    fontFamily: 'SpaceGroteskMedium',
                    fontSize: 20,
                    margin: 20,
                }}
            >
                Calendário
            </Text>
            <ScrollView style={styles.buttonContainer} horizontal={true}>
                {months.map((month, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.button,
                            selectedMonth === index && styles.selectedButton,
                        ]}
                        onPress={() => setSelectedMonth(index)}
                    >
                        <Text
                            style={[
                                styles.buttonText,
                                selectedMonth === index &&
                                    styles.selectedButtonText,
                            ]}
                        >
                            {month}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <View style={styles.calendarContainer}>
                <Calendar
                    key={currentMonthData.month}
                    current={currentMonthData.month}
                    onDayPress={dayPress}
                    markedDates={markedDates}
                    hideExtraDays={false}
                    theme={{
                        weekDayNames: [
                            'Dom',
                            'Seg',
                            'Ter',
                            'Qua',
                            'Qui',
                            'Sex',
                            'Sáb',
                        ],
                        selectedDayBackgroundColor: '#007AFF',
                        todayTextColor: '#007AFF',
                        monthTextColor: 'white',
                        dayTextColor: 'black',
                    }}
                    renderArrow={() => null}
                />
            </View>

            <Text
                style={{
                    fontFamily: 'SpaceGroteskMedium',
                    fontSize: 20,
                    margin: 20,
                }}
            >
                Hoje
            </Text>
            <ScrollView
                style={{
                    paddingHorizontal: 20,
                    maxHeight: 200,
                }}
            >
                {/* <CalendarEvent
          data={{
            eventName: "Um evento aí",
            deadline: "10 pra meio dia",
            eventDescription: "Me matar",
          }}
        /> */}
                {calendarEvents}
            </ScrollView>

            <BottomSheetCreateEvent
                modalizeRef={modalRef}
                calendarRef={calendarRef}
            />

            <BottomSheetEditEvent
                modalizeRef={editModalRef}
                calendarRef={calendarRef}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    buttonContainer: {
        flexDirection: 'row',
        maxHeight: 45,
        marginLeft: 10,
    },
    button: {
        minWidth: 100,
        maxHeight: 30,
        margin: 5,
        borderRadius: 100,
        height: 40,
        borderWidth: 2,
        borderColor: '#007AFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedButton: {
        backgroundColor: '#007AFF',
    },
    buttonText: {
        fontSize: 16,
        color: '#007AFF',
        fontWeight: 'bold',
    },
    selectedButtonText: {
        color: 'white',
    },
    calendarContainer: {
        width: '80%',
        alignSelf: 'center',
    },
    calendarTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
});
