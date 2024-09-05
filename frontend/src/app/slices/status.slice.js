import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  deleteStatusById,
  getStatusById,
  getStatuses,
  getStatusesByUserId,
  likeStatusById,
  saveStatus,
  updateStatusById,
} from "../actions/status.actions";

const getStatusByIdFunc = (statuses, statusId) => {
  const result = statuses.filter(function (el) {
    return el.id === statusId;
  });

  return result ? result[0] : null; // or undefined
};

const statusSlice = createSlice({
  name: "status",
  initialState: {
    selectedStatus: null,
    statuses: [],
  },
  reducers: {
    getStatusToShareById: (state, action) => {
      state.selectedStatus = getStatusByIdFunc(state.statuses, action.payload);
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(saveStatus.fulfilled, (state, action) => {
      state.statuses = [...state.statuses, action.payload];
      toast.success("Status Added");
    });
    builder.addCase(saveStatus.rejected, (state, action) => {
      toast.error("Something went wrong");
    });
    builder.addCase(getStatusById.fulfilled, (state, action) => {
      state.selectedStatus = action.payload;
    });
    builder.addCase(getStatusById.rejected, (state, action) => {
      toast.error("Something went wrong");
    });
    builder.addCase(getStatuses.fulfilled, (state, action) => {
      state.statuses = action.payload;
    });
    builder.addCase(getStatuses.rejected, (state, action) => {
      toast.error("Something went wrong");
    });
    builder.addCase(getStatusesByUserId.fulfilled, (state, action) => {
      state.statuses = action.payload;
    });
    builder.addCase(getStatusesByUserId.rejected, (state, action) => {
      toast.error("Something went wrong");
    });
    builder.addCase(updateStatusById.fulfilled, (state, action) => {
      state.statuses = state.statuses.map((x) =>
        x.id === action.payload.id ? action.payload : x
      );
      toast.success("Status Edited");
    });
    builder.addCase(updateStatusById.rejected, (state, action) => {
      toast.error("Something went wrong");
    });
    builder.addCase(likeStatusById.fulfilled, (state, action) => {
      state.statuses = state.statuses.map((x) =>
        x.id === action.payload.id ? action.payload : x
      );
    });
    builder.addCase(likeStatusById.rejected, (state, action) => {
      toast.error("Something went wrong");
    });
    builder.addCase(deleteStatusById.fulfilled, (state, action) => {
      state.statuses = state.statuses.filter((x) => x.id !== action.payload);
      toast.success("Status Deleted");
    });
    builder.addCase(deleteStatusById.rejected, (state, action) => {
      toast.error("Something went wrong");
    });
  },
});

export const { getStatusToShareById } = statusSlice.actions;

export default statusSlice.reducer;
