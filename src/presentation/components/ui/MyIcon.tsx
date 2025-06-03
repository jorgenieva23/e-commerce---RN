import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon, useTheme, IconProps } from '@ui-kitten/components';

interface Props {
  name: string;
  color?: string; // color opcional
}

export const MyIcon = ({ name, color }: Props) => {
  const theme = useTheme();

  const resolvedColor = color !== undefined ? theme[color] ?? color : undefined;

  return <Icon name={name} style={styles.icon} fill={resolvedColor} />;
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});
