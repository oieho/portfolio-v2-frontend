import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import board, { boardSaga } from './board';
import member, { memberSaga } from './member';
import count, { countSaga } from './count';
import loading from './loading';
import boardSlice from './boardSlice';

import { AuthState } from './auth';
import { BoardState } from './board';

import { MemberState } from './member';
import { CountState } from './count';
import { LoadingState } from './loading';
import { combineReducers } from '@reduxjs/toolkit';

export interface RootState {
  auth: AuthState;
  board: BoardState;
  boards: BoardState;
  comment: BoardState;
  member: MemberState;
  count: CountState;
  loading: LoadingState;
}
const rootReducer = combineReducers({
  auth,
  board,
  member,
  count,
  loading,
  boardSlice: boardSlice.reducer,
});

export function* rootSaga() {
  yield all([authSaga(), boardSaga(), memberSaga(), countSaga()]);
}
export default rootReducer;
