import styled from 'styled-components';
import React, { useEffect, useState, useCallback } from 'react';
import Button from './button/Button';
import { MyInfo } from '../../App';

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const RightBlock = styled.div`
  position: relative;
  background: #f5f5f5;
  left: 30.65rem;
  width: 16.625rem;
  height: 10rem;
  top: 0;
`;

const Description = styled.div`
  position: absolute;
  top: -15.55rem;
  background: #f5f5f5;
  border-radius: 1rem;
  width: 100%;
  height: 35.67rem;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const MailSendertit = styled.img`
  position: relative;
  top: 4.8rem;
  z-index: 0;
`;
const Inputs = styled.ul`
  position: absolute;
  list-style: none;
  padding: 0;
  top: 8.52rem;
  left: 0.55rem;
`;
const InputLi = styled.li`
  height: 3.33rem;
`;
const SenderInput = styled.input`
  position: absolute;
  width: 5.625rem;
  line-height: 2rem;
  border: 1px solid #ededed;
  outline: none;
  padding: 0.4rem;
  background: #fff;
  border-radius: 1rem;
  z-index: 1;
  font-size: 0.85rem;

  &:focus {
    font-weight: bold;
    border: solid 0.11rem #000000;
  }
`;
const EmailInput = styled.input`
  position: absolute;
  width: 9.438rem;
  left: 6.07rem;
  line-height: 2rem;
  border: 1px solid #ededed;
  outline: none;
  padding: 0.4rem;
  background: #fff;
  border-radius: 1rem;
  z-index: 1;
  font-size: 0.85rem;

  &:focus {
    font-weight: bold;
    border: solid 0.11rem #000000;
  }
`;
const SubjectInput = styled.input`
  position: absolute;
  width: 15.5rem;
  line-height: 2rem;
  border: 1px solid #ededed;
  outline: none;
  padding: 0.4rem;
  background: #fff;
  border-radius: 1rem;
  z-index: 1;
  font-size: 0.85rem;

  &:focus {
    font-weight: bold;
    border: solid 0.11rem #000000;
  }
`;
const TextareaWrapper = styled.div`
  resize: none;
  white-space: pre-wrap;
  position: relative;
  width: 15.5rem;
  height: 10.1rem;
  border: 1px solid #ededed;
  outline: none;
  padding: 0.4rem;
  background: #fff;
  border-radius: 1rem;
  z-index: 1;
  &:focus-within {
    font-weight: bold;
    border: solid 0.11rem #000000;
  }
`;
const ContentTextarea = styled.textarea`
  font-size: 0.85rem;
  line-height: 1.6rem;
  width: 14.5rem;
  height: 9.1rem;
  overflow-y: scroll;
  overflow-x: hidden;
  outline: none;
  border: none;
  resize: none;
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #000;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #444;
  }
  ::-webkit-scrollbar-thumb:active {
    background: #000;
  }
  &:focus {
    border: none;
  }
`;
const UploadFile = styled.input`
  position: absolute;
  bottom: -8em;
  width: 15.5rem;
  line-height: 2rem;
  border: 1px solid #ededed;
  outline: none;
  padding: 0.4rem;
  background: #fff;
  border-radius: 1rem;
  z-index: 1;
  font-size: 0.85rem;

  &:focus {
    font-weight: bold;
  }
`;
const SuccessMessage = styled.div`
  width: 266px;
  left: 0rem;
  margin-top: 94px;
  text-align: center;
  position: absolute;
  color: #00b300;
  font-size: 0.875rem;
  z-index: 99;
`;
const ErrorMessage = styled.div`
  width: 266px;
  left: 0rem;
  margin-top: 94px;
  text-align: center;
  position: absolute;
  color: red;
  z-index: 99;
  font-size: 0.875rem;
`;
const InfoMessage = styled.div`
  width: 266px;
  left: 0rem;
  margin-top: 94px;
  text-align: center;
  position: absolute;
  color: #000000;
  z-index: 99;
  font-size: 0.855rem;
