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
    staleTime: 1000 * 60 * 60, // 1 hour
    initialPageParam: 0,

    queryFn: async params => await getProductsByPage(params.pageParam),
    getNextPageParam: (lastPage, allPages) => allPages.length,
  });

  return (
    <MainLayout
      title="TesloShop - Products"
      subTitle="Aplicación administrativa"
      rightAction={() => {}}
      rightActionIcon="shopping-cart-outline">
      {isLoading ? (
        <FullScreenLouder />
      ) : (
        <ProductsList
          products={data?.pages.flat() ?? []}
          fetchNextPage={fetchNextPage}
        />
      )}
    </MainLayout>
  );
};
