import client from './client';
import Cookies from 'js-cookie';
import { setAccessToken, setMyInfo, setLoginInfo } from '../../modules/auth';

import { MyInfo } from '../../App';
export const signIn = (userId: string, password: string) =>
  client
    .post(`/auth/authenticate?username=${userId}&password=${password}`)
    .catch(function (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('인증 실패');
      }
      throw error;
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
  client.get('/auth/refresh').then(function (response) {
    const { authorization } = response.headers;
    const accessToken = authorization?.substring(7) as string;
    const { refreshauthorization } = response.headers;
    const refreshToken = refreshauthorization?.substring(7) as string;

    if (authorization === undefined && refreshauthorization === undefined) {
      delete client.defaults.headers.common.authorization;
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      setAccessToken('');
      setMyInfo(null as unknown as MyInfo);
      return;
    }
    if (authorization == null) {
      Cookies.set('refreshToken', refreshToken); // 2주
    } else if (refreshauthorization == null) {
      Cookies.set('accessToken', accessToken); // 1시간
    }
  });
