import { ReactChild, useEffect, useReducer, useState } from "react";
import Item from "../types/Item.type";
import CartContext from "./cart-context";

type Props = {
  children?: ReactChild | ReactChild[];
};

type CartState = {
  items: Item[];
  totalAmount: number;
};

type CartAction = {
  type: string;
  item?: Item;
  id?: string;
};

const defaultCartState: CartState = {
  items: new Array<Item>(),
  totalAmount: 0,
};

const cartReducer = (state: CartState, action: CartAction) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item!.price * action.item!.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item: Item) => item.id === action.item!.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item!.amount,
      };

      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item!);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item: any) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    const updatedTotalAmount = state.totalAmount - existingCartItem.price;

    let updatedItems;

    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter((item: any) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "CLEAR_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item: any) => item.id === action.id
    );

    const existingCartItem = state.items[existingCartItemIndex];

    const updatedTotalAmount =
      state.totalAmount - existingCartItem.price * existingCartItem.amount;

    const updatedItems = state.items.filter(
      (item: any) => item.id !== action.id
    );

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "CLEAR_CART") {
    return {
      items: new Array<Item>(),
      totalAmount: 0,
    };
  }
  return defaultCartState;
};

const CartProvider: React.VFC<Props> = (props) => {
  const addItem = (item: Item) => {
    dispatchCartAction({
      type: "ADD",
      item,
    });
  };
  const removeItem = (id: string) => {
    dispatchCartAction({
      type: "REMOVE",
      id,
    });
  };
  const clearItem = (id: string) => {
    dispatchCartAction({
      type: "CLEAR_ITEM",
      id,
    });
  };
  const clearCart = () => {
    dispatchCartAction({
      type: "CLEAR_CART",
    });
  };

  const [cartIsVisible, setCartIsVisible] = useState(false);
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const showCartHandler = () => {
    setCartIsVisible(true);
  };
  const hideCartHandler = () => {
    setCartIsVisible(false);
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem,
    removeItem,
    clearItem,
    clearCart,
    cartIsVisible,
    showCartHandler,
    hideCartHandler,
  };

  useEffect(() => {
    if (!cartState.items.length) setCartIsVisible(false);
  }, [cartState.items.length]);

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
