import React, { useState } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Input, Layout, Text } from '@ui-kitten/components';

import { MyIcon } from '../../components/ui/MyIcon';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {}

export const RegisterScreen = ({ navigation }: Props) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [passwordCriteria, setPasswordCriteria] = useState({
    minLength: false,
    uppercase: false,
    number: false,
  });

  const validatePassword = (password: string) => {
    setPasswordCriteria({
      minLength: password.length >= 6,
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
    });
  };

  const handleInputChange = (field: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));

    if (field === 'password') {
      validatePassword(value);
    }
  };

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          marginHorizontal: 40,
          flexGrow: 1,
        }}>
        <Layout style={{ justifyContent: 'center' }}>
          <Text category="h2">Crear cuenta</Text>
          <Text category="p2">Por favor, crea una cuenta para continuar</Text>
        </Layout>

        <Layout style={{ marginTop: 30 }}>
          <Input
            placeholder="Nombre completo"
            accessoryLeft={<MyIcon name="person-outline" />}
            style={{ marginBottom: 10 }}
          />
          <Input
            placeholder="Correo electrónico"
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
            onChangeText={text => handleInputChange('password', text)}
          />
        </Layout>

        <Layout style={{ height: 30 }} />

        <Layout>
          <Layout
            style={{
              flexDirection: 'row',
            }}>
            <Text style={[]}>Debe tener al menos </Text>
            <Text
              style={
                passwordCriteria.minLength
                  ? styles.validText
                  : styles.invalidText
              }>
              6 caracteres{' '}
            </Text>
          </Layout>

          <Layout
            style={{
              flexDirection: 'row',
            }}>
            <Text>Debe contener al menos </Text>
            <Text
              style={
                passwordCriteria.uppercase
                  ? styles.validText
                  : styles.invalidText
              }>
              una mayúscula
            </Text>
          </Layout>

          <Layout style={{ flexDirection: 'row' }}>
            <Text>Debe incluir al menos </Text>
            <Text
              style={
                passwordCriteria.number ? styles.validText : styles.invalidText
              }>
              un número
            </Text>
          </Layout>
        </Layout>

        <Layout style={{ height: 30 }} />

        <Layout>
          <Button
            accessoryRight={<MyIcon name="arrow-forward-outline" white />}
            onPress={() => {}}>
            Crear
          </Button>
        </Layout>

        <Layout style={{ height: 30 }} />

        <Layout
          style={{
            alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text>¿Ya tienes una cuenta?</Text>
          <Text status="primary" category="s1" onPress={() => navigation.pop()}>
            {' '}
            Ingresa
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  criteriaContainer: {
    marginTop: 10,
  },
  criteriaRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  validText: {
    color: 'green',
  },
  invalidText: {
    color: 'red',
  },
});
