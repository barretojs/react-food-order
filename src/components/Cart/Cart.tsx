import { useContext } from "react";
import CartContext from "../../store/cart-context";
import Item from "../../types/Item.type";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart: React.VFC = () => {
  const cartContext = useContext(CartContext);

  const cartItemRemoveHanlder = (id: string) => {
    cartContext.removeItem(id);
  };

  const cartItemAddHanlder = (item: Item) => {
    cartContext.addItem({ ...item, amount: 1 });
  };

  const cartItemClearHandler = (id: string) => {
    cartContext.clearItem(id);
  };

  const cartItens = (
    <ul className={classes["cart-items"]}>
      {cartContext.items.map((item: Item) => {
        return (
          <CartItem
            key={item.id}
            amount={item.amount}
            name={item.name}
            price={item.price}
            onClear={cartItemClearHandler.bind(null, item.id)}
            onAdd={cartItemAddHanlder.bind(null, item)}
            onRemove={cartItemRemoveHanlder.bind(null, item.id)}
          />
        );
      })}
    </ul>
  );

  return (
    <>
      {cartContext.cartIsVisible && (
        <Modal>
          <button
            className={classes["clear-button"]}
            onClick={cartContext.clearCart}
          >
            Clear
          </button>
          {cartItens}
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>${cartContext.totalAmount.toFixed(2)}</span>
          </div>
          <div className={classes.actions}>
            <button
              className={classes["button--alt"]}
              onClick={cartContext.hideCartHandler}
            >
              Close
            </button>
            {!!cartContext.items.length && (
              <button
                className={classes.button}
                onClick={cartContext.hideCartHandler}
              >
                Order
              </button>
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

export default Cart;
