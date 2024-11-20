import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import { TaskComponent } from "../../components/TaskComponent";
import { GetStringFormatedDate } from "../../utilities";

export const TasksTab = () => { 

    const currentDateString = GetStringFormatedDate(new Date());

    return (
        <View style={styles.container}>
            <View style={{marginTop: 15, flexDirection: "row", justifyContent: "space-between"}}>
                <View>
                    <Text style={{fontFamily: "SpaceGroteskMedium", fontSize: 24, color: "#222B45"}}>Tasks Para Hoje</Text>
                    <Text style={{color: "#5E6676"}}>{currentDateString}</Text>
                </View>
                <TouchableOpacity style={styles.addButton}>
                    <Icon name="plus" size={17} color="#007AFF" />
                    <Text style={{color: "#007AFF"}}>Adicionar</Text>
                </TouchableOpacity>
            </View>

            <View style={{flexDirection: "row", gap: 20, marginTop: 20}}>
                <TouchableOpacity>
                    <Text style={{color: "#007AFF", fontWeight: "bold"}}>Todas</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text>Abertas</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text>Finalizadas</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text>Arquivadas</Text>
                </TouchableOpacity>
            </View>
            
            <ScrollView style={{marginTop: 30, width: "100%"}}>
                <TaskComponent />
            </ScrollView>
            
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        paddingHorizontal: 20
    },
    addButton: {
        flexDirection: "row",
        backgroundColor: "#E6F2FF",
        alignItems: "center",
        padding: 10,
        borderRadius: 10
    }
})
