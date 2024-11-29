import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const usersData = [
  {
    name: "andre_dias",
    perfil: require("../assets/foto-perfil-andre.png")
  }
]

export const Project = ({navigation, name = "Project Name", progress = "50%", 
  deadline = "01/12", backColor = "#A520F7", userNames = ["andre_dias"], }) => {
  let participantesImage = []

  for(const index in userNames) {
    usersData.map(user => {
      if(user.name === userNames[index]) {
        participantesImage.push(<Image source={user.perfil} style={styles.fotoPerfil} key={Math.random()} />)
      }
    })
  }
  
  return (
    <View style={[styles.container, {backgroundColor: backColor}]}>
      <View style={{flexDirection: "row", justifyContent: "space-between", alignSelf: "center", width: "100%"}}>
        <TouchableOpacity>
          <Text style={{fontSize: 24, color: "white"}}>{name}</Text>
        </TouchableOpacity>
        
        <Icon name="ellipsis-vertical" size={25} color="white"/>
      </View>

      
      <View style={{alignSelf: "center", width: "100%"}}>
        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
          <Text style={{color: "#EBEBEB"}}>Progresso</Text>
          <Text style={{color: "#EBEBEB"}}>{progress}</Text>
        </View>

        { /* Barra de Progresso */ }
        <View style={{opacity: 0.21 ,backgroundColor: "black", alignSelf: "center", height: 1, width: "100%"}}>
          <View style={{height: 1, width: progress, backgroundColor: "white", opacity: 1}}/>
        </View>
      </View>
      
      <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
        {participantesImage}

        <View style={{flexDirection: "row", alignItems: "center", gap: 5}}>
          <Icon name="calendar" color="white" size={20} />
          <Text style={{color: "white"}}>{deadline}</Text>
        </View>
      </View>
      
      
    </View> 
  )
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 150,
    borderRadius: 15,
    padding: 15,
    justifyContent: "space-around"
  },
  fotoPerfil: {
    width: 30
  }
})