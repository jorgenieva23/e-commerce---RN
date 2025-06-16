import { Image } from 'react-native';
import React from 'react';
import { Product } from '../../../domain/entities/product';
import { Card, Text } from '@ui-kitten/components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';
import { FadeInImage } from '../ui/FadeInImage';

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  return (
    <Card
      onPress={() =>
        navigation.navigate('ProductScreen', { productId: product.id })
      }
      style={{
        flex: 1,
        backgroundColor: '#F9F9F9',
        margin: 3,
      }}>
      {product.images.length === 0 ? (
        <Image
          source={require('../../../assets/no-product-image.png')}
          style={{ width: 200, height: 200 }}
        />
      ) : (
        <FadeInImage
          uri={product.images[0]}
          style={{ flex: 1, height: 200, width: 200 }}
        />
      )}
      <Text numberOfLines={2} category="s1" style={{ textAlign: 'left' }}>
        {product.title}
      </Text>
      <Text
        numberOfLines={1}
        appearance="hint"
        category="s1"
        style={{ textAlign: 'left' }}>
        {product.price.toString()}
      </Text>
      <Text
        numberOfLines={1}
        category="p1"
        status="success"
        style={{ textAlign: 'left' }}>
        Envio gratis!
      </Text>
    </Card>
  );
};
