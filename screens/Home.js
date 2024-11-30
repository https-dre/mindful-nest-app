import { KeyboardAvoidingView, TouchableWithoutFeedback, SafeAreaView, StyleSheet,
View, Text, TextInput, Image, Platform, Keyboard, TouchableOpacity, ScrollView } from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

import Carousel from "../components/Carousel";
import { projects } from "../exampledata";

export const Home = ({navigation}) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          { /* header */ }
          <View style={styles.header}>
            <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
              <Image source={require("../assets/foto-perfil-exemplo.jpg")} />
              <View>
                <Text style={{fontSize: 20, color: "#222B45"}}>André Dias</Text>
                <Text style={{color: "#88929E"}}>diaso.andre@outlook.com</Text>
              </View>
            </View>
            
            <View style={{flexDirection: "row", gap: 10, justifyContent: "flex-end"}}>
              <TouchableOpacity style={styles.elipseButton}>
                <Icon name="document-text-outline" color="#363538" size={20}/>
              </TouchableOpacity>

              <TouchableOpacity style={styles.elipseButton}>
                <Icon name="notifications-outline" color="#363538" size={20}/>
              </TouchableOpacity>
            </View>
          </View>


          { /* TextBox "Encontre suas Tasks e Projetos" */ }
          <View style={styles.textBoxView}>
            <View style={{justifyContent: "center", paddingHorizontal: 10}}>
              <Icon name="search" color="#8F9BB3" size={20}/>
            </View>
            <TextInput placeholder="Encontre suas Tasks e Projetos" style={{width: "100%"}} placeholderTextColor="#8F9BB3" />
          </View>


          { /* Lista de Projetos */ }
          <View>
            <View style={{flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20}}>
              <View>
                <Text style={{fontFamily: "SpaceGroteskMedium", fontSize: 18}}>Projetos</Text>
                <Text>Você tem 3 projetos em Progresso!</Text>
              </View>

              <TouchableOpacity style={styles.blueButtom}>
                <Icon name="add" size={20} color="#007AFF" />
                <Text style={{color: "#007AFF"}}>Criar</Text>
              </TouchableOpacity>
            </View>
          </View>

         { /* Carousel */}
          <Carousel data={projects}/>

        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "ios" ? 0 : 20
  },
  elipseButton: {
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: "#C6C6C6",
    padding: 10
  },
  header: {
    alignSelf: "center",
    flexDirection: "row",
    paddingTop: 10,
    paddingHorizontal: 20,
    gap: 10,
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between"
  },
  textBoxView: {
    borderWidth: 1,
    borderColor: "#8F9BB3",
    marginHorizontal: 40,
    alignSelf: "center",
    marginVertical: 20,
    flexDirection: "row",
    height: 50,
    borderRadius: 10
  },
  blueButtom: {
    borderRadius: 10,
    backgroundColor: "#E6F2FF",
    padding: 10,
    flexDirection: "row",
    alignItems: "center"
  }
})