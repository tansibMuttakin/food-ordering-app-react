import React, {useContext, useEffect, useState} from 'react';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import CartContext from '../../store/cart-context';

const HeaderCartButton = (props)=>{
    const [btnIsHighlighted, setButtonIsHighlighted] = useState(false);
    const cartCtx = useContext(CartContext);
    const {items} = cartCtx;
    useEffect(() => {
        if (items.length===0) {
            return;
        }
        setButtonIsHighlighted(true);
        const timer = setTimeout(()=>{
            setButtonIsHighlighted(false);
        },300);
        return () => {
            clearTimeout(timer);
        }
    }, [items])
    const numberOfCartItems = items.reduce((curNumber,item)=>{
        return curNumber + item.amount;
    },0)
    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump :''}`;
    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon></CartIcon>
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    );
}

export default HeaderCartButton;