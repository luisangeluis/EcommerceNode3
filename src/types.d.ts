import { UserRoleEnum, ProductCategoryEnum } from "./utils/Enums";

//PRODUCT
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

//CATEGORY
export interface CategoryAttributes {
  readonly id: string;
  name: ProductCategoryEnum;
}

export interface CategoryCreationAttributes
  extends Optional<CategoryAttributes, "id"> {}

//USER
export interface UserAttributes {
  readonly id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleId: string;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, "id"> {}

//ROLE
export interface RoleAttributes {
  readonly id: string;
  title: UserRoleEnum;
}

export interface RoleCreationAttributes
  extends Optional<RoleAttributes, "id"> {}
