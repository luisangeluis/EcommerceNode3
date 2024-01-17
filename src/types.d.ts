import { Optional } from "sequelize";
import type { UserRoleEnum, ProductCategoryEnum, orderStatus, ProductStatusEnum } from "./utils/Enums";

//PRODUCT
export interface ProductAttributes {
  readonly id: string;
  title: string;
  description: string;
  price: number;
  status: ProductStatusEnum;
  categoryId: string;
  sellerId: string;
}

export interface ProductCreationAttributes extends Optional<ProductAttributes, "id"> {}

export interface ProductUpdateAttributes extends Partial<ProductCreationAttributes> {}

export interface ProductReadAttributes extends Partial<ProductAttributes> {
  page: number;
  title: string;
  description: string;
  price: number;
  status: ProductStatusEnum;
  categoryId: string;
  userId: string;
}

export interface ProductImageAttributes {
  readonly id: string;
  productId: string;
  url: string;
}

export interface ProductImageCreationAttributes extends Optional<ProductImageAttributes, "id"> {}

//CATEGORY
export interface CategoryAttributes {
  readonly id: string;
  name: ProductCategoryEnum;
}

export interface CategoryCreationAttributes extends Optional<CategoryAttributes, "id"> {}

//USER
export interface UserAttributes {
  readonly id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleId: string;
  statusId: string;
}

export interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export interface UserTokenAttributes extends Pick<UserAttributes, firstName | email | roleId> {}

//ROLE
export interface RoleAttributes {
  readonly id: string;
  title: UserRoleEnum;
}

export interface RoleCreationAttributes extends Optional<RoleAttributes, "id"> {}

//Cart
export interface CartAttributes {
  readonly id: string;
  userId: string;
  isActive: boolean;
}

export interface CartCreationAttributes extends Optional<CartAttributes, "id"> {}

export interface CartItemAttributes {
  readonly id: string;
  productId: string;
  cartId: string;
  quantity: number;
  price: number;
}

export interface CartItemCreationAttributes extends Optional<CartItemAttributes, "id"> {}

export interface OrderAttributes {
  readonly id: string;
  cartId: string;
  total: number;
  status: orderStatus;
}

export interface OrderCreationAttributes extends Optional<OrderAttributes, "id"> {}

export interface OrderDetailAttributes {
  readonly id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface OrderDetailCreationAttributes extends Optional<OrderDetailAttributes, "id"> {}

export interface StatusAttributes {
  readonly id: string;
  title: string;
}

export interface StatusCreationAttributes extends Optional<StatusAttributes, "id"> {}
