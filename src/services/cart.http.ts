import { Request,Response } from "express"

export addToCart=async(_req:Request,res:Response):Promise<Response>=>{
    
    return res.send("product added")

}