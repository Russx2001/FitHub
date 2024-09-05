import React, { useEffect, useState } from "react";
import Meals from "../../Components/Meals";
import { useDispatch, useSelector } from "react-redux";
import { getMeals } from "../../app/actions/meal.actions";
import { Select } from 'antd';

const { Option } = Select;

function MealPlan() {
  const dispatch = useDispatch();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const meal = useSelector((state) => state.meal);

  useEffect(() => {
    dispatch(getMeals());
  }, [dispatch]);

  const handleChange = (value) => {
    setSelectedCategories(value);
  };

  // Filter meals based on selected categories or display all meals if no category is selected
  const filteredMeals = meal.meals.filter((meal) => {
    if (selectedCategories.length === 0) {
      return true; // Show all meals if no category is selected
    } else {
      return selectedCategories.includes(meal.category); // Filter meals by selected categories
    }
  });

  return (
    <div className="container mt-5 mb-5 row">
      <div className="col-md-3"></div>
      <div className="col-md-8">
        <Select
          className="mb-3 col-md-3"
          mode="multiple"
          allowClear
          style={{ width: '83%' }}
          placeholder="Select meal categories"
          onChange={handleChange}
        >
          <Option value="vegetarian">Vegetarian</Option>
          <Option value="vegan">Vegan</Option>
          <Option value="non-veg">Non-Vegetarian</Option>
          {meal.categories && meal.categories.map(category => (
            <Option key={category} value={category}>{category}</Option>
          ))}
        </Select>

        <div className="row">
          <div className="col-md-10">
            <Meals meals={filteredMeals} selectedCategories={selectedCategories} fetchType="GET_ALL_MEALS" />
          </div>
        </div>
      </div>
      <div className="col-md-2"></div>
    </div>
  );
}

export default MealPlan;
