import { Request, Response } from "express";
import db from "../db/connection";
import type { OrderCreationAttributes, OrderDetailAttributes, UserTokenAttributes } from "../types";
// import type { orderStatus } from "../utils/Enums";
import * as orderControllers from "../controllers/order.controller";
import * as orderDetailControllers from "../controllers/orderDetail.controller";
import { readCartByUserId } from "../controllers/cart.controller";
import { deleteAllCartItems } from "../controllers/cartItem.controller";
import CartItem from "../models/CartItem.model";
import catchErrors from "../utils/catchErrors";

export const getOrdersByUserId = async (req: Request, res: Response): Promise<Response> => {
  const userId = (req.user as UserTokenAttributes)?.id;
  const response = await orderControllers.readAllOrders(userId);

  return res.status(200).json({ response });
};

export const getOrderById = async (req: Request, res: Response): Promise<Response> => {
  const userId = (req.user as UserTokenAttributes)?.id;
  const orderId = req.params.orderId;

  try {
    const response = await orderControllers.readOrderById(userId, orderId);
    console.log({ response });

    if (!response) return res.status(404).json({ message: `Order with id: ${orderId} doesn´t exists` });

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

    //Get cart from user
    const cart = await readCartByUserId(userId);

    //TO DO Revisar el if below
    if (!cart?.cartItems || cart?.cartItems.length === 0) return res.status(400).json({ message: "Please to add products to cart" });
    if (!cart.isActive) return res.status(400).json({ message: "Unavailable cart to make an order" });

    //calculating total
    let total = 0;

    //Creating order
    const newOrder: OrderCreationAttributes = {
      cartId: cart?.id,
      total,
      status: "created"
    };
    const order = await orderControllers.createOrder(newOrder, transaction);

    //Creating order details
    const orderDetails = cart?.cartItems.map((cartItem: CartItem) => {
      const price = cartItem.product.price;
      const quantity = cartItem.quantity;
      const newOrderDetail = {
        orderId: order.id,
        productId: cartItem.product.id,
        quantity,
        price,
        subtotal: quantity * price
      };

      return newOrderDetail;
    });
    const orderDetailsCreated = await orderDetailControllers.createOrderDetails(orderDetails, transaction);

    //Total of order
    total = orderDetailsCreated!.reduce((accum: number, current: OrderDetailAttributes) => accum + current.subtotal, 0);
    order.total = total;
    await order.save({ transaction });

    //Deleting cartItems
    await deleteAllCartItems(cart.id, transaction);
    await transaction.commit();

    return res.status(201).json({ message: "Order sucessfully created" });
  } catch (error: any) {
    await transaction.rollback();
    const customError = catchErrors(error);
    return res.status(customError.status).json({ message: customError.error });
  }
};

// export const cancelAnOrder = async (req: Request, res: Response): Promise<Response> => {
//   const userId = (req.user as UserTokenAttributes)?.id;
//   const orderId = req.params.orderId;
//   const status: orderStatus = "canceled";

//   try {
//     const response = await orderControllers.updateOrderStatusAsCustomer(orderId, status, userId);

//     // console.log({hola:response});

//     if (!response) return res.status(404).json({ message: `Order with id:${orderId} doesn't exists` });

//     return res.status(200).json({ message: `Order with id: ${orderId} canceled` });
//   } catch (error: any) {
//     return res.status(500).json({ message: error.message });
//   }
// };

// export const finishAnOrder = async (req: Request, res: Response) => {
//   const orderId = req.params.orderId;
//   // const userId = req.body.userId;
//   const status = "finished";

//   try {
//     const response = await orderControllers.updateOrderStatus(orderId, status);

//     if (!response[0]) return res.status(404).json({ message: `Order with id: ${orderId} doesn´t exists` });

//     return res.status(200).json({ message: `Order with id: ${orderId} finished` });
//   } catch (error: any) {
//     return res.status(500).json({ message: error.message });
//   }
// };
