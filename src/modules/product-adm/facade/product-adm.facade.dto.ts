export interface AddProductFacadeInputDto {
  id?: string;
  name: string;
  description: string;
  purchasePrice: number;
<<<<<<< HEAD
  stock: number;
}

=======
  salesPrice?: number;
  stock: number;
}

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

>>>>>>> 4fada72 (feat: add back old data)
export interface CheckStockFacadeInputDto {
  productId: string;
}

export interface CheckStockFacadeOutputDto {
  productId: string;
  stock: number;
}
