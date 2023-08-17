import { Request, Response } from "express";
import db from "../db/connection";
import type { UserTokenAttributes } from "../types";
import * as orderControllers from "../controllers/order.controller";
import * as orderDetailControllers from "../controllers/orderDetail.controller";
import { readCartByUserId } from "../controllers/cart.controller";

export const getOrdersByUserId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId = (req.user as UserTokenAttributes)?.id;
  const response = await orderControllers.readAllOrders(userId);

  return res.status(200).json({ response });
};

export const getOrderById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId = (req.user as UserTokenAttributes)?.id;
  const orderId = req.params.orderId;

  try {
    const response = await orderControllers.readOrderById(userId, orderId);

    if (!response)
      return res
        .status(404)
        .json({ message: `Order with id: ${orderId} doesn´t exists` });

    return res.status(200).json({ response });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const post = async (req: Request, res: Response) => {
  const transaction = await db.transaction();

  try {
    const userId = (req.user as UserTokenAttributes)?.id;
    //****TODO LOGICA PARA PAGOS
    //*************************/
    const cart = await readCartByUserId(userId);

    if (!cart?.cartItems.length || cart?.cartItems.length === 0)
      return res
        .status(400)
        .json({ message: "Please to add products to cart" });

    const total = cart?.cartItems.reduce(
      (accum, current) => accum + current.price * current.quantity,
      0
    );

    const newOrder = { cartId: cart?.id, total };
    const order = await orderControllers.createOrder(newOrder, transaction);

    const orderDetails = cart?.cartItems.map((cartItem) => {
      const price = cartItem.price;
      const quantity = cartItem.quantity;

      const newOrderDetail = {
        orderId: order.id,
        productId: cartItem.product.id,
        quantity,
        price,
        subtotal: quantity * price,
      };
      return orderDetailControllers.createOrderDetail(
        newOrderDetail,
        transaction
      );
    });

    await Promise.all(orderDetails);
    await transaction.commit();
    return res.status(201).json({ message: "Post order" });
  } catch (error: any) {
    await transaction.rollback();
    return res.status(500).json({ message: error.message });
  }
};

// const cancelAnOrder = (req: Request, res: Response) => {};

// const finishAnOrder = (req: Request, res: Response) => {};
