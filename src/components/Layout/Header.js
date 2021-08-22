import React,{useContext} from 'react';
import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';
import CartContext from '../../store/cart-context';

import HeaderCartButton from './HeaderCartButton';

const Header = (props)=>{
    
    return(
        <React.Fragment>
            <header className={classes.header}>
                <h1>React Meals</h1>
                <HeaderCartButton onClick={props.onShowCart}></HeaderCartButton>
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt="A table full of delicious food!" />
            </div>
        </React.Fragment>
    );
}

export default Header;