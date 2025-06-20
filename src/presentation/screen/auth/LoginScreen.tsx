import React, { useState } from 'react';
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';
import { useWindowDimensions } from 'react-native';
import { MyIcon } from '../../components/ui/MyIcon';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';
import { API_URL } from '@env';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

export const LoginScreen = ({ navigation }: Props) => {
  const { height } = useWindowDimensions();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  console.log({ apiUrl: API_URL });

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          marginHorizontal: 40,
          flexGrow: 1,
        }}>
        <Layout>
          <Text category="h2">Ingresar</Text>
          <Text category="p1">Por favor, ingrese un texto</Text>
        </Layout>

        <Layout style={{ marginTop: 20 }}>
          <Input
            placeholder="Correo electronico"
            keyboardType="email-address"
            autoCapitalize="none"
            accessoryLeft={<MyIcon name="email-outline" />}
            style={{ marginBottom: 10 }}
          />
          <Input
            placeholder="Contraseña"
            autoCapitalize="none"
            accessoryLeft={<MyIcon name="lock-outline" />}
            secureTextEntry
            style={{ marginBottom: 10 }}
          />
        </Layout>

        <Layout style={{ height: 10 }} />

        <Layout>
          <Button
            accessoryRight={<MyIcon name="arrow-forward-outline" white />}
            onPress={() => {}}>
            Ingresar
          </Button>
        </Layout>

        <Layout style={{ height: 50 }} />

        <Layout
          style={{
            alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text>¿No tienes cuenta?</Text>
          <Text
            status="primary"
            category="s1"
            onPress={() => navigation.navigate('RegisterScreen')}>
            {' '}
            Crea una
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
};
