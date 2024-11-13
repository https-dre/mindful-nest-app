import { KeyboardAvoidingView, TouchableWithoutFeedback, TouchableOpacity, SafeAreaView, 
View, Image, TextInput, Keyboard, Platform, StyleSheet, Text } from "react-native"

import BasicLoginStyle from "./BasicLoginStyles"

export const VerifyEmail = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
            
        <Image source={require("../../assets/verify-email-image.png")} style={{width: 220, height: 200, marginVertical: 100}}/>
            
          
          { /* Formuário */ }      
          <View style={{width: "90%"}}>
            <Text style={[BasicLoginStyle.titleSpaceGrotesk, {textAlign: "center"}]}>Verificar Email</Text>
            <Text style={styles.paragraph}>Em breve você deve receber um email com um link para verificação da sua conta.</Text>
          </View>

          
          <TouchableOpacity style={[BasicLoginStyle.buttonDefaultStyle, {width: "90%",}]} 
            onPress={() => navigation.navigate("ChoosePlan")}
          >
            <Text style={{color: "white", fontWeight: 600}}>Terminar Por Aqui</Text>
          </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    fontWeight: 600,
    justifyContent: "flex-start",
    padding: 0
  },
  paragraph: {
    maxWidth: "60%",
    textAlign: "center",
    margin: "auto",
    fontWeight: 600,
    color: "#606060",
    marginVertical: 20
  }
})