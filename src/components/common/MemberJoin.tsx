import styled from 'styled-components';
import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useContext,
  CSSProperties,
  RefObject,
} from 'react';
import Button from './button/Button';
import { MainContext } from '../../pages/Main';

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
const DescriptionTop = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  top: 1.25rem;
`;
const Jointit = styled.img`
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
const IdInput = styled.input`
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
const PwInput = styled.input`
  position: absolute;
  width: 7.5rem;
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
const PwInputConfirm = styled.input`
  position: absolute;
  width: 7.5rem;
  left: 8rem;
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
const UserEmailInput = styled.input`
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
const Agree = styled.div`
  position: absolute;
  right: 0.76rem;
  top: 24.84rem;
  label {
    position: relative;
    width: 15.5rem;
    left: 0.1rem;
    right: 0.1rem;
    bottom: 0.17rem;
    font-size: 0.72rem;
    font-weight: bold;
    z-index: 1;
    &:hover {
      cursor: pointer;
    }
  }
`;
const Chkbox = styled.input.attrs({
  type: 'checkbox',
})`
  appearance: none;
  position: relative;
  background-image: url('/images/chkbox.png');
  width: 1.125rem;
  height: 1.125rem;
  top: 0.273rem;
  left: 0.06rem;
  border: none;
  z-index: 1;
  cursor: pointer;
  ${({ value }) => {
    return value ? `background-image: url('/images/chkboxOv.png')` : null;
  }}
`;
const TermsAndConditions = styled.div`
  background-color: #ffffff;
  position: relative;
  top: 10.5rem;
  left: 0.56rem;
  width: 15.5rem;
  height: 12.9rem;
  line-height: 1.6rem;
  border: 1px solid #ededed;
  outline: none;
  padding: 0.4rem;
  z-index: 1;
  font-size: 0.8rem;
  cursor: default;
  border-radius: 1rem;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #f5f5f5;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #000;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  ::-webkit-scrollbar-thumb:active {
    background: #000;
  }
`;
const ShowAgreement = styled.span`
  position: absolute;
  color: #505050;
  top: 23.9rem;
  right: 0.73rem;
  text-align: right;
  display: flex;
  flex-direction: column;
  font-size: 0.72rem;
  letter-spacing: -0.02rem;
  text-decoration: underline;
  text-underline-position: under;
  cursor: default;
  &:hover {
    text-decoration: none;
  }
  &:active {
    color: #000000;
    font-weight: bold;
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
  color: black;
  top: 8.58rem;
  width: 266px;
  text-align: center;
  font-size: 0.855rem;
  transition: all 0.8s ease-out;
`;

interface Props {
  readonly onRegister: (
    userId: string,
    password: string,
    userEmail: string,
    userName: string,
    roleType: string,
    providerType: string,
  ) => void;
  readonly duplicatedIdChk: (userId: string) => any;
  readonly duplicatedNameChk: (userName: string) => any;
  readonly duplicatedEmailChk: (userEmail: string) => any;
}

