import { View, Text } from 'react-native';
import React from 'react';
import { Spinner } from '@ui-kitten/components';

export const LoadingScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Spinner status="primary" size="large" />
    </View>
  );
};
