import { createAsyncThunk } from "@reduxjs/toolkit";
import { MEALSHAREAPI } from "../apis/mealshare.api";

export const saveMealShare = createAsyncThunk(
  "mealshare/saveMealShare",
  async (data) => {
    const response = await MEALSHAREAPI.saveMealShare(data);
    return response.data;
  }
);

export const getMealShare = createAsyncThunk(
  "mealshare/getMealShare",
  async () => {
    const response = await MEALSHAREAPI.getMealShare();
    return response.data;
  }
);

export const getMealShareById = createAsyncThunk(
  "mealshare/getMealShareById",
  async (id) => {
    const response = await MEALSHAREAPI.getMealShareById(id);
    return response.data;
  }
);

export const getMealShareByUserId = createAsyncThunk(
  "mealshare/getMealShareByUserId",
  async (id) => {
    const response = await MEALSHAREAPI.getMealShareByUserId(id);
    return response.data;
  }
);

export const updateMealShareById = createAsyncThunk(
  "mealshare/updateMealShareById",
  async (data) => {
    const response = await MEALSHAREAPI.updateMealShareById(data.id, data);
    return response.data;
  }
);

export const deleteMealShareById = createAsyncThunk(
  "mealshare/deleteMealShareById",
  async (id) => {
    const response = await MEALSHAREAPI.deleteMealShareById(id);
    return id;
  }
);
