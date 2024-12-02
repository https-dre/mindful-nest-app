import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

export const SquareProject = ({ size = 150, data }) => {
    let participantesImage = []
    const navigation = useNavigation();

    for (const index in data.users) {
        data.users.map(user => {
            if (user.name === data.users[index]) {
                participantesImage.push(<Image source={user.perfil} style={styles.fotoPerfil} key={Math.random()} />)
            }
        })
    }

    function handleNavigation() {
        navigation.navigate("ViewProject", { projectData: data })
    }

    return (
        <View style={[styles.container, {backgroundColor: data.backColor, width: size, minHeight: size}]}>
            <View style={{ flexDirection: "row", justifyContent: "space-between"}}>
                <TouchableOpacity
                    onPress={handleNavigation}>
                    <Text style={{ fontSize: 20, color: "white", maxWidth: 70 }}>{data.name}</Text>
                </TouchableOpacity>

                <Icon name="ellipsis-vertical" size={20} color="white" />
            </View>


            <View style={{ alignSelf: "center", width: "100%" }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ color: "#EBEBEB" }}>Progresso</Text>
                    <Text style={{ color: "#EBEBEB" }}>{data.progress}</Text>
                </View>

                { /* Barra de Progresso */}
                <View style={{ opacity: 0.21, backgroundColor: "black", alignSelf: "center", height: 1, width: "100%" }}>
                    <View style={{ height: 1, width: data.progress, backgroundColor: "white", opacity: 1 }} />
                </View>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                {participantesImage}

                <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                    <Icon name="calendar" color="white" size={20} />
                    <Text style={{ color: "white" }}>{data.deadline}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        padding: 10,
        justifyContent: "space-around",
        marginBottom: 15
    },
    fotoPerfil: {
        width: 30
    }
})