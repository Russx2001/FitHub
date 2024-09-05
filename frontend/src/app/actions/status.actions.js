import { createAsyncThunk } from "@reduxjs/toolkit";
import { STATUSAPI } from "../apis/status.api";

export const saveStatus = createAsyncThunk(
  "status/saveStatus",
  async (data) => {
    const response = await STATUSAPI.saveStatus(data);
    return response.data;
  }
);

export const getStatuses = createAsyncThunk("status/getStatuses", async () => {
  const response = await STATUSAPI.getStatuses();
  return response.data;
});

export const getStatusById = createAsyncThunk(
  "status/getStatusById",
  async (id) => {
    const response = await STATUSAPI.getStatusById(id);
    return response.data;
  }
);

export const getStatusesByUserId = createAsyncThunk(
  "status/getStatusesByUserId",
  async (id) => {
    const response = await STATUSAPI.getStatusesByUserId(id);
    return response.data;
  }
);

export const updateStatusById = createAsyncThunk(
  "status/updateStatusById",
  async (data) => {
    const response = await STATUSAPI.updateStatusById(data.id, data);
    return response.data;
  }
);

export const likeStatusById = createAsyncThunk(
  "status/likeStatusById",
  async (data) => {
    const response = await STATUSAPI.likeStatusById(data.id, data);
    return response.data;
  }
);

export const deleteStatusById = createAsyncThunk(
  "status/deleteStatusById",
  async (id) => {
    const response = await STATUSAPI.deleteStatusById(id);
    return id;
  }
);
