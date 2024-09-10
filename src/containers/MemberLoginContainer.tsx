import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MemberLogin from '../components/common/MemberLogin';
import { checkMyInfo, login } from '../modules/auth';
import { connect } from 'react-redux';
import { getAuthorized } from '../modules/selector';
import { RootState } from '../modules';

interface Props {
  readonly isAuthorized: boolean;
}
const MemberLoginContainer = ({ isAuthorized }: Props) => {
  const dispatch = useDispatch();
  const outerMemberWrapper = document.getElementById(
    'outerMemberWrapper',
  ) as HTMLDivElement;
  const loginWrapper = document.getElementById('memberLogin') as HTMLDivElement;
  const miniBtnWrapper = document.getElementById(
    'miniBtnWrapper',
  ) as HTMLDivElement;

  const { loginSuccess, accessToken, tryLoginAuth, toggleLogin, timeToLive } =
    useSelector(({ auth }: RootState) => ({
      loginSuccess: auth.loginSuccess,
      accessToken: auth.accessToken,
      tryLoginAuth: auth.tryLoginAuth,
      toggleLogin: auth.toggleLogin,
      timeToLive: auth.timeToLive,
    }));

  const onSignIn = async (
    userId: string,
    password: string,
    autoLogin: boolean,
  ) => {
    try {
      await dispatch(login({ userId, password, autoLogin }));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (accessToken) {
      dispatch(checkMyInfo(true));
    }
    if (
      loginSuccess &&
      window.matchMedia('(min-width: 1px) and (max-width: 768px)').matches
    ) {
      if (loginWrapper && outerMemberWrapper) {
        if (miniBtnWrapper) miniBtnWrapper.style.display = 'none';
        if (loginWrapper) loginWrapper.style.display = 'none';
        if (outerMemberWrapper) outerMemberWrapper.style.display = 'none';
      }
    }
  }, [
    accessToken,
    dispatch,
    loginSuccess,
    loginWrapper,
    miniBtnWrapper,
    outerMemberWrapper,
  ]);

  return (
    <MemberLogin
      onSignIn={onSignIn}
      isAuthorized={isAuthorized}
      tryLoginAuth={tryLoginAuth}
      toggleLogin={toggleLogin}
      timeToLive={timeToLive}
    />
  );
};
export default connect((state: RootState) => {
  return {
    isAuthorized: getAuthorized(state),
  };
})(MemberLoginContainer);
