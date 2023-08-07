import Category from "../models/Category.model";
import Product from "../models/Product.model";
import Role from "../models/Role.model";
import { v4 as uuidv4 } from "uuid";
import User from "../models/User.model";

export const generateData = async (): Promise<void> => {
  await Role.bulkCreate([
    { title: "admin", id: uuidv4() },
    { title: "seller", id: uuidv4() },
    { title: "customer", id: uuidv4() },
  ]);

  const customeRole = await Role.findOne({ where: { title: "customer" } });

  await User.create({
    id: "28149311-26a3-4b17-8ab4-f8d9a3b9657e",
    firstName: "juan",
    lastName: "perez",
    email: "juan.perez@correo.com",
    password: "12345",
    roleId: customeRole?.id,
  });

  await Category.bulkCreate([
    { name: "sport", id: uuidv4() },
    { name: "home", id: uuidv4() },
    { name: "toys", id: uuidv4() },
  ]);

  const sport = await Category.findOne({ where: { name: "sport" } });
  const home = await Category.findOne({ where: { name: "home" } });
  const toys = await Category.findOne({ where: { name: "toys" } });

  await Product.bulkCreate([
    {
      id: "dc29ea92-d7c3-48de-a389-76af84a470da",
      title: "car",
      description: "a car",
      price: "100",
      categoryId: home?.id,
    },
    {
      id: "e2914c19-0f6c-4554-a2b9-97f4ceaffb6b",
      title: "dog",
      description: "a dog",
      price: "200",
      categoryId: home?.id,
    },
    {
      id: "dc228176-e25a-4f2e-a485-5c16aa83a415",
      title: "refrigerator",
      description: "a refrigerator",
      price: "300",
      categoryId: home?.id,
    },
    {
      id: "32d3483f-4a85-4be4-872f-58932c15acf0",
      title: "ball",
      description: "a ball",
      price: "50",
      categoryId: sport?.id,
    },
    {
      id: "f0e133b4-c8d1-45db-b4fa-a71bca80d681",
      title: "xbox",
      description: "a xbox",
      price: "400",
      categoryId: toys?.id,
    },
    {
      id: "c46131b5-6d22-4420-bf3d-64789cd49cb2",
      title: "play station",
      description: "a play station",
      price: "400",
      categoryId: toys?.id,
    },
    {
      id: "2e112c93-7db1-48b9-b978-85fa51f1c7bd",
      title: "cell phone",
      description: "a cell phone",
      price: "300",
      categoryId: home?.id,
    },
    {
      id: "10119ed0-b180-4ed5-a2b4-3c3619af97d9",
      title: "tablet",
      description: "a tablet",
      price: "300",
      categoryId: home?.id,
    },
    {
      id: "69c28868-c096-4fb8-8d0b-fbd2bcbbe113",
      title: "nintendo switch",
      description: "a nintendo switch",
      price: "300",
      categoryId: toys?.id,
    },
    {
      id: "16cb051e-3109-474e-be38-48d032ea9dfa",
      title: "laptop",
      description: "a laptop",
      price: "500",
      categoryId: home?.id,
    },
    {
      id: "87860648-450b-460e-9ba4-2fae3179716d",
      title: "earphones",
      description: "a earphone",
      price: "100",
      categoryId: home?.id,
    },
    {
      id: "7802d357-239d-415e-859c-d0c1da0010a0",
      title: "television",
      description: "a television",
      price: "100",
      categoryId: toys?.id,
    },
    {
      id: "bb4dcbe5-2974-4326-a999-b0dd9c641e03",
      title: "backpack",
      description: "a backpack",
      price: "250",
      categoryId: sport?.id,
    },
    {
      id: "d0ea5e20-cce1-4198-9184-cf20f93fbd9c",
      title: "washing machine",
      description: "a washing machine",
      price: "450",
      categoryId: home?.id,
    },
    {
      id: "6edfd984-807f-4829-932f-0511fb1881b7",
      title: "volleyball ball",
      description: "a volleyball ball",
      price: "150",
      categoryId: sport?.id,
    },
  ]);
};
