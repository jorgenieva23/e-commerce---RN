import React, { useRef } from 'react';
import { FlatList } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { ScrollView } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';
import {
  Button,
  ButtonGroup,
  Input,
  Layout,
  Text,
  useTheme,
} from '@ui-kitten/components';

import { MainLayout } from '../../layouts/MainLayout';
import { FadeInImage } from '../../components/ui/FadeInImage';
import { RootStackParams } from '../../navigation/StackNavigator';
import { getProductById } from '../../../actions/products/get-product-by-id';
import { Gender, Size } from '../../../domain/entities/product';
import { MyIcon } from '../../components/ui/MyIcon';

const sizes: Size[] = [Size.Xs, Size.S, Size.M, Size.L, Size.Xl, Size.Xxl];
const genders: Gender[] = [Gender.Men, Gender.Women, Gender.Kid, Gender.Unisex];

interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'> {}

export const ProductScreen = ({ route }: Props) => {
  const productIdRef = useRef(route.params.productId);
  const theme = useTheme();

  const { data: product } = useQuery({
    queryKey: ['product', productIdRef.current],
    queryFn: () => getProductById(productIdRef.current),
  });

  if (!product) {
    return <MainLayout title={'Cargando...'} />;
  }

  return (
    <MainLayout title={product.title} subTitle={`Precio ${product.price}`}>
      <ScrollView style={{ flex: 1 }}>
        {/* carrousel */}
        <Layout>
          <FlatList
            data={product.images}
            keyExtractor={item => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <FadeInImage
                uri={item}
                style={{ width: 250, height: 250, marginHorizontal: 7 }}
              />
            )}
          />
        </Layout>
        {/* Formulario */}
        <Layout>
          <Input
            label="Titulo"
            value={product.title}
            style={{ marginVertical: 5 }}
          />
          <Input
            label="Slug"
            value={product.slug}
            style={{ marginVertical: 5 }}
          />
          <Input
            label="Descripción"
            value={product.description}
            multiline
            numberOfLines={5}
            style={{ marginVertical: 5 }}
          />
        </Layout>
        {/* Precio e inventario */}
        <Layout
          style={{
            marginVertical: 5,
            marginHorizontal: 15,
            flexDirection: 'row',
            gap: 10,
          }}>
          <Input
            label="Precio"
            value={product.price.toString()}
            style={{ flex: 1 }}
          />
          <Input
            label="Inventario"
            value={product.stock.toString()}
            style={{ flex: 1 }}
          />
        </Layout>
        {/* Selectores */}
        <ButtonGroup
          size="small"
          appearance="outline"
          style={{
            margin: 2,
            marginTop: 20,
            marginHorizontal: 9,
          }}>
          {sizes.map(size => (
            <Button
              style={{
                flex: 1,
                backgroundColor: true ? theme['color-primary-300'] : undefined,
              }}
              key={size}>
              {size}
            </Button>
          ))}
        </ButtonGroup>

        <ButtonGroup
          size="small"
          appearance="outline"
          style={{
            margin: 2,
            marginTop: 20,
            marginHorizontal: 9,
          }}>
          {genders.map(gender => (
            <Button
              style={{
                flex: 1,
                backgroundColor: true ? theme['color-primary-300'] : undefined,
              }}
              key={gender}>
              {gender}
            </Button>
          ))}
        </ButtonGroup>
        <Button
          accessoryLeft={<MyIcon name="save-outline" color="white" />}
          style={{ margin: 9 }}
          onPress={() => console.log('hola')}>
          Guardar
        </Button>
        <Text>{JSON.stringify(product, null, 2)}</Text>
        <Layout style={{ height: 200 }} />
      </ScrollView>
    </MainLayout>
  );
};
