import client from './client';
import Cookies from 'js-cookie';
import { setAccessToken, setMyInfo, setLoginInfo } from '../../modules/auth';

import { MyInfo } from '../../App';
export const signIn = (userId: string, password: string) =>
  client
    .post(`/auth/authenticate?username=${userId}&password=${password}`)
    .catch(function (error) {
      if (error.response && error.response.status === 401) {
        const errorMessage = '인증 실패';
        const ttl = error.response.headers.ttl;
        throw new Error([errorMessage, ttl] as any);
      }
    });

export const signInChk = () =>
  client.post('/members/myinfo').catch(function (error) {
    if (error.response.status === 401) {
      alert('인증 토큰이 만료되었습니다. 재로그인이 필요합니다.');
      setLoginInfo(error.response.data);
    }
  });

export const setCountList = () => client.post('/setCounts');

export const fetchCountList = () => client.get('/counts');

export const signUp = (
  userId: string,
  userPw: string,
  userEmail: string,
  userName: string,
  providerType: string,
  roleType: string,
) =>
  client.post('/members/joinUs', {
    userId,
    userPw,
    userEmail,
    userName,
    providerType,
    roleType,
  });

export const fetchMemberModify = (userNo: number) =>
  client.get(`/members/fetchModify/${userNo}`);

export const removeMember = (userNo: number) =>
  client.delete(`/members/${userNo}`);

export const modify = (
  userId: string,
  userPw: string,
  userEmail: string,
  userName: string,
) => client.put('/members/modify', { userId, userPw, userEmail, userName });

export const confirm = (userId: string, userPw: string) =>
  client.post('/members/withdrawalconfirm', { userId, userPw });

export const sendingEmail = (formData: FormData) =>
  client.post('/members/mail', formData, {
    headers: {
      'Content-Type': 'multipart/form-data;',
    },
  });

export const refresh = () =>
  client.get('/auth/refresh').then(function (response: any) {
    if (
      response.headers.invalidalltokens &&
      response.headers.invalidalltokens.substring(0, 7) === 'invalid'
    ) {
      //response.headers.invalidalltokens 만 호출할 경우 정의되어 있지 않기 때문에 undefined가 반환되며 타입 에러가 발생. 해당 값이 유효한지 확인한 후에 substring을 호출
      delete client.defaults.headers.common.Authorization;
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      setAccessToken('');
      setMyInfo(null as unknown as MyInfo);
      return;
    }
    const accessToken = response.headers.authorization?.substring(7); // response.config.header로 헤더를 불러올 경우 한박자 느린 (예:)최초 로그인 이 후 새로고침시 최초 로그인에서 발급한 토큰을 가져옴
    const refreshToken = response.headers.refreshauth?.substring(7);
    if (refreshToken !== undefined) {
      Cookies.set('refreshToken', refreshToken); // 2주
    } else if (accessToken !== undefined) {
      Cookies.set('accessToken', accessToken); // 1시간
    }
  });
