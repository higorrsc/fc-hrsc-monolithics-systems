export interface AddProductFacadeInputDto {
  id?: string;
  name: string;
  description: string;
  purchasePrice: number;
<<<<<<< HEAD
<<<<<<< HEAD
  stock: number;
}

=======
  salesPrice?: number;
  stock: number;
}

=======
  salesPrice?: number;
  stock: number;
}

>>>>>>> 84f55c57fd4281882faca8cd25a5c391224c1a12
export interface AddProductFacadeOutputDto {
  id: string;
  name: string;
  description: string;
  purchasePrice: number;
  salesPrice: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

<<<<<<< HEAD
>>>>>>> 4fada72 (feat: add back old data)
=======
>>>>>>> 84f55c57fd4281882faca8cd25a5c391224c1a12
export interface CheckStockFacadeInputDto {
  productId: string;
}

export interface CheckStockFacadeOutputDto {
  productId: string;
  stock: number;
}
