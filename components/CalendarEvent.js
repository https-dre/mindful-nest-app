import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export const CalendarEvent = ({ data, color = "blue" }) => {
    return (
        <View style={{ gap: 10, borderBottomWidth: 1, borderColor: "#ccd3e1", marginBottom: 10, paddingVertical: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                    <View style={{ padding: 2, borderRadius: 100, borderWidth: 3, borderColor: color }}></View>
                    <Text style={{ color: "#8F9BB3" }}>{data.deadline}</Text>
                </View>
                <Icon name="ellipsis-horizontal-sharp" size={25} color="#8F9BB3" />
            </View>
            <TouchableOpacity>
                <Text style={{ fontSize: 18, fontFamily: "SpaceGroteskMedium" }}>{data.eventName}</Text>
            </TouchableOpacity>
            <Text style={{ color: "#8F9BB3" }}>{data.eventDescription}</Text>
        </View>
    )
}