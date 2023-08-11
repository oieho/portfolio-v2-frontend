import { createAction } from 'redux-actions';
import { createReducer } from 'typesafe-actions';
import { takeLatest, call, put } from 'redux-saga/effects';
import * as api from '../lib/api/auth';
import client from '../lib/api/client';
import { AxiosResponse } from 'axios';
import {
  LoginInput,
  MyInfo,
  ModifyInfo,
  TryLoginAuth,
  ToggleLogin,
} from '../App';
import Cookies from 'js-cookie';

const SET_ACCESS_TOKEN = 'auth/SET_ACCESS_TOKEN';
const FAILED_LOGIN_AUTH = 'auth/FAILED_LOGIN_AUTH';
const LOGIN = 'auth/LOGIN';
const LOGIN_INFO = 'auth/LOGIN_INFO';
const SET_MODIFY_INFO = 'auth/SET_MODIFY_INFO';
const SET_MY_INFO = 'auth/SET_MY_INFO';
const CHECK_MY_INFO = 'auth/CHECK_MY_INFO';

export const setAccessToken = createAction(
  SET_ACCESS_TOKEN,
  (accessToken: string) => accessToken,
);

export const login = createAction(
  LOGIN,
  ({ userId, password, autoLogin }: LoginInput) => ({
    userId,
    password,
    autoLogin,
  }),
);

export const setModifyInfo = createAction(
  SET_MODIFY_INFO,
  (modifyInfo: ModifyInfo) => modifyInfo,
);

export const setMyInfo = createAction(SET_MY_INFO, (myInfo: MyInfo) => myInfo);
// 비동기 액션을 수행하는 태스크 작성
export const checkMyInfo = createAction(CHECK_MY_INFO);

export const setTryLoginAuth = createAction(
  FAILED_LOGIN_AUTH,
  (tryLoginAuth: TryLoginAuth) => tryLoginAuth,
);

export const setLoginInfo = createAction(
  LOGIN_INFO,
  (toggleLogin: ToggleLogin) => toggleLogin,
);
function* loginSaga(action: ReturnType<typeof login>) {
  try {
    const { userId, password, autoLogin } = action.payload;
    const response: AxiosResponse = yield call(api.signIn, userId, password);
    const { authorization } = response.headers;
    const accessToken = authorization?.substring(7) as string;
    client.defaults.headers.common.authorization = `Bearer ${accessToken}`;
    const { refreshauthorization } = response.headers;
    const refreshToken = refreshauthorization?.substring(7) as string;
    yield put(checkMyInfo(response.data));
    yield put(setLoginInfo(response.data));

    if (autoLogin === true) {
      yield put(setAccessToken(accessToken));
      Cookies.set('accessToken', accessToken); // 1시간
      Cookies.set('refreshToken', refreshToken); // 2주
    }
    if (response && response.status === 200) {
      yield put(setTryLoginAuth(false as any));
      return response;
    }
  } catch (e: any) {
    if (e.message === '인증 실패') {
      alert('로그인 3회 연속 실패로 5분 후 이용 바랍니다.');
      yield put(setTryLoginAuth(true as any));
    }
  }
}

function* checkMyInfoSaga() {
  try {
    const response: AxiosResponse = yield call(api.signInChk);
    yield put(setMyInfo(response.data));
    yield put(setLoginInfo(response.data));
    const contentDesc = document.getElementById('addComment');
    const url = window.location.href;
    const regex = /boards\/view\//;
    const match = url.match(regex);
    if (match) {
      contentDesc!.style.display = 'block' as any;

      const saying = document.getElementById('saying');
      saying!.style.opacity = 0 as any;
    }
  } catch (e) {
    console.log(e);
  }
}

// 로그인 사가 함수 작성
export function* authSaga() {
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(CHECK_MY_INFO, checkMyInfoSaga);
}

// 상태 인터페이스 정의
export interface AuthState {
  accessToken: string;
  myInfo: MyInfo | null;
  modifyInfo: ModifyInfo | null;
  tryLoginAuth: TryLoginAuth | null;
  toggleLogin: ToggleLogin | null;
  token: string;
  error: any;
}
// 초기 상태
const initialState: AuthState = {
  accessToken: '',
  myInfo: null,
  modifyInfo: null,
  tryLoginAuth: null,
  toggleLogin: null,
  token: '',
  error: null,
};
// 리듀서 함수 정의
const auth = createReducer(initialState, {
  [SET_ACCESS_TOKEN]: (state, action) => ({
    ...state,
    accessToken: action.payload,
  }),
  [FAILED_LOGIN_AUTH]: (state, action) => ({
    ...state,
    tryLoginAuth: action.payload,
  }),
  [LOGIN_INFO]: (state, action) => ({
    ...state,
    toggleLogin: action.payload,
  }),
  [SET_MY_INFO]: (state, action) => ({ ...state, myInfo: action.payload }),
  [SET_MODIFY_INFO]: (state, action) => ({
    ...state,
    modifyInfo: action.payload,
  }),
});

export default auth;
