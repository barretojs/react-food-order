import React from "react";
import Item from "../types/Item.type";

const CartContext = React.createContext({
  items: new Array<Item>(),
  totalAmount: 0,
  addItem: (item: Item) => {},
  removeItem: (id: string) => {},
  clearItem: (id: string) => {},
  clearCart: () => {},
  cartIsVisible: false,
  showCartHandler: () => {},
  hideCartHandler: () => {},
});

export default CartContext;
