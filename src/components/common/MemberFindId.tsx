import styled from 'styled-components';
import React, { useState, useCallback, useRef } from 'react';
import Button from './button/Button';
import { CircularProgress } from '@mui/material';

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
  left: 30.63rem;
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
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const NowLoading = styled.span`
  position: absolute;
  top: 8.8rem;
  font-size: 0.85rem;
  z-index: 99;
`;
const DescriptionTop = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  top: 1.25rem;
`;

const Confirmidtit = styled.img`
  position: relative;
  top: 4.8rem;
  z-index: 0;
`;

const Inputs = styled.ul`
  position: absolute;
  list-style: none;
  padding: 0;
  top: 9.5rem;
  left: 0.56rem;
`;
const InputLi = styled.li`
  height: 3.33rem;
`;

const UserNameInput = styled.input`
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

const EmailInput = styled.input`
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

const SuccessMessage = styled.div`
  width: 266px;
  margin-top: 122px;
  position: absolute;
  color: #00b300;
  text-align: center;
  font-size: 0.875rem;
`;
const ErrorMessage = styled.div`
  width: 266px;
  padding: 0 0.3rem 0;
  margin-top: 122px;
  position: absolute;
  color: red;
  text-align: center;
  font-size: 0.875rem;
`;

interface Props {
  readonly validateNameChk: (userName: string) => any;
  readonly validateEmailChk: (userEmail: string) => any;
  readonly ifIdMatchesEmail: (userName: string, userEmail: string) => any;
  readonly onSubmit: (userName: string, userEmail: string) => any;
}

const MemberFindId = ({
  validateNameChk,
  validateEmailChk,
  ifIdMatchesEmail,
  onSubmit,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const [sMessage, setSMessage] = useState('');
  const [fMessage, setFMessage] = useState('');
  const [validateEmail, setValidateEmail] = useState<boolean>();
  const [validateName, setValidateName] = useState<any>();

  const nameInput = useRef(null) as any;
  const emailInput = useRef(null) as any;

  let loadingInterval: any;

  const onChangeUserName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserName(e.target.value);
    },
    [],
  );

  const onConfirmUserName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      validateNameChk(userName).then((response: any) => {
        if (userName.length === 0) {
          setSMessage('');
          setFMessage('');
        } else {
          if (response === true) {
            setSMessage('이름이 존재합니다.');
            setFMessage('');
            setValidateName(true);
            if (validateName === true || validateEmail === true) {
              ifIdMatchesEmail(userName, userEmail).then((response: any) => {
                if (response === true) {
                  setSMessage('이름이 존재하며 이메일과 일치합니다.');
                  setFMessage('');
                  setValidateName(true);
                  setValidateEmail(true);
                  return;
                } else {
                  setSMessage('');
                  setFMessage('이름이 이메일과 일치하지 않습니다.');
                  setValidateName(false);
                  return;
                }
              });
            }
          } else {
            setSMessage('');
            setFMessage('이름이 존재하지 않습니다.');
            setValidateName(false);
          }
        }
        e.preventDefault();
      });
    },
    [
      userName,
      userEmail,
      validateName,
      validateEmail,
      validateNameChk,
      ifIdMatchesEmail,
    ],
  );

  const onValidateUserEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let emailRegEx =
        /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
      if (!emailRegEx.test(e.target.value)) {
        setSMessage('');
        setFMessage('이메일 형식이 유효하지 않습니다.');
        setValidateEmail(false);
      } else {
        setSMessage('이메일 형식이 유효합니다.');
        setFMessage('');
        setUserEmail(e.target.value);
      }
    },
    [],
  );

  const onConfirmUserEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      validateEmailChk(userEmail).then((response: any) => {
        if (userEmail.length === 0) {
          setSMessage('');
          setFMessage('');
        } else {
          if (response === true) {
            setSMessage('이메일이 존재합니다.');
            setFMessage('');
            setValidateEmail(true);
            if (validateName === true || validateEmail === true) {
              ifIdMatchesEmail(userName, userEmail).then((response: any) => {
                if (response === true) {
                  setSMessage('이메일이 존재하며 이름과 일치합니다.');
                  setFMessage('');
                  setValidateName(true);
                  setValidateEmail(true);
                  return;
                } else {
                  setSMessage('');
                  setFMessage('이메일이 이름과 일치하지 않습니다.');
                  setValidateEmail(false);
                  return;
                }
              });
            }
          } else {
            setSMessage('');
            setFMessage('이메일이 존재하지 않습니다.');
            setValidateEmail(false);
          }
        }
        e.preventDefault();
      });
    },
    [
      userName,
      userEmail,
      validateName,
      validateEmail,
      validateEmailChk,
      ifIdMatchesEmail,
    ],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const startLoadingInterval = () => {
    loadingInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 10;
      });
    }, 1250);
  };

  const onSendIdByEmail = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (validateName === false && validateEmail === false) {
        setSMessage('');
        setFMessage('이름과 이메일이 유효하지 않습니다.');
        return;
      } else if (validateName === true && validateEmail === true) {
        if (window.confirm('인증 메일을 발송하시겠습니까?')) {
          setSMessage('');
          setFMessage('');
          setIsLoading(true);
          startLoadingInterval();
          onSubmit(userName, userEmail).then((response: boolean) => {
            setIsLoading(false);
            clearInterval(loadingInterval);
            if (response === true) {
              setSMessage('메일을 성공적으로 발송하였습니다.');
              setFMessage('');
            } else {
              setSMessage('');
              setFMessage('이름과 이메일이 일치하지 않습니다.');
            }
          });
        } else {
          e.preventDefault();
          setIsLoading(false);
          clearInterval(loadingInterval);
          setSMessage('');
          setFMessage('인증 메일 전송을 취소하셨습니다.');
          return;
        }
      }
    },
    [
      userName,
      userEmail,
      validateName,
      validateEmail,
      loadingInterval,
      startLoadingInterval,
      onSubmit,
    ],
  );

  return (
    <Wrapper>
      <RightBlock>
        <Description>
          {isLoading ? (
            <NowLoading>
              <CircularProgress
                size={30}
                variant="determinate"
                value={progress}
              />
            </NowLoading>
          ) : null}
          <Confirmidtit
            src={process.env.PUBLIC_URL + '/images/findidtit.png'}
            alt="Member Confirm Idenification"
          />
          <form method="post" onSubmit={onSendIdByEmail}>
            <DescriptionTop>
              <Inputs>
                <InputLi>
                  <UserNameInput
                    ref={nameInput}
                    maxLength={30}
                    name="userName"
                    type="text"
                    autoComplete="userName"
                    onChange={onChangeUserName}
                    onBlur={onConfirmUserName}
                    placeholder="회원이름"
                    spellCheck="false"
                    required
                  />
                </InputLi>
                <InputLi>
                  <EmailInput
                    ref={emailInput}
                    maxLength={20}
                    name="usereEmail"
                    type="text"
                    autoComplete="userEmail"
                    onChange={onValidateUserEmail}
                    onBlur={onConfirmUserEmail}
                    placeholder="이메일"
                    spellCheck="false"
                    required
                  />
                </InputLi>
              </Inputs>

              <SuccessMessage>{sMessage}</SuccessMessage>
              <ErrorMessage>{fMessage}</ErrorMessage>
            </DescriptionTop>
            <Button
              style={{ top: `16.56rem`, left: `0rem`, position: `relative` }}
            >
              확인
            </Button>
          </form>
        </Description>
      </RightBlock>
    </Wrapper>
  );
};

export default MemberFindId;
