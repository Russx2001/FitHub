import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  deleteMealShareById,
  getMealShare,
  getMealShareById,
  getMealShareByUserId,
  saveMealShare,
  updateMealShareById,
} from "../actions/mealshare.actions";

const mealShareSlice = createSlice({
  name: "mealshare",
  initialState: {
    selectedMeal: null,
    meals: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(saveMealShare.fulfilled, (state, action) => {
      state.meals = [...state.meals, action.payload];
      toast.success("Meal Shared");
    });
    builder.addCase(saveMealShare.rejected, (state, action) => {
      toast.error("Something went wrong");
    });
    builder.addCase(getMealShareById.fulfilled, (state, action) => {
      state.selectedMeal = action.payload;
    });
    builder.addCase(getMealShareById.rejected, (state, action) => {
      toast.error("Something went wrong");
    });
    builder.addCase(getMealShare.fulfilled, (state, action) => {
      state.meals = action.payload;
    });
    builder.addCase(getMealShare.rejected, (state, action) => {
      toast.error("Something went wrong");
    });
    builder.addCase(getMealShareByUserId.fulfilled, (state, action) => {
      state.meals = action.payload;
    });
    builder.addCase(getMealShareByUserId.rejected, (state, action) => {
      toast.error("Something went wrong");
    });
    builder.addCase(updateMealShareById.fulfilled, (state, action) => {
      state.meals = state.meals.map((x) =>
        x.id === action.payload.id ? action.payload : x
      );
      toast.success("Shared Meal Edited");
    });
    builder.addCase(updateMealShareById.rejected, (state, action) => {
      toast.error("Something went wrong");
    });
    builder.addCase(deleteMealShareById.fulfilled, (state, action) => {
      state.meals = state.meals.filter((x) => x.id !== action.payload);
      toast.success("Shared Meal Deleted");
    });
    builder.addCase(deleteMealShareById.rejected, (state, action) => {
      toast.error("Something went wrong");
    });
  },
});

export default mealShareSlice.reducer;
