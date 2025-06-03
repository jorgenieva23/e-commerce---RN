import 'react-native-gesture-handler';

import React from 'react';
import * as eva from '@eva-design/eva';
import { useColorScheme } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';

import { AuthProvider } from './presentation/provider/AuthProvider';
import { StackNavigator } from './presentation/navigation/StackNavigator';

const queryClient = new QueryClient();

export const App = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? eva.dark : eva.light;
  const backgroundColor =
    colorScheme === 'dark'
      ? theme['color-basic-800']
      : theme['color-basic-100'];

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};
