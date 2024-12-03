import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { projects } from '../exampledata';

export const CommunityPost = ({
    username = 'andre_dias',
    time = '3h',
    projectId = projects[0].key,
    users = ['andre_dias'],
}) => {
    return (
        <View style={styles.container}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <View style={{ flexDirection: 'row', gap: 10 }}>
                    <Image
                        source={require('../assets/foto-perfil-andre.png')}
                        style={{ width: 45, height: 45 }}
                    />
                    <View
                        style={{ flexDirection: 'row', gap: 10, marginTop: 5 }}
                    >
                        <Text>{username}</Text>
                        <Text style={{ color: '#A5A0A0' }}>{time}</Text>
                    </View>
                </View>

                <Icon name="ellipsis-horizontal-sharp" size={23} />
            </View>

            <View style={{
                backgroundColor: "#167D6B", marginVertical: 15,
                padding: 20, borderRadius: 15, width: "99%", alignSelf: "center"
            }}>
                <Text style={{ fontFamily: "SpaceGroteskMedium", color: "white", fontSize: 20 }}>App de PAM</Text>
                <View style={{ alignSelf: "center", width: "100%", marginVertical: 15}}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5}}>
                        <Text style={{ color: "#EBEBEB" }}>Progresso</Text>
                        <Text style={{ color: "#EBEBEB" }}>50%</Text>
                    </View>

                    { /* Barra de Progresso */}
                    <View style={{ opacity: 0.21, backgroundColor: "black", alignSelf: "center", height: 1, width: "100%" }}>
                        <View style={{ height: 1, width: "50%", backgroundColor: "white", opacity: 1 }} />
                    </View>
                </View>
                <View>
                    <Image
                        source={require('../assets/foto-perfil-andre.png')}
                        style={{ width: 30, height: 30 }}
                    />
                </View>
            </View>

            <Text style={{width: "100%", alignSelf: "100%"}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nibh lacus,
                consequat non augue faucibus, faucibus pulvinar nisl. Integer pulvinar,
                purus tristique viverra eleifend, justo ante
            </Text>

            <View style={{ flexDirection: "row", gap: 20, marginVertical: 10 }}>
                <TouchableOpacity>
                    <Icon name="heart-outline" size={20} color="gray" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name="chatbubble-ellipses-outline" size={20} color="gray" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name="paper-plane-outline" size={20} color="gray" />
                </TouchableOpacity>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderColor: "gray"
    },
});
