import { Request, Response } from "express";

import * as userControllers from "../controllers/user.controller";
import validateUserPassword from "../utils/validateUserPassword";

export const post = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id, ...restOfData } = req.body;
    if (!Object.keys(restOfData)) return res.status(400).send("Missing data");

    if (
      !restOfData.firstName ||
      !restOfData.lastName ||
      !restOfData.email ||
      !restOfData.password ||
      !restOfData.roleId
    )
      return res.status(400).json({
        message: "At least these  fields must be completed",
        fields: {
          firstName: "string",
          lastName: "string",
          email: "string",
          password: "string",
          roleId: "string",
        },
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
          symbol: 1,
        },
      });

    const response = await userControllers.createUser(restOfData);

    return res.status(201).json({
      message: "User created successfully",
      response: {
        id: response.id,
        firstName: response.firstName,
        roleId: response.roleId,
      },
    });
  } catch (error: any) {
    if (error.name === "SequelizeUniqueConstraintError") {
      const errors = error.errors.map((error: any) => error.message);
      return res.status(400).json({ message: error.message, errors });
    }

    return res.status(500).send(`error ${error.message}`);
  }
};
