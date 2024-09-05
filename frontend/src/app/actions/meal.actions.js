import { createAsyncThunk } from "@reduxjs/toolkit";
import { MEALAPI } from "../apis/meal.api";

export const saveMeal = createAsyncThunk("meal/saveMeal", async (data) => {
  const response = await MEALAPI.saveMeal(data);
  return response.data;
});

export const getMeals = createAsyncThunk("meal/getMeals", async () => {
  const response = await MEALAPI.getMeals();
  return response.data;
});

export const getMealById = createAsyncThunk("meal/getMealById", async (id) => {
  const response = await MEALAPI.getMealById(id);
  return response.data;
});

export const getMealsByUserId = createAsyncThunk(
  "meal/getMealsByUserId",
  async (id) => {
    const response = await MEALAPI.getMealsByUserId(id);
    return response.data;
  }
);

export const updateMealById = createAsyncThunk(
  "meal/updateMealById",
  async (data) => {
    const response = await MEALAPI.updateMealById(data.id, data);
    return response.data;
  }
);

export const likeMealById = createAsyncThunk(
  "meal/likeMealById",
  async (data) => {
    const response = await MEALAPI.likeMealById(data.id, data);
    return response.data;
  }
);

export const deleteMealById = createAsyncThunk(
  "meal/deleteMealById",
  async (id) => {
    const response = await MEALAPI.deleteMealById(id);
    return id;
  }
);
