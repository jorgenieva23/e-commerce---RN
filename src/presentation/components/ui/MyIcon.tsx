import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon, useTheme } from '@ui-kitten/components';

interface Props {
  name: string;
  color?: string;
  white?: boolean;
}

export const MyIcon = ({ name, color, white = false }: Props) => {
  const theme = useTheme();

  if (white) {
  color = theme['text-control-color']; // O '#FFFFFF'
} else if (!color) {
  color = theme['text-control-color']; // Se adapta mejor
} else {
  color = theme[color] ?? theme['text-control-color'];
}

  return <Icon style={styles.icon} fill={color} name={name} />;
};

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
  },
});
