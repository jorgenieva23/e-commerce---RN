export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  slug: string;
  stock: number;
  sizes: Size[];
  gender: Gender;
  tags: string[];
  images: string[];
}

export enum Gender {
  Kid = 'kid',
  Men = 'men',
  Unisex = 'unisex',
  Women = 'women',
}

export enum Size {
  S = 'S',
  M = 'M',
  L = 'L',
  Xl = 'XL',
  Xs = 'XS',
  Xxl = 'XXL',
}
