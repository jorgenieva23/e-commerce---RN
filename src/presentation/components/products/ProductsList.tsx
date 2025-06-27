import React, { useState } from 'react';
import { RefreshControl } from 'react-native-gesture-handler';
import { Layout, List } from '@ui-kitten/components';
import { useQueryClient } from '@tanstack/react-query';

import { ProductCard } from './ProductCard';
import { Product } from '../../../domain/entities/product';

interface Props {
  products: Product[];
  fetchNextPage: () => void;
}

export const ProductsList = ({ products, fetchNextPage }: Props) => {
  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onPullToRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 200));
    queryClient.invalidateQueries({ queryKey: ['product', 'infinite'] });
    
    setIsRefreshing(false);
  };

  return (
    <List
      data={products}
      numColumns={2}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={({ item }) => <ProductCard product={item} />}
      ListFooterComponent={() => <Layout style={{ height: 150 }} />}
      onEndReached={fetchNextPage}
      onEndReachedThreshold={0.8}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onPullToRefresh} />
      }
    />
  );
};
