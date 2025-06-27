import { tesloApi } from '../../configs/api/telsloApi';
import { Gender, Product } from '../../domain/entities/product';
import { TesloProduct } from '../../infrastructure/interface/teslo-products-response';
import { ProductMapper } from '../../infrastructure/mappers/product-mappers';

const emptyProduct: Product = {
  id: '',
  title: 'Nuevo producto',
  description: '',
  price: 0,
  images: [],
  slug: '',
  gender: Gender.Unisex,
  sizes: [],
  stock: 0,
  tags: [],
};

export const getProductById = async (id: string): Promise<Product> => {
  if (id === 'new') return emptyProduct;
  try {
    const { data } = await tesloApi.get<TesloProduct>(`/products/${id}`);
    return ProductMapper.tesloProductToEntity(data);
  } catch (error) {
    throw new Error(`Error getting by id ${id}`);
  }
};
