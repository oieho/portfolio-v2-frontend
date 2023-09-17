/* eslint-disable react-hooks/rules-of-hooks */
import styled from 'styled-components';
import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  LegacyRef,
} from 'react';
import Button from './button/Button';
import { MyInfo, ModifyInfo } from '../../App';
import MemberModifyPassword from '../../containers/MemberModifyPasswordContainer';

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
const MemberModifyConfirmPw = styled.div`
  position: absolute;
  text-align: center;
  top: -15.55rem;
  background: #f5f5f5;
  box-shadow: 0px 15px 25px -6px rgba(0, 0, 0, 0.03);
  border-radius: 1rem;
  width: 100%;
  height: 35.67rem;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const MemberModifyForm = styled.div`
  position: absolute;
  text-align: center;
  top: -15.55rem;
  background: #f5f5f5;
  box-shadow: 0px 15px 25px -6px rgba(0, 0, 0, 0.03);
  border-radius: 1rem;
  width: 100%;
  height: 35.67rem;
  z-index: 3;
  display: none;
  flex-direction: column;
  align-items: center;
`;
const DescriptionTop = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  top: 1.25rem;
`;
const NowLoading = styled.span`
  position: absolute;
  left: 6.65rem;
  top: 7.97rem;
  font-size: 0.85rem;
`;
const PwInput = styled.input`
  position: absolute;
  top: 10.5rem;
  width: 15.5rem;
  left: 0.57rem;
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
const Confirmpwtit = styled.img`
  position: relative;
  top: 4.8rem;
  z-index: 0;
`;
const InputTitles = styled.ul`
  position: absolute;
  text-align: right;
  left: -1.3rem;
  top: 9.47rem;
  list-style: none;
  font-size: 0.85rem;
  font-weight: 600;
  line-height: 3.306rem;
  z-index: 2;
`;
const UserIdTit = styled.li``;
const UserPwTit = styled.li``;
const UserEmailTit = styled.li``;
const UserNameTit = styled.li``;
const IdInput = styled.input`
  position: absolute;
  top: 10.5rem;
  left: 0.56rem;
  width: 15.5rem;
  line-height: 2rem;
  border: 1px solid #ededed;
  outline: none;
  padding: 0.4rem 0.4rem 0.4rem 4.6rem;
  background: #fff;
  border-radius: 1rem;
  z-index: 1;
  font-size: 0.85rem;

  &:focus {
    font-weight: bold;
  }
`;

const MpwInput = styled.input`
  position: absolute;
  top: 13.83rem;
  width: 15.5rem;
  left: 0.56rem;
  line-height: 2rem;
  border: 1px solid #ededed;
  outline: none;
  padding: 0.4rem 0.4rem 0.4rem 4.6rem;
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
  top: 17.16rem;
  width: 15.5rem;
  left: 0.56rem;
  line-height: 2rem;
  border: 1px solid #ededed;
  outline: none;
  padding: 0.4rem 0.4rem 0.4rem 4.6rem;
  background: #fff;
  border-radius: 1rem;
  z-index: 1;
  font-size: 0.85rem;

  &:focus {
    font-weight: bold;
    border: solid 0.11rem #000000;
  }
`;
const UserNameInput = styled.input`
  position: absolute;
  top: 20.46rem;
  width: 15.5rem;
  left: 0.56rem;
  line-height: 2rem;
  border: 1px solid #ededed;
  outline: none;
  padding: 0.4rem 0.4rem 0.4rem 4.6rem;
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
  margin-top: 107px;
  position: absolute;
  color: #00b300;
  text-align: center;
  font-size: 0.875rem;
`;
const CErrorMessage = styled.div`
  width: 266px;
  margin-top: 122px;
  position: absolute;
  color: red;
  text-align: center;
  font-size: 0.875rem;
`;

const ErrorMessage = styled.div`
  width: 266px;
  margin-top: 107px;
  position: absolute;
  color: red;
  text-align: center;
  font-size: 0.875rem;
`;

const InfoMessage = styled.div`
  position: absolute;
  top: 137px;
  color: black;
  width: 266px;
  text-align: center;
  font-size: 0.855rem;
  transition: all 0.8s ease-out;
`;
const MemberModifyPasswordWrapper = styled.span`
  position: relative;
  top: 0rem;
  left: -30.65rem;
  display: none;
