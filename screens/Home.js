import {
  SafeAreaView, StyleSheet,
  View, Text, TextInput, Image, Platform, TouchableOpacity, ScrollView
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";
import Carousel from "../components/Carousel";
import { useAppState } from "../AppStateContext";
import { useEffect, useState } from "react";

export const Home = () => {
  const navigation = useNavigation();
  const { projects } = useAppState();
  const [ projectsToCarousel, setProjectsToCarousel ] = useState(projects);

  useEffect(() => {
    setProjectsToCarousel([]);
    projects.forEach(p => {
      if (parseFloat(p.progress) != 100.00) {
        setProjectsToCarousel(prev => [...prev, p])
      }
    })
  }, [projects]);

  console.log(projectsToCarousel);

  return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.container}>
        { /* header */}
        <View style={styles.header}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Image source={require("../assets/foto-perfil-exemplo.jpg")} />
            <View>
              <Text style={{ fontSize: 20, color: "#222B45" }}>André Dias</Text>
              <Text style={{ color: "#88929E" }}>diaso.andre@outlook.com</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", gap: 10, justifyContent: "flex-end" }}>
            <TouchableOpacity style={styles.elipseButton} onPress={() => navigation.navigate("Notes")}>
              <Icon name="document-text-outline" color="#363538" size={20} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.elipseButton} onPress={() => navigation.navigate("NotificationScreen")}>
              <Icon name="notifications-outline" color="#363538" size={20} />
            </TouchableOpacity>
          </View>
        </View>


        { /* TextBox "Encontre suas Tasks e Projetos" */}
        <View style={styles.textBoxView}>
          <View style={{ justifyContent: "center", paddingHorizontal: 10 }}>
            <Icon name="search" color="#8F9BB3" size={20} />
          </View>
          <TextInput placeholder="Encontre suas Tasks e Projetos" style={{ width: "100%" }} placeholderTextColor="#8F9BB3" />
        </View>


        { /* Lista de Projetos */}
        <View style={{ marginBottom: 20 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20 }}>
            <View>
              <Text style={{ fontFamily: "SpaceGroteskMedium", fontSize: 18 }}>Projetos</Text>
              <Text>Você tem {projects.length} projetos em Progresso!</Text>
            </View>
            
            <TouchableOpacity style={styles.blueButtom}>
              <Icon name="add" size={20} color="#007AFF" />
              <Text style={{ color: "#007AFF" }}>Criar</Text>
            </TouchableOpacity>
          </View>
        </View>

        { /* Carousel */}
        <Carousel data={projectsToCarousel} />
        <Text style={{fontSize: 20, marginLeft:"5%",}}>Recomendações</Text>
        <Text style={{fontSize: 14, marginLeft:"5%", marginBottom:"5%", color: "#88929E"}}>As melhores recomendações para melhorar o seu dia</Text>
        <View style={[styles.recomend,{ flexDirection: "row"}]}>
            <Icon style={[styles.recomendbnt, {color: "#3C69DC",backgroundColor:"#BBDEFF"}]} name="musical-notes" size={24} color="black" />
            <MaterialCommunityIcons style={[styles.recomendbnt, {color: "#E5B32C",backgroundColor:"#FAFFBB"}]} name="bookshelf" size={24} color="black" />
            <MaterialCommunityIcons style={[styles.recomendbnt, {color: "#25D009",backgroundColor:"#C0FFBB",}]} name="tree-outline" size={24} color="black" />
            <MaterialCommunityIcons style={[styles.recomendbnt, {color: "#94660E",backgroundColor:"#FFE4BB"}]} name="silverware-fork-knife" size={24} color="black" />
            <Icon style={[styles.recomendbnt, {color: "#7821E8",backgroundColor:"#E5BBFF"}]} name="color-palette-outline" size={24} color="black" />
            <MaterialCommunityIcons style={[styles.recomendbnt, {color: "#B03B3B",backgroundColor:"#FFBBBB"}]} name="play-box-outline" size={24} color="black" />
            <Icon style={[styles.recomendbnt, {color: "#529EA1",backgroundColor:"#BCF0F6"}]} name="game-controller-outline" size={24} color="black" />
            <Icon style={[styles.recomendbnt, {color: "#6C7F36",backgroundColor:"#F1FBB3"}]} name="basketball-outline" size={24} color="black" />
        </View>
        { /* Card */ }
        <View style={[styles.containerecomend, {backgroundColor: "#83C485", width: "90%", alignSelf: "center"}]}>
          <View style={{flexDirection: "row", justifyContent: "space-between", alignSelf: "center", width: "100%"}}>
            <Text style={{fontSize: 20, color: "white"}}>Jardim em casa</Text>
            <TouchableOpacity>
              <Text style={{fontSize: 15, color: "white"}}>Ver projeto</Text>
            </TouchableOpacity>
          </View>
          <View style={{alignSelf: "center", width: "100%"}}>
            <View style={{flexDirection: "row", justifyContent: "space-between", marginBottom: 5}}>
              <Text style={{color: "#EBEBEB"}}>Progresso</Text>
              <Text style={{color: "#EBEBEB"}}>60%</Text>
            </View>

            { /* Barra de Progresso */ }
            <View style={{opacity: 0.21 ,backgroundColor: "black", alignSelf: "center", height: 1, width: "100%"}}>
              <View style={{height: 1, width: "60%", backgroundColor: "white", opacity: 1}}/>
            </View>
          </View>

          <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
            <View style={{flexDirection: "row", alignItems: "center", gap: 5}}>
              <Icon name="calendar" color="white" size={20} />
              <Text style={{color: "white"}}>27/11</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.relacioBtn}>
          <Text style={{fontWeight: "bold", color: "#007AFF"}}>Ver Relacionados</Text>
        </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>

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
  },
  relacioBtn: 
  {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    padding: 20,
    borderWidth: 2,
    width: "95%",
    borderColor: "#007AFF",
    borderRadius: 60,
  },
  recomendbnt: {
    padding: "1%",
    marginLeft: "1.30%",
    marginRight: "1.30%",
    borderRadius: 45,
  },
  containerecomend: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    justifyContent: "space-around",
    marginBottom: "5%",
    marginTop: 10,
    borderRadius: 10
  },
  recomend: {
    marginLeft: 20
  }
})