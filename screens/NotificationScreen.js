import { Text, SafeAreaView, TouchableOpacity , StyleSheet, View } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export const notificationScreen = () => {
  return (
    <SafeAreaView style={styles.tela}>
      <TouchableOpacity style={styles.outbtn}>
        <FontAwesome5 name="angle-left" size={24} color="black" />
        <Text>  Notificações</Text>
      </TouchableOpacity>
      <View style={styles.item}>
        <Text style={styles.title}>Você tem uma tarefa para ser concluída hoje!</Text>
        <View style={styles.line}>
        </View>
        <Text style={styles.project}>Simple App Design</Text>
        <Text style={styles.time}>Hoje 9:00 PM - 10:00 PM</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.title}>Você tem uma tarefa para ser concluída hoje!</Text>
        <View style={styles.line}>
        </View>
        <Text style={styles.project}>Simple App Design</Text>
        <Text style={styles.time}>Hoje 9:00 PM - 10:00 PM</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    padding: 8,
  },
  outbtn: {
    marginTop: "2%",
    marginBottom: "2%",
    flexDirection: "row",
    width: "95%",
    alignSelf: "center",
  },
  item: {
    marginTop: "2%",
    marginBottom: "2%",
    width: "90%",
    alignSelf: "center",
    backgroundColor: "white",
    padding: "5%",
    borderRadius: 15,
  },
  title: {
    fontWeight: "bold",

  },
  line: {
    marginBottom: "2%",
    marginTop: "2%",
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  }
});