import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_API;

export const WORKOUTSHAREAPI = {
  saveWorkoutShare: (data) => axios.post(`${BASE_URL}/api/workoutshare`, data),
  getWorkoutShare: () => axios.get(`${BASE_URL}/api/workoutshare`),
  getWorkoutShareById: (id) => axios.get(`${BASE_URL}/api/workoutshare/${id}`),
  getWorkoutShareByUserId: (id) =>
    axios.get(`${BASE_URL}/api/workoutshare/user/${id}`),
  updateWorkoutShareById: (id, data) =>
    axios.put(`${BASE_URL}/api/workoutshare/${id}`, data),
  deleteWorkoutShareById: (id) =>
    axios.delete(`${BASE_URL}/api/workoutshare/${id}`),
};
