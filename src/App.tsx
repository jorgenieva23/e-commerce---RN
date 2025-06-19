import 'react-native-gesture-handler';

import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';

import React from 'react';
import { useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './presentation/navigation/StackNavigator';
import { AuthProvider } from './presentation/provider/AuthProvider';

export const App = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? eva.dark : eva.light;
  const backgroundColor =
    colorScheme === 'dark'
      ? theme['color-basic-800']
      : theme['color-basic-100'];

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={theme}>
        <NavigationContainer
          theme={{
            dark: colorScheme === 'dark',
            colors: {
              primary: theme['color-primary-500'],
              background: backgroundColor,
              card: theme['color-basic-100'],
              text: theme['text-basic-color'],
              border: theme['color-basic-800'],
              notification: theme['color-primary-500'],
            },
            fonts: {
              regular: {
                fontFamily: '',
                fontWeight: 'bold',
              },
              medium: {
                fontFamily: '',
                fontWeight: 'bold',
              },
              bold: {
                fontFamily: '',
                fontWeight: 'bold',
              },
              heavy: {
                fontFamily: '',
                fontWeight: 'bold',
              },
            },
          }}>
          <AuthProvider>
            <StackNavigator />
          </AuthProvider>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};
// Viste cuando Insta te sugiere gente y uno le da follow sin conocerse? Bueno, acá estamos 😂 Todo bien?
