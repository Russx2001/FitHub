import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_API;

export const STATUSAPI = {
  saveStatus: (data) => axios.post(`${BASE_URL}/api/statuses`, data),
  getStatuses: () => axios.get(`${BASE_URL}/api/statuses`),
  getStatusById: (id) => axios.get(`${BASE_URL}/api/statuses/${id}`),
  getStatusesByUserId: (id) => axios.get(`${BASE_URL}/api/statuses/user/${id}`),
  updateStatusById: (id, data) =>
    axios.put(`${BASE_URL}/api/statuses/${id}`, data),
  likeStatusById: (id, data) =>
    axios.put(`${BASE_URL}/api/statuses/like/${id}`, data),
  deleteStatusById: (id) => axios.delete(`${BASE_URL}/api/statuses/${id}`),
};
