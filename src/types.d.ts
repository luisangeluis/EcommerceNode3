export interface ProductAttributes {
  readonly id: string;
  title: string;
  description: string;
  price: number;
  categoryId: string;
}

export interface ProductCreationAttributes
  extends Optional<ProductAttributes, "id"> {}

export interface ProductUpdateAttributes
  extends Partial<ProductCreationAttributes> {}

export interface CategoryAttributes {
  readonly id: string;
  name: string;
}

export interface CategoryCreationAttributes
  extends Optional<CategoryAttributes, "id"> {}
