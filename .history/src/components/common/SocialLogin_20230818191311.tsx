import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { checkMyInfo } from '../../modules/auth';
import { useDispatch } from 'react-redux';
import client from '../../lib/api/client';
import Cookies from 'js-cookie';

const SocialLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get('accessToken');
    const socialRefreshToken = params.get('refreshToken');
    console.log(accessToken, params, location);

    // 이 부분은 accessToken이 실제로 값이 있는 경우에만 실행되도록 추가합니다.
    if (accessToken) {
      client.defaults.headers.common.authorization = `Bearer ${accessToken}`;
      dispatch(checkMyInfo(true));
      Cookies.set('accessToken', accessToken);
      Cookies.set('refreshToken', socialRefreshToken || ''); // refreshToken도 값이 있는 경우에만 설정
      navigate('/'); // 또는 원하는 경로로 이동
    }
  }, [location, dispatch, navigate]);

  return <></>;
};

export default SocialLogin;
