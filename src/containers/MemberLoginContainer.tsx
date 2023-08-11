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

  const { accessToken, tryLoginAuth, toggleLogin } = useSelector(
    ({ auth }: RootState) => ({
      accessToken: auth.accessToken,
      tryLoginAuth: auth.tryLoginAuth,
      toggleLogin: auth.toggleLogin,
    }),
  );
  const onSignIn = (userId: string, password: string, autoLogin: boolean) => {
    try {
      dispatch(login({ userId, password, autoLogin }));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (accessToken) {
      dispatch(checkMyInfo(true));
    }
  }, [accessToken, dispatch]);

  return (
    <MemberLogin
      onSignIn={onSignIn}
      isAuthorized={isAuthorized}
      tryLoginAuth={tryLoginAuth}
      toggleLogin={toggleLogin}
    />
  );
};
export default connect((state: RootState) => {
  return {
    isAuthorized: getAuthorized(state),
  };
})(MemberLoginContainer);
