import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/Octicons';

import { Home } from "./screens/Home";
import { Planner } from "./screens/Planner";
import { CalendarScreen } from './screens/CalendarScreen';

const Tab = createBottomTabNavigator();

export function BottomTabRouter() {
    const tabNavigatorScreenOptions = ({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch(route.name) {
                case "Home":
                    iconName = 'home'
                    break
                case "Comunidade":
                    iconName = "people"
                    break
                case "Planner":
                    iconName = "apps"
                    break
                case "Calendar":
                    iconName = "calendar"
                    break
                case "Settings":
                    iconName = "person"
                    break
                default:
                    iconName="home"
                    break
                
            }

            // Retorna o ícone com a cor amarela se a aba estiver ativa
            return <Icon name={iconName} color={focused ? '#007AFF' : color} size={size} />;
        },
        tabBarActiveTintColor: '#007AFF', // Cor do ícone quando ativo
        tabBarInactiveTintColor: '#676D75', // Cor do ícone quando inativo
        headerShown: false, // Ocultar título
        tabBarStyle: styles.barStyle, // Estilo do tab bar,
        tabBarShowLabel: false
    })
    
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={tabNavigatorScreenOptions}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Comunidade" component={Home} />
          <Tab.Screen name="Planner" component={Planner} />
          <Tab.Screen name="Calendar" component={CalendarScreen} />
          <Tab.Screen name="Settings" component={Home} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    barStyle: {
        backgroundColor: "#F8F8F8",
        height: 70 ,
        borderTopWidth: 0
    }
});