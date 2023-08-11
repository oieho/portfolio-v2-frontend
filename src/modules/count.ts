import { createAction } from 'redux-actions';
import { createReducer } from 'typesafe-actions';
import * as api from '../lib/api/auth';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga from '../lib/createRequestSaga';
import { CountInfo } from '../App';
const FETCH_COUNT = 'count/FETCH_COUNT';

export const fetchCount = createAction(FETCH_COUNT);
const FETCH_COUNT_SUCCESS = 'count/FETCH_COUNT_SUCCESS';
const FETCH_COUNT_FAILURE = 'count/FETCH_COUNT_FAILURE';

const fetchCountSaga = createRequestSaga(FETCH_COUNT, api.fetchCountList);
// 로그인 사가 함수 작성
export function* countSaga() {
  yield takeLatest(FETCH_COUNT, fetchCountSaga);
}

export interface CountState {
  countInfos: CountInfo[];
}

const initialState: CountState = {
  countInfos: [],
};

const count = createReducer(initialState, {
  [FETCH_COUNT]: (state) => ({
    ...state,
    countInfos: [],
  }),
  [FETCH_COUNT_SUCCESS]: (state, action) => ({
    ...state,
    countInfos: action.payload,
  }),
  [FETCH_COUNT_FAILURE]: (state, action) => ({
    ...state,
    countInfos: action.payload,
  }),
});
export default count;
