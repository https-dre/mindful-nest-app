import { SafeAreaView, Text, StyleSheet, FlatList } from "react-native";
import { Plan } from "../../components/Plan";
import BasicLoginStyle from "./BasicLoginStyles";

export const ChoosePlan = () => {
  const data = [
    '10 GB de anotações',
    '7 GB de registros no Planner',
    'Acesso total a Comunidade',
    'Compartilhe seus projetos com mais de duas pessoas',
    'Acesso antecipado a funcionalidades novas',
  ];

  const freePlanData = [
    "1 GB de anotações",
    "1 GB de registros no Planner",
    "Acesso à comunidade limitado",
    "Recursos Limitados",
    "Funcionalidades Básicas"
  ];

  const renderItem = ({ item }) => (
    <Plan data={item.data} price={item.price} name={item.name} repeat={item.repeat} desconto={item.desconto} />
  );

  const plans = [
    { data, price: 25.00, name: "Premium", repeat: "Mensal", desconto: 20 },
    { data: freePlanData, price: 0, name: "Gratuito", hasMessage: false }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[BasicLoginStyle.titleSpaceGrotesk, {margin: 20, maxWidth: 250, fontSize: 40}]}>Escolha um Plano</Text>

      <FlatList
        data={plans}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white"
  }
});
