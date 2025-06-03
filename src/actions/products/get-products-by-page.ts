import { tesloApi } from '../../configs/api/telsloApi';
import type { TesloProduct } from '../../infrastructure/interface/teslo-products-response';
import { ProductMapper } from '../../infrastructure/mappers/product-mappers';

export const getProductsByPage = async (page: number, limit: number = 20) => {
  console.log(page, limit);

  try {
    const { data } = await tesloApi.get<TesloProduct[]>(
      `/products?offset=${page * 10}&limit=${limit}`,
    );
    const product = data.map(ProductMapper.tesloProductToEntity);

    return product;
  } catch (error) {
    console.log(error);
    throw new Error('Error getting product');
  }
};
