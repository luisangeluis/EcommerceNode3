import Category from "../models/Category.model";
import Product from "../models/Product.model";
import Role from "../models/Role.model";
import User from "../models/User.model";
import Cart from "../models/Cart.model";
import CartItem from "../models/CartItem.model";
import Order from "../models/Order.model";
import OrderDetail from "../models/OrderDetail.model";
import Status from "../models/Status.model";

import { UserRoleEnum, ProductCategoryEnum, ProductStatusEnum } from "./Enums";

export const generateData = async (): Promise<void> => {
  console.log("creating my data");

  try {
    await Role.bulkCreate([
      { title: UserRoleEnum.ADMIN, id: "bfff93c9-f81b-4c01-aaa9-df9167611595" },
      {
        title: UserRoleEnum.SUPERUSER,
        id: "6c00b89a-d293-40ec-8bf7-abdd161ad94a"
      },
      {
        title: UserRoleEnum.SELLER,
        id: "5b39d9a2-a865-4a1c-8b4e-3341918d35c7"
      },
      {
        title: UserRoleEnum.CUSTOMER,
        id: "536e9745-8769-45e1-bca4-1e9b3054fac8"
      }
    ]);

    await Status.bulkCreate(
      [
        {
          id: "8efdc23f-922b-4acc-a548-74444ba689ce",
          title: "active"
        },
        {
          id: "75ead6de-ed41-488d-91c0-175a47e1d16e",
          title: "suspended"
        },
        {
          id: "4b48c2d6-0114-4b76-a80e-d795661f5c9d",
          title: "deleted"
        }
      ],
      { validate: true }
    );
    await User.bulkCreate(
      [
        {
          id: "28149311-26a3-4b17-8ab4-f8d9a3b9657e",
          firstName: "juan",
          lastName: "perez",
          email: "juan.perez@correo.com",
          password: "12345",
          roleId: "5b39d9a2-a865-4a1c-8b4e-3341918d35c7",
          statusId: "8efdc23f-922b-4acc-a548-74444ba689ce"
        },
        {
          id: "45925e48-60d5-4c08-8962-3001195167dd",
          firstName: "luis",
          lastName: "gonzalez",
          email: "luis.gonzalez@correo.com",
          password: "12345",
          roleId: "536e9745-8769-45e1-bca4-1e9b3054fac8",
          statusId: "75ead6de-ed41-488d-91c0-175a47e1d16e"
        },
        {
          id: "2940915c-071e-423e-827c-a04d1ead2ce7",
          firstName: "angel",
          lastName: "zepeda",
          email: "angel.zepeda@correo.com",
          password: "12345",
          roleId: "536e9745-8769-45e1-bca4-1e9b3054fac8",
          statusId: "4b48c2d6-0114-4b76-a80e-d795661f5c9d"
        },
        {
          id: "024c33d3-2033-4baf-a1c2-c383d0765d03",
          firstName: "pedro",
          lastName: "lopez",
          email: "pedro.lopez@correo.com",
          password: "12345",
          roleId: "536e9745-8769-45e1-bca4-1e9b3054fac8",
          statusId: "8efdc23f-922b-4acc-a548-74444ba689ce"
        },
        {
          id: "187378bb-df40-4372-9558-cf3d0923c80c",
          firstName: "rafa",
          lastName: "marquez",
          email: "rafa.marquez@correo.com",
          password: "12345",
          roleId: "6c00b89a-d293-40ec-8bf7-abdd161ad94a",
          statusId: "8efdc23f-922b-4acc-a548-74444ba689ce"
        },
        {
          id: "456e0972-01ed-4975-acfe-f13af058ba17",
          firstName: "Clemmy",
          lastName: "Haylor",
          email: "chaylor4@creativecommons.org",
          password: "bE1<6YMRjw",
          roleId: "536e9745-8769-45e1-bca4-1e9b3054fac8",
          statusId: "8efdc23f-922b-4acc-a548-74444ba689ce"
        }
      ],
      { validate: true }
    );

    await Category.bulkCreate([
      {
        name: ProductCategoryEnum.SPORT,
        id: "58c21712-0dc4-4f98-af84-2ba868fcd2cd"
      },
      {
        name: ProductCategoryEnum.HOME,
        id: "c7a96caa-719c-4097-ab3b-77139d4644dd"
      },
      {
        name: ProductCategoryEnum.TOYS,
        id: "7c4b8522-bffa-4b1c-b82d-0c906366ec25"
      }
    ]);

    await Product.bulkCreate(
      [
        {
          id: "dc29ea92-d7c3-48de-a389-76af84a470da",
          title: "car",
          description: "a car",
          price: 100,
          status: ProductStatusEnum.ACTIVE,
          categoryId: "7c4b8522-bffa-4b1c-b82d-0c906366ec25",
          sellerId: "28149311-26a3-4b17-8ab4-f8d9a3b9657e"
        },
        {
          id: "e2914c19-0f6c-4554-a2b9-97f4ceaffb6b",
          title: "dog",
          description: "a dog",
          price: 200,
          status: ProductStatusEnum.ACTIVE,
          categoryId: "c7a96caa-719c-4097-ab3b-77139d4644dd",
          sellerId: "28149311-26a3-4b17-8ab4-f8d9a3b9657e"
        },
        {
          id: "dc228176-e25a-4f2e-a485-5c16aa83a415",
          title: "refrigerator",
          description: "a refrigerator",
          price: 300,
          status: ProductStatusEnum.ACTIVE,
          categoryId: "c7a96caa-719c-4097-ab3b-77139d4644dd",
          sellerId: "28149311-26a3-4b17-8ab4-f8d9a3b9657e"
        },
        {
          id: "32d3483f-4a85-4be4-872f-58932c15acf0",
          title: "ball",
          description: "a ball",
          price: 50,
          status: ProductStatusEnum.ACTIVE,
          categoryId: "58c21712-0dc4-4f98-af84-2ba868fcd2cd",
          sellerId: "28149311-26a3-4b17-8ab4-f8d9a3b9657e"
        },
        {
          id: "f0e133b4-c8d1-45db-b4fa-a71bca80d681",
          title: "xbox",
          description: "a xbox",
          price: 400,
          status: ProductStatusEnum.ACTIVE,
          categoryId: "7c4b8522-bffa-4b1c-b82d-0c906366ec25",
          sellerId: "28149311-26a3-4b17-8ab4-f8d9a3b9657e"
        },
        {
          id: "c46131b5-6d22-4420-bf3d-64789cd49cb2",
          title: "play station",
          description: "a play station",
          price: 400,
          status: ProductStatusEnum.ACTIVE,
          categoryId: "7c4b8522-bffa-4b1c-b82d-0c906366ec25",
          sellerId: "28149311-26a3-4b17-8ab4-f8d9a3b9657e"
        },
        {
          id: "2e112c93-7db1-48b9-b978-85fa51f1c7bd",
          title: "cell phone",
          description: "a cell phone",
          price: 300,
          status: ProductStatusEnum.ACTIVE,
          categoryId: "c7a96caa-719c-4097-ab3b-77139d4644dd",
          sellerId: "28149311-26a3-4b17-8ab4-f8d9a3b9657e"
        },
        {
          id: "10119ed0-b180-4ed5-a2b4-3c3619af97d9",
          title: "tablet",
          description: "a tablet",
          price: 300,
          status: ProductStatusEnum.ACTIVE,
          categoryId: "c7a96caa-719c-4097-ab3b-77139d4644dd",
          sellerId: "28149311-26a3-4b17-8ab4-f8d9a3b9657e"
        },
        {
          id: "69c28868-c096-4fb8-8d0b-fbd2bcbbe113",
          title: "nintendo switch",
          description: "a nintendo switch",
          price: 300,
          status: ProductStatusEnum.ACTIVE,
          categoryId: "7c4b8522-bffa-4b1c-b82d-0c906366ec25",
          sellerId: "28149311-26a3-4b17-8ab4-f8d9a3b9657e"
        },
        {
          id: "16cb051e-3109-474e-be38-48d032ea9dfa",
          title: "laptop",
          description: "a laptop",
          price: 500,
          status: ProductStatusEnum.ACTIVE,
          categoryId: "c7a96caa-719c-4097-ab3b-77139d4644dd",
          sellerId: "28149311-26a3-4b17-8ab4-f8d9a3b9657e"
        },
        {
          id: "87860648-450b-460e-9ba4-2fae3179716d",
          title: "earphones",
          description: "a earphone",
          price: 100,
          status: ProductStatusEnum.ACTIVE,
          categoryId: "c7a96caa-719c-4097-ab3b-77139d4644dd",
          sellerId: "2940915c-071e-423e-827c-a04d1ead2ce7"
        },
        {
          id: "7802d357-239d-415e-859c-d0c1da0010a0",
          title: "television",
          description: "a television",
          price: 100,
          status: ProductStatusEnum.ACTIVE,
          categoryId: "7c4b8522-bffa-4b1c-b82d-0c906366ec25",
          sellerId: "2940915c-071e-423e-827c-a04d1ead2ce7"
        },
        {
          id: "bb4dcbe5-2974-4326-a999-b0dd9c641e03",
          title: "backpack",
          description: "a backpack",
          price: 250,
          status: ProductStatusEnum.ACTIVE,
          categoryId: "58c21712-0dc4-4f98-af84-2ba868fcd2cd",
          sellerId: "2940915c-071e-423e-827c-a04d1ead2ce7"
        },
        {
          id: "d0ea5e20-cce1-4198-9184-cf20f93fbd9c",
          title: "washing machine",
          description: "a washing machine",
          price: 450,
          status: ProductStatusEnum.ACTIVE,
          categoryId: "c7a96caa-719c-4097-ab3b-77139d4644dd",
          sellerId: "2940915c-071e-423e-827c-a04d1ead2ce7"
        },
        {
          id: "6edfd984-807f-4829-932f-0511fb1881b7",
          title: "volleyball ball",
          description: "a volleyball ball",
          price: 150,
          status: ProductStatusEnum.INACTIVE,
          categoryId: "58c21712-0dc4-4f98-af84-2ba868fcd2cd",
          sellerId: "2940915c-071e-423e-827c-a04d1ead2ce7"
        }
      ],
      { validate: true }
    );

    await Cart.bulkCreate(
      [
        {
          id: "55357029-746e-4493-93cd-613c0911b3af",
          userId: "28149311-26a3-4b17-8ab4-f8d9a3b9657e",
          isActive: true
        },
        {
          id: "2d17bf0b-579d-417d-8b71-0fa1b75d3079",
          userId: "45925e48-60d5-4c08-8962-3001195167dd",
          isActive: true
        },
        {
          id: "daf37a51-3da3-42a9-81e5-a0426bd6ae3f",
          userId: "2940915c-071e-423e-827c-a04d1ead2ce7",
          isActive: true
        },
        {
          id: "4bb52c8d-a5e5-4220-b3d9-17cb6b204bd8",
          userId: "024c33d3-2033-4baf-a1c2-c383d0765d03",
          isActive: true
        },
        {
          id: "cd3ad7ef-720f-419a-8235-f66bae001b05",
          userId: "187378bb-df40-4372-9558-cf3d0923c80c",
          isActive: true
        },
        {
          id: "9bc2d3ba-1337-4563-8314-6a15f10fa5e8",
          userId: "456e0972-01ed-4975-acfe-f13af058ba17",
          isActive: true
        }
      ],
      { validate: true }
    );

    await CartItem.bulkCreate(
      [
        {
          id: "6693978b-1bce-4ff8-acc2-6bcd7786d792",
          productId: "e2914c19-0f6c-4554-a2b9-97f4ceaffb6b",
          cartId: "2d17bf0b-579d-417d-8b71-0fa1b75d3079",
          quantity: 1
        },
        {
          id: "e8458c6f-dea3-4583-8c02-7f00e5e46212",
          productId: "dc29ea92-d7c3-48de-a389-76af84a470da",
          cartId: "2d17bf0b-579d-417d-8b71-0fa1b75d3079",
          quantity: 1
        },
        {
          id: "d79ae3c4-b88d-47f5-9a2d-14eeb4e8d0d6",
          productId: "dc29ea92-d7c3-48de-a389-76af84a470da",
          cartId: "daf37a51-3da3-42a9-81e5-a0426bd6ae3f",
          quantity: 2
        },
        {
          id: "a4a56f72-1745-4297-9249-b41b28551f7c",
          productId: "dc29ea92-d7c3-48de-a389-76af84a470da",
          cartId: "4bb52c8d-a5e5-4220-b3d9-17cb6b204bd8",
          quantity: 2
        }
      ],
      { validate: true }
    );

    await Order.bulkCreate(
      [
        {
          id: "7a21eedf-048b-45d4-90bd-7491e31df4e4",
          cartId: "4bb52c8d-a5e5-4220-b3d9-17cb6b204bd8",
          total: 200,
          status: "created"
        },
        {
          id: "10d6ae78-fe83-4aab-8364-cea1d2a5e610",
          cartId: "2d17bf0b-579d-417d-8b71-0fa1b75d3079",
          total: 500,
          status: "created"
        }
      ],
      { validate: true }
    );

    await OrderDetail.bulkCreate(
      [
        {
          id: "c0dde3c2-4368-434c-a84c-3e1661d4b5fa",
          orderId: "7a21eedf-048b-45d4-90bd-7491e31df4e4",
          productId: "dc29ea92-d7c3-48de-a389-76af84a470da",
          quantity: 2,
          price: 100,
          subtotal: 200
        }
      ],
      { validate: true }
    );
  } catch (error: any) {
    console.log(error);
  }
};
