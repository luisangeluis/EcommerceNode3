export interface ProductAttributes {
  id: string;
  title: string;
  description: string;
  price: number;
}

export interface ProductCreationAttributes
  extends Optional<ProductAttributes, 'id'> {}
