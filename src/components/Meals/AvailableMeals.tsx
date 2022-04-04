import Meal from "../../types/Meal.type";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const DUMMY_MEALS: Meal[] = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
];

const AvailableMeals: React.VFC = () => {
  return (
    <Card>
      <ul className={classes.meals}>
        {DUMMY_MEALS.map((meal: Meal) => {
          return (
            <MealItem
              id={meal.id}
              description={meal.description}
              name={meal.description}
              price={meal.price}
              key={meal.id}
            />
          );
        })}
      </ul>
    </Card>
  );
};

export default AvailableMeals;
