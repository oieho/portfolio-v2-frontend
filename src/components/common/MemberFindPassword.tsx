import styled from 'styled-components';
import React, {
  useState,
  useCallback,
  useRef,
  CSSProperties,
  RefObject,
} from 'react';
import Button from './button/Button';
import { useNavigate } from 'react-router-dom';
import CountDownTimer from './CountDownTimer';
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

const DescriptionTop = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  top: 1.25rem;
`;
const NowLoading = styled.span`
  position: absolute;
  top: 8.8rem;
  font-size: 0.85rem;
  z-index: 99;
`;

const Confirmpwtit = styled.img`
  position: relative;
  top: 4.8rem;
  z-index: 0;
`;

const IdInput = styled.input`
  position: absolute;
  top: 10.5rem;
  left: 0.5rem;
  width: 15.5rem;
  line-height: 2rem;
  border: 1px solid #ededed;
  outline: none;
  padding: 0.4rem 0.4rem 0.4rem 0.4rem;
  background: #fff;
  border-radius: 1rem;
  z-index: 1;
  font-size: 0.85rem;

  &:focus {
    font-weight: bold;
  }
`;

const DisplayAndTakeEmailInput = styled.input`
  position: absolute;
  top: 10.5rem;
  width: 15.5rem;
  left: 0.5rem;
  line-height: 2rem;
  border: 1px solid #ededed;
  outline: none;
  padding: 0.4rem 0.4rem 0.4rem 0.4rem;
  background: #fff;
  border-radius: 1rem;
  z-index: 1;
  font-size: 0.85rem;

  &:focus {
    font-weight: bold;
    border: solid 0.11rem #000000;
  }
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
  margin-top: -107px;
  position: absolute;
  color: #00b300;
  text-align: center;
  font-size: 0.875rem;
  z-index: 3;
`;

const ErrorMessage = styled.div`
  width: 266px;
  margin-top: -107px;
  position: absolute;
  color: red;
  text-align: center;
  font-size: 0.875rem;
  z-index: 3;
`;

const InfoMessage = styled.div`
  position: absolute;
  top: -86px;
  color: black;
  width: 266px;
  text-align: center;
  font-size: 0.855rem;
  transition: all 0.8s ease-out;
  z-index: 3;
`;
const FindPasswordFindIdWrapper = styled.span`
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
const FindPasswordChangePwWrapper = styled.span`
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
const ShowChangePassword = styled.span`
  position: absolute;
  width: 100%;
  left: 0;
  top: 1.25rem;
`;
const BackBtn = styled.img`
  position: absolute;
  width: 1.5rem;
  height: 3.57rem;
  right: -1.5rem;
  top: 4.5rem;
