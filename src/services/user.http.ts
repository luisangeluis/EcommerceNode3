import { Request, Response } from "express";
import db from "../db/connection";

//Utils
import validateUserPassword from "../utils/validateUserPassword";
import catchErrors from "../utils/catchErrors";

//Types
import { UserAttributes, UserTokenAttributes } from "../types";

//Controllers
import * as userControllers from "../controllers/user.controller";
import { createCart } from "../controllers/cart.controller";

export const post = async (req: Request, res: Response): Promise<Response> => {
  const t = await db.transaction();

  try {
    const { id, ...restOfData } = req.body;
    if (!Object.keys(restOfData)) return res.status(400).send("Missing data");

    if (
      !restOfData?.firstName ||
      !restOfData?.lastName ||
      !restOfData?.email ||
      !restOfData?.password ||
      !restOfData?.roleId ||
      !restOfData?.statusId
    )
      return res.status(400).json({
        message: "At least these  fields must be completed",
        fields: {
          firstName: "string",
          lastName: "string",
          email: "string",
          password: "string",
          roleId: "string",
          statusId: "string"
        }
      });

    const isValidPassword = validateUserPassword(restOfData.password);

    if (!isValidPassword)
      return res.status(400).json({
        message: "The password must have the following characteristics",
        characteristics: {
          min: 10,
          max: 30,
          lowerCase: 1,
          upperCase: 1,
          numeric: 1,
          symbol: 1
        }
      });

    const newUser = await userControllers.createUser(restOfData, t);
    const newCart = await createCart(newUser.id, t);

    await t.commit();

    return res.status(201).json({
      message: "User created successfully",
      response: {
        id: newUser.id,
        roleId: newUser.roleId,
        cartId: newCart.id
      }
    });
  } catch (error: any) {
    await t.rollback();

    const customError = catchErrors(error);
    return res.status(customError.status).json({ message: customError.error });
  }
};

export const getMyUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = (req.user as UserTokenAttributes)?.id;
    const response = await userControllers.getUserById(userId);

    if (!response) return res.status(404).json({ message: `User with id: ${userId} doesn't exists` });

    return res.status(200).json({ response });
  } catch (error: any) {
    const customError = catchErrors(error);
    return res.status(customError.status).json({ message: customError.error });
  }
};

export const updateMyUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = (req.user as UserTokenAttributes)?.id;
    const data = req.body as Partial<UserAttributes>;
    const { id, email, password, roleId, ...restOfData } = data;

    if (!Object.keys(restOfData)) return res.status(400).send("Missing data");

    const response = await userControllers.updateUserById(userId, restOfData);

    if (!response[0]) return res.status(400).json({ message: "Please enter valid data" });

    return res.status(200).json({ message: `User with id: ${userId} succesfully edited` });
  } catch (error: any) {
    const customError = catchErrors(error);
    return res.status(customError.status).json({ message: customError.error });
  }
};

export const removeMyUser = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as UserTokenAttributes)?.id;
    const response = await userControllers.deleteUserById(userId);

    if (!response[0]) return res.status(404).json({ message: `User with id: ${userId} doesn't exists` });

    return res.status(204).json();
  } catch (error: any) {
    const customError = catchErrors(error);
    return res.status(customError.status).json({ message: customError.error });
  }
};
