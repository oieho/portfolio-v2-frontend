import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MemberJoin from '../components/common/MemberJoin';
import { setMyInfo, login } from '../modules/auth';
import { MyInfo } from '../App';
import * as api from '../lib/api/auth';
import axios from 'axios';

const MemberJoinContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const duplicatedIdChk = async (userId: string) => {
    let chkResult;
    await axios
      .post('/members/idChk', userId)
      .then((response) => {
        chkResult = response.data;
      })
      .catch(function (error) {
        chkResult = true;
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
  const onRegister = async (
    userId: string,
    password: string,
    userEmail: string,
    userName: string,
    roleType: string,
    providerType: string,
  ) => {
    try {
      await api.signUp(
        userId,
        password,
        userEmail,
        userName,
        roleType,
        providerType,
      );
      const autoLogin = true;
      dispatch(login({ userId, password, autoLogin }));
      dispatch(setMyInfo(null as unknown as MyInfo));
    } catch (e: any) {
      if (e.response.status === 400) {
        alert('잘못된 요청입니다.');
      } else if (e.response.status === 401) {
        alert('로그인이 필요합니다.');
        navigate('/login');
      } else if (e.reponse.status === 403) {
        alert('접근 권한이 없습니다.');
        navigate(-1);
      } else {
        alert(e.response.data.message);
      }
    }
  };

  return (
    <MemberJoin
      onRegister={onRegister}
      duplicatedIdChk={duplicatedIdChk}
      duplicatedNameChk={duplicatedNameChk}
      duplicatedEmailChk={duplicatedEmailChk}
    />
  );
};

export default MemberJoinContainer;
