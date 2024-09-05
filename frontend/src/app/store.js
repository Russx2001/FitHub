import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice";
import postReducer from "./slices/post.slice";
import mealReducer from "./slices/meal.slice";
import workoutReducer from "./slices/workout.slice";
import statusReducer from "./slices/status.slice";
import commentReducer from "./slices/comment.slice";
import postshareReducer from "./slices/postshare.slice";
import notificationReducer from "./slices/notification.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    meal: mealReducer,
    workout: workoutReducer,
    status: statusReducer,
    comment: commentReducer,
    postshare: postshareReducer,
    notification: notificationReducer,
  },
});
