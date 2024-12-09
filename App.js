import 'react-native-gesture-handler';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from 'expo-font';

import { LoginOrRegister } from "./screens/Login/LoginOrRegister";
import { CreateAccount } from "./screens/Login/CreateAccount";
import { Security } from "./screens/Login/Security";
import { VerifyEmail } from "./screens/Login/VerifyEmail";
import { ChoosePlan } from "./screens/Login/ChoosePlan";
import { Login } from "./screens/Login/Login";
import { BottomTabRouter } from "./BottomTabRouter"
import { Notes } from './screens/Notes';
import { NotificationScreen } from "./screens/NotificationScreen";
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { AppStateProvider } from "./AppStateContext";
import { ViewProject } from './screens/ViewProject';

const Stack = createNativeStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    'SpaceGroteskMedium': require('./assets/fonts/SpaceGrotesk-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null; // ou algum carregamento enquanto a fonte carrega
  }
  
  return (
    <AppStateProvider>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <NavigationContainer style={{flex: 1}}>
          <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="BottomTab">
            <Stack.Screen name="LoginOrRegister" component={LoginOrRegister} />
            <Stack.Screen name="CreateAccount" component={CreateAccount} />
            <Stack.Screen name="Security" component={Security} />
            <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
            <Stack.Screen name="ChoosePlan" component={ChoosePlan} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="BottomTab" component={BottomTabRouter}/>
            <Stack.Screen name="Notes" component={Notes} />
            <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
            <Stack.Screen name="ViewProject" component={ViewProject} />
          </Stack.Navigator>
        </NavigationContainer>
      </TouchableWithoutFeedback>
    </AppStateProvider >
    
  )
}

export default gestureHandlerRootHOC(App);