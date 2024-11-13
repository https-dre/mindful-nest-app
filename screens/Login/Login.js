import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Image,
View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Platform } from "react-native";

import BasicLoginStyle from "./BasicLoginStyles"

export const Login = () => {
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView>
          <Image source={require("../../assets/login.png")}  style={{alignSelf: "center", marginVertical: 20}}/>


          <View style={styles.formView}>
            <Text style={BasicLoginStyle.titleSpaceGrotesk}>Login</Text>

            <TextInput placeholder="Email ou número de Celular" placeholderTextColor="#8F9BB3" style={BasicLoginStyle.textBox} />
            <TextInput placeholder="Digite a Senha" placeholderTextColor="#8f9bb3" style={BasicLoginStyle.textBox} />

            <TouchableOpacity style={BasicLoginStyle.buttonDefaultStyle}>
              <Text style={{color: "white", fontWeight: "bold"}}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView> 
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center"
  },
  formView: {
    alignSelf: "center",
    width: "90%",
    gap: 10
  }
})