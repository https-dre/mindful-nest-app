import { Text, SafeAreaView, StyleSheet,TouchableOpacity,Image,View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';

export const UserConfig = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
      <View style={{ borderWidth: 1, width: "90%", alignSelf: "center", borderColor: "#CACACA", borderRadius: 15, marginTop: 50}}>
        <View style={styles.userDataConteiner}>
          <Image source={require("../assets/user-square-example.jpg")} />
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 16}}>André Dias</Text>
            <Text style={{color: "gray"}}>diaso.andre@outlook.com</Text>
          </View>
          <Ionicons name="arrow-down-circle-outline" size={20} />
        </View>
        <View style={styles.buttonConteiner}>
          <TouchableOpacity style={styles.button}>
            <AntDesign name="user" size={25} />
            <Text style={{fontSize: 16, fontWeight: "bold"}}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Ionicons name="wallet-outline" size={25} color={"#5F0FC6"}/>
            <Text style={{fontSize: 16, fontWeight: "bold", color: "#5F0FC6"}}>Upgrade Plan</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Ionicons name="settings-outline" size={25} />
            <Text style={{fontSize: 16, fontWeight: "bold"}}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Ionicons name="person-add-outline" size={25} />
            <Text style={{fontSize: 16, fontWeight: "bold"}}>Add Account</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Ionicons name="log-out-outline" size={25} />
            <Text style={{fontSize: 16, fontWeight: "bold"}}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  userDataConteiner: {
    margin: 15,
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-around",
    alignItems: "center"
  },
  buttonConteiner: {
    margin: 10,
    alignSelf: "center",
    width: "90%",
    backgroundColor: "#FAFAFA",
    borderRadius: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    padding: 20
  },
  espace: {
    marginLeft: "1%",
    marginRight: "1%",
  },
});