`;

type Props = {
  readonly myInfo: MyInfo | any;
  readonly sendAnEmail: (formData: FormData) => void;
};

const MailSender = ({ myInfo, sendAnEmail }: Props) => {
  const [sender, setSender] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState('');
  const [sMessage, setSMessage] = useState('');
  const [fMessage, setFMessage] = useState('');
  const [iMessage, setIMessage] = useState('');
  useEffect(() => {
    if (myInfo) {
      setSender(myInfo?.userName);
      setEmail(myInfo?.userEmail);
    }
  }, [myInfo, myInfo?.userEmail, myInfo?.userName]);
  const onChangeSender = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSender(e.target.value);
      setIMessage('파일 추가는 선택사항 입니다.');
    },
    [],
  );
  const onChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let emailRegEx =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      setSMessage('이메일이 유효합니다.');
      setFMessage('');
      setIMessage('');
      setEmail(e.target.value);
      if (!emailRegEx.test(e.target.value)) {
        setSMessage('');
        setFMessage('이메일이 유효하지 않습니다.');
        setIMessage('');
      }
    },
    [],
  );
  const onBlurEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    let emailRegEx =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (!emailRegEx.test(e.target.value)) {
      setEmail('');
    }
    setFMessage('');
    setSMessage('');
  }, []);
  const onChangeSubject = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSubject(e.target.value);
      setIMessage('파일 추가는 선택사항 입니다.');
    },
    [],
  );
  const onChangeContent = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContent(e.target.value);
      setIMessage('파일 추가는 선택사항 입니다.');
    },
    [],
  );
  const onChangeFile = useCallback((e: React.ChangeEvent<any>) => {
    const pathpoint = e.target.value.lastIndexOf('.');
    const filepoint = e.target.value.substring(
      pathpoint + 1,
      e.target.value.length,
    );
    const filetype = filepoint.toLowerCase();
    if (
      e.target.files &&
      (filetype === 'jpg' ||
        filetype === 'gif' ||
        filetype === 'png' ||
        filetype === 'jpeg' ||
        filetype === 'bmp')
    ) {
      setFile(e.target.files[0]);
    } else {
      alert('이미지 파일만 선택할 수 있습니다.');
      e.target.value = '';
      return false;
    }
  }, []);
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      try {
        var formData = new FormData();
        formData.append('sender', sender);
        formData.append('email', email);
        formData.append('subject', subject);
        formData.append('content', content);
        if (file === (null || undefined)) {
        } else if (file) {
          formData.append('multipartFile', file);
        }
        sendAnEmail(formData);
        alert('이메일 전송이 완료 되었습니다.');
        e.currentTarget.value.reset();
      } catch (e) {}
      e.preventDefault();
    },
    [sender, email, subject, content, file, sendAnEmail],
  );
  return (
    <Wrapper>
      <RightBlock>
        <Description>
          <MailSendertit
            src={process.env.PUBLIC_URL + '/images/sendmailtit.png'}
            alt="Send an Email"
          />
          <form method="post" onSubmit={onSubmit}>
            <Inputs>
              <InputLi>
                {myInfo ? (
                  <SenderInput
                    maxLength={10}
                    name="sender"
                    autoComplete="sender"
                    onChange={onChangeSender}
                    placeholder="발신자"
                    value={sender}
                    disabled
                  />
                ) : (
                  <SenderInput
                    maxLength={10}
                    name="sender"
                    autoComplete="sender"
                    onChange={onChangeSender}
                    placeholder="발신자"
                    value={sender}
                    spellCheck="false"
                    required
                  />
                )}
                {myInfo ? (
                  <EmailInput
                    maxLength={30}
                    name="email"
                    type="text"
                    autoComplete="email"
                    onChange={onChangeEmail}
                    onBlur={onBlurEmail}
                    placeholder="이메일"
                    value={email}
                    disabled
                  />
                ) : (
                  <EmailInput
                    maxLength={30}
                    name="email"
                    type="text"
                    autoComplete="email"
                    onChange={onChangeEmail}
                    onBlur={onBlurEmail}
                    placeholder="이메일"
                    value={email}
                    spellCheck="false"
                    required
                  />
                )}
              </InputLi>
              <InputLi>
                <SubjectInput
                  maxLength={30}
                  name="subject"
                  type="text"
                  autoComplete="subject"
                  onChange={onChangeSubject}
                  placeholder="제목"
                  value={subject}
                  spellCheck="false"
                  required
                />
              </InputLi>
              <InputLi>
                <TextareaWrapper>
                  <ContentTextarea
                    placeholder="내용"
                    maxLength={1000}
                    value={content}
                    onChange={onChangeContent}
                    spellCheck="false"
                    required
                  />
                </TextareaWrapper>
              </InputLi>
              <InputLi>
                <UploadFile
                  type="file"
                  id="imgupload"
                  name="imgupload"
                  accept="image/jpeg,image/gif,image/png,image/bmp"
                  onChange={onChangeFile}
                />
              </InputLi>
            </Inputs>
            <SuccessMessage>{sMessage}</SuccessMessage>
            <ErrorMessage>{fMessage}</ErrorMessage>
            <InfoMessage>{iMessage}</InfoMessage>

            <Button
              style={{
                top: `29.96rem`,
                left: `0.17rem`,
                position: `relative`,
              }}
            >
              보내기
            </Button>
          </form>
        </Description>
      </RightBlock>
    </Wrapper>
  );
};

export default MailSender;
