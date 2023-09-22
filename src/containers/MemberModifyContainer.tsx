import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MemberModify from '../components/common/MemberModify';
import client from '../lib/api/client';
import { setMyInfo, checkMyInfo, setAccessToken } from '../modules/auth';
import { RootState } from '../modules';
import { MyInfo } from '../App';
import { FETCH_ONE } from '../modules/member';
import Cookies from 'js-cookie';
import * as api from '../lib/api/auth';
import axios from 'axios';

const MemberModifyContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { myInfo, modifyInfo, isLoading } = useSelector(
    ({ auth, loading }: RootState) => ({
      myInfo: auth.myInfo,
      modifyInfo: auth.modifyInfo,
      isLoading: loading[FETCH_ONE],
    }),
  );

  const validatePwChk = async (userId: string, userPw: string) => {
    let chkResult;
    await axios
      .post('/members/pwChk', { userId, userPw })
      .then((response) => {
        chkResult = response.data;
      })
      .catch(function (error) {
        chkResult = false;
      });
    return chkResult;
  };
  const duplicatedNameChk = async (userName: string) => {
    let chkResult;
    await axios
      .post('/members/nameChk', userName)
      .then((response) => {
        chkResult = response.data;
      })
      .catch(function (error) {
        chkResult = true;
      });
    return chkResult;
  };
  const duplicatedEmailChk = async (userEmail: string) => {
    let chkResult;
    await axios
      .post('/members/emailChk', userEmail)
      .then((response) => {
        chkResult = response.data;
      })
      .catch(function (error) {
        chkResult = true;
      });
    return chkResult;
  };

  const onModify = async (
    userId: string,
    userPw: string,
    userEmail: string,
    userName: string,
  ) => {
    let chkResult;
    await axios
      .put('/members/modify', { userId, userPw, userEmail, userName })
      .then((response) => {
        chkResult = response.data;
        dispatch(checkMyInfo(true));
      })
      .catch(function (error) {
        chkResult = false;
      });
    return chkResult;
  };

  const onRemove = async (userNo: number) => {
    try {
      await api.removeMember(userNo);
      alert('탈퇴가 완료되었습니다.');
      delete client.defaults.headers.common.Authorization;
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      dispatch(setAccessToken(''));
      dispatch(setMyInfo(null as unknown as MyInfo));
      navigate('/login');
    } catch (e: any) {
      if (e.response.status === 400) {
        alert('잘못된 요청입니다.');
      } else if (e.response.status === 401) {
        alert('로그인이 필요합니다.');
        navigate('/login');
      } else if (e.response.status === 403) {
        alert('접근 권한이 없습니다.');
        navigate(-1);
      } else {
        alert(e.response.data.message);
      }
    }
  };
  return (
    <MemberModify
      myInfo={myInfo}
      duplicatedNameChk={duplicatedNameChk}
      validatePwChk={validatePwChk}
      duplicatedEmailChk={duplicatedEmailChk}
      modifyInfo={modifyInfo}
      onModify={onModify}
      onRemove={onRemove}
      isLoading={isLoading}
    />
  );
};
export default MemberModifyContainer;
