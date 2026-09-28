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
