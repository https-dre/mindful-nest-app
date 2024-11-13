import { SafeAreaView, TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons"

export const LoginOrRegister = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image style={styles.logo} source={require("../../assets/mindful-nest-logo.png")} />
      </View>

      <View style={{gap: 10, marginBottom: "20%"}}>
        <TouchableOpacity style={styles.buttonDefaultStyle}
          onPress={() => navigation.navigate("Login")}
        >
          <View style={styles.elipse}>
            <Icon name="enter-outline" size={20} color="white" />
          </View>
          <Text style={{fontWeight: 600}}>Prosseguir para o Login</Text>
          <View>
            <Icon name="arrow-forward" size={15} color="black" style={{marginHorizontal: 20}}/>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.buttonDefaultStyle, {backgroundColor: "#1D1F24", borderWidth: 0}]}
          onPress={() => navigation.navigate("CreateAccount")}
        >
          <View style={[styles.elipse, { backgroundColor: "white"}]}>
            <Icon name="person-add-outline" size={20} color="black" />
          </View>
          <Text style={{color: "white", fontWeight: 600}}>Novo Usuário? Cadastrar</Text>
          <View>
            <Icon name="arrow-forward" size={15} color="white" style={{marginHorizontal: 20}}/>
          </View>
          
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between"
    
  },
  logo: {
    width: 350,
    marginTop: "20%"
  },
  buttonDefaultStyle: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#7A7A7A",
    borderRadius: 100,
    width: "90%",
    margin: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  elipse: {
    borderRadius: 1000,
    backgroundColor: "#000000",
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center"
  }
})
