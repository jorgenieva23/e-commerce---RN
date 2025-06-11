import { Image } from 'react-native';
import React from 'react';
import { Product } from '../../../domain/entities/product';
import { Card, Text } from '@ui-kitten/components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';

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
        <Text>sin imagen</Text>
      ) : (
        <Text>{product.id}</Text>
        // <Image
        //   source={{ uri: product.images[0] }}
        //   style={{ width: 100, height: 100 }}
        // />
      )}
      <Text numberOfLines={2} style={{ textAlign: 'center' }}>
        {product.title}
      </Text>
    </Card>
  );
};
// GIT_AUTHOR_DATE="2024-06-03T10:00:00"GIT_COMMITTER_DATE"2024-06-03T10:00:00"git commit -m "descripcion"