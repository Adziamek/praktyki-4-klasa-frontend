export interface Product {
  id: number;
  name: string;
  ean: string;

  categoryId: number;
  category: string;

  brandId: number;
  brand: string;

  price: number;
  quantity: number;

  locations: ProductLocationDto[];
}

export interface ProductLocationDto {
  locationId: number;
  quantity: number;
}

export interface ProductDto {
  name: string;
  ean: string;
  categoryId: number;
  brandId: number;
  price: number;
  locations: ProductLocationDto[];
}
