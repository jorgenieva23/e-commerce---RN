import { Image } from 'react-native';
import React from 'react';
import { Product } from '../../../domain/entities/product';
import { Card } from '@ui-kitten/components';
import { FadeInImage } from '../ui/FadeInImage';

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  return (
    <Card
      style={{
        flex: 1,
        backgroundColor: '#F9F9F9',
        margin: 3,
      }}>
      {product.images.length === 0 ? (
        <Image
          source={require('../../../assets/no-product-image.png')}
          style={{ width: '100%', height: '100%' }}
        />
      ) : (
        <FadeInImage
          uri={product.images[0]}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        />
      )}
    </Card>
  );
};
