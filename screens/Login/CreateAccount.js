import { SafeAreaView, View, Text, Image, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Platform } from "react-native";
import { useState } from "react";

import BasicLoginStyle from "./BasicLoginStyles"

export const CreateAccount = ({navigation}) => {

  const [isChecked, setIsChecked] = useState(false)

  return (
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <SafeAreaView style={styles.container}>
            
            <Image source={require("../../assets/cadastro-image.jpg")} style={{height: 180, width: 180}}/>
            
          
              { /* Formuário */ }      
              <View style={styles.formView}>
                <Text style={BasicLoginStyle.titleSpaceGrotesk}>Cadastro</Text>
                <TextInput style={BasicLoginStyle.textBox} placeholder="Nome de Usuário" placeholderTextColor="#8F9BB3"/>
                <TextInput style={BasicLoginStyle.textBox} placeholder="Email" placeholderTextColor="#8F9BB3"/>
                <TextInput style={BasicLoginStyle.textBox} placeholder={"Telefone"} placeholderTextColor="#8F9BB3"/>

                {/* Checkbox */}
                <View style={styles.checkBoxView}>
                  <TouchableOpacity
                    style={styles.checkboxContainer}
                    onPress={() => setIsChecked(!isChecked)}
                  >
                    <View style={[styles.checkbox, isChecked && styles.checked]} />
                  </TouchableOpacity>
                  <Text style={styles.label}>Li e Concordo com os Termos e Condições</Text>
                </View>

                  {/* botão de continuar */}
                <TouchableOpacity style={BasicLoginStyle.buttonDefaultStyle} onPress={() => navigation.navigate("Security")}>
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
  checkBoxView: {
    flexDirection: "row",
    width: "95%"
  },
  formView: {
    minWidth: "90%",
    padding: 10,
    gap: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#8F9BB3',
    backgroundColor: '#fff',
    borderRadius: 3
  },
  checked: {
    backgroundColor: '#2D76E3', // Cor quando está selecionado
  },
  label: {
    marginLeft: 10,
    fontSize: 13,
  },
})