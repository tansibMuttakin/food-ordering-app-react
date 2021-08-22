import classes  from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import { useContext } from 'react';
import CartItem from './CartItem';

const Cart = (props)=>{
    const cartCtx = useContext(CartContext);
    const cartItemRemoveHandler=(id)=>{
        cartCtx.removeItem(id);
    }
    const cartItemAddHandler=(item)=>{
        cartCtx.addItem({...item,amount:1});
    }

    const cartItems  = cartCtx.items.map((item)=>(
        <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            onRemove={cartItemRemoveHandler.bind(null,item.id)}
            onAdd={cartItemAddHandler.bind(null,item)}
        >
            {item.name}
        </CartItem>
    ))
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    return (
        <Modal onClose={props.onClose}>
            <ul className={classes['cart-items']}>
                {cartItems}
            </ul>
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
                {cartCtx.items.length > 0 && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    );
}
export default Cart;