import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

import { Plan } from "../../components/Plan";
import BasicLoginStyle from "./BasicLoginStyles"

export const ChoosePlan = () => {
  const data = [
                '10 GB de anotações',
                '7 GB de registros no Planner',
                'Acesso total a Comunidade',
                'Compartilhe seus projetos com mais de duas pessoas',
                'Acesso antecipado a funcionalidades novas',
              ]

  const freePlanData = [
    "1 GB de anotações",
    "1 GB de registros no Planner",
    "Acesso à comunidade limitado",
    "Recursos Limitados",
    "Funcionalidades Básicas"
  ]
  return (
    <SafeAreaView style={styles.container}>
      <Text style={[BasicLoginStyle.titleSpaceGrotesk, {margin: 20, maxWidth: 250, fontSize: 40}]}>Escolha um Plano</Text>

      <ScrollView style={{alignSelf: "center"}}>
        <Plan data={data} price={25.00} name="Premium" repeat="Mensal" desconto={20} />
        <Plan data={freePlanData} price={0} name="Gratuito" hasMessage={false}/>
      </ScrollView>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white"
  }
})