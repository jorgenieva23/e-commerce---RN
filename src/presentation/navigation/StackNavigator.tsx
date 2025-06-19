import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screen/home/HomeScreen';
import { ProductScreen } from '../screen/product/ProductScreen';
import { LoadingScreen } from '../screen/loading/LoadingScreen';
import { RegisterScreen } from '../screen/auth/RegisterScreen';
import { LoginScreen } from '../screen/auth/LoginScreen';

export type RootStackParams = {
  Loading: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  HomeScreen: undefined;
  ProductScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Loading" component={LoadingScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
    </Stack.Navigator>
  );
};
