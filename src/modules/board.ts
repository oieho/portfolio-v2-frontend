import { createAction } from 'redux-actions';
import { createReducer } from 'typesafe-actions';
import { takeLatest, put, call, delay } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import * as api from '../lib/api/board';
import createRequestSaga from '../lib/createRequestSaga';
import { Board, Comment, searchInput, SearchResult } from '../App';

const GET_SEARCH_RESULT = 'board/SEARCH';
const SET_SEARCH_RESULT = 'board/SEARCH_RESULT';

export const FETCH_ONE = 'board/FETCH_ONE';
const FETCH_ONE_SUCCESS = 'board/FETCH_ONE_SUCCESS';
const FETCH_ONE_FAILURE = 'board/FETCH_ONE_FAILURE';

export const FETCH_COMMENT = 'board/FETCH_COMMENT';
const FETCH_COMMENT_SUCCESS = 'board/FETCH_COMMENT_SUCCESS';
const FETCH_COMMENT_FAILURE = 'board/FETCH_COMMENT_FAILURE';

export const FETCH_COMMENT_AND_SCROLL = 'board/FETCH_COMMENT_AND_SCROLL';
const FETCH_COMMENT_AND_SCROLL_SUCCESS =
  'board/FETCH_COMMENT_AND_SCROLL_SUCCESS';
const FETCH_COMMENT_AND_SCROLL_FAILURE =
  'board/FETCH_COMMENT_AND_SCROLL_FAILURE';

export const getSearchResult = createAction(
  GET_SEARCH_RESULT,
  ({ searchType, keyword }: searchInput) => ({ searchType, keyword }),
);
export const setSearchResult = createAction(
  SET_SEARCH_RESULT,
  (boards: SearchResult) => boards,
);

export const fetchOne = createAction(FETCH_ONE, (boardNo: number) => boardNo);
export const fetchComment = createAction(
  FETCH_COMMENT,
  (selectedList: number[]) => selectedList,
);
export const fetchCommentAndScroll = createAction(
  FETCH_COMMENT_AND_SCROLL,
  ({ wno, scrollTop }: any) => ({ wno, scrollTop }),
);
const fetchOneSaga = createRequestSaga(FETCH_ONE, api.fetchBoard);
const fetchCommentSaga = createRequestSaga(FETCH_COMMENT, api.fetchCommentList);

function* fetchSearchSaga(action: any) {
  try {
    const { searchType, keyword } = action.payload;
    const response: AxiosResponse = yield call(
      api.getSearchResult,
      searchType,
      keyword,
    );
    console.log(response.data);
    yield put(setSearchResult(response.data));
    // yield put(getSearchResult(response.data));
  } catch (e) {
    console.log(e);
  }
}
function* fetchCommentAndScrollSaga(action: any) {
  const { wno, scrollTop } = action.payload;
  const scrollArea = document.getElementById('scrollArea');
  yield put(fetchComment(wno));
  if (scrollArea) {
    yield delay(600);
    scrollArea.scrollTop = scrollTop as any;
  }
}

export function* boardSaga() {
  yield takeLatest(FETCH_ONE, fetchOneSaga);
  yield takeLatest(FETCH_COMMENT, fetchCommentSaga);
  yield takeLatest(FETCH_COMMENT_AND_SCROLL, fetchCommentAndScrollSaga);
  yield takeLatest(GET_SEARCH_RESULT, fetchSearchSaga);
}

export interface BoardState {
  board: Board[];
  comment: Comment[];
  error: any;
}

const initialState: BoardState = {
  board: [], //글 조회
  comment: [],
  error: null,
};

const board = createReducer(initialState, {
  [FETCH_ONE]: (state) => ({
    ...state,
    board: [],
  }),
  [FETCH_ONE_SUCCESS]: (state, action) => ({
    ...state,
    board: action.payload,
  }),
  [FETCH_ONE_FAILURE]: (state, action) => ({
    ...state,
    error: action.payload,
  }),
  [FETCH_COMMENT]: (state) => ({
    ...state,
    comment: [],
  }),
  [FETCH_COMMENT_SUCCESS]: (state, action) => ({
    ...state,
    comment: action.payload,
  }),
  [FETCH_COMMENT_FAILURE]: (state, action) => ({
    ...state,
    error: action.payload,
  }),
  [FETCH_COMMENT_AND_SCROLL]: (state) => ({
    ...state,
    comment: [],
  }),
  [FETCH_COMMENT_AND_SCROLL_SUCCESS]: (state, action) => ({
    ...state,
    comment: action.payload,
  }),
  [FETCH_COMMENT_AND_SCROLL_FAILURE]: (state, action) => ({
    ...state,
    error: action.payload,
  }),
  [SET_SEARCH_RESULT]: (state, action) => ({
    ...state,
    boards: action.payload,
  }),
});

export default board;
