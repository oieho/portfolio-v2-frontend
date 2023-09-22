import React from 'react';
import { useSelector } from 'react-redux';
import MailSender from '../components/common/MailSender';
import { RootState } from '../modules';
import * as api from '../lib/api/auth';
import { useNavigate } from 'react-router-dom';

const MailSenderContainer = () => {
  const navigate = useNavigate();
  const { myInfo } = useSelector(({ auth }: RootState) => ({
    myInfo: auth.myInfo,
  }));

  const sendAnEmail = async (formData: FormData) => {
    try {
      await api.sendingEmail(formData);
    } catch (e: any) {
      if (e.response.status === 400) {
        alert('잘못된 요청입니다.');
      } else if (e.response.status === 401) {
        alert('로그인이 필요합니다.');
        navigate('/login');
      } else if (e.response.status === 403) {
        alert('접근 권한이 없습니다.');
      } else {
        alert(e.response.data.message);
      }
    }
  };
  return <MailSender myInfo={myInfo} sendAnEmail={sendAnEmail} />;
};

export default MailSenderContainer;
