import styled from 'styled-components';
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  LegacyRef,
} from 'react';
import Button from './button/Button';
import { TryLoginAuth, ToggleLogin, TimeToLive } from '../../App';
import MemberFindId from '../../containers/MemberFindIdContainer';
import MemberFindPassword from '../../containers/MemberFindPasswordContainer';
import CountDownTimer from '../../containers/CountDownTimerContainer';

const RightBlock = styled.div`
  background: #f5f5f5;
  width: 16.61rem;
`;

const Description = styled.div`
  position: absolute;
  background: #f5f5f5;
  box-shadow: 0px 15px 25px -6px rgba(0, 0, 0, 0.03);
  border-radius: 1rem;
  width: 100%;
  height: 35.67rem;
  top: -15.535rem;
  z-index: 3;
  opacity: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 1px) and (max-width: 768px) {
    top: 50%;
    transform: translateY(-50%);
    padding-bottom: 40rem;
    form {
      position: relative;
    }
  }
`;
const Logintit = styled.img`
  position: relative;
  top: 4.8rem;
  z-index: 0;
`;

const IdInput = styled.input`
  position: absolute;
  top: 11.75rem;
  left: 0.56rem;
  width: 15.5rem;
  line-height: 2rem;
  border: 1px solid #ededed;
  outline: none;
  padding: 0.4rem 0.4rem 0.4rem 2.1rem;
  background: #fff;
  border-radius: 1rem;
  z-index: 1;
  font-size: 0.85rem;
  &:focus {
    font-weight: bold;
    border: solid 0.11rem #000000;
  }
  @media (min-width: 1px) and (max-width: 768px) {
    left: -0.03rem;
  }
`;
const IdInputIcon = styled.img`
  position: absolute;
  width: 0.935rem;
  height: 1rem;
  top: 12.68rem;
  left: 1.3rem;
  cursor: default;
  z-index: 2;
  @media (min-width: 1px) and (max-width: 768px) {
    left: 0.7rem;
  }
`;
const PwInput = styled.input`
  position: absolute;
  top: 15.08rem;
  width: 15.5rem;
  left: 0.56rem;
  line-height: 2rem;
  border: 1px solid #ededed;
  outline: none;
  padding: 0.4rem 0.4rem 0.4rem 2.1rem;
  background: #fff;
  border-radius: 1rem;
  z-index: 1;
  font-size: 0.85rem;
  &:focus {
    font-weight: bold;
    border: solid 0.11rem #000000;
  }
  @media (min-width: 1px) and (max-width: 768px) {
    left: -0.03rem;
  }
`;
const PwInputIcon = styled.img`
  position: absolute;
  width: 0.935rem;
  height: 1rem;
  top: 16.08rem;
  left: 1.3rem;

  cursor: default;
  z-index: 2;
  @media (min-width: 1px) and (max-width: 768px) {
    left: 0.7rem;
  }
`;
const AutoLgn = styled.div`
  position: absolute;
  left: 0.4rem;
  top: 18.53rem;
  label {
    position: relative;
    width: 15.5rem;
    left: 0.05rem;
    right: 0.1rem;
    bottom: 0.17rem;
    font-size: 0.72rem;
    font-weight: bold;
    z-index: 1;
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
  @media (min-width: 1px) and (max-width: 768px) {
    position: relative;
    left: 0rem;
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
  top: 0.28rem;
  border: none;
  z-index: 1;
  cursor: pointer;
  &:checked {
    background-image: url('/images/chkboxOv.png');
  }
  &:not(:checked) {
    background-image: url('/images/chkbox.png');
  }
`;
const FindID = styled.span`
  position: absolute;
  right: 5.61rem;
  top: 19.09rem;
  text-align: right;
  display: flex;
  flex-direction: column;
  font-size: 0.72rem;
  z-index: 1;
  &:hover {
    cursor: pointer;
    font-weight: 600;
    text-decoration: underline;
  }
  &:active {
    cursor: pointer;
    text-decoration: none;
  }
  @media (min-width: 1px) and (max-width: 768px) {
    right: 4.6rem;
  }
`;
const FindIdandPassword = styled.span`
  position: absolute;
  pointer-events: none;
  top: 19.09rem;
  right: 0.96rem;
  font-size: 0.72rem;
  @media (min-width: 1px) and (max-width: 768px) {
    right: 0rem;
  }
`;
const FindPassword = styled.span`
  position: absolute;
  top: 19.09rem;
  right: 2.355rem;
  text-align: right;
  display: flex;
  flex-direction: column;
  font-size: 0.72rem;
  &:hover {
    cursor: pointer;
    font-weight: 600;
    text-decoration: underline;
  }
  &:active {
    cursor: pointer;
    text-decoration: none;
  }
  @media (min-width: 1px) and (max-width: 768px) {
    right: 1.4rem;
  }
`;
const SuccessMessage = styled.div`
  width: 242px;
  margin-top: 107px;
  text-align: center;
  position: absolute;
  color: #00b300;
  font-size: 0.875rem;
  @media (min-width: 1px) and (max-width: 768px) {
    top: 1rem;
    left: 0rem;
  }
`;
const ErrorMessage = styled.div`
  width: 242px;
  margin-top: 107px;
  text-align: center;
  position: absolute;
  color: red;
  font-size: 0.875rem;
  @media (min-width: 1px) and (max-width: 768px) {
    top: 1rem;
    left: 0rem;
  }
`;
const IdInfoMessage = styled.div`
  position: absolute;
  color: black;
  left: 0rem;
  text-align: center;
  margin-top: 137px;
  width: 265px;
  font-size: 0.855rem;
  transition: all 0.8s ease-out;
  @media (min-width: 1px) and (max-width: 768px) {
    left: -0.5rem;
    top: 1.1rem;
  }
`;

