import { Router } from "express";
import { getCart, createCart, insertProductCart, updateQuantityProductCart, deleteCart, deleteProductCart,purchaseCart } from "../controllers/cartManager.js";

const cartRouter = Router()

cartRouter.get('/:cid', getCart )
cartRouter.post('/', createCart )
cartRouter.post('/:cid/products/:pid', insertProductCart)
cartRouter.post('/:cid/checkout',purchaseCart)
cartRouter.put('/:cid/products/:pid', updateQuantityProductCart )
cartRouter.delete('/:cid', deleteCart )
cartRouter.delete('/:cid/products/:pid', deleteProductCart )

export default cartRouter