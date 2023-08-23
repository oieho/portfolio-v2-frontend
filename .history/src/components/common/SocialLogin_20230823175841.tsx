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
  const accessToken = searchParams.get('accessToken');
  const socialRefreshToken = searchParams.get('refreshToken');
  client.defaults.headers.common.authorization = `Bearer ${accessToken}`;
  useEffect(() => {
    dispatch(checkMyInfo(true));
    Cookies.set('accessToken', accessToken as string);
    Cookies.set('refreshToken', socialRefreshToken as string);
    setSearchParams(undefined);
    navigate('/');
  }, [navigate, setSearchParams, accessToken, socialRefreshToken, dispatch]);
  return <></>;
};
export default SocialLogin;
