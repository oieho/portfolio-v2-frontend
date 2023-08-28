import React from 'react';
import MemberFindId from '../components/common/MemberFindId';
import axios from 'axios';

const MemberFindIdContainer = () => {
  const validateNameChk = async (userName: string) => {
    let chkResult;
    await axios
      .post('/members/nameChkOnFindId', { userName }) // userName에 만약 {} 가 없으면 application/x-www-form-urlencoded;charset=UTF-8'로 간주
      .then((response) => {
        chkResult = response.data;
      })
      .catch(function (error) {
        chkResult = false;
      });
    return chkResult;
  };

  const validateEmailChk = async (userEmail: string) => {
    let chkResult;
    await axios
      .post('/members/emailChkOnFindId', { userEmail }) // userName에 만약 {} 가 없으면 application/x-www-form-urlencoded;charset=UTF-8'로 간주
      .then((response) => {
        chkResult = response.data;
      })
      .catch(function (error) {
        chkResult = false;
      });
    return chkResult;
  };

  const ifIdMatchesEmail = async (userName: string, userEmail: String) => {
    let chkResult;
    await axios
      .post('/members/ifIdMatchesEmail', { userName, userEmail }) // userName에 만약 {} 가 없으면 application/x-www-form-urlencoded;charset=UTF-8'로 간주
      .then((response) => {
        chkResult = response.data;
      })
      .catch(function (error) {
        chkResult = false;
      });
    return chkResult;
  };

  const onSubmit = async (userName: string, userEmail: string) => {
    let chkResult;
    await axios
      .post('/members/sendEmailOnFindId', { userEmail, userName })
      .then((response) => {
        chkResult = response.data;
      })
      .catch(function (error) {
        chkResult = false;
      });
    return chkResult;
  };

  return (
    <MemberFindId
      validateNameChk={validateNameChk}
      validateEmailChk={validateEmailChk}
      ifIdMatchesEmail={ifIdMatchesEmail}
      onSubmit={onSubmit}
    />
  );
};
export default MemberFindIdContainer;
