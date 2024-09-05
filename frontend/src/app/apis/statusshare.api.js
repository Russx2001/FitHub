import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_API;

export const STATUS_SHAREAPI = {
  saveStatusShare: (data) => axios.post(`${BASE_URL}/api/statusshare`, data),
  getStatusShare: () => axios.get(`${BASE_URL}/api/statusshare`),
  getStatusShareById: (id) => axios.get(`${BASE_URL}/api/statusshare/${id}`),
  getStatusShareByUserId: (id) =>
    axios.get(`${BASE_URL}/api/statusshare/user/${id}`),
  updateStatusShareById: (id, data) =>
    axios.put(`${BASE_URL}/api/statusshare/${id}`, data),
  deleteStatusShareById: (id) =>
    axios.delete(`${BASE_URL}/api/statusshare/${id}`),
};
