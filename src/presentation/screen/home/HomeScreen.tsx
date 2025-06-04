import React from 'react';
import { Button, Icon, Layout, Text } from '@ui-kitten/components';
import { getProductsByPage } from '../../../actions/products/get-products-by-page';
import { useQuery } from '@tanstack/react-query';
import { MainLayout } from '../../layouts/MainLayout';
import { FullScreenLouder } from '../../components/ui/FullScreenLouder';
import { ProductsList } from '../../components/products/ProductsList';

export const HomeScreen = () => {
  const { isLoading, data: products = [] } = useQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 1000 * 60 * 60,
    queryFn: () => getProductsByPage(0),
  });

  getProductsByPage(0);
  return (
    <MainLayout
      title="TesloShop - Products"
      subTitle="Aplicacion administrativa">
      {isLoading ? <FullScreenLouder /> : <ProductsList products={products} />}
      <Icon name="plus-outline" fill="#000" style={{ width: 24, height: 24 }} />
    </MainLayout>
  );
};
