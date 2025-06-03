import { View, Text } from 'react-native';
import React from 'react';
import { Product } from '../../../domain/entities/product';

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  return <Text>{product.id}</Text>;
};
 