`;

const BackBtn = styled.img`
  display: block;
  position: absolute;
  width: 1.5rem;
  height: 3.6rem;
  right: -1.53rem;
  top: 4.497rem;
  z-index: 1;
`;

interface Props {
  readonly validatePwChk: (userId: string, userPw: string) => any;
  readonly duplicatedNameChk: (userName: string) => any;
  readonly duplicatedEmailChk: (userEmail: string) => any;
  readonly onModify: (
    userId: string,
    password: string,
    userEmail: string,
    userName: string,
  ) => any;
  readonly myInfo: MyInfo | any;
  readonly modifyInfo: ModifyInfo | any;
  readonly onRemove: (userNo: number) => void;
  readonly isLoading: boolean;
}

const MemberModify = ({
  myInfo,
  validatePwChk,
  duplicatedNameChk,
  duplicatedEmailChk,
  modifyInfo,
  onModify,
  onRemove,
  isLoading,
}: Props) => {
  const [cpassword, setCpassword] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [, setProviderType] = useState('');
  const [Info] = useState('');

  const [sMessage, setSMessage] = useState('');
  const [fMessage, setFMessage] = useState('');
  const [validatePw, setValidatePw] = useState<boolean>();
  const [validateEmail, setValidateEmail] = useState<boolean>();
  const [, setValidateName] = useState<boolean>();

  const [backBtnHover, setBackBtnHover] = useState<boolean>();
  const [toggleConfirmPw, setToggleConfirmPw] = useState<boolean>(true);

  const cPwInput = useRef(null) as any;
  const mPwInput = useRef(null) as any;
  const nameInput = useRef(null) as any;
  const emailInput = useRef(null) as any;

  const MemberModifyConfirmPwRef = useRef(null) as unknown as HTMLDivElement &
    (LegacyRef<HTMLDivElement> | undefined) as any;
  const MemberModifyFormRef = useRef(null) as unknown as HTMLDivElement &
    (LegacyRef<HTMLDivElement> | undefined) as any;
  const MemberModifyPasswordRef = useRef(null) as unknown as HTMLDivElement &
    (LegacyRef<HTMLDivElement> | undefined) as any;
  const BackBtnRef = useRef(null) as unknown as HTMLImageElement &
    (LegacyRef<HTMLDivElement> | undefined) as any;

  let isOwn = false;
  if (myInfo) {
    if (myInfo.userId) {
      isOwn = true;
    }
  }

  useEffect(() => {
    if (myInfo) {
      // onModify 메서드 실행 후 myInfo.userId 를 불러올 수 없어 member의 상태를 사용
      setUserId(myInfo?.userId);
      setUserEmail(myInfo?.userEmail);
      setUserName(myInfo?.userName);
      setProviderType(myInfo?.providerType);
    }
  }, [myInfo, modifyInfo, toggleConfirmPw]);

  const onConfirmUserPassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCpassword(e.target.value);
    },
    [],
  );
  const MemberModuleArray = [
    MemberModifyConfirmPwRef,
    MemberModifyFormRef,
    MemberModifyPasswordRef,
  ];
  const onPasswordConfirm = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      try {
        validatePwChk(myInfo.userId, cpassword).then((response: boolean) => {
          if (response === true) {
            setFMessage('');
            MemberModuleArray[0].current.style.display = 'none';

            MemberModuleArray[1].current.style.display = 'block';
          } else {
            cPwInput.current.focus();
            setFMessage('비밀번호가 유효하지 않습니다.');
          }
        });
      } catch (e) {
        alert('인증 토큰이 만료되었습니다. 재로그인이 필요합니다.');
      }

      e.preventDefault();
    },
    [validatePwChk, myInfo?.userId, cpassword, MemberModuleArray],
  );
  const onChangeUserPassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      setValidatePw(true);
    },
    [],
  );

  const onChangeUserEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      duplicatedEmailChk(e.target.value).then((response: boolean) => {
        let emailRegEx =
          /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        if (!emailRegEx.test(e.target.value)) {
          setSMessage('');
          setFMessage('이메일 형식이 유효하지 않습니다.');
          setValidateEmail(false);
        } else {
          if (response === true) {
            if (e.target.value.length === 0) {
              setSMessage('');
              setFMessage('');
            } else {
              setFMessage('중복된 이메일입니다.');
              setSMessage('');
              emailInput.current.focus();
              setValidateEmail(false);
            }
          } else {
            setUserEmail(e.target.value);
            setValidateEmail(true);
            setSMessage('이메일 형식이 유효합니다.');
            setFMessage('');
          }
        }
      });
    },
    [duplicatedEmailChk],
  );
  const onChangeUserName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      duplicatedNameChk(e.target.value).then((response: boolean) => {
        if (response === true) {
          if (e.target.value.length === 0) {
            setSMessage('');
            setFMessage('');
          } else {
            setFMessage('중복된 이름입니다.');
            setSMessage('');
            nameInput.current.focus();
            setValidateName(false);
          }
        } else {
          setUserName(e.target.value);
          setSMessage('이름이 유효합니다.');
          setFMessage('');
          setValidateName(true);
        }
      });
    },
    [duplicatedNameChk],
  );

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!emailInput.value) {
        setUserEmail(userEmail);
      }
      validatePwChk(myInfo.userId, password)
        .then((isPasswordValid: boolean) => {
          if (!isPasswordValid) {
            setSMessage('');
            setFMessage('비밀번호가 일치하지 않습니다.');
            return Promise.reject(false);
          } else {
            // 비밀번호가 일치하는 경우, 회원 정보 수정 API 호출
            if (validateEmail === false) {
              return;
            }
            return onModify(myInfo.userId, password, userEmail, userName);
          }
        })
        .then((response: boolean) => {
          if (validateEmail === false) {
            setSMessage('');
            setFMessage('이메일 형식이 유효하지 않습니다.');
            return;
          }
          setFMessage('');
          setSMessage('회원정보가 수정되었습니다.');
        })
        .catch((error: any) => {
          if (error === false) {
            // validatePwChk에서 반환된 오류일 경우
            setValidatePw(false);
            setSMessage('');
            setFMessage('비밀번호가 일치하지 않습니다.');
          } else {
            // 서버에서 반환된 오류일 경우
            setSMessage('');
            setFMessage('회원정보 수정에 실패하였습니다.');
          }
        });
    },
    [
      validatePwChk,
      myInfo?.userId,
      password,
      userEmail,
      validateEmail,
      onModify,
      userName,
    ],
  );
  const useConfirm = (message: string = '', onConfirm: any, onCancel: any) => {
    if (!onConfirm || typeof onConfirm !== 'function') {
      return;
    }
    if (onCancel && typeof onCancel !== 'function') {
      return;
    }
    const confirmAction = () => {
      if (window.confirm(message)) {
        onConfirm();
      } else {
        onCancel();
      }
    };
    return confirmAction;
  };

  const onDisplayMember = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    selectItem: number,
  ) => {
    e.preventDefault();
    MemberModuleArray[selectItem].current.style.display = 'block';
    BackBtnRef.current.style.display = 'block';
  };
  const goToBackward = () => {
    if (MemberModuleArray[2].current.style.display === 'block') {
      MemberModuleArray[2].current.style.display = 'none';
      MemberModuleArray[0].current.style.display = 'block';
      return;
    }
    MemberModuleArray[0].current.style.display = 'block';
    MemberModuleArray[1].current.style.display = 'none';
    cPwInput.current.value = '';
    setToggleConfirmPw(true);
    setFMessage('');
    setSMessage('');
  };

  const del = () => {
    if (validatePw === true) {
      onRemove(myInfo.userNo);
    } else {
      setFMessage('비밀번호를 입력하십시오.');
      setSMessage('');
    }
  };
  const abort = () => console.log('Aborted');
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const deleteMember = useConfirm('회원 탈퇴 하시겠습니까?', del, abort);

  return (
    <Wrapper>
      <RightBlock>
        {!myInfo || myInfo?.providerType === 'LOCAL' ? (
          <>
            <MemberModifyConfirmPw ref={MemberModifyConfirmPwRef}>
              <Confirmpwtit
                src={process.env.PUBLIC_URL + '/images/confirmpwtit.png'}
                alt="Member Confirm Password"
              />
              <form method="post" onSubmit={onPasswordConfirm}>
                <DescriptionTop>
                  <PwInput
                    ref={cPwInput}
                    maxLength={20}
                    name="cpassword"
                    type="password"
                    autoComplete="cpassword"
                    onChange={onConfirmUserPassword}
                    placeholder="비밀번호"
                    required
                  />

                  <SuccessMessage></SuccessMessage>
                  <CErrorMessage>{fMessage}</CErrorMessage>
                  <InfoMessage>{Info}</InfoMessage>
                </DescriptionTop>
                <Button
                  style={{
                    top: `14.6rem`,
                    left: `0rem`,
                    position: `relative`,
                  }}
                >
                  확인
                </Button>
              </form>
            </MemberModifyConfirmPw>
            <MemberModifyForm ref={MemberModifyFormRef}>
              <Confirmpwtit
                src={process.env.PUBLIC_URL + '/images/modifytit.png'}
                alt="Member Modify"
              />
              {isLoading && <NowLoading>로딩 중...</NowLoading>}
              {!isLoading && myInfo && (
                <form method="post" onSubmit={onSubmit}>
                  <DescriptionTop>
                    <InputTitles>
                      <UserIdTit>아이디</UserIdTit>
                      <UserPwTit>비밀번호</UserPwTit>
                      <UserEmailTit>이메일</UserEmailTit>
                      <UserNameTit>이름</UserNameTit>
                    </InputTitles>
                    <IdInput
                      maxLength={10}
                      name="userId"
                      value={userId}
                      disabled
                    />
                    <MpwInput
                      ref={mPwInput}
                      maxLength={20}
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      onChange={onChangeUserPassword}
                      placeholder="비밀번호"
                      required
                    />

                    <EmailInput
                      ref={emailInput}
                      maxLength={30}
                      name="userEmail"
                      type="text"
                      autoComplete="userEmail"
                      onChange={onChangeUserEmail}
                      defaultValue={userEmail}
                      spellCheck="false"
                    />
                    <UserNameInput
                      ref={nameInput}
                      maxLength={30}
                      name="userName"
                      type="text"
                      autoComplete="userName"
                      onChange={(e: any) => {
                        onChangeUserName(e);
                      }}
                      defaultValue={userName}
                      spellCheck="false"
                      required
                    />
                    <SuccessMessage>{sMessage}</SuccessMessage>
                    <ErrorMessage>{fMessage}</ErrorMessage>
                    <InfoMessage>{Info}</InfoMessage>
                  </DescriptionTop>
                  {isOwn && (
                    <>
                      <Button
                        onClick={(e: any) => {
                          onDisplayMember(e, 2);
                        }}
                        style={{
                          top: `24.9rem`,
                          left: `-0.69rem`,
                          position: `relative`,
                        }}
                      >
                        비밀번호 변경
                      </Button>
                      <Button
                        style={{
                          width: `4.7rem`,
                          top: `25.5rem`,
                          left: `0.09rem`,
                          position: `relative`,
                        }}
                      >
                        수정
                      </Button>
                      <Button
                        onClick={deleteMember}
                        style={{
                          width: `4.7rem`,
                          color: `red`,
                          top: `25.5rem`,
                          left: `0.9rem`,
                          position: `relative`,
                        }}
                      >
                        탈퇴
                      </Button>
                    </>
                  )}
                </form>
              )}

              <BackBtn
                alt="뒤로가기"
                title="뒤로가기"
                ref={BackBtnRef}
                id={`beforeBackBtn`}
                onClick={() => goToBackward()}
                onMouseOver={() => setBackBtnHover(true)}
                onMouseOut={() => setBackBtnHover(false)}
                onMouseDown={() => setBackBtnHover(false)}
                onMouseUp={() => setBackBtnHover(true)}
                src={
                  backBtnHover
                    ? process.env.PUBLIC_URL + '/images/board/backOv.png'
                    : process.env.PUBLIC_URL + '/images/board/back.png'
                }
              />
            </MemberModifyForm>
          </>
        ) : (
          <Description>
            <Confirmpwtit
              src={process.env.PUBLIC_URL + '/images/modifytit.png'}
              alt="Member Confirm Password"
            />
            <InfoMessage>소셜 회원은 탈퇴만 이용할 수 있습니다.</InfoMessage>
            <Button
              onClick={deleteMember}
              style={{
                width: `4.7rem`,
                color: `red`,
                top: `14.3rem`,
                left: `0.12rem`,
                position: `relative`,
              }}
            >
              탈퇴
            </Button>
          </Description>
        )}

        <MemberModifyPasswordWrapper ref={MemberModifyPasswordRef}>
          <MemberModifyPassword />
        </MemberModifyPasswordWrapper>
      </RightBlock>
    </Wrapper>
  );
};

export default MemberModify;
