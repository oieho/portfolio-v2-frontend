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
  IfNotLoggedDisplayBlock,
  ToggleLogin,
} from '../App';
import Cookies from 'js-cookie';

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const SET_ACCESS_TOKEN = 'auth/SET_ACCESS_TOKEN';
const FAILED_LOGIN_AUTH = 'auth/FAILED_LOGIN_AUTH';
const LOGIN = 'auth/LOGIN';
const LOGIN_INFO = 'auth/LOGIN_INFO';
const SET_MODIFY_INFO = 'auth/SET_MODIFY_INFO';
const SET_MY_INFO = 'auth/SET_MY_INFO';
const CHECK_MY_INFO = 'auth/CHECK_MY_INFO';
const SET_TIME_TO_LIVE = 'auth/TIME_TO_LIVE';
const IF_NOT_LOGGED_DISPLAY_BLOCK = 'auth/IF_NOT_LOGGED_DISPLAY_BLOCK';

export const loginSuccess = createAction<boolean>(LOGIN_SUCCESS);

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

export const ifNotLoggedDisplayBlock = createAction(
  IF_NOT_LOGGED_DISPLAY_BLOCK,
  (ifNotLoggedDisplayBlock: IfNotLoggedDisplayBlock) => ifNotLoggedDisplayBlock,
);

export const setTimeToLive = createAction(
  SET_TIME_TO_LIVE,
  (timeToLive: number) => timeToLive,
);

function* loginSaga(action: ReturnType<typeof login>) {
  try {
    const { userId, password, autoLogin } = action.payload;
    const response: AxiosResponse = yield call(api.signIn, userId, password);
    const accessToken = (response.headers.authorization as string)?.substring(
      7,
    ) as string;
    client.defaults.headers.common.authorization = `Bearer ${accessToken}`;
    const refreshToken = (response.headers.refreshauth as string)?.substring(
      7,
    ) as string;
    yield put(checkMyInfo(response.data));
    yield put(setLoginInfo(response.data));
    if (autoLogin === true) {
      yield put(setAccessToken(accessToken));
      Cookies.set('accessToken', accessToken); // 1시간
      Cookies.set('refreshToken', refreshToken); // 2주
    }

    if (response && response.status === 200) {
      yield put(loginSuccess(true));
      yield put(setTryLoginAuth(false as any));
      yield put(ifNotLoggedDisplayBlock({ ifNotLoggedDisplayBlock: false }));
      return response;
    }
  } catch (e: any) {
    if (e.message.includes('인증 실패')) {
      const ttl = e.message.substring(e.message.indexOf(',') + 1).trim();
      const minutes = Math.floor(ttl / 60); // 분으로 변환한 후 정수 부분만 취함
      const seconds = ttl % 60; // 초 부분

      alert(
        '로그인 3회 연속 실패로 ' +
          minutes +
          '분 ' +
          seconds +
          '초 후 이용 바랍니다.',
      );

      yield put(setTimeToLive(ttl));
      yield put(setTryLoginAuth(true as any));
    } else if (e.message.includes('2회 시도까지 로그인창 block')) {
      yield put(ifNotLoggedDisplayBlock({ ifNotLoggedDisplayBlock: true }));
    }
  } finally {
    const memberLogin = document.getElementById('memberLogin');
    const memberJoin = document.getElementById('memberJoin');
    if (memberLogin && memberJoin) {
      memberJoin.style.display = 'none';
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
  loginSuccess: boolean;
  accessToken: string;
  myInfo: MyInfo | null;
  modifyInfo: ModifyInfo | null;
  tryLoginAuth: TryLoginAuth | null;
  toggleLogin: ToggleLogin | null;
  ifNotLoggedDisplayBlock: IfNotLoggedDisplayBlock | any;
  timeToLive: number;
  token: string;
  error: any;
}
// 초기 상태
const initialState: AuthState = {
  loginSuccess: false,
  error: null,
  accessToken: '',
  myInfo: null,
  modifyInfo: null,
  tryLoginAuth: null,
  toggleLogin: null,
  ifNotLoggedDisplayBlock: true,
  timeToLive: 0,
  token: '',
};
// 리듀서 함수 정의
const auth = createReducer(initialState, {
  [LOGIN_SUCCESS]: (state, action) => ({
    ...state,
    loginSuccess: action.payload,
  }),
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
  [IF_NOT_LOGGED_DISPLAY_BLOCK]: (state, action) => ({
    ...state,
    ifNotLoggedDisplayBlock: action.payload,
  }),
  [SET_MY_INFO]: (state, action) => ({ ...state, myInfo: action.payload }),
  [SET_MODIFY_INFO]: (state, action) => ({
    ...state,
    modifyInfo: action.payload,
  }),
  [SET_TIME_TO_LIVE]: (state, action) => ({
    ...state,
    timeToLive: action.payload,
  }),
});

export default auth;
