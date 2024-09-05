import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_API;

export const MEALSHAREAPI = {
  saveMealShare: (data) => axios.meal(`${BASE_URL}/api/mealshare`, data),
  getMealShare: () => axios.get(`${BASE_URL}/api/mealshare`),
  getMealShareById: (id) => axios.get(`${BASE_URL}/api/mealshare/${id}`),
  getMealShareByUserId: (id) =>
    axios.get(`${BASE_URL}/api/mealshare/user/${id}`),
  updateMealShareById: (id, data) =>
    axios.put(`${BASE_URL}/api/mealshare/${id}`, data),
  deleteMealShareById: (id) => axios.delete(`${BASE_URL}/api/mealshare/${id}`),
};
