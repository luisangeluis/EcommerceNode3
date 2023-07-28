import { Request, Response } from "express";

import * as userControllers from "../controllers/user.controller";

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

    const response = await userControllers.createUser(restOfData);
    const { password, ...restOfResponse } = response;
    return res
      .status(201)
      .json({ message: "User created successfully", response: restOfResponse });
  } catch (error: any) {
    return res.status(500).send(`error ${error.message}`);
  }
};
