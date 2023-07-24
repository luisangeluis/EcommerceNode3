import Category from "../models/Category.model";
import Product from "../models/Product.model";
import Role from "../models/Role.model";
import { v4 as uuidv4 } from "uuid";

export const generateData = async (): Promise<void> => {
  console.log("generateData");

  await Role.bulkCreate([
    { title: "admin", id: uuidv4() },
    { title: "seller", id: uuidv4() },
    { title: "customer", id: uuidv4() },
  ]);

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
      id: uuidv4(),
      title: "car",
      description: "a car",
      price: "100",
      categoryId: home?.id,
    },
    {
      id: uuidv4(),
      title: "dog",
      description: "a dog",
      price: "200",
      categoryId: home?.id,
    },
    {
      id: uuidv4(),
      title: "refrigerator",
      description: "a refrigerator",
      price: "300",
      categoryId: home?.id,
    },
    {
      id: uuidv4(),
      title: "ball",
      description: "a ball",
      price: "50",
      categoryId: sport?.id,
    },
    {
      id: uuidv4(),
      title: "xbox",
      description: "a xbox",
      price: "400",
      categoryId: toys?.id,
    },
    {
      id: uuidv4(),
      title: "play station",
      description: "a play station",
      price: "400",
      categoryId: toys?.id,
    },
    {
      id: uuidv4(),
      title: "cell phone",
      description: "a cell phone",
      price: "300",
      categoryId: home?.id,
    },
    {
      id: uuidv4(),
      title: "tablet",
      description: "a tablet",
      price: "300",
      categoryId: home?.id,
    },
    {
      id: uuidv4(),
      title: "nintendo switch",
      description: "a nintendo switch",
      price: "300",
      categoryId: toys?.id,
    },
    {
      id: uuidv4(),
      title: "laptop",
      description: "a laptop",
      price: "500",
      categoryId: home?.id,
    },
    {
      id: uuidv4(),
      title: "earphones",
      description: "a earphone",
      price: "100",
      categoryId: home?.id,
    },
    {
      id: uuidv4(),
      title: "television",
      description: "a television",
      price: "100",
      categoryId: toys?.id,
    },
    {
      id: uuidv4(),
      title: "backpack",
      description: "a backpack",
      price: "250",
      categoryId: sport?.id,
    },
    {
      id: uuidv4(),
      title: "washing machine",
      description: "a washing machine",
      price: "450",
      categoryId: home?.id,
    },
    {
      id: uuidv4(),
      title: "volleyball ball",
      description: "a volleyball ball",
      price: "150",
      categoryId: sport?.id,
    },
  ]);
};
