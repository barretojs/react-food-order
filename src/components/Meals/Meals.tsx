import AvailableMeals from "./AvailableMeals";
import MealsSummary from "./MealsSummary";

const Meals: React.VFC = () => {
  return (
    <>
      <MealsSummary />
      <AvailableMeals />
    </>
  );
};

export default Meals;
