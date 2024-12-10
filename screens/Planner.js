import { SafeAreaView, Text, View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation, NavigationContainer } from "@react-navigation/native";

import { useState } from "react";

import { TasksTab } from "./PlannerTabs/TasksTab";
import { ProjectsTab } from "./PlannerTabs/ProjectsTab";
import { ViewProject } from "./ViewProject";

const Stack2 = createNativeStackNavigator();

export const Planner = () => {
    const navigation = useNavigation();

    const [tasks, setTasks] = useState("");
    const [yourProjects, setYourProjects] = useState(null);
    const [selected, setSelected] = useState("Tasks")

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <View  style={styles.navBar}>
                <View style={styles.navMenu}>
                    <TouchableOpacity 
                        style={selected === "Tasks" ? styles.selected : styles.navButton}
                        onPress={()=> {
                            navigation.navigate("Planner", {screen:"Tasks"})
                            setSelected("Tasks")
                        }}
                    >
                        <Text>Tasks Para Hoje</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={selected === "Projects" ? styles.selected : styles.navButton}
                        onPress={()=> {
                            navigation.navigate("Planner", {screen:"Projects"})
                            setSelected("Projects")
                        }}
                    >
                        <Text>Todos os Projetos</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flex: 1, marginTop: 5}}>
                <Stack2.Navigator 
                    initialRouteName="Tasks"
                    screenOptions={{ headerShown: false }}
                >
                    <Stack2.Screen 
                        name="Tasks" 
                        component={TasksTab}
                    />
                    <Stack2.Screen 
                        name="Projects" 
                        component={ProjectsTab} 
                    />
                </Stack2.Navigator>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    navButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "50%",
        backgroundColor: 'transparent'
    },
    navBar: {
        paddingTop: 10,
        marginHorizontal: 15,
        justifyContent: "center",
        backgroundColor: "white",
        margin: 0
    },
    navMenu: {
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "transparent",
        marginTop: 30
    },
    selected: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "50%",
        backgroundColor: 'transparent',
        borderBottomWidth: 2,
        borderColor: "#007AFF"
    },
    bottomBar: {
        width: "100%",
        backgroundColor: "#E4E4E4",
        padding: 1,
        margin: 0
    }
})