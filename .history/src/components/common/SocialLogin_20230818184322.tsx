import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { checkMyInfo } from '../../modules/auth';
import { useDispatch } from 'react-redux';
import client from '../../lib/api/client';
import Cookies from 'js-cookie';
import { useAppDispatch } from '../../index';
const SocialLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dispatch2 = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const socialRefreshToken = searchParams.get('refreshToken');
    console.log('accessToken::' + accessToken);
    client.defaults.headers.common.authorization = `Bearer ${accessToken}`;
    console.log('진입');
    dispatch2(checkMyInfo(true));
    Cookies.set('accessToken', accessToken as string);
    Cookies.set('refreshToken', socialRefreshToken as string);
    setSearchParams(undefined);
  }, [navigate, setSearchParams, dispatch, dispatch2, searchParams]);
  return <></>;
};
export default SocialLogin;
