export interface FindStoreCatalogFacadeInputDto {
  id: string;
}

export interface FindStoreCatalogFacadeOutputDto {
  id: string;
  name: string;
  description: string;
<<<<<<< HEAD
<<<<<<< HEAD
=======
  quantity: number;
>>>>>>> 4fada72 (feat: add back old data)
=======
  quantity: number;
>>>>>>> 84f55c57fd4281882faca8cd25a5c391224c1a12
  salesPrice: number;
}

export interface FindAllStoreCatalogFacadeOutputDto {
  products: FindStoreCatalogFacadeOutputDto[];
}
