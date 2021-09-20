import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';

// const DUMMY_MEALS = [
//     {
//       id: 'm1',
//       name: 'Sushi',
//       description: 'Finest fish and veggies',
//       price: 22.99,
//     },
//     {
//       id: 'm2',
//       name: 'Schnitzel',
//       description: 'A german specialty!',
//       price: 16.5,
//     },
//     {
//       id: 'm3',
//       name: 'Barbecue Burger',
//       description: 'American, raw, meaty',
//       price: 12.99,
//     },
//     {
//       id: 'm4',
//       name: 'Green Bowl',
//       description: 'Healthy...and green...',
//       price: 18.99,
//     },
// ];

const AvailableMeals = ()=>{
  const [meals,setMeals] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  const [httpError,setHttpError] = useState();

  useEffect(()=>{
    const featchMeals = async ()=>{
      const response = await fetch('https://food-ordering-app-react-62eb0-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json');
      if (!response.ok) {
        throw new Error('something went wrong!');
      }
      const responseData = await response.json();
      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id:key,
          name:responseData[key].name,
          describe:responseData[key].description,
          price:responseData[key].price
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    }
    featchMeals().catch((error)=>{
      setIsLoading(false);
      setHttpError(error.message);
    });

  },[]);
  if (httpError) {
    return(
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    )
  }
    // helper function
    const  mealsList = meals.map((meal)=>(
        <MealItem
          key={meal.id}
          id={meal.id}
          name={meal.name}
          price={meal.price}
          description={meal.description}
        />
    ));

    return(
      <section className={classes.meals}>
        <Card>
          {isLoading && <p className={classes.text_center}>loading....</p>}
          {!isLoading && <ul>{mealsList}</ul>}
        </Card>
      </section>
    );
}
export default AvailableMeals;