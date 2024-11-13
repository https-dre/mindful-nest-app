import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome6';

import { Home } from "./screens/Home"

const Tab = createBottomTabNavigator();

export function BottomTabRouter() {
    const tabNavigatorScreenOptions = ({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
                iconName = 'house';
            } else if (route.name === 'Comunidade') {
                iconName = 'users'; // Altere para o ícone desejado para Comunidade
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