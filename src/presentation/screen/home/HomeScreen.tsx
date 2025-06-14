import React from 'react';
import { Icon } from '@ui-kitten/components';
import { getProductsByPage } from '../../../actions/products/get-products-by-page';
import { useInfiniteQuery } from '@tanstack/react-query';
import { MainLayout } from '../../layouts/MainLayout';
import { FullScreenLouder } from '../../components/ui/FullScreenLouder';
import { ProductsList } from '../../components/products/ProductsList';

export const HomeScreen = () => {
  const { isLoading, data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 1000 * 60 * 60,
    initialPageParam: 0,

    queryFn: async params => {
      return await getProductsByPage(params.pageParam);
    },
    getNextPageParam: (lastPage, allPage) => allPage.length,
  });

  getProductsByPage(0);
  return (
    <MainLayout
      title="TesloShop - Products"
      subTitle="Aplicacion administrativa">
      {isLoading ? (
        <FullScreenLouder />
      ) : (
        <ProductsList
          products={data?.pages.flat() ?? []}
          fetchNextPage={fetchNextPage}
        />
      )}
      <Icon name="plus-outline" fill="#000" style={{ width: 24, height: 24 }} />
    </MainLayout>
  );
};
