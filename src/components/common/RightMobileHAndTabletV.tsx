import styled, { css } from 'styled-components';
import React, { useEffect, useState, useContext } from 'react';
import { MyInfo } from '../../App';
import { MainContext } from '../../pages/Main';
import CircleBtn from './button/481rightBtn';
import { useSearchParams, useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const rotateAnimation1 = css`
  transform: rotate(180deg); /* 회전 효과 */
`;
const GNB = styled.span<{ rotate: boolean }>`
  background-color: #000000;
  position: relative;
  top: 1.93rem;
  width: calc(0.1% + 77px - 28.16px);
  height: 44.914rem;
  box-shadow: 0px 15px 25px -6px rgba(0, 0, 0, 0.03);
  border-radius: 1rem;
  z-index: 9999;

  ul {
    list-style: none;
    padding: 0 0;
    margin: 1rem 0 0 0;
    li {
      img {
        position: absolute;
        width: 12px;
        height: 12px;
        cursor: pointer;
      }
    }
    li:nth-child(1) {
      display: flex;
      align-items: center; /* 수직 가운데 정렬 */
      justify-content: center; /* 수평 가운데 정렬 */
      margin: 0.8rem 0;
    }
    li:nth-child(2) {
      display: flex;
      align-items: center; /* 수직 가운데 정렬 */
      justify-content: center; /* 수평 가운데 정렬 */
      width: 100%;
      margin: 0.5rem 0;

      img {
        position: absolute;
        width: 26px;
        height: 26px;
      }
    }
  }

  @media (min-width: 650px) and (max-width: 768px) {
    left: calc(50% - 7.1vw);
  }
  @media (min-width: 600px) and (max-width: 649px) {
    left: calc(50% - 7.6vw);
  }
  @media (min-width: 1px) and (max-width: 599px) {
    right: calc(-50% + 9.2vw);
  }
`;
const RotateLi1 = styled.li<{ $rotate: boolean }>`
  ${({ $rotate }) => $rotate && rotateAnimation1}
  transition:all 0.47s ease-out;
  display: flex;
  align-items: center; /* 수직 가운데 정렬 */
  justify-content: center; /* 수평 가운데 정렬 */
  width: 100%;
  margin: 0.8rem 0;
  rotate: 25deg;
  cursor: pointer;
  img {
    z-index: 2;
    position: absolute;
    width: 14px;
    height: 14px;
    cursor: pointer;
  }
`;
const RotateLi2 = styled.li<{ $rotate: boolean }>`
  ${({ $rotate }) =>
    $rotate &&
    css`
      transform: rotate(180deg); /* Apply rotation based on the prop */
    `}
  transition: transform 0.47s ease-out; /* Apply transition to transform */
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 13rem 0;

  &:hover img {
    opacity: 0;
    animation: slideAndFade 2.1s linear infinite;
  }

  img {
    @keyframes slideAndFade {
      0% {
        transform: translateX(-70%);
        opacity: 1;
      }
      30% {
        transform: translateX(0);
        opacity: 0.7;
      }
      70% {
        transform: translateX(70%);
        opacity: 0.2;
      }
      100% {
        transform: translateX(70%);
        opacity: 0;
      }
    }

    width: 12px;
    height: 12px;
    margin-top: 0.1rem;
    object-fit: contain;
    z-index: 0;
    position: absolute;
    cursor: pointer;

    &:nth-of-type(1) {
      animation-delay: 0s;
    }
    &:nth-of-type(2) {
      animation-delay: 0.75s;
    }
    &:nth-of-type(3) {
      animation-delay: 1.5s;
    }
  }
`;

type Props = {
  readonly isAuthorized: boolean;
  readonly myInfo: MyInfo | null;
  readonly onLogout: () => void;
};

const RightMobileHAndTabletV = ({ isAuthorized, myInfo, onLogout }: Props) => {
  const { state, actions } = useContext(MainContext);
  const navigate = useNavigate();
  const [toggleLoginDesc, setToggleLoginDesc] = useState(true);
  const [toggleShowDesc, setToggleShowDesc] = useState(false);
  const [searchParams] = useSearchParams();

  const contentBodyOuterWrapper = document.getElementById(
    'contentBodyOuterWrapper',
  ) as HTMLDivElement;
  const outerDescWrapper = document.getElementById(
    'outerDescWrapper',
  ) as HTMLDivElement;
  const outerMemberWrapper = document.getElementById(
    'outerMemberWrapper',
  ) as HTMLDivElement;
  const miniBtnWrapper = document.getElementById(
    'miniBtnWrapper',
  ) as HTMLSpanElement;
  const memberLogin = document.getElementById('memberLogin') as any;
  const memberJoin = document.getElementById('memberJoin') as HTMLDivElement;
  const memberModify = document.getElementById(
    'memberModify',
  ) as HTMLDivElement;
  const memberInfo = document.getElementById('memberInfo') as HTMLDivElement;
  const mailSender = document.getElementById('mailSender') as HTMLDivElement;
  const contentDesc = document.getElementById('contentDesc') as HTMLDivElement;

  useEffect(() => {
    callContentDesc(state.toggleShowDescType);
  }, [memberLogin, state.toggleShowDescType]);

  const callContentDesc = (type: string) => {
    const titleQParam = searchParams.get('title');
    const countQParam = searchParams.get('count');
    const regDateQParam = searchParams.get('regDate');
    const searchTypeQParam = searchParams.get('searchType');
    const keywordQParam = searchParams.get('keyword');
    const toolOrHashTagQParam = searchParams.get('toolOrHashTag');

    const baseQueryURL = `&title=${titleQParam}&count=${countQParam}&regDate=${regDateQParam}&searchType=${searchTypeQParam}&keyword=${keywordQParam}&toolOrHashTag=${toolOrHashTagQParam}&isModified=false`;

    const viewContentDescURL = `boards/viewContentDesc/${
      state.readIndex + 1
    }?${baseQueryURL}`;
    const viewContentBodyURL = `boards/viewContentBody/${
      state.readIndex + 1
    }?${baseQueryURL}`;
    const boardsURL = `boards?selected=${state.selectedList}${baseQueryURL}`;

    const controlzIdx = () => {
      if (outerDescWrapper) {
        outerDescWrapper.style.zIndex = (
          parseInt(outerDescWrapper.style.zIndex) - 1
        ).toString();
      }

      if (outerMemberWrapper) {
        outerMemberWrapper.style.display = 'block';
        outerMemberWrapper.style.zIndex = (2).toString();
      }
      if (contentBodyOuterWrapper) {
        contentBodyOuterWrapper.style.zIndex = (1).toString();
      }
    };
    if (toggleShowDesc === false) {
      setToggleShowDesc(true);
    } else {
      setToggleShowDesc(false);
    }

    if (type === 'ContentDesc') {
      memberLogin.style.display = 'none';
      memberJoin.style.display = 'none';
      memberModify.style.display = 'none';
      memberInfo.style.display = 'none';
      mailSender.style.display = 'none';
      outerMemberWrapper.style.display = 'none';
      miniBtnWrapper.style.display = 'none';

      if (state.afterHideSetContentDesc) {
        if (state.toggleShowDescCount % 2 === 0) {
          actions.setToggleShowDescCount((state.toggleShowDescCount += 1));
          navigate(viewContentDescURL, {
            state: { searchType: null, keyword: null },
          });

          actions.setToggleShowDescType(''); // 무한 루프 방지
        } else if (state.toggleShowDescCount % 2 === 1) {
          actions.setToggleShowDescCount((state.toggleShowDescCount += 1));
          navigate(boardsURL);
          actions.setToggleShowDescType(''); // 무한 루프 방지
        }
        console.log(state.toggleShowDescCount);
      } else if (!state.afterHideSetContentDesc) {
        if (state.toggleShowDescCount % 2 === 1) {
          actions.setToggleShowDescCount((state.toggleShowDescCount += 1));
          navigate(viewContentBodyURL, {
            state: { searchType: null, keyword: null },
          });

          actions.setToggleShowDescType('');
        } else if (state.toggleShowDescCount % 2 === 0) {
          actions.setToggleShowDescCount((state.toggleShowDescCount += 1));
          navigate(viewContentDescURL, {
            state: { searchType: null, keyword: null },
          });

          actions.setToggleShowDescType('');
        }
      }
    } else if (type === 'Login' && memberLogin) {
      memberLogin.style.display = 'block';
      memberJoin.style.display = 'none';
      memberModify.style.display = 'none';
      memberInfo.style.display = 'none';
      mailSender.style.display = 'none';

      if (contentDesc) {
        contentDesc.style.display = 'none';
        outerDescWrapper.style.display = 'none';
      }

      controlzIdx();
      actions.setToggleShowDescType('');
    } else if (type === 'Logout') {
      onLogout();
      actions.setToggleShowDescType('');
    } else if (type === 'Join' && memberJoin) {
      memberJoin.style.display = 'block';
      memberLogin.style.display = 'none';
      memberModify.style.display = 'none';
      memberInfo.style.display = 'none';
      mailSender.style.display = 'none';

      if (contentDesc) {
        contentDesc.style.display = 'none';
        outerDescWrapper.style.display = 'none';
      }
      controlzIdx();
      actions.setToggleShowDescType('');
    } else if (type === 'Modify' && memberJoin) {
      memberModify.style.display = 'block';
      memberLogin.style.display = 'none';
      memberJoin.style.display = 'none';
      memberInfo.style.display = 'none';
      mailSender.style.display = 'none';

      if (contentDesc) {
        contentDesc.style.display = 'none';
        outerDescWrapper.style.display = 'none';
      }
      controlzIdx();
      actions.setToggleShowDescType('');
    }

    if (type && miniBtnWrapper) {
      if (type !== 'Login' && type !== 'Join' && type !== 'Modify') {
        return;
      }
      miniBtnWrapper.style.display = 'block';
      miniBtnWrapper.style.zIndex += 4;
    }
  };
  return (
    <Wrapper>
      <GNB rotate={toggleShowDesc}>
        <ul>
          {!isAuthorized && !myInfo ? (
            <>
              <RotateLi1
                $rotate={toggleLoginDesc}
                onClick={() => {
                  actions.setToggleShowDescType('Login');
                }}
                title="로그인"
              >
                <CircleBtn alt="로그인">
                  <img
                    src="/images/rightLoginBtn.png"
                    alt="로그인"
                    title="로그인"
                  />
                </CircleBtn>
              </RotateLi1>
              <li
                onClick={() => {
                  actions.setToggleShowDescType('Join');
                }}
                title="회원 가입"
              >
                <CircleBtn alt="회원 가입" title="회원 가입">
                  <img src="/images/rightJoinBtn.png" alt="회원 가입" />
                </CircleBtn>
              </li>
            </>
          ) : (
            <>
              <li
                onClick={() => {
                  actions.setToggleShowDescType('Logout');
                }}
                title="로그아웃"
              >
                <CircleBtn alt="로그아웃" title="로그아웃">
                  <img src="/images/rightLogoutBtn.png" alt="로그아웃" />
                </CircleBtn>
              </li>
              <li
                onClick={() => {
                  actions.setToggleShowDescType('Modify');
                }}
                title="회원정보 수정"
              >
                <CircleBtn alt="회원정보 수정" title="회원정보 수정">
                  <img src="/images/rightModifyBtn.png" alt="회원정보 수정" />
                </CircleBtn>
              </li>
            </>
          )}

          {state.afterHitSetBtnCallContentDesc ? (
            <RotateLi2
              $rotate={state.toggleShowDesc}
              title="선택한 글 설명/댓글 뷰 보기"
              onClick={() => {
                actions.setToggleShowDescType('ContentDesc');

                if (state.toggleShowDesc === true) {
                  actions.setToggleShowDesc(false);
                } else {
                  actions.setToggleShowDesc(true);
                }
              }}
            >
              <CircleBtn>
                <img
                  src="/images/rightViewContentDescBtn.png"
                  alt="선택한 글 설명/댓글 뷰 보기"
                  title="선택한 글 설명/댓글 뷰 보기"
                />
                <img
                  src="/images/rightViewContentDescBtn.png"
                  alt="선택한 글 설명/댓글 뷰 보기"
                  title="선택한 글 설명/댓글 뷰 보기"
                />
                <img
                  src="/images/rightViewContentDescBtn.png"
                  alt="선택한 글 설명/댓글 뷰 보기"
                  title="선택한 글 설명/댓글 뷰 보기"
                />
              </CircleBtn>
            </RotateLi2>
          ) : (
            <></>
          )}
        </ul>
      </GNB>
    </Wrapper>
  );
};
export default React.memo(RightMobileHAndTabletV);
