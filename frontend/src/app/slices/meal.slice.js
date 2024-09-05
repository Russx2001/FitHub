import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  deleteMealById,
  getMealById,
  getMeals,
  getMealsByUserId,
  likeMealById,
  saveMeal,
  updateMealById,
} from "../actions/meal.actions";

const getMealByIdFunc = (meals, mealId) => {
  const result = meals.filter(function (el) {
    return el.id === mealId;
  });

  return result ? result[0] : null; // or undefined
};

const mealSlice = createSlice({
  name: "meal",
  initialState: {
    selectedMeal: null,
    meals: [],
  },
  reducers: {
    getMealToShareById: (state, action) => {
      state.selectedMeal = getMealByIdFunc(state.meals, action.payload);
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(saveMeal.fulfilled, (state, action) => {
      state.meals = [...state.meals, action.payload];
      toast.success("Meal Added");
    });
    builder.addCase(saveMeal.rejected, (state, action) => {
      toast.error("Something went wrong");
    });
    builder.addCase(getMealById.fulfilled, (state, action) => {
      state.selectedMeal = action.payload;
    });
    builder.addCase(getMealById.rejected, (state, action) => {
      toast.error("Something went wrong");
    });
    builder.addCase(getMeals.fulfilled, (state, action) => {
      state.meals = action.payload;
    });
    builder.addCase(getMeals.rejected, (state, action) => {
      toast.error("Something went wrong");
    });
    builder.addCase(getMealsByUserId.fulfilled, (state, action) => {
      state.meals = action.payload;
    });
    builder.addCase(getMealsByUserId.rejected, (state, action) => {
      toast.error("Something went wrong");
    });
    builder.addCase(updateMealById.fulfilled, (state, action) => {
      state.meals = state.meals.map((x) =>
        x.id === action.payload.id ? action.payload : x
      );
      toast.success("Meal Edited");
    });
    builder.addCase(updateMealById.rejected, (state, action) => {
      toast.error("Something went wrong");
    });
    builder.addCase(likeMealById.fulfilled, (state, action) => {
      state.meals = state.meals.map((x) =>
        x.id === action.payload.id ? action.payload : x
      );
    });
    builder.addCase(likeMealById.rejected, (state, action) => {
      toast.error("Something went wrong");
    });
    builder.addCase(deleteMealById.fulfilled, (state, action) => {
      state.meals = state.meals.filter((x) => x.id !== action.payload);
      toast.success("Meal Deleted");
    });
    builder.addCase(deleteMealById.rejected, (state, action) => {
      toast.error("Something went wrong");
    });
  },
});

export const { getMealToShareById } = mealSlice.actions;

export default mealSlice.reducer;
