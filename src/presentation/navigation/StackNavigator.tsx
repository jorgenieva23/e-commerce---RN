import * as eva from '@eva-design/eva';

import {
  createStackNavigator,
  StackCardStyleInterpolator,
} from '@react-navigation/stack';
import { HomeScreen } from '../screen/home/HomeScreen';
import { ProductScreen } from '../screen/product/ProductScreen';
import { LoadingScreen } from '../screen/loading/LoadingScreen';
import { RegisterScreen } from '../screen/auth/RegisterScreen';
import { LoginScreen } from '../screen/auth/LoginScreen';
import { useColorScheme } from 'react-native';

export type RootStackParams = {
  LoadingScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  HomeScreen: undefined;
  ProductScreen: { productId: string };
};

const fadeAnimation: StackCardStyleInterpolator = ({ current }) => {
  return {
    cardStyle: {
      opacity: current.progress,
    },
  };
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  const colorScheme = useColorScheme();
  const evaTheme = colorScheme === 'dark' ? eva.dark : eva.light;
  const backgroundColor =
    colorScheme === 'dark'
      ? evaTheme['color-basic-800']
      : evaTheme['color-basic-100'];

  return (
    <Stack.Navigator
      initialRouteName="LoadingScreen"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor },
      }}>
      <Stack.Screen
        name="LoadingScreen"
        options={{ cardStyleInterpolator: fadeAnimation }}
        component={LoadingScreen}
      />
      <Stack.Screen
        name="LoginScreen"
        options={{ cardStyleInterpolator: fadeAnimation }}
        component={LoginScreen}
      />
      <Stack.Screen
        name="RegisterScreen"
        options={{ cardStyleInterpolator: fadeAnimation }}
        component={RegisterScreen}
      />
      <Stack.Screen
        name="HomeScreen"
        options={{ cardStyleInterpolator: fadeAnimation }}
        component={HomeScreen}
      />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
    </Stack.Navigator>
  );
};
