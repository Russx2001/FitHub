import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  deleteWorkoutById,
  getWorkoutById,
  getWorkouts,
  getWorkoutsByUserId,
  likeWorkoutById,
  saveWorkout,
  updateWorkoutById,
} from "../actions/workout.actions";

const getWorkoutByIdFunc = (workouts, workoutId) => {
  const result = workouts.filter(function (el) {
    return el.id === workoutId;
  });

  return result ? result[0] : null; // or undefined
};

const workoutSlice = createSlice({
  name: "workout",
  initialState: {
    selectedWorkout: null,
    workouts: [],
  },
  reducers: {
    getWorkoutToShareById: (state, action) => {
      state.selectedWorkout = getWorkoutByIdFunc(
        state.workouts,
        action.payload
      );
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(saveWorkout.fulfilled, (state, action) => {
      state.workouts = [...state.workouts, action.payload];
      toast.success("Workout Added");
    });
    builder.addCase(saveWorkout.rejected, (state, action) => {
      toast.error("Something went wrong");
    });
    builder.addCase(getWorkoutById.fulfilled, (state, action) => {
      state.selectedWorkout = action.payload;
    });
    builder.addCase(getWorkoutById.rejected, (state, action) => {
      toast.error("Something went wrong");
    });
    builder.addCase(getWorkouts.fulfilled, (state, action) => {
      state.workouts = action.payload;
    });
    builder.addCase(getWorkouts.rejected, (state, action) => {
      toast.error("Something went wrong");
    });
    builder.addCase(getWorkoutsByUserId.fulfilled, (state, action) => {
      state.workouts = action.payload;
    });
    builder.addCase(getWorkoutsByUserId.rejected, (state, action) => {
      toast.error("Something went wrong");
    });
    builder.addCase(updateWorkoutById.fulfilled, (state, action) => {
      state.workouts = state.workouts.map((x) =>
        x.id === action.payload.id ? action.payload : x
      );
      toast.success("Workout Edited");
    });
    builder.addCase(updateWorkoutById.rejected, (state, action) => {
      toast.error("Something went wrong");
    });
    builder.addCase(likeWorkoutById.fulfilled, (state, action) => {
      state.workouts = state.workouts.map((x) =>
        x.id === action.payload.id ? action.payload : x
      );
    });
    builder.addCase(likeWorkoutById.rejected, (state, action) => {
      toast.error("Something went wrong");
    });
    builder.addCase(deleteWorkoutById.fulfilled, (state, action) => {
      state.workouts = state.workouts.filter((x) => x.id !== action.payload);
      toast.success("Workout Deleted");
    });
    builder.addCase(deleteWorkoutById.rejected, (state, action) => {
      toast.error("Something went wrong");
    });
  },
});

export const { getWorkoutToShareById } = workoutSlice.actions;

export default workoutSlice.reducer;
