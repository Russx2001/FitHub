import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_API;

export const WORKOUTAPI = {
  saveWorkout: (data) => axios.post(`${BASE_URL}/api/workouts`, data),
  getWorkouts: () => axios.get(`${BASE_URL}/api/workouts`),
  getWorkoutById: (id) => axios.get(`${BASE_URL}/api/workouts/${id}`),
  getWorkoutsByUserId: (id) => axios.get(`${BASE_URL}/api/workouts/user/${id}`),
  updateWorkoutById: (id, data) =>
    axios.put(`${BASE_URL}/api/workouts/${id}`, data),
  likeWorkoutById: (id, data) =>
    axios.put(`${BASE_URL}/api/workouts/like/${id}`, data),
  deleteWorkoutById: (id) => axios.delete(`${BASE_URL}/api/workouts/${id}`),
};
