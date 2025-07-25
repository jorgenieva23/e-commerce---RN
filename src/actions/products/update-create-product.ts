import { Product } from '../../domain/entities/product';
import { tesloApi } from '../../configs/api/telsloApi';
import { isAxiosError } from 'axios';

export const updateCreateProduct = (product: Partial<Product>) => {
  product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock);
  product.price = isNaN(Number(product.price)) ? 0 : Number(product.price);

  if (product.id && product.id !== 'new') {
    return updateProduct(product);
  }
  return createProduct(product);
};

const prepareImages = async (images: string[]) => {
  const fileImages = images.filter(image => image.includes('file://'));
  const currentImages = images.filter(image => image.includes('file://'));

  if (fileImages.length > 0) {
    const uploadPromises = fileImages.map(uploadImage);
    const uploadedImages = await Promise.all(uploadPromises);
    currentImages.push(...uploadedImages);
  }

  return currentImages.map(image => image.split('/').pop());
};

const uploadImage = async (image: string) => {
  const fromData = new FormData();
  fromData.append('file', {
    uri: image,
    type: 'image/jpeg',
    name: image.split('/').pop(),
  });
  const { data } = await tesloApi.post<{ image: string }>(
    '/files/product',
    fromData,
    {
      headers: {
        'Content-Type': 'multipart/from-data',
      },
    },
  );
  return data.image;
};

const updateProduct = async (product: Partial<Product>) => {
  try {
    const { id, images = [], ...rest } = product;
    const checkedImages = await prepareImages(images);
    const { data } = await tesloApi.patch(`/products/${id}`, {
      images: checkedImages,
      ...rest,
    });
    console.log('Enviando producto:', {
      images: checkedImages,
      ...rest,
    });
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data);
    }
    throw new Error('Error al actualizar el producto');
  }
};

const createProduct = async (product: Partial<Product>) => {
  const { id, images = [], ...rest } = product;
  try {
    const checkedImages = await prepareImages(images);
    const { data } = await tesloApi.post(`/products/`, {
      images: checkedImages,
      ...rest,
    });
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data);
    }
    throw new Error('Error al actualizar el producto');
  }
};
