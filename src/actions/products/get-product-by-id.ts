import { tesloApi } from '../../configs/api/telsloApi';
import { Product } from '../../domain/entities/product';
import { TesloProduct } from '../../infrastructure/interface/teslo-products-response';
import { ProductMapper } from '../../infrastructure/mappers/product-mappers';

export const getProductById = async (id: string): Promise<Product> => {
  try {
    const { data } = await tesloApi.get<TesloProduct>(`/products/${id}`);
    return ProductMapper.tesloProductToEntity(data);
  } catch (error) {
    throw new Error(`Error getting by id ${id}`);
  }
};
