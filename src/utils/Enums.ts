export const enum UserRoleEnum {
  ADMIN = 'admin',
  SELLER = 'seller',
  CUSTOMER = 'customer',
  SUPERUSER = 'superuser'
}

export const enum ProductCategoryEnum {
  SPORT = 'sport',
  HOME = 'home',
  TOYS = 'toys'
}

export const enum ProductStatusEnum {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DELETED = 'deleted'
}

export type orderStatus = 'created' | 'canceled' | 'finished';
