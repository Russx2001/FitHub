import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_API;

export const MEALAPI = {
  saveMeal: (data) => axios.post(`${BASE_URL}/api/meals`, data),
  getMeals: () => axios.get(`${BASE_URL}/api/meals`),
  getMealById: (id) => axios.get(`${BASE_URL}/api/meals/${id}`),
  getMealsByUserId: (id) => axios.get(`${BASE_URL}/api/meals/user/${id}`),
  updateMealById: (id, data) => axios.put(`${BASE_URL}/api/meals/${id}`, data),
  likeMealById: (id, data) =>
    axios.put(`${BASE_URL}/api/meals/like/${id}`, data),
  deleteMealById: (id) => axios.delete(`${BASE_URL}/api/meals/${id}`),
};
