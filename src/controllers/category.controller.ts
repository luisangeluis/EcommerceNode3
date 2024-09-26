import Category from "../models/Category.model";

export const getAllCategories = async () => await Category.findAll({ attributes: ["id", "name"] });
