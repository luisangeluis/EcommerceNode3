export const enum UserRoleEnum {
  ADMIN = "admin",
  SELLER = "seller",
  CUSTOMER = "customer",
}

export const enum ProductCategoryEnum {
  SPORT = "sport",
  HOME = "home",
  TOYS = "toys",
}

export type orderStatus = "created" | "canceled" | "finished";
