import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { checkMyInfo } from '../../modules/auth';
import { useDispatch } from 'react-redux';
import client from '../../lib/api/client';
import Cookies from 'js-cookie';

const SocialLogin = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get('accessToken');
    const socialRefreshToken = params.get('refreshToken');

    if (accessToken) {
      client.defaults.headers.common.authorization = `Bearer ${accessToken}`;
      dispatch(checkMyInfo(true));
      Cookies.set('accessToken', accessToken);
      Cookies.set('refreshToken', socialRefreshToken || '');

      // 파라미터 처리가 끝난 후 콜백 함수 실행
      navigateCallback();
    }
  }, [location, dispatch]);

  const navigateCallback = () => {
    // 이동하고자 하는 경로로 이동
    navigate('/');
  };

  return <></>;
};

export default SocialLogin;
