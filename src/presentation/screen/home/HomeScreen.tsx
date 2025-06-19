import React from 'react';
import { Button, Icon, Layout, Text } from '@ui-kitten/components';

export const HomeScreen = () => {
  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text category="h1" style={{ marginBottom: 20 }}>
        Home Screen
      </Text>

      <Button
        accessoryLeft={<Icon name="facebook" />}
        style={{ marginTop: 20 }}>
        Cerrar sesion
      </Button>
    </Layout>
  );
};
