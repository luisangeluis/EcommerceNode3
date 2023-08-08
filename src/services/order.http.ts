import { Request, Response } from "express";
import type { UserTokenAttributes } from "../types";
import * as orderControllers from "../controllers/order.controller";
import * as orderDetailControllers from "../controllers/orderDetail.controller";
import { readCartByUserId } from "../controllers/cart.controller";

export const post = async (req: Request, res: Response) => {
  try {
    // const cartId = req.params.cartId;
    const userId = (req.user as UserTokenAttributes)?.id;
    //****TODO LOGICA PARA PAGOS
    //*************************/
    const cart = await readCartByUserId(userId);
    // console.log("cartId:", cart?.id);
    console.log({ cart });
    console.log("cartitems:", cart?.cartItems);

    if (!cart?.cartItems.length || cart?.cartItems.length === 0)
      return res
        .status(400)
        .json({ message: "Please to add products to cart" });

    const total = cart?.cartItems.reduce(
      (accum, current) => accum + current.price * current.quantity,
      0
    );

    console.log({ total });

    const order = await orderControllers.createOrder({
      cartId: cart?.id,
      total,
    });

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
      // return newOrderDetail;
      return orderDetailControllers.createOrderDetail(newOrderDetail);
    });

    await Promise.all(orderDetails);

    // for (const orderDetail of orderDetails) {
    //   await orderDetailControllers.createOrderDetail(orderDetail);
    // }

    return res.status(201).json({ message: "Post order" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
