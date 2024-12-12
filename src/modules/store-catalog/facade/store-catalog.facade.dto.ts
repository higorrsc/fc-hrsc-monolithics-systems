export interface FindStoreCatalogFacadeInputDto {
  id: string;
}

export interface FindStoreCatalogFacadeOutputDto {
  id: string;
  name: string;
  description: string;
<<<<<<< HEAD
=======
  quantity: number;
>>>>>>> 4fada72 (feat: add back old data)
  salesPrice: number;
}

export interface FindAllStoreCatalogFacadeOutputDto {
  products: FindStoreCatalogFacadeOutputDto[];
}
