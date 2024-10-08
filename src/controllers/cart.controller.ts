import { v4 as uuidv4 } from "uuid";
import { Transaction } from "sequelize";

//Types
// import { CartAttributes } from "../types";

//Models
import Cart from "../models/Cart.model";
import CartItem from "../models/CartItem.model";
import Product from "../models/Product.model";
import ProductImage from "../models/ProductImage.model";

export const readCartByUserId = async (userId: string) => {
  const response = await Cart.findOne({
    where: { userId },
    include: [
      {
        model: CartItem,
        attributes: ["id", "quantity"],
        include: [
          {
            model: Product,
            attributes: ["id", "title", "description", "price", "categoryId"],
            include: [
              {
                model: ProductImage,
                attributes:["url"]
              }
            ]
          }
        ]
      }
    ]
  });
  return response;
};

export const createCart = async (userId: string, transaction?: Transaction) => {
  const newCart = { isActive: true, userId, id: uuidv4() };
  const response = await Cart.create(newCart, { transaction });
  return response;
};

// export const readOrCreateCart = async (userId: string): Promise<[CartAttributes, boolean]> => {
//   const response = await Cart.findOrCreate({
//     where: { userId: userId },
//     defaults: { id: uuidv4(), isActive: true, userId },
//     include: [
//       {
//         model: CartItem,
//         attributes: ["id", "quantity", "price"],
//         include: [
//           {
//             model: Product,
//             attributes: ["title", "description", "categoryId"]
//           }
//         ]
//       }
//     ]
//   });

//   return response;
// };
