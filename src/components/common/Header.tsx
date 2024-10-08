import styled from 'styled-components';
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
import { useNavigate } from 'react-router-dom';
import MiniBtn from './button/AddButton';

const OuterMemberWrapper = styled.div`
  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  cursor: pointer;
`;
const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  @media (min-width: 1px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
const Gnb = styled.span`
  display: none;
  left: 0.65rem;
  top: 0.6rem;
  width: 1.9rem;
  height: 1.9rem;

  @media (min-width: 1px) and (max-width: 1280px) {
    display: none;
    position: absolute;
    width: 9rem;
    height: 9rem;
    background-color: black;
    border-radius: 1rem;
    visibility: hidden;
    transition: width 2s ease-out, height 2s ease-out;
    &.expanded {
      display: block;
      position: absolute;
      top: 0.652rem;
      left: 0.702rem;
      width: 144px;
      height: 120.49px;
      visibility: visible;
      z-index: 99999;
    }

    ul {
      position: relative;
      left: 0.7rem;
      list-style: none;
    }
    li {
      cursor: pointer;
      color: white;
      padding: 0rem 0 1rem 0;
    }
    li:last-child {
      color: white;
      padding-bottom: 0;
    }
    li:hover {
      font-weight: 550;
      text-decoration: underline;
    }
  }
`;
const HeaderBlock = styled.div`
  display: block;
  position: relative;
  width: 70.125rem;
  height: 3.1rem;
  left: 3.863rem;
  top: -22.79rem;
  box-sizing: border-box;
  background: #f5f5f5;
  box-shadow: 0px 15px 25px -6px rgba(0, 0, 0, 0.03);
  border-radius: 1rem;
  z-index: 3;
  .hamburgerBtn {
    left: 0.1rem;
    top: 0.05rem;
    display: none;
  }

  .innerRight {
    position: absolute;
    display: inline-block;
    top: 0.23rem;
    right: 0.53rem;
    height: 100%;
    @media (min-width: 1px) and (max-width: 768px) {
      top: -0.853rem;
    }
  }
  .right1 {
    position: relative;
    display: inline-block;
    width: 11.2rem;
    bottom: 0.01rem;
    right: 0.5rem;
    text-align: right;
    cursor: default;
    ul {
      position: relative;
      bottom: 0.2rem;
      font-size: 0.63rem;
      list-style: none;
      left: 0;
      margin: 0;
      padding: 0;
      line-height: 122%;
      li {
        width: 4rem;
        margin-top: 0.1rem;
        display: inline-block;
        &:nth-child(1) {
          width: 2.7rem;
          position: relative;
          font-weight: 600;
          @media (min-width: 1px) and (max-width: 768px) {
            left: 2.6rem;
          }
        }
        &:nth-child(n + 1) {
          @media (min-width: 1px) and (max-width: 768px) {
            display: none;
          }
        }
      }
      @media (min-width: 1px) and (max-width: 768px) {
        top: 47.38rem;
        left: 16.3rem;
        line-height: 168.1%;
        font-size: 0.54rem;
      }
    }
  }
  .right2 {
    position: relative;
    display: inline-block;
    left: 1.7rem;
    padding: 0.5rem 0.5rem 0.5rem 0.46rem;
    width: 19.6rem;
    height: 100%;
    @media (min-width: 1px) and (max-width: 768px) {
      width: 71.2%;
      top: 0.63rem;
    }
  }
  @media (min-width: 1px) and (max-width: 1280px) {
    position: relative;
    top: -22.9rem;
    left: 0rem;
    width: 95.9%;
    z-index: 3;
    .hamburgerBtn {
      display: block;
      background-color: black;
      color: white;
      border-radius: 0.25rem;
      transform: scale(1.8);
      padding: 0.2rem;
      position: absolute;
      margin: 1rem;
      transition: transform 0.3s ease, background-color 0.3s ease;
      &:hover,
      &.expanded {
        transform: scale(1.7);
        outline: black 2px solid;
        background-color: #e5e5e5;
        color: black;
        text-decoration: underline;
        z-index: 999999;
        cursor: pointer;
      }
      &:active {
        transform: scale(1.92);
        font-weight: bold;
      }
    }
  }
  @media (min-width: 769px) and (max-width: 1280px) {
    position: relative;
    top: -22.9rem;
    left: 0rem;
    width: 93.1%;
    z-index: 3;
    .hamburgerBtn {
      display: block;
      background-color: black;
      color: white;
      border-radius: 0.25rem;
      transform: scale(1.8);
      padding: 0.2rem;
      position: absolute;
      margin: 1rem;
      transition: transform 0.3s ease, background-color 0.3s ease;
      z-index: 3;
      &:hover,
      &.expanded {
        transform: scale(1.7);
        outline: black 2px solid;
        background-color: #e5e5e5;
        color: black;
        text-decoration: underline;
      }
      &:active {
        transform: scale(1.92);
        font-weight: bold;
      }
    }
  }
  @media (min-width: 1px) and (max-width: 768px) {
    position: relative;
    top: -22.9rem;
    left: 0.1rem;
    width: calc(50% + 47.5vw - 2rem);
    z-index: 3;
    .hamburgerBtn {
      display: block;
      background-color: black;
      color: white;
      border-radius: 0.25rem;
      transform: scale(1.8);
      padding: 0.2rem;
      position: absolute;
      margin: 1rem;
      transition: transform 0.3s ease, background-color 0.3s ease;
      z-index: 3;
      &:hover,
      &.expanded {
        transform: scale(1.7);
        outline: black 2px solid;
        background-color: #e5e5e5;
        color: black;
        text-decoration: underline;
      }
      &:active {
        transform: scale(1.92);
        font-weight: bold;
      }
    }
  }
`;

const DisplayNoneOnMobileHAndTabletV = styled.span`
  @media (min-width: 1px) and (max-width: 768px) {
    display: none;
  }
`;

const User = styled.span`
  display: inline-block;
  font-size: 0.85rem;
  position: relative;
  margin-left: 1.06rem;
  top: 0.15rem;
  @media (min-width: 1px) and (max-width: 768px) {
    left: 10.175rem;
  }
  @media (min-width: 1px) and (max-width: 479px) {
    left: 59%;
  }
`;

const MailTo = styled.img`
  position: relative;
  bottom: 0.15rem;
  margin-left: 1.325rem;
  cursor: pointer;
  @media (min-width: 480px) and (max-width: 768px) {
    top: 0.47rem;
  }
  @media (min-width: 1px) and (max-width: 479px) {
    display: none;
  }
`;
const Github = styled.img`
  position: relative;
  width: 1.5rem;
  bottom: 0.15rem;
  margin-left: 0.84rem;
  cursor: pointer;
  z-index: 9;
  @media (min-width: 480px) and (max-width: 768px) {
    top: 0.47rem;
  }
  @media (min-width: 1px) and (max-width: 479px) {
    top: 0.47rem;
    left: 3.2rem;
  }
`;
const Admin = styled.img`
  position: relative;
  bottom: 0.15rem;
  margin-left: 0.755rem;
  margin-right: 0.205rem;

  transform: rotate(0deg);
  cursor: pointer;

  &:hover {
    @keyframes rotate_image {
      100% {
        transform: rotate(360deg);
      }
    }
    animation: rotate_image 1.9s linear infinite;
    transform-origin: 50% 50%;
  }
  @media (min-width: 480px) and (max-width: 768px) {
    top: 0.47rem;
  }
  @media (min-width: 1px) and (max-width: 479px) {
    display: none;
  }
`;

const Name = styled.div`
  width: 56px;
  margin-left: 0.014rem;
  top: -0.55rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  text-decoration: underline;
  text-align: center;
  position: relative;
  cursor: pointer;
  &:hover {
    text-decoration: none;
  }
  &:active {
    text-decoration: underline;
    font-weight: 600;
  }
`;
const NotLogged = styled.div`
  text-decoration: none;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.001rem;
  display: inline;
  position: relative;
  left: 0.5rem;
  top: -0.75rem;
`;
const Logged = styled.div`
  text-decoration: none;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.001rem;
  display: inline;
  position: relative;
  top: -0.75rem;
`;
const LogAreaBtn = styled.img`
  position: relative;
  top: -0.03rem;
  width: 4.5rem;
  cursor: pointer;

  &:first-child {
    margin-left: -0.3rem;
    margin-right: 0.925rem;
  }
`;
const MemberWrapper = styled.div`
  position: relative;
  left: 53.5rem;
  bottom: -16.49rem;
  @media (min-width: 769px) and (max-width: 1280px) {
    top: calc(692% - 3.938rem);
    left: calc(100% - (305.99px - 39px));
  }
  @media (min-width: 1px) and (max-width: 768px) {
    left: -0.2rem;
  }
`;
const MemberLoginWrapper = styled.div`
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  @media (min-width: 1px) and (max-width: 768px) {
    display: none;
    z-index: 3;
    height: 44.91rem;
    border: 0.375rem solid #000000;
    border-radius: 1rem;
    background: #f5f5f5;
    box-shadow: 0px 15px 25px -6px rgba(0, 0, 0, 0.23);
    left: -1.91rem;
    top: -14.52rem;
    width: calc(100vw - 76px - 28.16px);
    margin-left: 1.9rem;
  }
`;
const MemberJoinWrapper = styled.div`
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  @media (min-width: 1px) and (max-width: 768px) {
    display: none;
    z-index: 3;
    height: 44.91rem;
    border: 0.375rem solid #000000;
    border-radius: 1rem;
    background: #f5f5f5;
    box-shadow: 0px 15px 25px -6px rgba(0, 0, 0, 0.23);
    left: -1.91rem;
    top: -14.52rem;
    width: calc(100vw - 76px - 28.16px);
    margin-left: 1.9rem;
  }
`;

const MemberModifyWrapper = styled.div`
  position: absolute;
  display: none;
  left: 0;
  top: 0;
  @media (min-width: 1px) and (max-width: 768px) {
    display: none;
    z-index: 3;
    height: 44.91rem;
    border: 0.375rem solid #000000;
    border-radius: 1rem;
    background: #f5f5f5;
    box-shadow: 0px 15px 25px -6px rgba(0, 0, 0, 0.23);
    left: -1.91rem;
    top: -14.52rem;
    width: calc(100vw - 76px - 28.16px);
    margin-left: 1.9rem;
  }
`;
const MemberInfoWrapper = styled.div`
  position: absolute;
  display: none;
  left: 0;
  top: 0;
  @media (min-width: 1px) and (max-width: 768px) {
    display: none;
    z-index: 3;
    height: 44.91rem;
    border: 0.375rem solid #000000;
    border-radius: 1rem;
    background: #f5f5f5;
    box-shadow: 0px 15px 25px -6px rgba(0, 0, 0, 0.23);
    left: -1.91rem;
    top: -14.52rem;
    width: calc(100vw - 76px - 28.16px);
    margin-left: 1.9rem;
  }
`;
const MailSenderWrapper = styled.div`
  position: absolute;
  display: none;
  left: 0;
  top: 0;
  @media (min-width: 1px) and (max-width: 768px) {
    display: none;
    z-index: 3;
    height: 44.91rem;
    border: 0.375rem solid #000000;
    border-radius: 1rem;
    background: #f5f5f5;
    box-shadow: 0px 15px 25px -6px rgba(0, 0, 0, 0.23);
    left: -1.91rem;
    top: -14.52rem;
    width: calc(100vw - 76px - 28.16px);
    margin-left: 1.9rem;
  }
`;
const BackBtn = styled.img`
  display: none;
  position: absolute;
  width: 1.5rem;
  height: 3.6rem;
  right: -1.52rem;
  top: 8.272rem;
  z-index: 2;
  @media (min-width: 1025px) and (max-width: 1280px) {
    right: -1.545rem;
  }
  @media (min-width: 1px) and (max-width: 768px) {
    display: none;
    right: 0rem;
  }
`;
const CoverBackBtn = styled.span`
  display: none;
  position: absolute;
  background-color: #afafaf;
  background-image: url('/images/coverBackBtnbg.png');
  width: 1.5rem;
  height: 3.7rem;
  right: -1.51rem;
  top: 8.175rem;
  z-index: 3;
  @media (min-width: 769px) and (max-width: 1024px) {
    top: 8.36rem;
    right: -1.47rem;
  }
  @media (min-width: 1px) and (max-width: 768px) {
    right: 0rem;
  }
`;
const MiniBtnWrapper = styled.span`
  display: none;

  @media (min-width: 1px) and (max-width: 768px) {
    display: none;
    position: absolute;
    right: 6.62rem;
    top: -14.17rem;
    z-index: 4;
  }
  @media (min-width: 769px) and (max-width: 2000px) {
    display: none !important;
  }
`;
type Props = {
  readonly myInfo: MyInfo | null;
  readonly isAuthorized: boolean;
  readonly countInfos: CountInfo[];
  readonly onLogout: () => void;
};
const Header = ({ myInfo, isAuthorized, countInfos, onLogout }: Props) => {
  const { state, actions } = useContext(MainContext);
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [loginHover, setLoginHover] = useState(false);
  const [joinHover, setJoinHover] = useState(false);
  const [mailToHover, setMailToHover] = useState(false);
  const [backBtnHover, setBackBtnHover] = useState<boolean>();
  const [gnbExpanded, setGnbExpanded] = useState(false);

  const [counter, setCounter] = useState(
    Math.ceil(0 / 1.3)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
  );
  const [tcounter, setTcounter] = useState(
    Math.ceil(0 / 1.3)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
  );

  const counterRef = useRef(null) as unknown as HTMLLIElement &
    (LegacyRef<HTMLLIElement> | undefined);
  const tcounterRef = useRef(null) as unknown as HTMLLIElement &
    (LegacyRef<HTMLLIElement> | undefined);

  const headerBlockRef = useRef(null) as unknown as HTMLDivElement &
    (LegacyRef<HTMLDivElement> | undefined) as any;
  const MemberWrapperRef = useRef(null) as unknown as HTMLDivElement &
    (LegacyRef<HTMLDivElement> | undefined) as any;
  const MemberLoginRef = useRef(null) as unknown as HTMLSpanElement &
    (LegacyRef<HTMLSpanElement> | undefined) as any;
  const MemberJoinRef = useRef(null) as unknown as HTMLSpanElement &
    (LegacyRef<HTMLSpanElement> | undefined) as any;
  const MemberModifyRef = useRef(null) as unknown as HTMLSpanElement &
    (LegacyRef<HTMLSpanElement> | undefined) as any;
  const MemberModifyPasswordRef = useRef(null) as unknown as HTMLSpanElement &
    (LegacyRef<HTMLSpanElement> | undefined) as any;
  const MemberInfoRef = useRef(null) as unknown as HTMLSpanElement &
    (LegacyRef<HTMLSpanElement> | undefined) as any;
  const MailSenderRef = useRef(null) as unknown as HTMLSpanElement &
    (LegacyRef<HTMLSpanElement> | undefined) as any;
  const BackBtnRef = useRef(null) as unknown as HTMLSpanElement &
    (LegacyRef<HTMLSpanElement> | undefined) as any;
  const CoverBackBtnRef = useRef(null) as unknown as HTMLSpanElement &
    (LegacyRef<HTMLSpanElement> | undefined) as any;

  useEffect(() => {
    if (state.toggleBackBtn === true) {
      setTimeout(() => {
        if (BackBtnRef?.current) {
          if (
            !window.matchMedia('(min-width: 1px) and (max-width: 768px)')
              .matches
          ) {
            BackBtnRef.current.style.display = 'block';
          }
        }
        if (CoverBackBtnRef?.current) {
          CoverBackBtnRef.current.style.display = 'none';
        }
      }, 1300);
    } else if (state.toggleBackBtn === false) {
      if (BackBtnRef?.current) {
        BackBtnRef.current.style.display = 'none';
      }
      if (CoverBackBtnRef?.current) {
        CoverBackBtnRef.current.style.display = 'block';
      }
    }

    if (myInfo) {
      if (myInfo.providerType !== 'LOCAL') {
        setUserName(myInfo.userName + myInfo.providerType.charAt(0));
      } else {
        setUserName(myInfo.userName);
      }
    }
    setTimeout(() => {
      if (Array.isArray(countInfos)) {
        let now = countInfos.map((countInfos) => countInfos.todayVar) as any;
        let now2 = countInfos.map((countInfos) => countInfos.totalVar) as any;

        const handle = setInterval(() => {
          setCounter(
            (counterRef.innerHTML = Math.ceil(
              (countInfos.map((countInfos) => countInfos.todayVar) as any) -
                now,
            )
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')),
          );
          setTcounter(
            (tcounterRef.innerHTML = Math.ceil(
              (countInfos.map((countInfos) => countInfos.totalVar) as any) -
                now2,
            )
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')),
          );

          if (now < 1 && now2 < 1) {
            clearInterval(handle);
          }

          const step = now / 3;
          const step2 = now2 / 3;

          now -= step;
          now2 -= step2;
        }, 40);
      }
    }, 1500);

    // 브라우저가 1~768 해상도일 때 검색창 텍스트 변경
    const mediaQuery = window.matchMedia(
      '(min-width: 1px) and (max-width: 768px)',
    );
    const handleMediaQueryChange = (e: any) => {
      const inputElement = document.getElementById(
        'globalSearchInput',
      ) as HTMLInputElement;
      if (e.matches) {
        inputElement.placeholder = '(CTRL + /)';
      } else {
        inputElement.placeholder = '검색어를 입력하세요. (CTRL + /)';
      }
    };

    handleMediaQueryChange(mediaQuery);
  }, [countInfos, counterRef, myInfo, state.toggleBackBtn, tcounterRef]);

  const onAlertAdmin = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    alert('관리자만 접근이 가능합니다.');
  }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const MemberModuleArray = [
    MemberLoginRef,
    MemberJoinRef,
    MemberModifyRef,
    MemberModifyPasswordRef,
    MemberInfoRef,
    MailSenderRef,
  ];
  const miniBtnWrapper = document.getElementById(
    'miniBtnWrapper',
  ) as HTMLDivElement;
  const onDisplayMember = useCallback(
    (
      e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
      selectItem: number,
    ) => {
      MemberLoginRef.current.style.opacity = 1;
      MemberModuleArray[selectItem].current.style.display = 'block';
      MemberModuleArray[selectItem].current.style.zIndex = state.zIdx += 2;
      headerBlockRef.current.style.zIndex = state.zIdx += 2;

      const hideAddComment = document.getElementById('addComment');
      const saying = document.getElementById('saying');

      if (
        window.matchMedia('(min-width: 1px) and (max-width: 768px)').matches
      ) {
        const contentBodyOuterWrapper = document.getElementById(
          'contentBodyOuterWrapper',
        ) as HTMLDivElement;
        const outerDescWrapper = document.getElementById(
          'outerDescWrapper',
        ) as HTMLDivElement;
        const outerMemberWrapper = document.getElementById(
          'outerMemberWrapper',
        ) as HTMLDivElement;
        const memberModify = document.getElementById(
          'memberModify',
        ) as HTMLDivElement;

        const controlzIdx = () => {
          if (outerDescWrapper) {
            outerDescWrapper.style.zIndex = (
              parseInt(outerDescWrapper.style.zIndex) - 1
            ).toString();
          }

          if (outerMemberWrapper) {
            outerMemberWrapper.style.display = 'block';
            outerMemberWrapper.style.zIndex = (3).toString();
          }
          if (contentBodyOuterWrapper) {
            contentBodyOuterWrapper.style.zIndex = (2).toString();
          }

          if (memberModify) {
            memberModify.style.display = 'none';
          }
        };
        controlzIdx();
      }

      if (hideAddComment) {
        hideAddComment!.style.display = 'none';
        if (saying) {
          saying.style.opacity = '1';
          saying.style.transition = 'opacity 0.2s 0.75s ease-out';
        }
      }
    },
    [MemberModuleArray, state.zIdx],
  );
  const goToBackward = () => {
    const willBeShownDesc = document.getElementById(
      'addComment',
    ) as HTMLElement;
    for (var i = 0; i <= MemberModuleArray.length - 1; i++) {
      if (MemberModuleArray[i] && MemberModuleArray[i].current) {
        if (MemberModuleArray[i].current.style.zIdx <= state.zIdx) {
          return;
        }
        MemberModuleArray[i].current.style.zIdx = actions.setZIdx(
          state.zIdx - 1,
        );
      }
    }
    willBeShownDesc.style.display = 'block';
  };

  const initSelectedList = () => {
    const searchInput = document.getElementById(
      'searchInput',
    ) as HTMLInputElement;
    const searchType = document.getElementById(
      'searchFormType',
    ) as HTMLSelectElement;
    actions.setSearchGear(true);
    setTimeout(() => {
      actions.setToggleBackBtn(false);
    }, 700);
    actions.setOnGlobalSearch(false);
    actions.setToggleSelected(false);
    actions.setCompleteOrModify(false);
    actions.setBoardModifiable(false);
    actions.setSelectedList([]);
    actions.setSelectedView(false);
    actions.setHashSelected(false);
    actions.setToolsSelected(false);

    state.selectedList.forEach((selected) => {
      const element = document.getElementById(`boardMore-${selected}`);
      const element2 = document.getElementById(`board-${selected}`) as any;
      if (element) {
        element.style.backgroundImage = "url('/images/board/more.png')";
      }

      if (element2) {
        element2.classList.remove('black');
        element2.classList.remove('blackOnModify');
        element2.classList.add('normal');
      }
    });

    navigate(
      `/boards?searchType=${searchType.value}&keyword=${encodeURIComponent(
        searchInput?.value,
      )}`,
    );
  };
  const toggleGNB = () => {
    if (gnbExpanded === true) {
      setGnbExpanded(false);
    } else {
      setGnbExpanded(true);
    }
  };
  const hideContent = () => {
    const outerMemberWrapper = document.getElementById(
      'outerMemberWrapper',
    ) as HTMLDivElement | null;
    const outerDescWrapper = document.getElementById(
      'outerDescWrapper',
    ) as HTMLDivElement | null;
    const miniBtnWrapper = document.getElementById(
      'miniBtnWrapper',
    ) as HTMLDivElement | null;
    const memberLogin = document.getElementById(
      'memberLogin',
    ) as HTMLDivElement;
    const memberJoin = document.getElementById(
      'memberJoin',
    ) as HTMLDivElement | null;
    const memberModify = document.getElementById(
      'memberModify',
    ) as HTMLDivElement | null;
    const memberInfo = document.getElementById(
      'memberInfo',
    ) as HTMLDivElement | null;
    const mailSender = document.getElementById(
      'mailSender',
    ) as HTMLDivElement | null;

    if (memberLogin) {
      if (outerMemberWrapper) outerMemberWrapper.style.display = 'none';
      if (outerDescWrapper) outerDescWrapper.style.display = 'none';
      if (miniBtnWrapper) miniBtnWrapper.style.display = 'none';
      if (memberLogin) memberLogin.style.display = 'none';
      if (memberJoin) memberJoin.style.display = 'none';
      if (memberModify) memberModify.style.display = 'none';
      if (memberInfo) memberInfo.style.display = 'none';
      if (mailSender) mailSender.style.display = 'none';
    }
  };
  return (
    <>
      {window.matchMedia('(min-width: 1px) and (max-width: 768px)').matches ? (
        <OuterMemberWrapper
          id="outerMemberWrapper"
          onClick={() => hideContent()}
          title="폼 닫기"
        />
      ) : (
        <></>
      )}
      <Wrapper>
        <HeaderBlock ref={headerBlockRef}>
          <Gnb id="gnb" className={gnbExpanded ? 'expanded' : ''}>
            <ul>
              <li
                onClick={(e: any) => {
                  toggleGNB();
                  initSelectedList();
                }}
              >
                홈
              </li>
              <li
                onClick={() => {
                  toggleGNB();
                  alert('작업 예정 ');
                }}
              >
                이력서
              </li>
              <li
                onClick={() => {
                  toggleGNB();
                  alert('작업 예정 ');
                }}
              >
                IT 블로그
              </li>
            </ul>
          </Gnb>
          <GiHamburgerMenu
            onClick={toggleGNB}
            className={`hamburgerBtn ${gnbExpanded ? 'expanded' : ''}`}
            title="Global Navigation"
          />
          <Search />
          <div className="innerRight">
            <div className="right1">
              <ul>
                <li>TODAY</li>
                <li className="count" ref={counterRef}>
                  {counter}
                </li>
              </ul>
              <ul>
                <li>TOTAL</li>
                <li className="count" ref={tcounterRef}>
                  {tcounter}
                </li>
              </ul>
            </div>
            {isAuthorized && myInfo ? (
              <span className="right2">
                <DisplayNoneOnMobileHAndTabletV className="toDisplayNoneOnMobileHAndTabletV">
                  <LogAreaBtn
                    src={
                      loginHover
                        ? process.env.PUBLIC_URL + '/images/logoutbtnOv.png'
                        : process.env.PUBLIC_URL + '/images/logoutbtn.png'
                    }
                    onClick={onLogout}
                    onMouseOver={() => setLoginHover(true)}
                    onMouseOut={() => setLoginHover(false)}
                    alt="to Login"
                  />
                  <LogAreaBtn
                    onClick={(e: any) => {
                      onDisplayMember(e, 2);
                    }}
                    src={
                      joinHover
                        ? process.env.PUBLIC_URL + '/images/modifybtnOv.png'
                        : process.env.PUBLIC_URL + '/images/modifybtn.png'
                    }
                    onMouseOver={() => setJoinHover(true)}
                    onMouseOut={() => setJoinHover(false)}
                    alt="to Join"
                  />
                </DisplayNoneOnMobileHAndTabletV>
                <User>
                  <Name
                    onClick={(e: any) => {
                      onDisplayMember(e, 4);

                      if (
                        window.matchMedia(
                          '(min-width: 1px) and (max-width: 768px)',
                        ).matches
                      ) {
                        miniBtnWrapper.style.display = 'block';
                        miniBtnWrapper.style.zIndex += 9;
                      }
                    }}
                  >
                    {userName}
                  </Name>
                  <Logged>&nbsp;&nbsp;LOGGED</Logged>
                </User>
              </span>
            ) : (
              <span className="right2">
                <DisplayNoneOnMobileHAndTabletV>
                  <LogAreaBtn
                    onClick={(e: any) => {
                      onDisplayMember(e, 0);
                    }}
                    src={
                      loginHover
                        ? process.env.PUBLIC_URL + '/images/loginbtnOv.png'
                        : process.env.PUBLIC_URL + '/images/loginbtn.png'
                    }
                    onMouseOver={() => setLoginHover(true)}
                    onMouseOut={() => setLoginHover(false)}
                    alt="to Login"
                  />

                  <LogAreaBtn
                    onClick={(e: any) => {
                      onDisplayMember(e, 1);
                    }}
                    src={
                      joinHover
                        ? process.env.PUBLIC_URL + '/images/joinbtnOv.png'
                        : process.env.PUBLIC_URL + '/images/joinbtn.png'
                    }
                    onMouseOver={() => setJoinHover(true)}
                    onMouseOut={() => setJoinHover(false)}
                    alt="to Join"
                  />
                </DisplayNoneOnMobileHAndTabletV>
                <User>
                  <NotLogged>
                    &nbsp;&nbsp;&nbsp;&nbsp;NOT LOGGED&nbsp;&nbsp;&nbsp;
                  </NotLogged>
                </User>
              </span>
            )}
            <MailTo
              onClick={(e: any) => {
                onDisplayMember(e, 5);

                if (
                  window.matchMedia('(min-width: 1px) and (max-width: 768px)')
                    .matches
                ) {
                  miniBtnWrapper.style.display = 'block';
                  miniBtnWrapper.style.zIndex += 9;
                }
              }}
              src={
                mailToHover
                  ? process.env.PUBLIC_URL + '/images/mailiconOv.png'
                  : process.env.PUBLIC_URL + '/images/mailicon.png'
              }
              onMouseOver={() => setMailToHover(true)}
              onMouseOut={() => setMailToHover(false)}
              alt="mail to oieho"
            />
            <Link to="https://github.com/oieho" target="_blank">
              <Github
                src={process.env.PUBLIC_URL + '/images/githubicon.png'}
                alt="github"
              />
            </Link>
            <Admin
              src={process.env.PUBLIC_URL + '/images/adminicon.png'}
              alt="admin"
              onClick={
                onAlertAdmin as unknown as
                  | React.MouseEventHandler<HTMLImageElement>
                  | undefined
              }
            />
          </div>

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
          <CoverBackBtn ref={CoverBackBtnRef} />

          <MemberWrapper id="memberWrapper" ref={MemberWrapperRef}>
            <MiniBtnWrapper id="miniBtnWrapper">
              <MiniBtn
                style={{
                  backgroundColor: '#ff0b0b',
                  top: '0.4rem',
                  zIndex: '3',
                }}
                onClick={() => {
                  hideContent();
                }}
              >
                <span
                  title="닫기"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.fontWeight = '600';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.fontWeight = '400';
                  }}
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: '400',
                    color: '#ffffff',
                    left: '0.27rem',
                    top: '-0.252rem',
                    transform: 'rotate(45deg)',
                  }}
                >
                  +
                </span>
              </MiniBtn>
            </MiniBtnWrapper>
            <MemberLoginWrapper id="memberLogin" ref={MemberLoginRef}>
              <MemberLogin />
            </MemberLoginWrapper>
            <MemberJoinWrapper id="memberJoin" ref={MemberJoinRef}>
              <MemberJoin />
            </MemberJoinWrapper>
            <MemberModifyWrapper id="memberModify" ref={MemberModifyRef}>
              <MemberModify />
            </MemberModifyWrapper>
            <MemberInfoWrapper id="memberInfo" ref={MemberInfoRef}>
              <MemberInfo />
            </MemberInfoWrapper>
            <MailSenderWrapper id="mailSender" ref={MailSenderRef}>
              <MailSender />
            </MailSenderWrapper>
          </MemberWrapper>
        </HeaderBlock>
      </Wrapper>
    </>
  );
};

export default React.memo(Header);
