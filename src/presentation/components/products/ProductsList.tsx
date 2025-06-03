import { View, Text } from 'react-native';
import React from 'react';
import { Layout, List } from '@ui-kitten/components';
import { Product } from '../../../domain/entities/product';
import { ProductCard } from './ProductCard';

interface Props {
  products: Product[];
}

export const ProductsList = ({ products }: Props) => {
  return (
    <List
      data={products}
      numColumns={2}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={({ item }) => <ProductCard product={item} />}
      ListFooterComponent={() => <Layout style={{ height: 150 }} />}
    />
  );
};
