import styled from 'styled-components';
import React, {
  useCallback,
  useState,
  useContext,
  useEffect,
  useLayoutEffect,
  MouseEvent,
} from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../index';
import { fetchList } from '../../modules/reduxThunk';
import * as api from '../../lib/api/board';
import { MainContext } from '../../pages/Main';

const TableTr = styled.tr`
  position: relative;
  display: inline-block;
  margin-left: 0.16rem;
  width: 99%;
  height: 72.01px;
  transform: scale(1) translate(0%, 0%);
  transition: transform 0.7s ease-out;
  border: 1px solid #e2e2e2;
  background-color: #ffffff;
  border-radius: 19px;
  transition: border 0.4s ease-out;
  z-index: 0;
  cursor: pointer;
  &.black {
    color: #ffffff;
    background-color: #000000;
    transform: scaleX(1.012) translate(0%, 0%);
    transition: transform 0.3s ease-in;
    vertical-align: middle;
  }
  &.blackOnModify {
    color: #ffffff;
    background-color: #000000;
    transform: scaleX(1.012) translate(0%, 0%);
    transition: transform 0.3s ease-in;
    vertical-align: middle;
  }
  &.blackOnRemove {
    color: #ffffff;
    background-color: #000000;
    transform: scaleX(1.012) translate(0%, 0%);
    transition: transform 0.3s ease-in;
    vertical-align: middle;
  }
  &.blackOnWrite {
    color: #ffffff;
    background-color: #000000;
    transform: scaleX(1.012) translate(0%, 0%);
    transition: transform 0.3s ease-in;
    vertical-align: middle;
  }
  &.blackOnView {
    color: #ffffff;
    background-color: #000000;
    transform: scaleX(1.012) translate(0%, 0%);
    transition: transform 0.3s ease-in;
    vertical-align: middle;
  }
  &.normal {
  }
  &:hover {
    border: 1px solid #bbbbbb;
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    height: 100%;
  }
`;
const TableTd = styled.td`
  position: relative;
  top: 0.4rem;
  width: 100%;
  &.td1 {
    width: 28.586rem;
    text-align: left;
    @media (min-width: 1025px) and (max-width: 1280px) {
      width: calc(62.8%);
    }
    @media (min-width: 769px) and (max-width: 1024px) {
      padding-right: 0.8rem;
    }
    @media (min-width: 1px) and (max-width: 768px) {
      position: absolute;
      left: -0.45rem;
    }
  }
  &.td2 {
    z-index: -1;
    position: relative;
    left: 0.5rem;
    font-size: 1.1rem;
    width: 6.129rem;
    @media (min-width: 1025px) and (max-width: 1280px) {
      left: 0;
      width: calc(13%);
    }
    @media (min-width: 769px) and (max-width: 1024px) {
      left: 3.5rem;
      top: 0.64rem;
    }
    @media (min-width: 1px) and (max-width: 768px) {
      position: absolute;
      top: 0.42rem;
      width: 100%;
      left: calc(50% - 2.235rem);
    }
  }
  &.td3 {
    position: relative;
    right: 0.5rem;
    width: 5.164rem;
    @media (min-width: 1025px) and (max-width: 1280px) {
      text-align: center;
      right: 0;
      width: calc(9%);
    }
    @media (min-width: 769px) and (max-width: 1024px) {
      width: 6.129rem;
      right: calc(1% + 0.25rem);
      top: 1.65rem;
    }
    @media (min-width: 1px) and (max-width: 768px) {
      position: absolute;
      width: 6.129rem;
      top: 1.46rem;
      right: calc(-10% + 6.15%);
    }
  }
  &.td4 {
    position: relative;
    width: 9.123rem;
    right: 0.55rem;
    font-weight: 600;
    font-size: 0.85rem;
    top: 0.4rem;
    @media (min-width: 1025px) and (max-width: 1280px) {
      right: 0rem;
    }
    @media (min-width: 769px) and (max-width: 1024px) {
      top: 0.74rem;
      right: -0.2rem;
    }
    @media (min-width: 1px) and (max-width: 768px) {
      top: 0.6rem;
      right: calc(-2.5% + 0.5rem);
      width: 8rem;
    }
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    top: 0.5rem;
    vertical-align: top;
  }
`;
const More = styled.hr`
  z-index: -1;
  position: relative;
  margin-top: 0.5rem;
  width: 1.625rem;
  height: 1.625rem;
  border: none;
  background-image: url('/images/board/more.png');
  background-size: cover;
`;
const RegDate = styled.div`
  position: relative;
  font-size: 0.81rem;
  right: 0;
  font-weight: 600;
  @media (min-width: 1px) and (max-width: 768px) {
    position: absolute;
    text-align: left;
    font-size: 0.7rem;
    font-weight: 350;
    width: 100%;
    top: 2.2rem;
    left: 4.38rem;
  }
`;
const Ago = styled.div`
  position: relative;
  margin-top: 0.15rem;
  color: #b2b2b2;
  font-weight: 500;
  font-size: 0.75rem;
  @media (min-width: 1px) and (max-width: 768px) {
    position: relative;
    text-align: left;
    font-size: 0.7rem;
    font-weight: 400;
    width: 100%;
    top: 1.99rem;
    left: 8.65rem;
  }
`;

const BoardBodyThumbnailImg = styled.img`
  position: relative;
  margin-left: 0.6rem;
  width: 3.313rem;
  height: 3.313rem;
  background-color: #ffffff;
  border: 1px solid #e2e2e2;
  border-radius: 0.4rem;
  @media (min-width: 769px) and (max-width: 1024px) {
    position: absolute;
    top: 4%;
  }
  @media (min-width: 1px) and (max-width: 768px) {
    position: absolute;
    top: 0.2rem;
    left: 0.4rem;
  }
`;
const BoardHeadUL = styled.ul`
  display: inline-block;
  padding: 0;
  margin: 0;
  list-style: none;
  position: relative;
  left: 0.75rem;
  bottom: 0.43rem;
`;
const BoardTitle = styled.a`
  position: relative;
  display: inline-block;
  margin-bottom: 0.52rem;
  font-size: 0.85rem;
  font-weight: 700;
  vertical-align: top;
  pointer-events: auto;
  @media (min-width: 769px) and (max-width: 1024px) {
    position: relative;
    top: 0.5rem;
    left: 3.7rem;
  }
  @media (min-width: 1px) and (max-width: 768px) {
    top: 0.7rem;
    left: 5.1rem;
    font-size: 0.81rem;
    width: 7.8rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
const BoardComment = styled.span`
  color: #999999;
  font-size: 0.77rem;
  position: relative;
  left: 0.03rem;
  bottom: 0.07rem;
  font-weight: 500;
  @media (min-width: 1px) and (max-width: 768px) {
    font-size: 0.7rem;
  }
`;
const Tools = styled.span`
  position: relative;
  height: 2.261rem;
  left: 0.19rem;
  img {
    margin: 0 0 0.1rem 0.21rem;
    width: 1.02rem;
    height: 1.02rem;
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    top: 0.33rem;
  }
`;
const ToolsDescendant = styled.span`
  width: 18.75rem;
  text-align: left;
  position: absolute;
  @media (min-width: 1025px) and (max-width: 1280px) {
    width: 22vw;
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    position: relative;
    left: 0rem;
    text-align: left !important;
  }
  @media (min-width: 1px) and (max-width: 768px) {
  }