const MemberJoin = ({
  onRegister,
  duplicatedIdChk,
  duplicatedNameChk,
  duplicatedEmailChk,
}: Props) => {
  const { state } = useContext(MainContext);

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [, setPasswordc] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [providerType, setProviderType] = useState('');
  const [roleType, setRoleType] = useState('');
  const [Info, setInfo] = useState('');
  const [agreeChk, setAgreeChk] = useState<boolean>();
  const [agreement, setAgreement] = useState<boolean>(false);
  const [tac, setTac] = useState<boolean>();
  const [sMessage, setSMessage] = useState('');
  const [fMessage, setFMessage] = useState('');
  const [validateId, setValidateId] = useState<boolean>();
  const [validatePw, setValidatePw] = useState<boolean>();
  const [idenificationPw, setIdenificationPw] = useState<boolean>();
  const [validateEmail, setValidateEmail] = useState<boolean>();
  const [validateName, setValidateName] = useState<boolean>();
  const [alreadyJoined, setAlreadyJoined] = useState<boolean>();

  const tAndc = useRef(null) as any;
  const idInput = useRef(null) as any;
  const pwInput = useRef(null) as any;
  const pwInputConfirm = useRef(null) as any;
  const nameInput = useRef(null) as any;
  const emailInput = useRef(null) as any;
  useEffect(() => {
    setAgreeChk(false);
  }, [setAgreeChk]);
  const Warning = useRef(null) as InnerHTML &
    CSSProperties &
    (RefObject<HTMLDivElement> | null | undefined);
  const onChangeUserId = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const idRegEx = /^[a-z0-9]*$/;
      if (!idRegEx.test(e.target.value)) {
        setInfo((Warning.innerHTML = 'ID는 소문자&숫자 10자 이하입니다.'));
      } else {
        setInfo((Warning.innerHTML = ''));
        setUserId(e.target.value);
      }
    },
    [],
  );
  const chkDuplicatedId = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      duplicatedIdChk(e.target.value).then((response: boolean) => {
        if (response === true) {
          if (e.target.value.length === 0) {
            setSMessage('');
            setFMessage('');
          } else {
            setFMessage('중복된 아이디입니다.');
            setSMessage('');
            idInput.current.focus();
            setValidateId(false);
          }
        } else {
          setSMessage('아이디가 유효합니다.');
          setFMessage('');
          setValidateId(true);
        }
      });
    },
    [duplicatedIdChk],
  );

  const onChangeUserPassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let pwRegEx = /^[a-zA-Z0-9]{8,25}$/;
      if (!pwRegEx.test(e.target.value)) {
        setSMessage('');
        setFMessage('비밀번호가 유효하지 않습니다.');
        setInfo((Warning.innerHTML = 'PW는 영문,숫자 8-20자리 조합입니다.'));
        setValidatePw(false);
      } else {
        setInfo((Warning.innerHTML = ''));
        setPassword(e.target.value);
        setSMessage('비밀번호가 유효합니다.');
        setFMessage('');
        setValidatePw(true);
      }
    },
    [],
  );
  const onChangeUserPasswordConfirm = useCallback(
    (e: any) => {
      const chkPass = () => {
        if (password === e.target.value) {
          setPasswordc(e.target.value);
          setSMessage('비밀번호가 일치합니다.');
          setFMessage('');
          setIdenificationPw(true);
        } else {
          setSMessage('');
          setFMessage('비밀번호가 일치하지 않습니다.');
          setIdenificationPw(false);
        }
      };
      let pwRegEx = /^[a-zA-Z0-9]{8,25}$/;
      if (!pwRegEx.test(e.target.value)) {
        setInfo((Warning.innerHTML = 'PW는 영문,숫자 8-20자리 조합입니다.'));
        chkPass();
      } else {
        setInfo((Warning.innerHTML = ''));
        chkPass();
      }
    },
    [password],
  );
  const onChangeUserEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      duplicatedEmailChk(e.target.value).then((response: boolean) => {
        let emailRegEx =
          /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        if (!emailRegEx.test(e.target.value)) {
          setInfo('');
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
            setInfo('');
            setSMessage('이메일이 유효합니다.');
            setFMessage('');
            setUserEmail(e.target.value);
            setProviderType('LOCAL');
            setRoleType('USER');
            setValidateEmail(true);
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

  const onScrollTandC = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = tAndc.current;

      if (scrollHeight - scrollTop === clientHeight) {
        setAgreeChk(true);
      }
    },
    [tAndc, setAgreeChk],
  );
  const chkTandC = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      if (agreement === false) {
        alert('이용약관을 확인하지 않았습니다.');
        e.preventDefault();
        return;
      }
      setAgreeChk(true);
    },
    [agreement],
  );

  const showAgreement = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      setTac(true);
      setAgreement(true);
      setInfo((Warning.innerHTML = ''));
    },
    [setTac, setAgreement],
  );

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      if (agreeChk === false) {
        alert('동의하지 않았습니다.');
        e.preventDefault();
        return;
      }
      e.preventDefault();

      if (alreadyJoined === false && validateId === false) {
        setFMessage('이미 가입 되었습니다.');
        setSMessage('');
        return;
      } else if (
        validateId === true &&
        validatePw === true &&
        validateName === true &&
        validateEmail === true &&
        idenificationPw === true
      ) {
        onRegister(
          userId,
          password,
          userEmail,
          userName,
          providerType,
          roleType,
        );
        setSMessage('회원가입 되었습니다.');
        setFMessage('');
        setTac(false);
        setValidateId(false);
        setAlreadyJoined(false);
        idInput.current.value = '';
        pwInput.current.value = '';
        pwInputConfirm.current.value = '';
        nameInput.current.value = '';
        emailInput.current.value = '';

        const contentDesc = document.getElementById('addComment');
        const saying = document.getElementById('saying');
        const url = window.location.href;
        const regex = /boards\/view\//;
        const match = url.match(regex);
        if (match) {
          contentDesc!.style.display = 'block' as any;
          if (state.toggleAddCommentForm === false) {
            saying!.style.opacity = 0 as any;
          }
        }
      } else {
        setFMessage('양식이 유효하지 않습니다.');
        setSMessage('');
        return;
      }
    },
    [
      agreeChk,
      alreadyJoined,
      validateId,
      validatePw,
      validateName,
      validateEmail,
      idenificationPw,
      onRegister,
      userId,
      password,
      userEmail,
      userName,
      providerType,
      roleType,
      state.toggleAddCommentForm,
    ],
  );

  return (
    <Wrapper>
      <RightBlock>
        <Description>
          <Jointit
            src={process.env.PUBLIC_URL + '/images/jointit.png'}
            alt="Join Members"
          />
          <form method="post" onSubmit={onSubmit}>
            <DescriptionTop>
              <Inputs>
                <InputLi>
                  <IdInput
                    ref={idInput}
                    maxLength={10}
                    name="userId"
                    autoComplete="userId"
                    onChange={onChangeUserId}
                    onBlur={chkDuplicatedId}
                    placeholder="아이디"
                    spellCheck="false"
                    required
                  />
                </InputLi>
                <InputLi>
                  <PwInput
                    ref={pwInput}
                    maxLength={20}
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    onChange={onChangeUserPassword}
                    placeholder="비밀번호"
                    required
                  />
                  <PwInputConfirm
                    ref={pwInputConfirm}
                    maxLength={20}
                    name="passwordConfirm"
                    type="password"
                    autoComplete="new-password confirm"
                    onChange={onChangeUserPasswordConfirm}
                    placeholder="비밀번호 확인"
                    required
                  />
                </InputLi>
                <InputLi>
                  <UserEmailInput
                    ref={emailInput}
                    maxLength={30}
                    name="userEmail"
                    type="text"
                    autoComplete="userEmail"
                    onChange={onChangeUserEmail}
                    placeholder="이메일"
                    spellCheck="false"
                    required
                  />
                </InputLi>
                <InputLi>
                  <UserNameInput
                    ref={nameInput}
                    maxLength={30}
                    name="userName"
                    autoComplete="userName"
                    onChange={onChangeUserName}
                    placeholder="회원이름"
                    spellCheck="false"
                    required
                  />
                </InputLi>
              </Inputs>
              <Agree>
                <Chkbox
                  id="agree"
                  value={agreeChk as string | undefined}
                  onClick={chkTandC}
                />
                <label htmlFor="agree">동의</label>
              </Agree>
              {tac && (
                <TermsAndConditions
                  ref={tAndc}
                  onScroll={onScrollTandC}
                  onMouseOut={() => setTac(false)}
                >
                  1. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Vero repellendus est iusto voluptatibus magnam cupiditate illo
                  nesciunt asperiores sunt alias natus, vel, labore optio.
                  <br />
                  2. Illum perspiciatis facilis unde perferendis libero.Lorem
                  ipsum, dolor sit amet consectetur adipisicing elit.Vero
                  repellendus est iusto voluptatibus magnam cupiditate illo
                  nesciunt asperiores sunt alias natus, vel, labore optio.
                  <br />
                  3. Illum perspiciatis facilis unde perferendis libero.
                </TermsAndConditions>
              )}

              <ShowAgreement onClick={showAgreement}>
                이용약관 펼쳐보기
              </ShowAgreement>
              <SuccessMessage>{sMessage}</SuccessMessage>
              <ErrorMessage>{fMessage}</ErrorMessage>
              <InfoMessage ref={Warning}>{Info}</InfoMessage>
            </DescriptionTop>
            <Button
              style={{
                width: `5.227rem`,
                top: `27.23rem`,
                left: `0rem`,
                position: `relative`,
              }}
            >
              회원 가입
            </Button>
          </form>
        </Description>
      </RightBlock>
    </Wrapper>
  );
};
export default MemberJoin;
