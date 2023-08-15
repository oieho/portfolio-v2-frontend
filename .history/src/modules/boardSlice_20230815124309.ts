import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
export interface ListState {
  data: any[];
  loading: boolean;
  error: string | null;
}
export interface BoardListPayload {
  title: string | null;
  count: string | null;
  regDate: string | null;
  searchType: string | null;
  keyword: string | null;
  selectedList: [] | number[];
}
const initialState: ListState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchList = createAsyncThunk(
  'boardSlice/fetchList',
  async (selected: BoardListPayload) => {
    try {
      const { title, count, regDate, searchType, keyword } = selected;
      const response = await axios.get(
        `/boards?title=${title}&count=${count}&regDate=${regDate}&searchType=${searchType}&keyword=${keyword}`,
      );
      return response.data;
    } catch (error: any) {
      throw Error(error.message);
    }
  },
);

export const fetchSelectedList = createAsyncThunk<any[], any>(
  'boardSlice/fetchSelectedList',
  async (selected: BoardListPayload) => {
    try {
      const { title, count, regDate, searchType, keyword, selectedList } =
        selected;
      const response = await axios.get(
        `/boards/selected?selectedList=${selectedList.join(
          ',',
        )}&title=${title}&count=${count}&regDate=${regDate}&searchType=${searchType}&keyword=${keyword}`,
      );
      return response.data;
    } catch (error: any) {
      throw Error(error.message);
    }
  },
);
export const fetchHashTags = createAsyncThunk(
  'boardSlice/fetchHashTags',
  async (selected: BoardListPayload) => {
    try {
      const { title, count, regDate, searchType, keyword } = selected;
      const response = await axios.get(
        `/boards/fetchHashTag?title=${title}&count=${count}&regDate=${regDate}&searchType=${searchType}&keyword=${keyword}`,
      );
      return response.data;
    } catch (error: any) {
      throw Error(error.message);
    }
  },
);
export const fetchTools = createAsyncThunk(
  'boardSlice/fetchTools',
  async (selected: BoardListPayload) => {
    try {
      const { title, count, regDate, searchType, keyword } = selected;
      const response = await axios.get(
        `/boards/fetchTool?title=${title}&count=${count}&regDate=${regDate}&searchType=${searchType}&keyword=${keyword}`,
      );
      return response.data;
    } catch (error: any) {
      throw Error(error.message);
    }
  },
);
const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchList.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchList.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Unknown error';
    });
    builder.addCase(fetchSelectedList.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchSelectedList.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchSelectedList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Unknown error';
    });
    builder.addCase(fetchHashTags.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchHashTags.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchHashTags.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Unknown error';
    });
    builder.addCase(fetchTools.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTools.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchTools.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Unknown error';
    });
  },
});

export default boardSlice;
