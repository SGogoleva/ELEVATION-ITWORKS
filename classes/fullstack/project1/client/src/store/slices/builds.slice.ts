import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Build, BuildCountWeekly } from '../../types';
import { Pagination } from '../../types/pagination';
import { fetchBuildGroupedByWeekThunk, fetchBuildsPaginatedThunk } from '../thunks/builds';

type FetchStatusState = {
  loading: boolean;
  error: string | null;
  groupedLoading: boolean,
  groupedError: string | null,  
};

type BuildState = {
  buildsPage: Build[];
  pagination: Pagination;
  buildsPerWeek: BuildCountWeekly;
};

const initialState: BuildState & FetchStatusState = {
  buildsPage: [],
  pagination: {
    page: 0,
    limit: 0,
    sort: '',
  },
  buildsPerWeek: {},
  loading: false,
  error: null,
  groupedLoading: false,
  groupedError: null,
};

const buildSlice = createSlice({
  name: 'build',
  initialState,
  reducers: {
    setBuilds(state, action: PayloadAction<Omit<BuildState, 'buildsPerWeek'>>) {
      state.buildsPage = action.payload.buildsPage;
      state.pagination = action.payload.pagination;
    },
    setBuildsPerWeek(state, action: PayloadAction<BuildCountWeekly>) {
      state.buildsPerWeek = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBuildsPaginatedThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBuildsPaginatedThunk.fulfilled, (state, action) => {
        state.buildsPage = action.payload;
        state.loading = false;
      })
      .addCase(fetchBuildsPaginatedThunk.rejected, (state, action) => {
        console.log('🚀 ~ builder.addCase ~ action:', action);
        state.error = action.error.message || 'An error occurred';
        state.loading = false;
      })
      .addCase(fetchBuildGroupedByWeekThunk.pending, (state) => {
        state.groupedLoading = true;
      })
      .addCase(fetchBuildGroupedByWeekThunk.fulfilled, (state, action) => {
        state.buildsPerWeek = action.payload;
        state.groupedLoading = false;
      })
      .addCase(fetchBuildGroupedByWeekThunk.rejected, (state, action) => {
        state.groupedError = action.error.message || 'An error occurred';
        state.groupedLoading = false;
      });
  },
});

export const { setBuilds, setBuildsPerWeek } = buildSlice.actions;
export default buildSlice.reducer;