const AlignBtn = styled.div`
  text-align: center;
  position: relative;
  display: inline-block;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 21.2rem;
  @media (min-width: 1px) and (max-width: 768px) {
    position: relative;
    top: 21.8rem;
  }
`;

const KakaoBtnWrap = styled.span`
  position: relative;
  text-align: center;
  background-color: #f8e33b;
  border-radius: 1.063rem;
  padding: 0.62rem 5.51rem;
  font-size: 0.71rem;
  cursor: pointer;
  &:hover {
    padding: 0.62rem 5.52rem;
    font-weight: 800;
  }
  &:active {
    padding: 0.62rem 5.17rem;
    font-weight: 500;
  }
`;

const KakaoBtn = styled.img`
  position: absolute;
  top: 0.62rem;
  left: 0.6rem;
  width: 1.088rem;
  height: 1.018rem;
`;

const NaverBtnWrap = styled.span`
  position: relative;
  text-align: center;
  top: 0.41rem;
  background-color: #19ce60;
  color: #ffffff;
  border-radius: 1.063rem;
  padding: 0.62rem 5.51rem;
  font-size: 0.71rem;
  cursor: pointer;
  &:hover {
    padding: 0.62rem 5.51rem;
    font-weight: 800;
  }
  &:active {
    padding: 0.62rem 5.17rem;
    font-weight: 500;
  }
`;

const NaverBtn = styled.img`
  position: absolute;
  top: 0.66rem;
  left: 0.74rem;
  width: 0.85rem;
  height: 0.87rem;
`;

const GoogleBtnWrap = styled.span`
  position: relative;
  text-align: center;
  top: 0.82rem;
  background-color: #f35a5f;
  color: #ffffff;
  border-radius: 1.063rem;
  padding: 0.61rem 5.85rem;
  font-size: 0.71rem;
  cursor: pointer;
  &:hover {
    padding: 0.62rem 5.85rem;
    font-weight: 800;
  }
  &:active {
    padding: 0.62rem 5.52rem;
    font-weight: 500;
  }
`;

const GoogleBtn = styled.img`
  position: absolute;
  top: 0.42rem;
  left: 0.6rem;
  width: 1.388rem;
  height: 1.318rem;
`;
const MemberWrapper = styled.div`
  position: relative;
  top: 0rem;
  left: -22.32rem;
  @media (min-width: 1px) and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
const MemberFindIdWrapper = styled.span`
  position: absolute;
  display: none;
  @media (min-width: 1px) and (max-width: 768px) {
    text-align: center;
    margin: 0 auto;
    display: none;
    z-index: 3;
    height: 44.91rem;
    border: 0.375rem solid #000000;
    border-radius: 1rem;
    background: #f5f5f5;
    box-shadow: 0px 15px 25px -6px rgba(0, 0, 0, 0.23);
    left: 20.07rem;
    margin-top: -0.35rem;
    width: calc(100vw - 76px - 28.16px);
    margin-left: 1.9rem;
  }
`;
const MemberFindPasswordWrapper = styled.span`
  position: absolute;
  display: none;
  left: 0;
  top: 0;
  @media (min-width: 1px) and (max-width: 768px) {
    text-align: center;
    margin: 0 auto;
    display: none;
    z-index: 3;
    height: 44.91rem;
    border: 0.375rem solid #000000;
    border-radius: 1rem;
    background: #f5f5f5;
    box-shadow: 0px 15px 25px -6px rgba(0, 0, 0, 0.23);
    left: 20.07rem;
    margin-top: -0.35rem;
    width: calc(100vw - 76px - 28.16px);
    margin-left: 1.9rem;
  }
