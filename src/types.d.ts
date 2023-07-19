export interface ProductAttributes {
  readonly id: string;
  title: string;
  description: string;
  price: number;
}

export interface ProductCreationAttributes
  extends Optional<ProductAttributes, "id"> {}

export interface ProductUpdateAttributes
  extends Partial<ProductCreationAttributes> {}
