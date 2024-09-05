import { createAsyncThunk } from "@reduxjs/toolkit";
import { STATUS_SHAREAPI } from "../apis/statusshare.api";

export const saveStatusShare = createAsyncThunk(
  "statuseshare/saveStatusShare",
  async (data) => {
    const response = await STATUS_SHAREAPI.saveStatusShare(data);
    return response.data;
  }
);

export const getStatusShare = createAsyncThunk(
  "statuseshare/getStatusShare",
  async () => {
    const response = await STATUS_SHAREAPI.getStatusShare();
    return response.data;
  }
);

export const getStatusShareById = createAsyncThunk(
  "statuseshare/getStatusShareById",
  async (id) => {
    const response = await STATUS_SHAREAPI.getStatusShareById(id);
    return response.data;
  }
);

export const getStatusShareByUserId = createAsyncThunk(
  "statuseshare/getStatusShareByUserId",
  async (id) => {
    const response = await STATUS_SHAREAPI.getStatusShareByUserId(id);
    return response.data;
  }
);

export const updateStatusShareById = createAsyncThunk(
  "statuseshare/updateStatusShareById",
  async (data) => {
    const response = await STATUS_SHAREAPI.updateStatusShareById(data.id, data);
    return response.data;
  }
);

export const deleteStatusShareById = createAsyncThunk(
  "statuseshare/deleteStatusShareById",
  async (id) => {
    const response = await STATUS_SHAREAPI.deleteStatusShareById(id);
    return id;
  }
);
