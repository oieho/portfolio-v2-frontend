import React from 'react';
import { useSelector } from 'react-redux';
import MemberModifyPassword from '../components/common/MemberModifyPassword';
import { RootState } from '../modules';
import axios from 'axios';

const MemberModifyPasswordContainer = () => {
  const { myInfo, modifyInfo } = useSelector(({ auth }: RootState) => ({
    myInfo: auth.myInfo,
    modifyInfo: auth.modifyInfo,
  }));

  const validatePwChk = async (userId: string, userPw: string) => {
    let chkResult;
    await axios
      .post('/members/pwChk', { userId, userPw })
      .then((response) => {
        chkResult = response.data;
      })
      .catch(function (error) {
        chkResult = false;
      });
    return chkResult;
  };

  const onChangePW = async (userId: string, userPw: string) => {
    let chkResult;
    await axios
      .put(`/members/changePw/`, { userId, userPw })
      .then((response) => {
        chkResult = response.data;
      })
      .catch(function (error) {
        chkResult = false;
      });
    return chkResult;
  };

  return (
    <MemberModifyPassword
      myInfo={myInfo}
      modifyInfo={modifyInfo}
      validatePwChk={validatePwChk}
      onChangePW={onChangePW}
    />
  );
};
export default MemberModifyPasswordContainer;
