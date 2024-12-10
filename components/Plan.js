import { View, StyleSheet, Text, TouchableOpacity, SectionList, } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import BasicLoginStyle from "../screens/Login/BasicLoginStyles";
import { useNavigation } from "@react-navigation/native";

export const Plan = ({ name, price = "15,00", hasMessage = true, data, repeat, desconto = 20 }) => {
  const navigation = useNavigation();
  let finalMessage = null

  if (hasMessage != false) {
    finalMessage = <View style={{flexDirection: "row", gap: 5, marginVertical: 10}}>
        <Text style={{fontWeight: "bold", color: "#0D75FF"}}>{desconto}%</Text>
        <Text style={{fontWeight: "bold"}}>de desconto para novos usuários</Text>
      </View>
  }

  return (
    <View style={[styles.box, {borderWidth: name == "Gratuito" ? 0 : 1}]}>
      <View style={{flexDirection: "row", justifyContent: "space-between"}}>
        <Text style={{fontWeight: "bold"}}>{name}</Text>
        <Text style={{fontWeight: 600, color: "#959595"}}>{repeat}</Text>
      </View>

      <Text style={styles.priceText}>R$ {String(price)},00</Text>

      {finalMessage}

      <View style={styles.container}>
        <SectionList
          sections={[
            {
              data
            },
          ]}
          renderItem={({item}) => <Text style={styles.item}><Icon name="dot-single" size={20} color="black"/>{item}</Text>}
          keyExtractor={item => `basicListEntry-${item}`}
        />
      </View>

      <TouchableOpacity style={[BasicLoginStyle.buttonDefaultStyle, {marginTop: 20}]} onPress={() => navigation.navigate("BottomTab")}>
        <Text style={{fontWeight: "bold", color: "white"}}>Escolher e Continuar</Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    borderRadius: 20,
    margin: 20,
    padding: 25,
    minHeight: 100,
    borderWidth: 1,

    shadowColor: "gray",
    shadowOffset: 10,
    shadowOpacity: 0.2,
    shadowRadius: 2,
    backgroundColor: "white",
  },
  priceText: {
    fontSize: 50,
    fontWeight: "bold",
    marginTop: 20
  },
  item: {
    justifyContent: "center"
  }
})