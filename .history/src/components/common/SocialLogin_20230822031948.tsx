import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import client from '../../lib/api/client';
import Cookies from 'js-cookie';
import { checkMyInfo } from '../../modules/auth';

const SocialLogin = () => {
  const location = useLocation(); // useLocation 훅을 사용하여 현재 경로와 파라미터를 읽어옵니다.
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(location.search); // 현재 경로의 파라미터를 가져옵니다.
    const accessToken = params.get('accessToken');
    const socialRefreshToken = params.get('refreshToken');
    console.log(accessToken);

    // 이 부분은 accessToken이 실제로 값이 있는 경우에만 실행되도록 추가합니다.
    if (accessToken) {
      client.defaults.headers.common.authorization = `Bearer ${accessToken}`;
      dispatch(checkMyInfo(true));
      Cookies.set('accessToken', accessToken);
      Cookies.set('refreshToken', socialRefreshToken || '');
    }
  }, [location, dispatch, navigate]);

  return <></>;
};

export default SocialLogin;
