import styled, { css } from 'styled-components';
import { Board } from '../../App';

import Search from './Search';
import {
  useState,
  useEffect,
  useRef,
  useCallback,
  LegacyRef,
  useContext,
} from 'react';
import React from 'react';
import { Link } from 'react-router-dom';

import { MyInfo, CountInfo } from '../../App';
import MemberLogin from '../../containers/MemberLoginContainer';
import MemberJoin from '../../containers/MemberJoinContainer';
import MemberModify from '../../containers/MemberModifyContainer';
import MemberInfo from '../../containers/MemberInfoContainer';
import MailSender from '../../containers/MailSenderContainer';
import { MainContext } from '../../pages/Main';
import { GiHamburgerMenu } from 'react-icons/gi';
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
const rotateAnimation2 = css`
  transform: rotate(180deg); /* 회전 효과 */
`;

const GNB = styled.span<{ rotate: boolean }>`
  background-color: #000000;
  position: relative;
  top: 1.05rem;
  width: calc(0.1% + 77px - 28.16px);
  height: 42rem;
  box-shadow: 0px 15px 25px -6px rgba(0, 0, 0, 0.03);
  border-radius: 1rem;
  z-index: 99999;

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
  @media (min-width: 481px) and (max-width: 599px) {
    right: calc(-50% + 9.2vw);
  }
`;
const RotateLi1 = styled.span<{ rotate: boolean }>`
  ${({ rotate }) => rotate && rotateAnimation1}
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
  }
`;
const RotateLi2 = styled.span<{ rotate: boolean }>`
  ${({ rotate }) => rotate && rotateAnimation2}
  transition: all 0.47s ease-out;
  display: flex;
  align-items: center; /* 수직 가운데 정렬 */
  justify-content: center; /* 수평 가운데 정렬 */
  width: 100%;
  margin: 13rem 0;
  /* 호버 상태에서의 스타일 */
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
        transform: translateX(+70%);
        opacity: 0.2;
      }
      100% {
        transform: translateX(+70%);
        opacity: 0;
      }
    }

    width: 12px;
    height: 12px;
    margin-top: 0.1rem;
    object-fit: contain;
    z-index: 0;
    position: absolute; /* 절대 위치로 겹치게 설정 */
    cursor: pointer;

    /* 개별 애니메이션 딜레이 */
    &:nth-of-type(1) {
      animation-delay: 0s; /* 첫 번째 이미지 */
    }
    &:nth-of-type(2) {
      animation-delay: 0.75s; /* 두 번째 이미지 */
    }
    &:nth-of-type(3) {
      animation-delay: 1.5s; /* 세 번째 이미지 */
    }
  }
`;

