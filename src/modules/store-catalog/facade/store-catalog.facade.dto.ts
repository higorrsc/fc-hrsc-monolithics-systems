export interface FindStoreCatalogFacadeInputDto {
  id: string;
}

export interface FindStoreCatalogFacadeOutputDto {
  id: string;
  name: string;
  description: string;
  quantity: number;
  salesPrice: number;
}

export interface FindAllStoreCatalogFacadeOutputDto {
  products: FindStoreCatalogFacadeOutputDto[];
}
