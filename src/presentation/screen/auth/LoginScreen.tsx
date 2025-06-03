import React, { useState } from 'react';
import { Alert, useWindowDimensions } from 'react-native';
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';

import { API_URL } from '@env';
import { MyIcon } from '../../components/ui/MyIcon';
import { RootStackParams } from '../../navigation/StackNavigator';
import { useAuthStore } from '../../store/auth/useAuthStore';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

export const LoginScreen = ({ navigation }: Props) => {
  const { login } = useAuthStore();

  const [isPosting, setIsPosting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const onLogin = async () => {
    if (form.email.length === 0 || form.password.length === 0) {
      return;
    }
    setIsPosting(false);

    const wasSuccessful = await login(form.email, form.password);
    setIsPosting(true);

    if (wasSuccessful) return;

    Alert.alert('Error', 'Usuario o contraseña incorrectos');
  };

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
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={email => setForm({ ...form, email })}
            accessoryLeft={<MyIcon name="email-outline" />}
            style={{ marginBottom: 10 }}
            maxLength={30}
          />
          <Input
            placeholder="Contraseña"
            autoCapitalize="none"
            value={form.password}
            onChangeText={password => setForm({ ...form, password })}
            accessoryLeft={<MyIcon name="lock-outline" />}
            secureTextEntry
            style={{ marginBottom: 10 }}
            maxLength={30}
          />
        </Layout>

        <Layout style={{ height: 10 }} />

        <Layout>
          <Button
            disabled={isPosting}
            accessoryRight={<MyIcon name="arrow-forward-outline" color='' />}
            onPress={onLogin}>
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
