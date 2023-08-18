import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { checkMyInfo } from '../../modules/auth';
import { useDispatch } from 'react-redux';
import client from '../../lib/api/client';
import Cookies from 'js-cookie';

const SocialLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const socialRefreshToken = searchParams.get('refreshToken');
    console.log(accessToken);
    // 이 부분은 accessToken이 실제로 값이 있는 경우에만 실행되도록 추가합니다.
    if (accessToken) {
      client.defaults.headers.common.authorization = `Bearer ${accessToken}`;
      dispatch(checkMyInfo(true));
      Cookies.set('accessToken', accessToken);
      Cookies.set('refreshToken', socialRefreshToken || ''); // refreshToken도 값이 있는 경우에만 설정
      setSearchParams(undefined); // 주소 표시줄 파라미터를 제거하고 싶은 경우에만 사용
    }
  }, [searchParams, dispatch, setSearchParams]);

  return <></>;
};

export default SocialLogin;
