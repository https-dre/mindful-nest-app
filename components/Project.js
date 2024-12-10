import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useAppState } from "../AppStateContext";

const usersData = [
  {
    name: "andre_dias",
    perfil: require("../assets/foto-perfil-andre.png")
  }
]

export const Project = ({projectData, w = 250, h = 170 }) => {
  let participantesImage = []
  const { projects, tasks, setProjects } = useAppState();
  const navigation = useNavigation();
  const currentProjectIndex = projects.findIndex(p => p.id === projectData.id);

  const getTasksByProjectIndex = (p_index) => {
    return projects[p_index].tasks.map(id => {
      return tasks[tasks.findIndex(t => t.id === id)];
    });
  }

  for(const index in projectData.users) {
    usersData.map(user => {
      if(user.name === projectData.users[index]) {
        participantesImage.push(<Image source={user.perfil} style={styles.fotoPerfil} key={Math.random()} />)
      }
    })
  }

  function handleNavigation() {
    navigation.navigate("ViewProject", {projectData})
  }

  useEffect(() => {
    const tasksFromCurrentProject = getTasksByProjectIndex(currentProjectIndex);
    let finishedTasksCount = 0;
    tasksFromCurrentProject.forEach(t => t.status >= 2 ? finishedTasksCount += 1 : 0);
    const projectProgress = (finishedTasksCount / tasksFromCurrentProject.length) * 100
    const progressFormated = `${projectProgress}%`
    setProjects(prev => prev.map(p => p.id === projectData.id ? { ...p, progress: projectProgress } : p));
  }, [tasks]);
  
  return (
    <View style={[styles.container, {backgroundColor: projectData.backColor, width: w, height: h}]}>
      <View style={{flexDirection: "row", justifyContent: "space-between", alignSelf: "center", width: "100%"}}>
        <TouchableOpacity 
        onPress={handleNavigation}>
          <Text style={{fontSize: 20, color: "white"}}>{projectData.name}</Text>
        </TouchableOpacity>
        
        <Icon name="ellipsis-vertical" size={25} color="white"/>
      </View>

      
      <View style={{alignSelf: "center", width: "100%"}}>
        <View style={{flexDirection: "row", justifyContent: "space-between", marginBottom: 5}}>
          <Text style={{color: "#EBEBEB"}}>Progresso</Text>
          <Text style={{color: "#EBEBEB"}}>{`${projects[currentProjectIndex].progress}%`}</Text>
        </View>

        { /* Barra de Progresso */ }
        <View style={{opacity: 0.21 ,backgroundColor: "black", alignSelf: "center", height: 1, width: "100%"}}>
          <View style={{height: 1, width: `${projects[currentProjectIndex].progress}%`, backgroundColor: "white", opacity: 1}}/>
        </View>
      </View>
      
      <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
        {participantesImage}

        <View style={{flexDirection: "row", alignItems: "center", gap: 5}}>
          <Icon name="calendar" color="white" size={20} />
          <Text style={{color: "white"}}>{projectData.deadline}</Text>
        </View>
      </View>
      
      
    </View> 
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    padding: 15,
    justifyContent: "space-around",
    marginBottom: 10
  },
  fotoPerfil: {
    width: 30
  }
})