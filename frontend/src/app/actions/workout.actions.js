import { createAsyncThunk } from "@reduxjs/toolkit";
import { WORKOUTAPI } from "../apis/workout.api";

export const saveWorkout = createAsyncThunk(
  "workout/saveWorkout",
  async (data) => {
    const response = await WORKOUTAPI.saveWorkout(data);
    return response.data;
  }
);

export const getWorkouts = createAsyncThunk("workout/getWorkouts", async () => {
  const response = await WORKOUTAPI.getWorkouts();
  return response.data;
});

export const getWorkoutById = createAsyncThunk(
  "workout/getWorkoutById",
  async (id) => {
    const response = await WORKOUTAPI.getWorkoutById(id);
    return response.data;
  }
);

export const getWorkoutsByUserId = createAsyncThunk(
  "workout/getWorkoutsByUserId",
  async (id) => {
    const response = await WORKOUTAPI.getWorkoutsByUserId(id);
    return response.data;
  }
);

export const updateWorkoutById = createAsyncThunk(
  "workout/updateWorkoutById",
  async (data) => {
    const response = await WORKOUTAPI.updateWorkoutById(data.id, data);
    return response.data;
  }
);

export const likeWorkoutById = createAsyncThunk(
  "workout/likeWorkoutById",
  async (data) => {
    const response = await WORKOUTAPI.likeWorkoutById(data.id, data);
    return response.data;
  }
);

export const deleteWorkoutById = createAsyncThunk(
  "workout/deleteWorkoutById",
  async (id) => {
    const response = await WORKOUTAPI.deleteWorkoutById(id);
    return id;
  }
);