const RightLessThan481 = () => {
  const { state, actions } = useContext(MainContext);
  const navigate = useNavigate();

  const [toggleLoginDesc, setToggleLoginDesc] = useState(true);
  const [toggleShowDesc, setToggleShowDesc] = useState(false);
  const [searchParams] = useSearchParams();

  const callContentDesc = (type: string) => {
    const memberLogin = document.getElementById('memberLogin') as any;
    const memberJoin = document.getElementById('memberJoin');
    const contentDesc = document.getElementById('contentDesc') as any;

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

    if (state.afterHideSetContentDesc) {
      if (toggleShowDesc === false) {
        setToggleShowDesc(true);
      } else {
        setToggleShowDesc(false);
      }

      if (state.toggleShowDescCount % 2 === 0) {
        actions.setToggleShowDescCount((state.toggleShowDescCount += 1));
        navigate(viewContentDescURL, {
          state: { searchType: null, keyword: null },
        });
        actions.setToggleShowDesc(false);
      } else if (state.toggleShowDescCount % 2 === 1) {
        actions.setToggleShowDescCount((state.toggleShowDescCount += 1));
        navigate(boardsURL);
        actions.setToggleShowDesc(true);
      }
      console.log(state.toggleShowDescCount);
    } else if (!state.afterHideSetContentDesc) {
      if (state.toggleShowDescCount % 2 === 1) {
        actions.setToggleShowDescCount((state.toggleShowDescCount += 1));
        navigate(viewContentBodyURL, {
          state: { searchType: null, keyword: null },
        });
        actions.setToggleShowDesc(false);
      } else if (state.toggleShowDescCount % 2 === 0) {
        actions.setToggleShowDescCount((state.toggleShowDescCount += 1));
        navigate(viewContentDescURL, {
          state: { searchType: null, keyword: null },
        });
        actions.setToggleShowDesc(true);
      }
    }

    // } else {
    //   if (!contentDescIfClosed) {
    //     if (contentDesc && contentBody) {
    //       contentBody.style.display = 'none';
    //       contentDesc.style.display = 'block';
    //       contentDesc.style.zIndex++;
    //       contentBody.style.zIndex = -999;

    //       setContentDescIfClosed(true);
    //       return;
    //     }
    //   } else {
    //     if (contentDesc && contentBody) {
    //       contentBody.style.display = 'block';
    //       contentDesc.style.display = 'none';
    //       contentDesc.style.zIndex--;
    //       contentBody.style.zIndex = -999;
    //       setContentDescIfClosed(false);
    //       return;
    //     }
    //   }
    //   setToggleShowDesc(false);
    // }
    // setToggleShowDesc(false);
    // if (contentDesc && outerDescWrapper) {
    //   outerDescWrapper.style.zIndex++;
    //   outerDescWrapper.style.display = 'block';

    //   if (ifClosed) {
    //     contentDesc.style.display = 'none';
    //     contentDesc.style.zIndex++;
    //   }
    // } else if (toggleContentDesc === false && contentDesc) {
    //   contentDesc.style.display = 'none';
    // }

    // if (type === 'memberLogin') {
    //   if (toggleLoginDesc === true && memberLogin && outerWrapper) {
    //     outerWrapper.style.zIndex++;
    //     outerWrapper.style.display = 'block';

    //     memberLogin.style.display = 'block';
    //     actions.setZIdx(state.zIdx + 1);
    //     memberLogin.style.zIndex = state.zIdx;
    //     setToggleLoginDesc(false);
    //   } else if (toggleLoginDesc === false && memberLogin) {
    //     memberLogin.style.display = 'none';
    //     memberLogin.style.zIndex = state.zIdx;
    //     actions.setZIdx(state.zIdx - 1);
    //     setToggleLoginDesc(true);
    //   }
    // } else if (type === 'memberJoin') {
    //   if (toggleContentDesc === true && memberJoin) {
    //     memberJoin.style.display = 'block';
    //     setToggleContentDesc(false);
    //   } else if (toggleContentDesc === false && memberJoin) {
    //     memberJoin.style.display = 'none';
    //     setToggleContentDesc(true);
    //   }
    // } else if (type === 'contentDesc') {

    // }
  };
  return (
    <Wrapper>
      <GNB rotate={toggleShowDesc}>
        <ul>
          <RotateLi1
            rotate={toggleLoginDesc}
            onClick={() => {
              callContentDesc('memberLogin');
            }}
          >
            <CircleBtn>
              <img
                src="/images/board/rightLoginBtn.png"
                alt="로그인"
                title="로그인"
              />
            </CircleBtn>
          </RotateLi1>
          <li
            onClick={() => {
              callContentDesc('memberJoin');
            }}
          >
            <CircleBtn>
              <img
                src="/images/board/rightJoinBtn.png"
                alt="회원 가입"
                title="회원 가입"
              />
            </CircleBtn>
          </li>
          <RotateLi2
            rotate={state.toggleShowDesc}
            title="설명/댓글 뷰 보기"
            onClick={() => {
              callContentDesc('contentDesc');
            }}
          >
            {state.afterHitSetBtnCallContentDesc ? (
              <>
                <CircleBtn>
                  <img
                    src="/images/board/rightViewContentDescBtn.png"
                    alt="설명/댓글 뷰 보기"
                    title="설명/댓글 뷰 보기"
                  />
                  <img
                    src="/images/board/rightViewContentDescBtn.png"
                    alt="설명/댓글 뷰 보기"
                    title="설명/댓글 뷰 보기"
                  />
                  <img
                    src="/images/board/rightViewContentDescBtn.png"
                    alt="설명/댓글 뷰 보기"
                    title="설명/댓글 뷰 보기"
                  />
                </CircleBtn>
              </>
            ) : (
              <></>
            )}
          </RotateLi2>
        </ul>
      </GNB>
      ;
    </Wrapper>
  );
};
export default React.memo(RightLessThan481);
