import { Text, SafeAreaView, StyleSheet,TouchableOpacity,Image,View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export const UserConfig = () => {
  return (
    <SafeAreaView>
      <View style={styles.userConteiner}>
        <View style={styles.userDataConteiner}>
          <Image  style={styles.espace} source={require("../assets/foto-perfil-exemplo.jpg")} />
          <View style={styles.espace}>
            <Text>André Dias</Text>
            <Text style={{color: "#888888"}}>diaso.andre@outlook.com</Text>
          </View>
        </View>
        <View style={styles.buttonConteiner}>
          <TouchableOpacity style={styles.button}>
            <AntDesign name="user" size={24} color="black" />
            <Text> Conta</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <FontAwesome name="cogs" size={24} color="black" />
            <Text> Configurações</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <AntDesign name="creditcard" size={24} color="#5f0fc6" />
            <Text style={{color: "#5914c2"}}> A</Text>
            <Text style={{color: "#5319bd"}}>t</Text>
            <Text style={{color: "#4d1eb9"}}>u</Text>
            <Text style={{color: "#4722b4"}}>a</Text>
            <Text style={{color: "#4127b0"}}>l</Text>
            <Text style={{color: "#3b2cab"}}>i</Text>
            <Text style={{color: "#3531a7"}}>z</Text>
            <Text style={{color: "#2f36a2"}}>a</Text>
            <Text style={{color: "#293b9e"}}>r </Text>
            <Text style={{color: "#234099"}}>p</Text>
            <Text style={{color: "#1d4495"}}>l</Text>
            <Text style={{color: "#174990"}}>a</Text>
            <Text style={{color: "#114e8c"}}>n</Text>
            <Text style={{color: "#114e8c"}}>o</Text>
          </TouchableOpacity>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          ></View>
          <TouchableOpacity style={styles.button}>
            <AntDesign name="adduser" size={24} color="black" />
            <Text> Adicionar conta</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <AntDesign name="logout" size={24} color="black" />
            <Text> Sair</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  userDataConteiner: {
    flex: 1,
    flexDirection: "row",
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "5%",
    padding: "5%",
    alignContent: "center",
    backgroundColor: "white",
    borderRadius: 45,
  },

  userConteiner: {
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: "30%",
    borderWidth: "1px",
    borderRadius: 45,
    padding: "1%"
  },
  buttonConteiner: {
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "5%",
    marginBottom: "5%",
    backgroundColor: "#FAFAFA",
    padding: "10%",
    borderRadius: 45,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    marginTop: "5%",
    marginBottom: "5%",
  },
  espace: {
    marginLeft: "1%",
    marginRight: "1%",
  },
});
