import { createAsyncThunk } from "@reduxjs/toolkit";
import { WORKOUTSHAREAPI } from "../apis/workoutshare.api";

export const saveWorkoutShare = createAsyncThunk(
  "workoutshare/saveWorkoutShare",
  async (data) => {
    const response = await WORKOUTSHAREAPI.saveWorkoutShare(data);
    return response.data;
  }
);

export const getWorkoutShare = createAsyncThunk(
  "workoutshare/getWorkoutShare",
  async () => {
    const response = await WORKOUTSHAREAPI.getWorkoutShare();
    return response.data;
  }
);

export const getWorkoutShareById = createAsyncThunk(
  "workoutshare/getWorkoutShareById",
  async (id) => {
    const response = await WORKOUTSHAREAPI.getWorkoutShareById(id);
    return response.data;
  }
);

export const getWorkoutShareByUserId = createAsyncThunk(
  "workoutshare/getWorkoutShareByUserId",
  async (id) => {
    const response = await WORKOUTSHAREAPI.getWorkoutShareByUserId(id);
    return response.data;
  }
);

export const updateWorkoutShareById = createAsyncThunk(
  "workoutshare/updateWorkoutShareById",
  async (data) => {
    const response = await WORKOUTSHAREAPI.updateWorkoutShareById(
      data.id,
      data
    );
    return response.data;
  }
);

export const deleteWorkoutShareById = createAsyncThunk(
  "workoutshare/deleteWorkoutShareById",
  async (id) => {
    const response = await WORKOUTSHAREAPI.deleteWorkoutShareById(id);
    return id;
  }
);