`;
const BackBtn = styled.img`
  display: none;
  position: absolute;
  width: 1.5rem;
  height: 3.6rem;
  right: -23.83rem;
  top: -11.07rem;
  z-index: 4;

  @media (min-width: 1px) and (max-width: 768px) {
    position: relative;
    box-shadow: 0px 15px 25px -6px rgba(0, 0, 0, 0.43);
    top: -2.821rem;
    left: calc(10.1% + 106.5vw);
    transform: rotate(-90deg);
    z-index: 3;
  }
`;

const SetPosCountDownTimer = styled.div`
  position: absolute;
  display: inline-block;

  background: #f5f5f5;
  top: -9rem;
  left: -0.78rem;
  z-index: 9999;
  @media (min-width: 1px) and (max-width: 768px) {
    top: -20.5rem;
    left: 2.68rem;
  }
`;

interface Props {
  readonly onSignIn: (
    userId: string,
    password: string,
    autoLogin: boolean,
  ) => any;
  readonly isAuthorized: boolean;
  readonly tryLoginAuth: TryLoginAuth | any;
  readonly toggleLogin: ToggleLogin | any;
  readonly timeToLive: TimeToLive | any;
}

const MemberLogin = ({
  onSignIn,
  isAuthorized,
  tryLoginAuth,
  toggleLogin,
  timeToLive,
}: Props) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [idIconHover, setIdIconHover] = useState<boolean>();
  const [pwIconHover, setPwIconHover] = useState<boolean>();
  const [autoLogin, setAutoLogin] = useState(false);
  const [isRemember, setIsRemember] = useState<boolean>(false);
  const [LoginInitStatus, setLoginInitStatus] = useState<boolean>();
  const [kakaoBtnHover, setKakaoBtnHover] = useState(false);
  const [naverBtnHover, setNaverBtnHover] = useState(false);
  const [googleBtnHover, setGoogleBtnHover] = useState(false);
  const [IdInfo, setIdInfo] = useState('');
  const [backBtnHover, setBackBtnHover] = useState<boolean>();
  const [hideBackBtn, setHideBackBtn] = useState<boolean>();

  const LoginRef = useRef(null) as unknown as HTMLSpanElement &
    (LegacyRef<HTMLSpanElement> | undefined) as any;
  const MemberFindIdRef = useRef(null) as unknown as HTMLSpanElement &
    (LegacyRef<HTMLSpanElement> | undefined) as any;
  const MemberFindPasswordRef = useRef(null) as unknown as HTMLSpanElement &
    (LegacyRef<HTMLSpanElement> | undefined) as any;
  const BackBtnRef = useRef(null) as unknown as HTMLSpanElement &
    (LegacyRef<HTMLSpanElement> | undefined) as any;

  const onChangeUserId = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const idRegEx = /^[a-z0-9]*$/;
      const idRegEx2 =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
      if (!idRegEx.test(e.target.value) && !idRegEx2.test(e.target.value)) {
        setIdInfo('소문자,숫자 또는 이메일 형식입니다.');
      } else {
        setIdInfo('');
        setUserId(e.target.value);
      }
    },
    [],
  );
  const onChangeUserPassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    [],
  );
  const onSetAutoLogin = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (autoLogin === true) {
        setAutoLogin(false);
        setIsRemember(false);
      } else if (autoLogin === false) {
        setAutoLogin(true);
        setIsRemember(true);
      }
    },
    [autoLogin],
  );

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoginInitStatus(true);
      onSignIn(userId, password, isRemember);
      setUserId('');
      setPassword('');
      setAutoLogin(false);
      setIsRemember(false);
      LoginRef.current.style.zIndex -= 1;
    },
    [onSignIn, userId, password, isRemember],
  );

  const MemberModuleArray = [MemberFindIdRef, MemberFindPasswordRef];
  const onDisplayMember = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    selectItem: number,
  ) => {
    MemberModuleArray[selectItem].current.style.display = 'block';
    setHideBackBtn(true);
  };
  const goToBackward = () => {
    MemberModuleArray[0].current.style.display = 'none';
    MemberModuleArray[1].current.style.display = 'none';

    setHideBackBtn(false);
  };
  useEffect(() => {
    if (hideBackBtn === true) {
      BackBtnRef.current.style.display = 'block';
    } else {
      BackBtnRef.current.style.display = 'none';
    }
    window.onpopstate = () => {
      // 브라우저의 뒤로 가기 버튼을 클릭했을 때 발생하는 이벤트
      for (const ref of MemberModuleArray) {
        ref.current.style.display = 'none';
      }
    };
    return () => {
      window.onpopstate = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hideBackBtn]);
  return (
    <RightBlock>
      <Description ref={LoginRef}>
        <Logintit
          src={process.env.PUBLIC_URL + '/images/logintit.png'}
          alt="login"
        />
        <form method="post" onSubmit={onSubmit}>
          <IdInputIcon
            src={
              idIconHover
                ? process.env.PUBLIC_URL + '/images/loginidIconOv.png'
                : process.env.PUBLIC_URL + '/images/loginidIcon.png'
            }
          />
          <IdInput
            maxLength={50}
            name="username"
            autoComplete="username"
            onChange={onChangeUserId}
            placeholder="아이디"
            value={userId}
            onFocus={() => setIdIconHover(true)}
            onBlur={() => setIdIconHover(false)}
            spellCheck="false"
          />
          <PwInputIcon
            src={
              pwIconHover
                ? process.env.PUBLIC_URL + '/images/loginpwIconOv.png'
                : process.env.PUBLIC_URL + '/images/loginpwIcon.png'
            }
          />
          <PwInput
            maxLength={30}
            name="password"
            type="password"
            autoComplete="new-password"
            onChange={onChangeUserPassword}
            placeholder="비밀번호"
            value={password}
            onFocus={() => setPwIconHover(true)}
            onBlur={() => setPwIconHover(false)}
          />
          <AutoLgn>
            <Chkbox
              id="checkbox"
              checked={autoLogin}
              onChange={onSetAutoLogin}
            />
            <label htmlFor="checkbox">로그인 유지</label>
          </AutoLgn>
          <span
            onClick={(e: any) => {
              onDisplayMember(e, 0);
            }}
          >
            <FindID>아이디</FindID>
          </span>
          <FindIdandPassword>
            /&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;찾기
          </FindIdandPassword>
          <span
            onClick={(e: any) => {
              onDisplayMember(e, 1);
            }}
          >
            <FindPassword>비밀번호</FindPassword>
          </span>
          <SuccessMessage>
            {isAuthorized && toggleLogin && '로그인 성공'}
          </SuccessMessage>
          <ErrorMessage>
            {(!isAuthorized || !toggleLogin) &&
              LoginInitStatus &&
              '로그인 실패'}
            {tryLoginAuth ? (
              <SetPosCountDownTimer>
                <CountDownTimer timeToLive={timeToLive} />
              </SetPosCountDownTimer>
            ) : (
              <></>
            )}
          </ErrorMessage>
          <IdInfoMessage>{IdInfo}</IdInfoMessage>
          <Button
            style={{
              borderRadius: `1.12rem`,
              width: `15.5rem`,
              top: `20.4rem`,
              left: `0.19rem`,
              position: `relative`,
            }}
          >
            로그인
          </Button>
        </form>
        <AlignBtn>
          <KakaoBtnWrap
            onClick={() =>
              (window.location.href =
                'http://52.78.70.226:8088/oauth2/authorization/kakao?redirect_uri=http://52.78.70.226:3000/socialLogin')
            }
            onMouseOver={() => setKakaoBtnHover(true)}
            onMouseOut={() => setKakaoBtnHover(kakaoBtnHover)}
            title="Login Kakao"
          >
            <KakaoBtn
              src={process.env.PUBLIC_URL + '/images/kakaoicon.png'}
              alt="Login Kakao"
            />
            카카오 로그인
          </KakaoBtnWrap>
          <NaverBtnWrap
            onClick={() =>
              (window.location.href =
                'http://52.78.70.226:8088/oauth2/authorization/naver?redirect_uri=http://52.78.70.226:3000/socialLogin')
            }
            onMouseOver={() => setNaverBtnHover(true)}
            onMouseOut={() => setNaverBtnHover(naverBtnHover)}
            title="Login Naver"
          >
            <NaverBtn
              src={process.env.PUBLIC_URL + '/images/navericon.png'}
              alt="Login Naver"
            />
            네이버 로그인
          </NaverBtnWrap>
          <GoogleBtnWrap
            onClick={() =>
              (window.location.href =
                'http://ec2-52-78-70-226.ap-northeast-2.compute.amazonaws.com:8088/oauth2/authorization/google?redirect_uri=http://52.78.70.226:3000/socialLogin')
            }
            onMouseOver={() => setGoogleBtnHover(true)}
            onMouseOut={() => setGoogleBtnHover(googleBtnHover)}
            title="Login Google"
          >
            <GoogleBtn
              src={process.env.PUBLIC_URL + '/images/googleicon.png'}
              alt="Login Google"
            />
            구글 로그인
          </GoogleBtnWrap>
        </AlignBtn>
      </Description>

      <MemberWrapper>
        <BackBtn
          alt="뒤로가기"
          title="뒤로가기"
          ref={BackBtnRef}
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
        <MemberFindIdWrapper ref={MemberFindIdRef}>
          <MemberFindId />
        </MemberFindIdWrapper>
        <MemberFindPasswordWrapper ref={MemberFindPasswordRef}>
          <MemberFindPassword />
        </MemberFindPasswordWrapper>
      </MemberWrapper>
    </RightBlock>
  );
};

export default MemberLogin;
