import { Request, Response } from "express";

export const addToCart = async (
  req: Request,
  res: Response
): Promise<Response> => {
  console.log(req.user);
  console.log(req.params.id);
  return res.send("product added");
};
