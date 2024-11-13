import { KeyboardAvoidingView, TouchableWithoutFeedback, TouchableOpacity, SafeAreaView, 
View, Image, TextInput, Keyboard, Platform, StyleSheet, Text } from "react-native"

import BasicLoginStyle from "./BasicLoginStyles"

export const Security = ({navigation}) => {

  const handleNavigation = () => {
    navigation.reset({
      index: 0,
      routes: [{name: "VerifyEmail"}]
    })
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>
            
            <Image source={require("../../assets/security-image.jpg")} style={{width: 220, height: 200}}/>
            
          
              { /* Formuário */ }      
              <View style={BasicLoginStyle.formView}>
                <Text style={BasicLoginStyle.titleSpaceGrotesk}>Segurança</Text>
                <TextInput style={BasicLoginStyle.textBox} placeholder="Digite uma Senha" placeholderTextColor="#8F9BB3"/>
                <TextInput style={BasicLoginStyle.textBox} placeholder="Confirmar Senha" placeholderTextColor="#8F9BB3"/>

                  {/* botão de continuar */}
                <TouchableOpacity style={BasicLoginStyle.buttonDefaultStyle} onPress={handleNavigation}>
                  <Text style={{color: "white", fontWeight: 600}}>Próximo</Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
      </TouchableWithoutFeedback>

    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    fontWeight: 600,
    justifyContent:"center",
  },
})