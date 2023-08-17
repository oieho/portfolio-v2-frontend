import styled, { keyframes } from 'styled-components';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LeftEle from './LeftEle';
import React from 'react';
import { Link } from 'react-router-dom';
import { MainContext } from '../../pages/Main';
const Wrapper = styled.div`
  left: -35.75rem;
  position: relative;
  display: table-cell;
  vertical-align: middle;
`;

const LeftBlock = styled.div`
  position: relative;
  top: 0;
  width: 6.25rem;
  height: 48.75rem;
  background: #000000;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  border-radius: 1rem;
  z-index: 3;
`;
const Logo = styled.span`
  background-image: url('/images/logo.png');
  background-size: cover;
  position: absolute;
  width: 100%;
  height: 3.6rem;
  top: -1.063rem;
  left: 0.1rem;
  z-index: 4;
  animation: mainLogo 1.1s ease-out infinite normal;

  @keyframes mainLogo {
    /* 대소문자 구분 */
    0% {
      transform-origin: center top;
      transform: rotate(0deg);
    }
    25% {
      transform-origin: center top;
      transform: rotate(45deg);
    }
    50% {
      transform-origin: center top;
      transform: rotate(-10deg);
    }

    100% {
      transform-origin: center top;
      transform: rotate(0deg);
    }

    animation-timing-function: ease-out;
  }
`;
const rotateAnimation = keyframes`
  0% {
    transform: rotate(-6deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
const LogoEye = styled.hr`
  position: relative;
  top: 0.82rem;
  left: 1.23rem;
  background-image: url('/images/logoEye.png');
  background-size: cover;
  width: 16px;
  height: 16px;
  border: none;
  transform: rotate(-6deg);
  z-index: 99;
  &.rotate {
    animation: ${rotateAnimation} 1.5s ease-in;
  }
`;

const NailImg = styled.img`
  position: absolute;
  top: -1.21rem;
  left: 2.95rem;
  z-index: 4;
`;

const NavHomeBtnBg = styled.div`
  cursor: pointer;
  position: absolute;
  left: 3.15rem;
  top: 8.6rem;
  width: 1.7rem;
  height: 1.7rem;
  border-radius: 100%;
  transform: translate(-50%, -50%);
  border: 0;
  transition: all 0.9s ease 0s;
  &.hover1st {
    position: absolute;
    border: 4px solid #dedede;
    background: #ffffff;
    border-radius: 50%;
    transition: all 0.4s ease 0s;
    width: 2.65rem;
    height: 2.65rem;
  }
  &.hover2nd {
    position: absolute;
    border: 4px solid #dedede;
    background: #ffffff;
    border-radius: 50%;
    transition: all 0.4s ease 0s;
    width: 2.65rem;
    height: 2.65rem;
  }
  &.hover3rd {
    position: absolute;
    border: 4px solid #dedede;
    background: #ffffff;
    border-radius: 50%;
    transition: all 0.4s ease 0s;
    width: 2.65rem;
    height: 2.65rem;
  }
`;

const NavHomeBtn = styled.img`
  position: absolute;
  cursor: pointer;
  left: 2rem;
  top: 7.5rem;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 100%;
  transform: translateY(0rem);
  &:hover {
    animation: ani 1s ease-in infinite normal;

    @keyframes ani {
      /* 대소문자 구분 */
      0% {
        transform: translateY(0rem);
      }
      25% {
        transform: translateY(-0.1rem);
      }
      50% {
        transform: translateY(0.1rem);
      }
      75% {
        transform: translateY(-0.1rem);
      }
      100% {
        transform: translateY(0rem);
      }
    }
  }
`;
const BtnWrapper = styled.ul`
  padding: 0;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 3;
`;
const Btn = styled.li`
  position: relative;
  display: block;
  padding-top: 5rem;
`;

const LeftElement = styled(LeftEle)`
  position: absolute;
`;
type leftProps = {
  homeHv: boolean;
  portfolioHv: boolean;
};
const Left = (props: leftProps) => {
  const { state, actions } = useContext(MainContext);

  const navigate = useNavigate();

  var homeout;
  var portfolioout;
  if (props.homeHv === true) {
    homeout = () => {
      setPortfolioHover(false);
    };
    portfolioout = () => {
      setPortfolioHover(false);
    };
  } else if (props.portfolioHv === true) {
    portfolioout = () => {
      setHomeHover(false);
    };
    homeout = () => {
      setHomeHover(false);
    };
  }

  const [homeHover, setHomeHover] = useState<boolean>(false);
  const [portfolioHover, setPortfolioHover] = useState<boolean>(false);
  const [dataHover, setDataHover] = useState<boolean>();

  const [isFirstLoadHome, setIsFirstLoadHome] = useState<boolean>(true);
  const [isFirstLoadPortfolio, setIsFirstLoadPortfolio] =
    useState<boolean>(false);

  const initSelectedList = () => {
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
      `/boards?searchType=${searchType}&keyword='${state.prevtDupFromKeyword}'`,
    );
  };

  useEffect(() => {
    if (homeHover === true) {
      setIsFirstLoadPortfolio(false);
    }
    if (portfolioHover === true) {
      setIsFirstLoadHome(false);
    }
  }, [homeHover, portfolioHover]);

  return (
    <Wrapper>
      <LeftBlock />

      <Logo title="OIEHO Portfolio Logo">
        <LogoEye id="logoEye" />
      </Logo>
      <NailImg src={process.env.PUBLIC_URL + '/images/nail.png'} alt="nail" />
      <BtnWrapper>
        <Link to="/boards?searchType=All&keyword=">
          <Btn onClick={initSelectedList}>
            <NavHomeBtnBg
              className={homeHover || isFirstLoadHome ? 'hover1st' : ''}
            />
            <NavHomeBtn
              src={
                homeHover || isFirstLoadHome
                  ? process.env.PUBLIC_URL + '/images/navhomeOv.png'
                  : process.env.PUBLIC_URL + '/images/navhome.png'
              }
              onMouseOver={() => setHomeHover(true)}
              onMouseOut={homeout}
              alt="to Home"
            />
          </Btn>
        </Link>
        <Btn>
          <NavHomeBtnBg
            className={portfolioHover || isFirstLoadPortfolio ? 'hover2nd' : ''}
          />
          <NavHomeBtn
            src={
              portfolioHover || isFirstLoadPortfolio
                ? process.env.PUBLIC_URL + '/images/navportfolioOv.png'
                : process.env.PUBLIC_URL + '/images/navportfolio.png'
            }
            onMouseOver={() => setPortfolioHover(true)}
            onMouseOut={portfolioout}
            alt="to Portfolio"
          />
        </Btn>
        <Btn>
          <NavHomeBtnBg className={dataHover ? 'hover3rd' : ''} />
          <NavHomeBtn
            src={
              dataHover
                ? process.env.PUBLIC_URL + '/images/navdataOv.png'
                : process.env.PUBLIC_URL + '/images/navdata.png'
            }
            onMouseOver={() => setDataHover(true)}
            onMouseOut={() => setDataHover(false)}
            alt="to Home"
          />
        </Btn>
      </BtnWrapper>
      <LeftElement />
    </Wrapper>
  );
};

export default React.memo(Left); // 똑같은 컴포넌트 재사용으로 인한 Memoization 적용