`;
const ToShowMoreTools = styled.span`
  @media (min-width: 1px) and (max-width: 768px) {
    position: absolute;
    top: 0.74rem;
    left: 3.65rem;
    z-index: 2;
    img {
      margin: 0 0 0.1rem 0.21rem;
      width: 1.02rem;
      height: 1.02rem;
    }
    cursor: pointer;
  }
`;
const MoreToolsWrapper = styled.span`
  position: absolute;
  display: none;
  background-color: #ffffff;
  border: 1px solid #e2e2e2;
  border-radius: 0.7rem;
  width: 10.249rem;
  height: 3.19rem;
  top: -0.17rem;
  left: 1.37rem;
  box-shadow: 0.05px 0.05px 7px 0.01px rgba(0, 0, 0, 0.08);
  padding: 0.37rem 0.13rem 0rem 0.13rem;
  z-index: 2;
  cursor: pointer;
  img {
    margin: 0 0 0.1rem 0.21rem;
    width: 1.02rem;
    height: 1.02rem;
    cursor: pointer;
  }
`;
const MoreTools = styled.span`
  display: inline-block;
  width: 97.5%;
  height: 92%;
  overflow-y: auto;
  z-index: 2;

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
const BoardCategory = styled.a`
  position: relative;
  color: #a5a5a5;
  font-size: 0.77rem;
  font-weight: 600;
  vertical-align: top;
  @media (min-width: 769px) and (max-width: 1024px) {
    top: 0.6rem;
    left: 3.7rem;
  }
  @media (min-width: 1px) and (max-width: 768px) {
    font-size: 0.77rem;
    top: 0.4rem;
    left: 3.83rem;
  }
`;
const BoardTags = styled.a`
  position: relative;
  margin-left: 0.5rem;
  color: #a5a5a5;
  font-size: 0.77rem;
  font-weight: 400;
  vertical-align: top;
  @media (min-width: 769px) and (max-width: 1024px) {
    top: 0.6rem;
    left: 3.7rem;
  }
  @media (min-width: 1px) and (max-width: 768px) {
    width: 100%;
    top: 0.4rem;
    left: 3.7rem;
  }
`;
const BoardCount = styled.a`
  font-size: 1rem;
  position: relative;
  font-weight: 750;
  letter-spacing: -0.015rem;
  bottom: 0.07rem;
  @media (min-width: 1px) and (max-width: 768px) {
    font-size: 0.85rem;
  }
`;
const HashTag1 = styled.span`
  &:hover {
    font-style: italic;
    font-weight: 600;
  }
  &:active {
    font-style: normal;
    font-weight: 300;
  }
  @media (min-width: 1px) and (max-width: 768px) {
    font-size: 0.77rem;
  }
`;
const HashTag2 = styled.span`
  position: relative;
  &:hover {
    font-style: italic;
    font-weight: 600;
  }
  &:active {
    font-style: normal;
    font-weight: 300;
  }
  @media (min-width: 1px) and (max-width: 768px) {
    font-size: 0.77rem;
  }
`;
const HashTag3SharpAndComma = styled.span`
  position: relative;
  &:hover {
    font-style: italic;
    font-weight: 600;
  }
  &:active {
    font-style: normal;
    font-weight: 300;
  }
  @media (min-width: 1px) and (max-width: 768px) {
    font-size: 0.77rem;
  }
`;
const HashTag3 = styled.span`
  position: relative;
  &:hover {
    font-style: italic;
    font-weight: 600;
  }
  &:active {
    font-style: normal;
    font-weight: 300;
  }
`;

