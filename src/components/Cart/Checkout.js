import React from 'react'
import classes from './Checkout.module.css';
import { useRef,useState } from 'react';

const isEmpty = value => value.trim().length==='';
const isFiveChars = value=> value.length===5;

function Checkout(props) {
    const [formInputValidity,setFormInputValidity] = useState({
        name:true,
        city:true,
        postal:true,
        street:true
    });
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

    const onConfirmHandler = (event)=>{
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredCity = cityInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPostalIsaValid = isFiveChars(enteredPostal);

        setFormInputValidity({
            name:enteredName,
            street:enteredStreet,
            postal:enteredPostal,
            city:enteredCity
        });

        const formIsValid = enteredNameIsValid && enteredCityIsValid && enteredStreetIsValid && enteredPostalIsaValid;
        if (!formIsValid) {
            return
        }
        props.onConfirm({
            name:formInputValidity.name,
            city:formInputValidity.city,
            street:formInputValidity.street,
            postal:formInputValidity.postal,
        });
    }
    return (
        <form onSubmit={onConfirmHandler} className={classes.form}>
            <div className={`${classes.control} ${formInputValidity.name?'': classes.invalid}`}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef}></input>
                {!formInputValidity.name && <p>Please enter a name</p>}
            </div>
            <div className={`${classes.control} ${formInputValidity.street?'': classes.invalid}`}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetInputRef}></input>
                {!formInputValidity.street && <p>Please enter a street address</p>}
            </div>
            <div className={`${classes.control} ${formInputValidity.postal?'': classes.invalid}`}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postalInputRef}></input>
                {!formInputValidity.postal && <p>Please enter a postal code</p>}
            </div>
            <div className={`${classes.control} ${formInputValidity.city?'': classes.invalid}`}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInputRef}></input>
                {!formInputValidity.city && <p>Please enter a city</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>Cancel</button>
                <button type='submit'>Confirm</button>
            </div>
        </form>
    )
}

export default Checkout
