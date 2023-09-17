import { createAction } from 'redux-actions';
import { createReducer } from 'typesafe-actions';
import { takeLatest } from 'redux-saga/effects';
import * as api from '../lib/api/auth';
import createRequestSaga from '../lib/createRequestSaga';
import { Member } from '../App';

export const FETCH_ONE = 'member/FETCH_ONE';
const FETCH_ONE_SUCCESS = 'member/FETCH_ONE_SUCCESS';
const FETCH_ONE_FAILURE = 'member/FETCH_ONE_FAILURE';

export const fetchOne = createAction(FETCH_ONE, (userNo: number) => userNo);

const fetchOneSaga = createRequestSaga(FETCH_ONE, api.fetchMemberModify);

export function* memberSaga() {
  yield takeLatest(FETCH_ONE, fetchOneSaga);
}

export interface MemberState {
  member: Member | null;
  error: any;
}

const initialState: MemberState = {
  member: null,
  error: null,
};

const member = createReducer(initialState, {
  [FETCH_ONE]: (state) => ({
    ...state,
    member: null,
  }),
  [FETCH_ONE_SUCCESS]: (state, action) => ({
    ...state,
    member: action.payload,
  }),
  [FETCH_ONE_FAILURE]: (state, action) => ({
    ...state,
    error: action.payload,
  }),
});

export default member;
