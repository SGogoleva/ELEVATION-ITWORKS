import { createSlice } from '@reduxjs/toolkit';
import { Build, FetchStatusState } from '../../types';
import { Pagination } from '../../types/pagination';
import { fetchBuildsPaginatedThunk } from '../thunks/builds';

type BuildState = {

  buildsPage: Build[];
  pagination: Pagination;
};

const initialState: BuildState & FetchStatusState = {
  buildsPage: [],
  pagination: {
    totalCount: 0,
    page: 0,
    limit: 0,
    sort: '',
  },
  loading: false,
  error: null,
};

const buildSlice = createSlice({
  name: 'build',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBuildsPaginatedThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBuildsPaginatedThunk.fulfilled, (state, action) => {
        state.buildsPage = action.payload.builds;
        state.pagination.totalCount = action.payload.totalCount;
        state.loading = false
      })
      .addCase(fetchBuildsPaginatedThunk.rejected, (state, action) => {
        state.error = action.error.message || 'An error occurred';
        state.loading = false;
      });
  },
});

export default buildSlice.reducer;
