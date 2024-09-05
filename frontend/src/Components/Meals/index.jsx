import React, { useEffect, useState } from "react";
import MealCard from "../MealCard";

function Meals({ meals, fetchType }) {
  const [mealsList, setMealsList] = useState([]);

  useEffect(() => {
    if (meals) {
      setMealsList(meals);
    }
  }, [meals]);

  return (
    <div>
      {mealsList.length ? [...mealsList].reverse().map((meal) => {
        return <MealCard key={meal.id} meal={meal} fetchType={fetchType} />;
      }) : <h5>No Meals yet...</h5>}
    </div>
  );
}

export default Meals;
