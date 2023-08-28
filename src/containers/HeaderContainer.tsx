import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Header from '../components/common/Header';
import { getAuthorized } from '../modules/selector';
import { setAccessToken, setMyInfo } from '../modules/auth';
import client from '../lib/api/client';
import { MyInfo } from '../App';
import { RootState } from '../modules';
import { fetchCount } from '../modules/count';
import Cookies from 'js-cookie';

interface Props {
  readonly isAuthorized: boolean;
  readonly myInfo: MyInfo | null;
}
const HeaderContainer = ({ isAuthorized, myInfo }: Props) => {
  const dispatch = useDispatch();

  const { countInfos } = useSelector((state: RootState) => ({
    countInfos: state.count.countInfos,
  }));
  useEffect(() => {
    dispatch(fetchCount());
  }, [dispatch]);

  const onLogout = () => {
    delete client.defaults.headers.common.Authorization;
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    dispatch(setAccessToken(''));
    dispatch(setMyInfo(null as unknown as MyInfo));
  };
  return (
    <Header
      myInfo={myInfo}
      isAuthorized={isAuthorized}
      countInfos={countInfos}
      onLogout={onLogout}
    />
  );
};

export default connect((state: RootState) => {
  return {
    isAuthorized: getAuthorized(state),
    myInfo: state.auth.myInfo,
  };
})(HeaderContainer);