const BoardTableContent = ({ index, boards, style, modifiable }: any) => {
  const { state, actions } = useContext(MainContext);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [selectedIndex, setSelectedIndex] = useState<number>();
  const [boardRegDateDays, setBoardRegDateDays] = useState() as any;
  const [boardRegDateDaysAgo, setBoardRegDateDaysAgo] = useState() as any;
  const [sharpAndComma, setSharpAndComma] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [moreToolsHover, setMoreToolsHover] = useState(false);
  const [showDefaultTools, setShowDefaultTools] = useState(true);
  const [showMoreTools, setShowMoreTools] = useState(false);
  const [showMoreToolsWithIcons, setShowMoreToolsWithIcons] = useState(true);

  const selectedQParam = searchParams.get('selected');
  const titleQParam = searchParams.get('title');
  const countQParam = searchParams.get('count');
  const regDateQParam = searchParams.get('regDate');
  const searchTypeQParam = searchParams.get('searchType');
  const keywordQParam = searchParams.get('keyword');
  const toolOrHashTagQParam = searchParams.get('toolOrHashTag');

  const [toggleView, setToggleView] = useState(0);

  const searchInput = document.getElementById(
    'searchInput',
  ) as HTMLInputElement;
  const globalSearchInput = document.getElementById(
    'globalSearchInput',
  ) as HTMLInputElement;

  useEffect(() => {
    if (state.boardRemovable === true) {
      const trElements = document.querySelectorAll('.table-class tr');
      for (var i = 0; i <= trElements.length; i++) {
        const elements = document.getElementsByClassName('boardMore');
        if (elements) {
          for (let i = 0; i < elements.length; i++) {
            const element = elements[i] as HTMLElement;
            element.style.backgroundImage = "url('/images/board/remove.png')";
          }
        }
      }

      state.selectedList.forEach((selected) => {
        const element = document.getElementById(`boardMore-${selected}`);
        if (element) {
          element.style.backgroundImage =
            "url('/images/board/removeChecked.png')";
        }
      });
    } else if (state.boardModifiable === true) {
      const trElements = document.querySelectorAll('.table-class tr');
      for (var i = 0; i <= trElements.length; i++) {
        if (i === state.selectedListOthers.length - 1) {
          continue;
        }
        const elements = document.getElementsByClassName('boardMore');
        if (elements) {
          for (let i = 0; i < elements.length; i++) {
            const element = elements[i] as HTMLElement;
            element.style.backgroundImage = "url('/images/board/more.png')";
          }
        }
      }
      state.selectedListOthers.forEach((selected) => {
        // modifyArticle 메서드가 호출된 이후의 내역을 초기화
        const element = document.getElementById(`boardMore-${selected}`);
        const element2 = document.getElementById(`board-${selected}`);
        if (element) {
          element.style.backgroundImage = "url('/images/board/more.png')";
          element2!.classList.remove('black');
        }
      });
      state.selectedList.forEach((selected) => {
        const element = document.getElementById(`boardMore-${selected}`);
        if (element) {
          element.style.backgroundImage =
            "url('/images/board/modifyChecked.png')";
        }
      });
    } else if (
      state.boardModifiable === false ||
      state.boardRemovable === false
    ) {
      const elements = document.getElementsByClassName('boardMore');
      if (elements) {
        for (let i = 0; i < elements.length; i++) {
          const element = elements[i] as HTMLElement;
          element.style.backgroundImage = "url('/images/board/more.png')";
        }
      }
      state.selectedList.forEach((selected) => {
        const element = document.getElementById(`boardMore-${selected}`);
        if (element) {
          element.style.backgroundImage =
            "url('/images/board/moreChecked.png')";
        }
      });
    } else {
      for (var k = 0; k <= state.selectedList.length; k++) {
        const element = document.getElementById(`boardMore-${k}`);
        if (element) {
          element.style.backgroundImage = "url('/images/board/more.png')";
        }
      }
      state.selectedList.forEach((selected) => {
        const element = document.getElementById(`boardMore-${selected}`);
        if (element) {
          element.style.backgroundImage =
            "url('/images/board/moreChecked.png')";
        }
      });
    }
    if (boards.workBoard?.hashTag[2] !== undefined) {
      setSharpAndComma(', #');
    }

    const convertDateForm = (boards: any[]) => {
      if (boards) {
        const year = boards[0];
        const month =
          boards[1] < 10 ? boards[1].toString().padStart(2, '0') : boards[1];
        const date =
          boards[2] < 10 ? boards[2].toString().padStart(2, '0') : boards[2];
        const hours =
          boards[3] < 10 ? boards[3].toString().padStart(2, '0') : boards[3];
        var minutes =
          boards[4] < 10 ? boards[4].toString().padStart(2, '0') : boards[4];
        var seconds =
          boards[5] < 10 ? boards[5].toString().padStart(2, '0') : boards[5];
        if (typeof boards[5] === 'undefined') {
          seconds = '00';
        } else if (typeof boards[4] === 'undefined') {
          minutes = '00';
        }

        if (
          window.matchMedia('(min-width: 1px) and (max-width: 768px)').matches
        ) {
          return year + '-' + month + '-' + date;
        }

        return (
          year +
          '-' +
          month +
          '-' +
          date +
          ' ' +
          hours +
          ':' +
          minutes +
          ':' +
          seconds
        );
      }
    };

    setBoardRegDateDays(convertDateForm(boards.workBoard?.regDate));

    const newBoardRegDateDaysAgo = () => {
      const toDateObject = (regDate: any) => {
        const year = regDate[0];
        const month = regDate[1] - 1;
        const date = regDate[2];
        const hours = regDate[3];
        const minutes = regDate[4];
        const seconds = regDate[5];

        return new Date(year, month, date, hours, minutes, seconds);
      };
      if (boards && boards.workBoard && boards.workBoard.regDate) {
        const regDate = [...boards?.workBoard?.regDate]; // Create a copy of the regDate array

        if (typeof regDate[5] === 'undefined') {
          regDate[5] = 0;
        }
        if (typeof regDate[4] === 'undefined') {
          regDate[4] = 0;
        }

        const before = toDateObject(regDate) as any;
        const now = new Date() as any;
        const difference = now - before;
        const twoDays = 2 * 24 * 60 * 60 * 1000;
        const oneDay = 24 * 60 * 60 * 1000;
        const twoHours = 2 * 60 * 60 * 1000;
        const oneHour = 60 * 60 * 1000;

        if (difference > twoDays) {
          const days = Math.floor(difference / (24 * 60 * 60 * 1000));
          return `${days} days ago`;
        } else if (difference > oneDay) {
          const oneDay = Math.floor(difference / (24 * 60 * 60 * 1000));
          return `${oneDay} day ago`;
        } else if (difference > twoHours) {
          const hours = Math.floor(difference / (60 * 60 * 1000));
          return `${hours} hours ago`;
        } else if (difference > oneHour) {
          const hour = Math.floor(difference / (60 * 60 * 1000));
          return `${hour} hour ago`;
        }
      }
    };
    setBoardRegDateDaysAgo(newBoardRegDateDaysAgo());

    if (state.viewSelectedIndexGear === true) {
      setSelectedIndex(-1);
    }
    const setToolsAlignOnResolution = () => {
      const toolDescendants = document.querySelectorAll(
        '[id^="toolsDescendant"]',
      );
      toolDescendants.forEach((toolDescendant: Element) => {
        const spans = toolDescendant.querySelectorAll(
          'span',
        ) as NodeListOf<HTMLSpanElement>;

        let totalWidth = 0;
        spans.forEach((span: HTMLSpanElement) => {
          totalWidth += span.offsetWidth;
        });

        const desktopToolsWidth = 301.6; // 기준값 설정
        if (totalWidth >= desktopToolsWidth) {
          (toolDescendant as HTMLElement).style.textAlign = 'right';
        } else {
          (toolDescendant as HTMLElement).style.textAlign = 'left';
        }
      });
      const LaptopAndTabletH = () => {
        if (
          window.matchMedia('(min-width: 1025px) and (max-width: 1280px)')
            .matches
        ) {
          toolDescendants.forEach((toolDescendant: Element) => {
            const spans = toolDescendant.querySelectorAll(
              'span',
            ) as NodeListOf<HTMLSpanElement>;

            let totalWidth = 0;
            spans.forEach((span: HTMLSpanElement) => {
              totalWidth += span.offsetWidth;
            });

            if (totalWidth >= 221.173333) {
              // toolDescendant의 상위 4번째 부모 요소 선택
              let parentElement = toolDescendant;
              let nextSibling: HTMLElement | null | any = null;
              let nextNextSibling: HTMLElement | null | any = null;
              let nextNextNextSibling: HTMLElement | null | any = null;

              for (let i = 0; i < 7; i++) {
                if (parentElement.parentElement) {
                  parentElement = parentElement.parentElement;

                  switch (i) {
                    case 3:
                      (parentElement as HTMLElement).style.bottom = '0.49rem';
                      break;

                    case 4:
                      nextSibling = parentElement.nextSibling;
                      if (nextSibling && nextSibling instanceof HTMLElement) {
                        nextSibling.style.top = '0.4rem';
                      }
                      break;

                    case 5:
                      if (nextSibling) {
                        nextNextSibling = nextSibling.nextSibling;
                        if (
                          nextNextSibling &&
                          nextNextSibling instanceof HTMLElement
                        ) {
                          nextNextSibling.style.top = '0.37rem';
                        }
                      }
                      break;

                    case 6:
                      if (nextNextSibling) {
                        nextNextNextSibling = nextNextSibling.nextSibling;
                        if (
                          nextNextNextSibling &&
                          nextNextNextSibling instanceof HTMLElement
                        ) {
                          nextNextNextSibling.style.top = '0.40rem';
                        }
                      }
                      break;

                    default:
                      break;
                  }
                } else {
                  break;
                }
              }
            }
          });
        }
      };
      LaptopAndTabletH();

      const whenTabletH = () => {
        if (
          window.matchMedia('(min-width: 769px) and (max-width: 1024px)')
            .matches
        ) {
          setShowMoreTools(false);
          setShowDefaultTools(true);

          toolDescendants.forEach((toolDescendant: Element) => {
            const spans = toolDescendant.querySelectorAll(
              'span',
            ) as NodeListOf<HTMLSpanElement>;

            let totalWidth = 0;
            spans.forEach((span: HTMLSpanElement) => {
              totalWidth += span.offsetWidth;
            });

            if (totalWidth >= 221.173333) {
              // toolDescendant의 상위 4번째 부모 요소 선택
              let parentElement = toolDescendant;
              let nextSibling: HTMLElement | null | any = null;
              let nextNextSibling: HTMLElement | null | any = null;
              let nextNextNextSibling: HTMLElement | null | any = null;

              for (let i = 0; i < 7; i++) {
                if (parentElement.parentElement) {
                  parentElement = parentElement.parentElement;

                  switch (i) {
                    case 3:
                      (parentElement as HTMLElement).style.bottom = '0.81rem';
                      break;

                    case 4:
                      nextSibling = parentElement.nextSibling;
                      if (nextSibling && nextSibling instanceof HTMLElement) {
                        nextSibling.style.top = '0.81rem';
                      }
                      break;

                    case 5:
                      if (nextSibling) {
                        nextNextSibling = nextSibling.nextSibling;
                        if (
                          nextNextSibling &&
                          nextNextSibling instanceof HTMLElement
                        ) {
                          nextNextSibling.style.top = '1.8rem';
                        }
                      }
                      break;

                    case 6:
                      if (nextNextSibling) {
                        nextNextNextSibling = nextNextSibling.nextSibling;
                        if (
                          nextNextNextSibling &&
                          nextNextNextSibling instanceof HTMLElement
                        ) {
                          nextNextNextSibling.style.top = '0.92rem';
                        }
                      }
                      break;

                    default:
                      break;
                  }
                } else {
                  break;
                }
              }
            }
          });
        }
      };
      whenTabletH();

      const whenMobileHAndTabletV = async () => {
        if (
          window.matchMedia('(min-width: 1px) and (max-width: 768px)').matches
        ) {
          setShowMoreTools(true);
          setShowDefaultTools(false);

          const setAlignLeft = () => {
            toolDescendants.forEach((toolDescendant: Element) => {
              let totalWidth = 0;
              const spans = toolDescendant.querySelectorAll(
                'span',
              ) as NodeListOf<HTMLSpanElement>;
              spans.forEach((span: HTMLSpanElement) => {
                totalWidth += span.offsetWidth;
              });

              const desktopToolsWidth = 301.6; // 기준값 설정
              if (totalWidth >= desktopToolsWidth) {
                (toolDescendant as HTMLElement).style.textAlign = 'left';
              } else {
                (toolDescendant as HTMLElement).style.textAlign = 'left';
              }
            });
          };
          setAlignLeft();
        }
      };
      whenMobileHAndTabletV();
    };
    setToolsAlignOnResolution();
  }, [
    boards.workBoard?.wno,
    boards.workBoard?.regDate,
    index,
    state.selectedList,
    boards.workBoard?.hashTag,
    state.boardModifiable,
    actions,
    state.hashSelected,
    state.selectedListOthers,
    selectedIndex,
    state.hideEditorGear,
    state.boardRemovable,
    state.viewSelectedIndexGear,
    boards.workBoard?.title,
    boards,
  ]);
  useLayoutEffect(() => {
    const toHiddenToolsOnList = () => {
      const elements = document.querySelectorAll(
        `.moreToolsWrapper${boards.workBoard?.title.replace(/\s+/g, '')}`,
      ) as NodeListOf<HTMLElement> | any;
      elements.forEach((element: any) => {
        console.log(element);
        element.style.setProperty('display', 'none', 'important');
      });
      setShowMoreToolsWithIcons(true);
    };
    toHiddenToolsOnList();
    const displayThumbnail = async (wno: string) => {
      try {
        const response = await fetch(`/display/${wno}`);
        if (response.status === 404) {
          setThumbnail('notUploaded');
          return;
        }
        const arrayBuffer = await response.arrayBuffer();
        const imageURL = URL.createObjectURL(new Blob([arrayBuffer]));
        setThumbnail(imageURL || state.boardThumbnail);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    displayThumbnail(boards.workBoard?.wno);
  }, [boards.workBoard?.wno, state.boardThumbnail]);
  const showArticle = useCallback(
    (index: number) => {
      actions.setReadIndex(index);
      actions.setAfterHitSetBtnCallContentDesc(true);
      actions.setAfterHideSetContentDesc(false);
      actions.setViewSelectedIndexGear(false);
      actions.setToggleBackBtn(true);
      actions.setWriteSelectedIndex(-1);

      const tableRows = document.querySelectorAll('.black');
      tableRows.forEach((row) => {
        row.classList.remove('black');
      });
      const tableRows2 = document.querySelectorAll('.blackOnModify');
      tableRows2.forEach((row) => {
        row.classList.remove('blackOnModify');
      });
      const tableRows3 = document.querySelectorAll('.blackOnRemove');
      tableRows3.forEach((row) => {
        row.classList.remove('blackOnRemove');
      });
      if (selectedIndex === index) {
        setToggleView(toggleView + 2);
        actions.setToggleBackBtn(false);
      }
      if (state.selectedView === true) {
        setToggleView(toggleView + 1);
      }
      if (toggleView % 2 === 1 && state.selectedView === true) {
        if (selectedIndex !== index) {
          setSelectedIndex(index);
        } else {
          // 선택 된 인덱스(인덱스 선택 후 select를 누르면 나오는 화면)가 해제되어야 할 때는 view 화면을 보여주지 않음
          setSelectedIndex(-1);
          actions.setRemoveSelectedIndex(-1);
          actions.setWriteSelectedIndex(-1);
          actions.setViewSelectedIndex(-1);
          actions.setModifySelectedIndex(-1);
        }
      } else {
        if (selectedIndex === index && state.selectedView === false) {
          // 이미 선택된 인덱스를 클릭한 경우 선택 해제, 선택된 뷰가 아닐 때 적용
          setSelectedIndex(-1);
          actions.setRemoveSelectedIndex(-1);
          actions.setViewSelectedIndex(-1);
          actions.setModifySelectedIndex(-1);

          state.selectedList.forEach((selected) => {
            //selectedView 화면에서 체크,기본,뷰보기(체크) 3가지 토글이 가능하게 해줌
            const element = document.getElementById(`boardMore-${selected}`);
            if (element) {
              element.style.backgroundImage = "url('/images/board/more.png')";
            }
          });
          //처음 화면에서 중복 값 제거
          const newSelectedList = state.selectedList.filter(
            (item) => item !== boards.workBoard?.wno,
          );
          actions.setSelectedList(newSelectedList);

          return;
        }

        //선택 화면에서 중복 값 없이 selectedIndex처리
        const newSelectedList = [...state.selectedList];
        const isAlreadySelected = newSelectedList.includes(
          boards.workBoard?.wno,
        );
        if (isAlreadySelected) {
          actions.setSelectedList(newSelectedList);
        } else {
          const newSelectedList = [
            ...state.selectedList,
            boards.workBoard?.wno,
          ];
          actions.setSelectedList(newSelectedList);
        }
        const navigateTo = window.matchMedia(
          '(min-width: 1px) and (max-width: 768px)',
        ).matches
          ? `boards/viewContentBody/${boards.workBoard?.wno}`
          : `boards/view/${boards.workBoard?.wno}`;
        setTimeout(() => {
          navigate(
            `${navigateTo}?${
              state.selectedView === true
                ? `selected=${state.selectedList}&`
                : ''
            }title=${titleQParam}&count=${countQParam}&regDate=${regDateQParam}&searchType=${searchTypeQParam}&keyword=${keywordQParam}&toolOrHashTag=${toolOrHashTagQParam}&isModified=false`,
            {
              state: { searchType: null, keyword: null },
            },
          );
        }, 560);

        setSelectedIndex(index);
        actions.setRemoveSelectedIndex(-1);
        actions.setWriteSelectedIndex(-1);
        actions.setViewSelectedIndex(-1);
        actions.setModifySelectedIndex(-1);
      }
    },
    [
      actions,
      boards.workBoard?.wno,
      countQParam,
      keywordQParam,
      navigate,
      regDateQParam,
      searchTypeQParam,
      selectedIndex,
      state.selectedList,
      state.selectedView,
      titleQParam,
      toggleView,
      toolOrHashTagQParam,
    ],
  );
  const modifyArticle = (index: number) => {
    actions.setToggleBackBtn(true);

    const tableRows = document.querySelectorAll('.black');
    tableRows.forEach((row) => {
      row.classList.remove('black');
    });
    const tableRows2 = document.querySelectorAll('.blackOnModify');
    tableRows2.forEach((row) => {
      row.classList.remove('blackOnModify');
    });
    const tableRows3 = document.querySelectorAll('.blackOnRemove');
    tableRows3.forEach((row) => {
      row.classList.remove('blackOnRemove');
    });
    if (selectedIndex === index) {
      setToggleView(toggleView + 2);
      actions.setToggleBackBtn(false);
    }
    if (state.selectedView === true) {
      setToggleView(toggleView + 1);
    }
    if (toggleView % 2 === 1 && state.selectedView === true) {
      if (selectedIndex === index) {
        setSelectedIndex(index);
      } else {
        // 선택 된 인덱스(인덱스 선택 후 select를 누르면 나오는 화면)가 해제되어야 할 때는 view 화면을 보여주지 않음
        setSelectedIndex(-1);
        actions.setWriteSelectedIndex(-1);
        actions.setViewSelectedIndex(-1);
        actions.setModifySelectedIndex(-1);
      }
    } else {
      if (state.modifySelectedIndex === index && state.selectedView === false) {
        // 이미 선택된 인덱스를 클릭한 경우 선택 해제, 선택된 뷰가 아닐 때 적용
        setSelectedIndex(-1);
        actions.setWriteSelectedIndex(-1);
        actions.setViewSelectedIndex(-1);
        actions.setModifySelectedIndex(-1);
        state.selectedList.forEach((selected) => {
          //selectedView 화면에서 체크,기본,뷰보기(체크) 3가지 토글이 가능하게 해줌
          const element = document.getElementById(`boardMore-${selected}`);
          if (element) {
            element.style.backgroundImage = "url('/images/board/more.png')";
          }
        });
        //처음 화면에서 중복 값 제거
        const newSelectedList = state.selectedList.filter(
          (item) => item !== boards.workBoard?.wno,
        );
        actions.setSelectedList(newSelectedList);

        return;
      }

      // 선택 화면에서 중복 값 없이 selectedIndex 처리
      const newSelectedList = [] as any;
      const [lastElement] = newSelectedList.slice(-1);
      const isAlreadySelected = newSelectedList.includes(boards.workBoard?.wno);

      if (isAlreadySelected) {
        actions.setSelectedList([lastElement]);
      } else {
        const newSelectedList = [...state.selectedList, boards.workBoard?.wno];
        const [lastElement] = newSelectedList.slice(-1);
        actions.setSelectedList([lastElement]);
      }

      const newSelectedListOthers = state.selectedListOthers.includes(index)
        ? state.selectedListOthers
        : [...state.selectedListOthers, index];
      actions.setSelectedListOthers(newSelectedListOthers);

      setTimeout(() => {
        navigate(
          `boards/modify/${boards.workBoard?.wno}?selected=${state.selectedList}&title=${titleQParam}&count=${countQParam}&regDate=${regDateQParam}&searchType=${searchTypeQParam}&keyword=${keywordQParam}`,
          {
            state: { searchType: null, keyword: null },
          },
        );
      }, 560);
      actions.setRemoveSelectedIndex(-1);
      actions.setWriteSelectedIndex(-1);
      actions.setViewSelectedIndex(-1);
      actions.setModifySelectedIndex(index);
      setSelectedIndex(index);
    }
  };

  const removeArticle = (index: number) => {
    const tableRows = document.querySelectorAll('.black');
    tableRows.forEach((row) => {
      row.classList.remove('black');
    });
    const tableRows2 = document.querySelectorAll('.blackOnModify');
    tableRows2.forEach((row) => {
      row.classList.remove('blackOnModify');
    });
    const tableRows3 = document.querySelectorAll('.blackOnRemove');
    tableRows3.forEach((row) => {
      row.classList.remove('blackOnRemove');
    });
    if (selectedIndex === index) {
      setToggleView(toggleView + 2);
      actions.setToggleBackBtn(false);
    }
    if (state.selectedView === true) {
      setToggleView(toggleView + 1);
    }
    if (toggleView % 2 === 1 && state.selectedView === true) {
      if (selectedIndex === index) {
        setSelectedIndex(index);
      } else {
        // 선택 된 인덱스(인덱스 선택 후 select를 누르면 나오는 화면)가 해제되어야 할 때는 view 화면을 보여주지 않음
        setSelectedIndex(-1);
        actions.setRemoveSelectedIndex(-1);
        actions.setModifySelectedIndex(-1);
        actions.setWriteSelectedIndex(-1);
        actions.setViewSelectedIndex(-1);
      }
    } else {
      if (selectedIndex === index && state.selectedView === false) {
        // 이미 선택된 인덱스를 클릭한 경우 선택 해제, 선택된 뷰가 아닐 때 적용
        setSelectedIndex(-1);
        actions.setRemoveSelectedIndex(-1);
        actions.setModifySelectedIndex(-1);
        actions.setViewSelectedIndex(-1);
        actions.setWriteSelectedIndex(-1);
        state.selectedList.forEach((selected) => {
          //selectedView 화면에서 체크,기본,뷰보기(체크) 3가지 토글이 가능하게 해줌
          const element = document.getElementById(`boardMore-${selected}`);
          if (element) {
            element.style.backgroundImage = "url('/images/board/more.png')";
          }
        });
        //처음 화면에서 중복 값 제거
        const newSelectedList = state.selectedList.filter(
          (item) => item !== boards.workBoard?.wno,
        );
        actions.setSelectedList(newSelectedList);

        return;
      }

      // 선택 화면에서 중복 값 없이 selectedIndex 처리
      const newSelectedList = [] as any;
      const [lastElement] = newSelectedList.slice(-1);
      const isAlreadySelected = newSelectedList.includes(boards.workBoard?.wno);

      if (isAlreadySelected) {
        actions.setSelectedList([lastElement]);
      } else {
        const newSelectedList = [...state.selectedList, boards.workBoard?.wno];
        const [lastElement] = newSelectedList.slice(-1);
        actions.setSelectedList([lastElement]);
      }

      const newSelectedListOthers = state.selectedListOthers.includes(index)
        ? state.selectedListOthers
        : [...state.selectedListOthers, index];
      actions.setSelectedListOthers(newSelectedListOthers);

      actions.setModifySelectedIndex(-1);
      actions.setWriteSelectedIndex(-1);
      actions.setViewSelectedIndex(-1);
      actions.setRemoveSelectedIndex(index);
      setSelectedIndex(index);
    }

    const message = '글을 삭제하시겠습니까?';
    const onConfirm = async (wno: number) => {
      try {
        let selected = {
          title: titleQParam,
          count: countQParam,
          regDate: regDateQParam,
          searchType: searchTypeQParam,
          keyword: !searchInput?.value
            ? keywordQParam
            : globalSearchInput?.value
            ? globalSearchInput?.value
            : searchInput?.value,
          selectedList: state.selectedList,
        };

        await api.removeBoard(wno);
        // const scrollArea = document.getElementById('scrollArea');
        // const scrollTop = scrollArea!.scrollTop;
        alert('삭제가 완료되었습니다.');

        await dispatch(fetchList(selected as any));
        navigate(
          `/boards?selected=${selectedQParam}&title=${titleQParam}&count=${countQParam}&regDate=${regDateQParam}&searchType=${searchTypeQParam}&keyword=${keywordQParam}`,
        );
        // dispatch(fetchCommentAndScroll({ wno, scrollTop }));
      } catch (e: any) {
        if (e.response.status === 400) {
          alert('잘못된 요청입니다.');
        } else if (e.response.status === 401) {
          alert('로그인이 필요합니다.');
          navigate('/login');
        } else {
          alert(e.response.data.message);
        }
      }
    };
    const onCancel = () => console.log('글 삭제가 취소되었습니다.');
    if (!onConfirm || typeof onConfirm !== 'function') {
      return;
    }
    if (onCancel && typeof onCancel !== 'function') {
      return;
    }
    const confirmAction = (index: number) => {
      if (window.confirm(message)) {
        onConfirm(index);
      } else {
        onCancel();
      }
    };

    setTimeout(() => {
      confirmAction(index);
    }, 500);
  };
  const callHashtag = useCallback(
    (e: Event, selectedTag: any) => {
      const searchInput = document.getElementById(
        'searchInput',
      ) as HTMLInputElement;
      searchInput!.value = '';
      actions.setOnGlobalSearch(false);
      actions.setHashSelected(true);
      actions.setToolsSelected(false);
      actions.setToggleSelected(false);
      actions.setSelectedView(false);
      e.stopPropagation();

      const tableRows = document.querySelectorAll('.black');
      tableRows.forEach((row) => {
        row.classList.remove('black');
      });
      const tableRows2 = document.querySelectorAll('.blackOnModify');
      tableRows2.forEach((row) => {
        row.classList.remove('blackOnModify');
      });

      navigate(
        `/boards/fetchHashTag?selected=${state.selectedList}&searchType=${searchTypeQParam}&keyword=${selectedTag}&toolOrHashTag=hashTag`,
      );
    },
    [actions, navigate, searchTypeQParam, state.selectedList],
  );
  const callTool = useCallback(
    (e: Event, selectedTag: any) => {
      const searchInput = document.getElementById(
        'searchInput',
      ) as HTMLInputElement;
      searchInput!.value = '';
      actions.setOnGlobalSearch(false);
      actions.setToolsSelected(true);
      actions.setHashSelected(false);
      actions.setToggleSelected(false);
      actions.setSelectedView(false);
      e.stopPropagation();

      const tableRows = document.querySelectorAll('.black');
      tableRows.forEach((row) => {
        row.classList.remove('black');
      });
      const tableRows2 = document.querySelectorAll('.blackOnModify');
      tableRows2.forEach((row) => {
        row.classList.remove('blackOnModify');
      });

      navigate(
        `/boards/fetchTool?selected=${state.selectedList}&searchType=${searchTypeQParam}&keyword=${selectedTag}&toolOrHashTag=tool`,
      );
    },
    [actions, navigate, searchTypeQParam, state.selectedList],
  );
  const showTool = () => {
    const moreToolsElement = document.querySelector(
      '.' + `moreToolsWrapper${boards.workBoard?.title.replace(/\s+/g, '')}`,
    ) as HTMLElement | any;
    console.log(moreToolsElement);
    if (showMoreToolsWithIcons && moreToolsElement) {
      setShowMoreToolsWithIcons(false);
      moreToolsElement.style.display = 'block';
    } else if (!showMoreToolsWithIcons && moreToolsElement) {
      moreToolsElement.style.display = 'none';
      setShowMoreToolsWithIcons(true);
    }
  };
  return (
    <table
      id="scrollArea"
      className="BoardTableContent-virtualized table-class"
      style={style}
    >
      <tbody>
        <TableTr
          onClick={(e: any) => {
            if (state.boardModifiable === true) {
              modifyArticle(boards.workBoard?.wno);
              return;
            } else if (state.boardRemovable === true) {
              removeArticle(boards.workBoard?.wno);
              return;
            }
            showArticle(index);
          }}
          id={`board-${boards.workBoard?.wno}`}
          className={
            state.removeSelectedIndex === boards.workBoard?.wno
              ? 'blackOnRemove'
              : state.modifySelectedIndex === boards.workBoard?.wno
              ? 'blackOnModify'
              : state.writeSelectedIndex === boards.workBoard?.wno
              ? 'blackOnWrite'
              : state.viewSelectedIndex === boards.workBoard?.wno
              ? 'blackOnView'
              : selectedIndex === index
              ? 'black'
              : 'normal'
          }
        >
          <TableTd className="td1">
            <BoardBodyThumbnailImg
              src={
                thumbnail !== 'notUploaded'
                  ? process.env.PUBLIC_URL + thumbnail
                  : '/images/board/notuploadedImg.png'
              }
            />
            <BoardHeadUL>
              <li>
                <BoardTitle>
                  <span className="boardTitle" title={boards.workBoard?.title}>
                    {boards.workBoard?.title}
                  </span>
                  &nbsp;
                  <BoardComment>[{boards.commentCount}]</BoardComment>
                  <Tools>
                    <ToolsDescendant
                      id={`toolsDescendant${boards.workBoard?.wno}`}
                      key={index}
                    >
                      {showDefaultTools ? (
                        <>
                          {boards.workBoard?.tools?.map(
                            (icon: string, index: number) => {
                              if (icon === 'figma') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) => callTool(e, 'figma')}
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/figma.png"
                                      alt="Figma"
                                      title="Figma"
                                    />
                                  </span>
                                );
                              } else if (icon === 'docker') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) => callTool(e, 'docker')}
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/docker.png"
                                      alt="Docker"
                                      title="Docker"
                                    />
                                  </span>
                                );
                              } else if (icon === 'CSS') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) => callTool(e, 'CSS')}
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/css.png"
                                      alt="CSS"
                                      title="CSS"
                                    />
                                  </span>
                                );
                              } else if (icon === 'dreamweaver') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) =>
                                      callTool(e, 'dreamweaver')
                                    }
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/dreamweaver.png"
                                      alt="Dreamweaver"
                                      title="Dreamweaver"
                                    />
                                  </span>
                                );
                              } else if (icon === 'eclipse') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) => callTool(e, 'eclipse')}
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/eclipse.png"
                                      alt="Eclipse"
                                      title="Eclipse"
                                    />
                                  </span>
                                );
                              } else if (icon === 'excel') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) => callTool(e, 'excel')}
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/excel.png"
                                      alt="Excel"
                                      title="Excel"
                                    />
                                  </span>
                                );
                              } else if (icon === 'gradle') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) => callTool(e, 'gradle')}
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/gradle.png"
                                      alt="Gradle"
                                      title="Gradle"
                                    />
                                  </span>
                                );
                              } else if (icon === 'HTML') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) => callTool(e, 'HTML')}
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/html.png"
                                      alt="HTML"
                                      title="HTML"
                                    />
                                  </span>
                                );
                              } else if (icon === 'illustrator') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) =>
                                      callTool(e, 'illustrator')
                                    }
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/illustrator.png"
                                      alt="Illustrator"
                                      title="Illustrator"
                                    />
                                  </span>
                                );
                              } else if (icon === 'java') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) => callTool(e, 'java')}
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/java.png"
                                      alt="Java"
                                      title="Java"
                                    />
                                  </span>
                                );
                              } else if (icon === 'javascript') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) =>
                                      callTool(e, 'javascript')
                                    }
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/javascript.png"
                                      alt="JavaScript"
                                      title="JavaScript"
                                    />
                                  </span>
                                );
                              } else if (icon === 'typescript') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) =>
                                      callTool(e, 'typescript')
                                    }
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/typescript.png"
                                      alt="TypeScript"
                                      title="TypeScript"
                                    />
                                  </span>
                                );
                              } else if (icon === 'jQuery') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) => callTool(e, 'jQuery')}
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/jquery.png"
                                      alt="jQuery"
                                      title="jQuery"
                                    />
                                  </span>
                                );
                              } else if (icon === 'heidiSQL') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) =>
                                      callTool(e, 'heidiSQL')
                                    }
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/heidisql.png"
                                      alt="HeidiSQL"
                                      title="HeidiSQL"
                                    />
                                  </span>
                                );
                              } else if (icon === 'mariaDB') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) => callTool(e, 'mariaDB')}
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/mariadb.png"
                                      alt="MariaDB"
                                      title="MariaDB"
                                    />
                                  </span>
                                );
                              } else if (icon === 'redis') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) => callTool(e, 'redis')}
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/redis.png"
                                      alt="Redis"
                                      title="Redis"
                                    />
                                  </span>
                                );
                              } else if (icon === 'photoshop') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) =>
                                      callTool(e, 'photoshop')
                                    }
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/photoshop.png"
                                      alt="Photoshop"
                                      title="Photoshop"
                                    />
                                  </span>
                                );
                              } else if (icon === 'python') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) => callTool(e, 'python')}
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/python.png"
                                      alt="Python"
                                      title="Python"
                                    />
                                  </span>
                                );
                              } else if (icon === 'querydsl') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) =>
                                      callTool(e, 'querydsl')
                                    }
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/querydsl.png"
                                      alt="Querydsl"
                                      title="Querydsl"
                                    />
                                  </span>
                                );
                              } else if (icon === 'react') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) => callTool(e, 'react')}
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/react.png"
                                      alt="React"
                                      title="React"
                                    />
                                  </span>
                                );
                              } else if (icon === 'redux') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) => callTool(e, 'redux')}
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/redux.png"
                                      alt="Redux"
                                      title="Redux"
                                    />
                                  </span>
                                );
                              } else if (icon === 'mobx') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) => callTool(e, 'mobx')}
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/mobx.png"
                                      alt="MobX"
                                      title="MobX"
                                    />
                                  </span>
                                );
                              } else if (icon === 'springboot') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) =>
                                      callTool(e, 'springboot')
                                    }
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/springboot.png"
                                      alt="Springboot"
                                      title="Springboot"
                                    />
                                  </span>
                                );
                              } else if (icon === 'jpa') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) => callTool(e, 'jpa')}
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/jpa.png"
                                      alt="JPA"
                                      title="JPA(Java Persistence API)"
                                    />
                                  </span>
                                );
                              } else if (icon === 'jwt') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) => callTool(e, 'jwt')}
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/jwt.png"
                                      alt="JWT(Json Web Token)"
                                      title="JWT(Json Web Token)"
                                    />
                                  </span>
                                );
                              } else if (icon === 'sts') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) => callTool(e, 'sts')}
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/sts.png"
                                      alt="Spring Tool Suite"
                                      title="Spring Tool Suite"
                                    />
                                  </span>
                                );
                              } else if (icon === 'vscode') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) => callTool(e, 'vscode')}
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/vscode.png"
                                      alt="Visual Studio Code"
                                      title="Visual Studio Code"
                                    />
                                  </span>
                                );
                              } else if (icon === 'oracle') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) => callTool(e, 'oracle')}
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/oracle.png"
                                      alt="Oracle"
                                      title="Oracle"
                                    />
                                  </span>
                                );
                              } else if (icon === 'jenkins') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) => callTool(e, 'jenkins')}
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/jenkins.png"
                                      alt="Jenkins"
                                      title="Jenkins"
                                    />
                                  </span>
                                );
                              }
                            },
                          )}
                        </>
                      ) : (
                        <></>
                      )}
                    </ToolsDescendant>
                  </Tools>
                </BoardTitle>
                {showMoreTools ? (
                  <>
                    <ToShowMoreTools
                      onClick={(event: MouseEvent) => {
                        event.stopPropagation(); // 버블링을 여기서 막아줍니다.
                        showTool();
                      }}
                    >
                      <img
                        alt="사용 도구"
                        title="사용 도구"
                        src={
                          moreToolsHover
                            ? process.env.PUBLIC_URL +
                              '/images/board/toolThumbnails/toolsOv.png'
                            : process.env.PUBLIC_URL +
                              '/images/board/toolThumbnails/tools.png'
                        }
                        onMouseOver={() => setMoreToolsHover(true)}
                        onMouseOut={() => setMoreToolsHover(false)}
                      />
                      <MoreToolsWrapper
                        className={`moreToolsWrapper${boards.workBoard?.title.replace(
                          /\s+/g,
                          '',
                        )}`}
                        id={`moreToolsWrapper${boards.workBoard?.title.replace(
                          /\s+/g,
                          '',
                        )}`}
                        title="도구 리스트 닫기"
                      >
                        <MoreTools>
                          {boards.workBoard?.tools?.map(
                            (icon: string, index: number) => {
                              if (icon === 'figma') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) => callTool(e, 'figma')}
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/figma.png"
                                      alt="Figma"
                                      title="Figma"
                                    />
                                  </span>
                                );
                              } else if (icon === 'docker') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) => callTool(e, 'docker')}
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/docker.png"
                                      alt="Docker"
                                      title="Docker"
                                    />
                                  </span>
                                );
                              } else if (icon === 'CSS') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) => callTool(e, 'CSS')}
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/css.png"
                                      alt="CSS"
                                      title="CSS"
                                    />
                                  </span>
                                );
                              } else if (icon === 'dreamweaver') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) =>
                                      callTool(e, 'dreamweaver')
                                    }
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/dreamweaver.png"
                                      alt="Dreamweaver"
                                      title="Dreamweaver"
                                    />
                                  </span>
                                );
                              } else if (icon === 'eclipse') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) => callTool(e, 'eclipse')}
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/eclipse.png"
                                      alt="Eclipse"
                                      title="Eclipse"
                                    />
                                  </span>
                                );
                              } else if (icon === 'excel') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) => callTool(e, 'excel')}
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/excel.png"
                                      alt="Excel"
                                      title="Excel"
                                    />
                                  </span>
                                );
                              } else if (icon === 'gradle') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) => callTool(e, 'gradle')}
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/gradle.png"
                                      alt="Gradle"
                                      title="Gradle"
                                    />
                                  </span>
                                );
                              } else if (icon === 'HTML') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) => callTool(e, 'HTML')}
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/html.png"
                                      alt="HTML"
                                      title="HTML"
                                    />
                                  </span>
                                );
                              } else if (icon === 'illustrator') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) =>
                                      callTool(e, 'illustrator')
                                    }
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/illustrator.png"
                                      alt="Illustrator"
                                      title="Illustrator"
                                    />
                                  </span>
                                );
                              } else if (icon === 'java') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) => callTool(e, 'java')}
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/java.png"
                                      alt="Java"
                                      title="Java"
                                    />
                                  </span>
                                );
                              } else if (icon === 'javascript') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) =>
                                      callTool(e, 'javascript')
                                    }
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/javascript.png"
                                      alt="JavaScript"
                                      title="JavaScript"
                                    />
                                  </span>
                                );
                              } else if (icon === 'typescript') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) =>
                                      callTool(e, 'typescript')
                                    }
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/typescript.png"
                                      alt="TypeScript"
                                      title="TypeScript"
                                    />
                                  </span>
                                );
                              } else if (icon === 'jQuery') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) => callTool(e, 'jQuery')}
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/jquery.png"
                                      alt="jQuery"
                                      title="jQuery"
                                    />
                                  </span>
                                );
                              } else if (icon === 'heidiSQL') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) =>
                                      callTool(e, 'heidiSQL')
                                    }
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/heidisql.png"
                                      alt="HeidiSQL"
                                      title="HeidiSQL"
                                    />
                                  </span>
                                );
                              } else if (icon === 'mariaDB') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) => callTool(e, 'mariaDB')}
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/mariadb.png"
                                      alt="MariaDB"
                                      title="MariaDB"
                                    />
                                  </span>
                                );
                              } else if (icon === 'redis') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) => callTool(e, 'redis')}
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/redis.png"
                                      alt="Redis"
                                      title="Redis"
                                    />
                                  </span>
                                );
                              } else if (icon === 'photoshop') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) =>
                                      callTool(e, 'photoshop')
                                    }
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/photoshop.png"
                                      alt="Photoshop"
                                      title="Photoshop"
                                    />
                                  </span>
                                );
                              } else if (icon === 'python') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) => callTool(e, 'python')}
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/python.png"
                                      alt="Python"
                                      title="Python"
                                    />
                                  </span>
                                );
                              } else if (icon === 'querydsl') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) =>
                                      callTool(e, 'querydsl')
                                    }
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/querydsl.png"
                                      alt="Querydsl"
                                      title="Querydsl"
                                    />
                                  </span>
                                );
                              } else if (icon === 'react') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) => callTool(e, 'react')}
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/react.png"
                                      alt="React"
                                      title="React"
                                    />
                                  </span>
                                );
                              } else if (icon === 'redux') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) => callTool(e, 'redux')}
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/redux.png"
                                      alt="Redux"
                                      title="Redux"
                                    />
                                  </span>
                                );
                              } else if (icon === 'mobx') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) => callTool(e, 'mobx')}
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/mobx.png"
                                      alt="MobX"
                                      title="MobX"
                                    />
                                  </span>
                                );
                              } else if (icon === 'springboot') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) =>
                                      callTool(e, 'springboot')
                                    }
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/springboot.png"
                                      alt="Springboot"
                                      title="Springboot"
                                    />
                                  </span>
                                );
                              } else if (icon === 'jpa') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) => callTool(e, 'jpa')}
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/jpa.png"
                                      alt="JPA"
                                      title="JPA(Java Persistence API)"
                                    />
                                  </span>
                                );
                              } else if (icon === 'jwt') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) => callTool(e, 'jwt')}
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/jwt.png"
                                      alt="JWT(Json Web Token)"
                                      title="JWT(Json Web Token)"
                                    />
                                  </span>
                                );
                              } else if (icon === 'sts') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) => callTool(e, 'sts')}
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/sts.png"
                                      alt="Spring Tool Suite"
                                      title="Spring Tool Suite"
                                    />
                                  </span>
                                );
                              } else if (icon === 'vscode') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) => callTool(e, 'vscode')}
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/vscode.png"
                                      alt="Visual Studio Code"
                                      title="Visual Studio Code"
                                    />
                                  </span>
                                );
                              } else if (icon === 'oracle') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) => callTool(e, 'oracle')}
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/oracle.png"
                                      alt="Oracle"
                                      title="Oracle"
                                    />
                                  </span>
                                );
                              } else if (icon === 'jenkins') {
                                return (
                                  <span
                                    key={icon}
                                    onClick={(e: any) => callTool(e, 'jenkins')}
                                  >
                                    <img
                                      src="/images/board/toolThumbnails/jenkins.png"
                                      alt="Jenkins"
                                      title="Jenkins"
                                    />
                                  </span>
                                );
                              }
                            },
                          )}
                        </MoreTools>
                      </MoreToolsWrapper>
                    </ToShowMoreTools>
                  </>
                ) : null}
              </li>
              <li>
                <BoardCategory>{boards.workBoard?.category}</BoardCategory>
                <BoardTags id="hashTags">
                  #
                  <HashTag1
                    className="hashTags"
                    onClick={(e: any) =>
                      callHashtag(e, boards.workBoard?.hashTag[0])
                    }
                  >
                    {boards.workBoard?.hashTag[0]},&nbsp;
                  </HashTag1>
                  #
                  <HashTag2
                    className="hashTags"
                    onClick={(e: any) =>
                      callHashtag(e, boards.workBoard?.hashTag[1])
                    }
                  >
                    {boards.workBoard?.hashTag[1]}
                  </HashTag2>
                  {boards.workBoard?.hashTag[2] !== undefined ? (
                    <>
                      {sharpAndComma}
                      <HashTag3SharpAndComma
                        className="hashTags"
                        onClick={(e: any) =>
                          callHashtag(e, boards.workBoard?.hashTag[2])
                        }
                      >
                        {boards.workBoard?.hashTag[2]}
                      </HashTag3SharpAndComma>
                    </>
                  ) : (
                    <HashTag3 className="hashTags">
                      {boards.workBoard?.hashTag[2]}
                    </HashTag3>
                  )}
                </BoardTags>
              </li>
            </BoardHeadUL>
          </TableTd>
          <TableTd className="td2">
            <BoardCount>{boards.workBoard?.hits}</BoardCount>
          </TableTd>
          <TableTd className="td3">
            <More
              className="boardMore"
              id={`boardMore-${boards.workBoard?.wno}`}
            />
          </TableTd>
          <TableTd className="td4">
            <RegDate>
              <div>{boardRegDateDays}</div>
            </RegDate>
            <Ago>
              <div>{boardRegDateDaysAgo}</div>
            </Ago>
          </TableTd>
        </TableTr>
      </tbody>
    </table>
  );
};

export default React.memo(BoardTableContent);
