import React from 'react';
import MemberFindPassword from '../components/common/MemberFindPassword';
import axios from 'axios';

const MemberFindPasswordContainer = () => {
  const validateIdChk = async (userId: string) => {
    let chkResult;
    await axios
      .post('/members/idChkOnFindPassword', { userId }) // userId에 만약 {} 가 없으면 application/x-www-form-urlencoded;charset=UTF-8'로 간주
      .then((response) => {
        chkResult = response;
      })
      .catch(function (error) {
        chkResult = false;
      });
    return chkResult;
  };

  const validateEmailChk = async (userId: string, userEmail: string) => {
    let chkResult;
    await axios
      .post('/members/emailchkOnFindPassword', { userId, userEmail })
      .then((response) => {
        chkResult = response;
      })
      .catch(function (error) {
        chkResult = false;
      });
    return chkResult;
  };

  const verifyFindPasswordToken = async (token: string) => {
    let chkResult;
    await axios
      .get(`/members/password/authorization/${token}`)
      .then((response) => {
        chkResult = true;
      })
      .catch(function (error) {
        chkResult = false;
      });
    return chkResult;
  };

  const deleteFindPasswordToken = async (token: string) => {
    await axios.delete(`/members/password/authorization/delete/${token}`);
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
    <MemberFindPassword
      validateIdChk={validateIdChk}
      validateEmailChk={validateEmailChk}
      verifyFindPasswordToken={verifyFindPasswordToken}
      deleteFindPasswordToken={deleteFindPasswordToken}
      onChangePW={onChangePW}
    />
  );
};
export default MemberFindPasswordContainer;