`;
interface Props {
  readonly validateIdChk: (userId: string) => any;
  readonly validateEmailChk: (userId: string, userEmail: string) => any;
  readonly verifyFindPasswordToken: (token: string) => any;
  readonly deleteFindPasswordToken: (token: string) => any;
  readonly onChangePW: (userId: string, newPassword: string) => any;
}

const MemberFindPassword = ({
  validateIdChk,
  validateEmailChk,
  verifyFindPasswordToken,
  deleteFindPasswordToken,
  onChangePW,
}: Props) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [, setId] = useState('');
  const [contentToggle, setContentToggle] = useState<boolean>();
  const [userId, setUserId] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const [sMessage, setSMessage] = useState('');
  const [fMessage, setFMessage] = useState('');
  const [iMessage, setIMessage] = useState('');

  const [takenEmail, setTakenEmail] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [progress, setProgress] = useState(0);

  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [validateNew, setValidateNew] = useState<boolean>();
  const [validateCNew, setValidateCNew] = useState<boolean>();

  const [backBtnHover, setBackBtnHover] = useState<boolean>();
  const [preventReattempt, setPreventReattempt] = useState<boolean>();

  let loadingInterval: any;
  let timeoutId: any;
  const cIdInput = useRef(null) as any;
  const Warning = useRef(null) as InnerHTML &
    CSSProperties &
    (RefObject<HTMLDivElement> | null | undefined);

  const onConfirmId = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  }, []);

  const onIdConfirm = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      validateIdChk(userId).then((response: any) => {
        setId(response.data.userId);
        if (response.data.booleanResult === true) {
          setFMessage('');
          setContentToggle(true);
          setIMessage('누락된 *을 올바르게 입력해주십시오.');

          const toSplitEmail = response.data.userEmail.split('@');
          const splitedEmail1 = toSplitEmail[0].replace(
            toSplitEmail[0].substring(0, 3),
            '***',
          );
          const splitedEmail2 = toSplitEmail[1];
          const afterSplitCombinedEmail = splitedEmail1 + '@' + splitedEmail2;
          setUserEmail(afterSplitCombinedEmail);
          setTakenEmail(true);
        } else if (response.data.booleanResult === false) {
          cIdInput.current.focus();
          setFMessage('아이디가 일치하지 않습니다.');
        }
      });

      e.preventDefault();
    },
    [validateIdChk, userId],
  );

  const onChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserEmail(e.target.value);
    },
    [],
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

  const onSubmit = useCallback(
    (e: React.ChangeEvent<HTMLFormElement>) => {
      setIsLoading(true);
      setIMessage('');
      setFMessage('');
      let now = new Date();
      let chkNow = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours(),
        now.getMinutes(),
        now.getSeconds(),
      );
      let tomorrow = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,
        0,
        10,
      );
      if (1000 >= new Date(tomorrow).getTime() - new Date(chkNow).getTime()) {
        if (preventReattempt === true) {
          alert('이미 발송되었습니다. 새로고침 후 재시도 하실 수 있습니다.');
          e.preventDefault();
          navigate(-1);
          return;
        }
        setPreventReattempt(true);
        startLoadingInterval();
        if (window.confirm('인증 메일을 발송하시겠습니까?')) {
          validateEmailChk(userId, userEmail)
            .then((response: any) => {
              setIsLoading(false);
              clearInterval(loadingInterval);
              if (response.data.booleanResult === true) {
                alert('메일을 성공적으로 발송하였습니다.');
                timeoutId = setTimeout(() => {
                  timeoutId = null;
                }, 305000);

                setIMessage('');
                setFMessage('');
                setShowTimer(true);

                const tobeDeletedToken = response.data.token;
                // eslint-disable-next-line react-hooks/exhaustive-deps
                const chkInterval = setInterval(
                  () =>
                    verifyFindPasswordToken(response.data.token).then(
                      (response: any) => {
                        if (timeoutId === null) {
                          setShowTimer(false);
                          alert('인증 시간이 초과되었습니다.');
                          setIsLoading(false);
                          clearInterval(chkInterval);
                          clearInterval(loadingInterval);
                          deleteFindPasswordToken(tobeDeletedToken).then();
                          window.location.reload();
                          return;
                        }
                        if (response === true) {
                          alert('인증에 성공하여 비밀번호 변경이 가능합니다.');
                          setShowTimer(false);
                          setTakenEmail(false);
                          setShowChangePassword(true);
                          setIsLoading(false);
                          clearInterval(chkInterval);
                          clearInterval(loadingInterval);
                        }
                      },
                    ),
                  2000,
                );
                // eslint-disable-next-line react-hooks/exhaustive-deps
              }
            })
            .catch(() => {
              setFMessage('아이디가 일치하지 않습니다.');
            });
        } else {
          e.preventDefault();
          setIsLoading(false);
          clearInterval(loadingInterval);
          setFMessage('인증 메일 전송을 취소하셨습니다.');
          return;
        }
      } else {
        alert(
          '점검 중입니다. ' +
            (10 - now.getSeconds()) +
            '초 후에 다시 시도하시길 바랍니다.',
        ); // 출처 없는 비밀번호 찾기 인증 토큰 제거(스프링 스케줄러)
      }
      e.preventDefault();
    },
    [
      validateEmailChk,
      verifyFindPasswordToken,
      userId,
      userEmail,
      timeoutId,
      startLoadingInterval,
      loadingInterval,
    ],
  );

  const onNewPassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let pwRegEx = /^[a-zA-Z0-9]{8,25}$/;
      if (!pwRegEx.test(e.target.value)) {
        setIMessage(
          (Warning.innerHTML = 'PW는 영문,숫자 8-20자리 조합입니다.'),
        );
        setValidateNew(false);
      } else {
        setIMessage((Warning.innerHTML = ''));
        if (confirmNewPassword !== e.target.value) {
          setSMessage('');
          setFMessage('');
          setNewPassword(e.target.value);
          setValidateNew(false);
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
        setIMessage(
          (Warning.innerHTML = 'PW는 영문,숫자 8-20자리 조합입니다.'),
        );
        setValidateCNew(false);
      } else {
        setIMessage('');
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
      if (validateNew === true && validateCNew === true) {
        onChangePW(userId, confirmNewPassword).then((response: boolean) => {
          if (response === true) {
            setFMessage('');
            setSMessage('비밀번호가 변경되었습니다.');
            setValidateNew(false);
            setValidateCNew(false);
          }
        });
      } else {
        setFMessage('비밀번호가 유효하지 않습니다.');
        setSMessage('');
      }
      e.preventDefault();
    },
    [userId, confirmNewPassword, onChangePW, validateNew, validateCNew],
  );

  const goToBackward = () => {
    if (showChangePassword) {
      setShowChangePassword(false);
      setTakenEmail(false);
      setContentToggle(false);
    } else {
      setShowChangePassword(false);
      setContentToggle(false);
    }
  };
  return (
    <Wrapper>
      <RightBlock>
        {!contentToggle ? (
          <FindPasswordFindIdWrapper>
            <Confirmpwtit
              src={process.env.PUBLIC_URL + '/images/confirmidtit.png'}
              alt="Confirm Identification"
            />
            <form method="post" onSubmit={onIdConfirm}>
              <DescriptionTop>
                <IdInput
                  ref={cIdInput}
                  maxLength={20}
                  name="userid"
                  type="text"
                  autoComplete="userid"
                  onChange={onConfirmId}
                  placeholder="아이디"
                  required
                />
              </DescriptionTop>
              <Button
                style={{ top: `14.6rem`, left: `0rem`, position: `relative` }}
              >
                확인
              </Button>
            </form>
          </FindPasswordFindIdWrapper>
        ) : (
          <FindPasswordChangePwWrapper>
            {isLoading ? (
              <NowLoading>
                <CircularProgress
                  size={30}
                  variant="determinate"
                  value={progress}
                />
              </NowLoading>
            ) : null}
            <Confirmpwtit
              src={process.env.PUBLIC_URL + '/images/findpasswordtit.png'}
              alt="Member Modify"
            />
            {takenEmail ? (
              <form method="post" onSubmit={onSubmit}>
                <DescriptionTop>
                  <DisplayAndTakeEmailInput
                    maxLength={20}
                    name="useremail"
                    type="text"
                    autoComplete="useremail"
                    onChange={onChangeEmail}
                    value={userEmail}
                    spellCheck="false"
                    required
                  />

                  <Button
                    style={{
                      width: `5.973rem`,
                      top: `16.27rem`,
                      left: `5.47rem`,
                      position: `relative`,
                    }}
                  >
                    메일로 받기
                  </Button>
                </DescriptionTop>
              </form>
            ) : (
              <></>
            )}
            {showTimer ? (
              <form method="post" onSubmit={onSubmit}>
                <DescriptionTop>
                  <CountDownTimer />
                </DescriptionTop>
              </form>
            ) : (
              <></>
            )}
            {showChangePassword ? (
              <ShowChangePassword>
                <form method="put" onSubmit={onChangePassword}>
                  <Inputs>
                    <InputLi>
                      <NewPwInput
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
                  <Button
                    style={{
                      width: `6.683rem`,
                      top: `18.272rem`,
                      left: `5.17rem`,
                      position: `relative`,
                    }}
                  >
                    비밀번호 변경
                  </Button>
                </form>
              </ShowChangePassword>
            ) : (
              <></>
            )}
            <BackBtn
              alt="뒤로가기"
              title="뒤로가기"
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
          </FindPasswordChangePwWrapper>
        )}
        <SuccessMessage>{sMessage}</SuccessMessage>
        <ErrorMessage>{fMessage}</ErrorMessage>
        <InfoMessage ref={Warning}>{iMessage}</InfoMessage>
      </RightBlock>
    </Wrapper>
  );
};

export default MemberFindPassword;
