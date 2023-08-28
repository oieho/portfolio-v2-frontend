/* eslint-disable react-hooks/rules-of-hooks */
import styled from 'styled-components';
import React, {
  useState,
  useCallback,
  useRef,
  LegacyRef,
  CSSProperties,
  RefObject,
} from 'react';
import Button from './button/Button';
import { MyInfo, ModifyInfo } from '../../App';

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
  box-shadow: 0px 15px 25px -6px rgba(0, 0, 0, 0.03);
  border-radius: 1rem;
  width: 100%;
  height: 35.67rem;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const DescriptionTop = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  top: 1.25rem;
`;
const Confirmpwtit = styled.img`
  position: relative;
  top: 4.8rem;
  z-index: 0;
`;
const Inputs = styled.ul`
  position: absolute;
  list-style: none;
  padding: 0;
  top: 9.5rem;
  left: 0.55rem;
`;
const InputLi = styled.li`
  height: 3.33rem;
`;
const NowPwInput = styled.input`
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
const NewPwInput = styled.input`
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
const NewPwConfirmInput = styled.input`
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
  margin-top: 122px;
  position: absolute;
  color: red;
  text-align: center;
  font-size: 0.875rem;
`;

const InfoMessage = styled.div`
  position: absolute;
  top: 142px;
  color: black;
  width: 266px;
  text-align: center;
  font-size: 0.855rem;
  transition: all 0.8s ease-out;
`;

interface Props {
  readonly myInfo: MyInfo | any;
  readonly validatePwChk: (userId: MyInfo | any, event: any) => any;
  readonly modifyInfo: ModifyInfo | any;
  readonly onChangePW: (userId: string, newPassword: string) => any;
}

const MemberModifyPassword = ({
  myInfo,
  validatePwChk,
  modifyInfo,
  onChangePW,
}: Props) => {
  const [nowPassword, setNowPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [Info, setInfo] = useState('');
  const [validateNow, setValidateNow] = useState<boolean>();
  const [validateNew, setValidateNew] = useState<boolean>();
  const [validateCNew, setValidateCNew] = useState<boolean>();
  const [sMessage, setSMessage] = useState('');
  const [fMessage, setFMessage] = useState('');

  const Warning = useRef(null) as InnerHTML &
    CSSProperties &
    (RefObject<HTMLDivElement> | null | undefined);
  const nowRef = useRef(null) as unknown as HTMLDivElement &
    (LegacyRef<HTMLDivElement> | undefined) as any;
  const newRef = useRef(null) as unknown as HTMLDivElement &
    (LegacyRef<HTMLDivElement> | undefined) as any;
  const newcRef = useRef(null) as unknown as HTMLDivElement &
    (LegacyRef<HTMLDivElement> | undefined) as any;
  const onNowPassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      validatePwChk(myInfo.userId, e.target.value).then((response: boolean) => {
        setNowPassword(e.target.value);
        if (response === true) {
          setValidateNow(true);
          setFMessage('');
          setSMessage('현재 비밀번호가 일치합니다.');
        } else {
          setSMessage('');
          setFMessage('현재 비밀번호가 일치하지 않습니다.');
        }
      });
    },
    [myInfo, validatePwChk],
  );
  const onNewPassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let pwRegEx = /^[a-zA-Z0-9]{8,25}$/;
      if (!pwRegEx.test(e.target.value)) {
        setInfo((Warning.innerHTML = 'PW는 영문,숫자 8-20자리 조합입니다.'));
        setValidateNew(false);
      } else {
        setInfo((Warning.innerHTML = ''));
        if (confirmNewPassword !== e.target.value) {
          setSMessage('');
          setFMessage('');
          setValidateNew(false);
          setNewPassword(e.target.value);
        } else {
          setSMessage('새 비밀번호와 일치합니다.');
          setFMessage('');
          setValidateNew(true);
          setValidateCNew(true);
          setNewPassword(e.target.value);
        }
      }
    },
    [confirmNewPassword],
  );
  const onConfirmNewPassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let pwRegEx = /^[a-zA-Z0-9]{8,25}$/;
      if (!pwRegEx.test(e.target.value)) {
        setInfo((Warning.innerHTML = 'PW는 영문,숫자 8-20자리 조합입니다.'));
        setValidateCNew(false);
      } else {
        setInfo((Warning.innerHTML = ''));
        if (newPassword !== e.target.value) {
          setFMessage('새 비밀번호가 일치하지 않습니다.');
          setSMessage('');
          setConfirmNewPassword(e.target.value);
          setValidateCNew(false);
        } else {
          setSMessage('새 비밀번호와 일치합니다.');
          setFMessage('');
          setValidateNew(true);
          setValidateCNew(true);
          setConfirmNewPassword(e.target.value);
        }
      }
    },
    [newPassword],
  );
  const onChangePassword = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      if (nowPassword === confirmNewPassword) {
        setFMessage('비밀번호를 변경하지 않았습니다.');
        setSMessage('');
      } else if (
        validateNow === true &&
        validateNew === true &&
        validateCNew === true
      ) {
        onChangePW(myInfo.userId, confirmNewPassword).then(
          (response: boolean) => {
            if (response === true) {
              setFMessage('');
              setSMessage('비밀번호가 변경되었습니다.');
              setValidateNow(false);
              setValidateNew(false);
              setValidateCNew(false);
              nowRef.current.value = '';
              newRef.current.value = '';
              newcRef.current.value = '';
            }
          },
        );
      } else {
        setFMessage('비밀번호가 유효하지 않습니다.');
        setSMessage('');
      }
      e.preventDefault();
    },
    [
      nowPassword,
      myInfo,
      confirmNewPassword,
      onChangePW,
      validateNow,
      validateNew,
      validateCNew,
    ],
  );

  return (
    <Wrapper>
      <RightBlock>
        <Description>
          <Confirmpwtit
            src={process.env.PUBLIC_URL + '/images/modifypwtit.png'}
            alt="Member Modify Password"
          />
          {myInfo && (
            <form method="post" onSubmit={onChangePassword}>
              <DescriptionTop>
                <Inputs>
                  <InputLi>
                    <NowPwInput
                      ref={nowRef}
                      maxLength={20}
                      name="cpassword"
                      type="password"
                      autoComplete="cpassword"
                      onChange={onNowPassword}
                      placeholder="현재 비밀번호"
                      required
                    />
                  </InputLi>
                  <InputLi>
                    <NewPwInput
                      ref={newRef}
                      maxLength={20}
                      name="cpassword"
                      type="password"
                      autoComplete="cpassword"
                      onChange={onNewPassword}
                      placeholder="새 비밀번호"
                      required
                    />
                  </InputLi>
                  <InputLi>
                    <NewPwConfirmInput
                      ref={newcRef}
                      maxLength={20}
                      name="cpassword"
                      type="password"
                      autoComplete="cpassword"
                      onChange={onConfirmNewPassword}
                      placeholder="새 비밀번호 확인"
                      required
                    />
                  </InputLi>
                </Inputs>
                <SuccessMessage>{sMessage}</SuccessMessage>
                <ErrorMessage>{fMessage}</ErrorMessage>
                <InfoMessage ref={Warning}>{Info}</InfoMessage>
              </DescriptionTop>
              <Button
                style={{ top: `19.9rem`, left: `0rem`, position: `relative` }}
              >
                확인
              </Button>
            </form>
          )}
        </Description>
      </RightBlock>
    </Wrapper>
  );
};

export default MemberModifyPassword;
