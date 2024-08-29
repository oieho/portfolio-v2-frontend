import Left from '../components/common/Left';
import RightBottom from '../components/common/RightBottom';
import HeaderContainer from '../containers/HeaderContainer';
import Bracket from '../components/common/Bracket';
import BoardListContainer from '../containers/BoardListContainer';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import React, { useState, useContext, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: #afafaf;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 0;

  @media (max-height: 800px) {
    height: 60rem;
    margin-top: -4.2rem;
  }
`;

export const MainContext = createContext({
  state: {
    zIdx: 2,
    rightBlock: 0,
    selectedList: [] as number[],
    writeSelectedIndex: -1 as number, // 글 등록 후 등록 된 글 Selected
    maxWno: 0 as number,
    modifySelectedIndex: -1,
    removeSelectedIndex: -1,
    viewSelectedIndex: -1,
    viewSelectedIndexGear: false,
    selectedListOthers: [] as number[],
    selectedView: false,
    toggleBackBtn: false,
    hashSelected: false,
    toolsSelected: false,
    onGlobalSearch: false,
    toggleAddCommentForm: true,
    hideEditorGear: false,
    portfolioContent: '',
    boardModifiable: false,
    boardRemovable: false,
    toggleSelected: false,
    completeOrModify: false,
    completeOrRemove: false,
    searchGear: false,
    boardThumbnail: '',
    allImgsAreLoaded: false,
    alignGear: false,
  },
  actions: {
    setZIdx: (zIdx: number) => ({
      zIdx,
    }),
    setRightBlock: (rightBlock: boolean) => ({
      rightBlock,
    }),
    setSelectedList: (selectedList: number[]) => ({
      selectedList,
    }),
    setWriteSelectedIndex: (writeSelectedIndex: number) => ({
      writeSelectedIndex,
    }),
    setMaxWno: (maxWno: number) => ({
      maxWno,
    }),
    setModifySelectedIndex: (modifySelectedIndex: number) => ({
      modifySelectedIndex,
    }),
    setRemoveSelectedIndex: (removeSelectedIndex: number) => ({
      removeSelectedIndex,
    }),
    setViewSelectedIndex: (viewSelectedIndex: number) => ({
      viewSelectedIndex,
    }),
    setViewSelectedIndexGear: (viewSelectedIndexGear: boolean) => ({
      viewSelectedIndexGear,
    }),
    setSelectedListOthers: (selectedListOthers: number[]) => ({
      selectedListOthers,
    }),
    setSelectedView: (selectedView: boolean) => ({
      selectedView,
    }),
    setToggleBackBtn: (toggleBackBtn: boolean) => ({
      toggleBackBtn,
    }),
    setHashSelected: (hashSelected: boolean) => ({
      hashSelected,
    }),
    setToolsSelected: (toolsSelected: boolean) => ({
      toolsSelected,
    }),
    setOnGlobalSearch: (onGlobalSearch: boolean) => ({
      onGlobalSearch,
    }),

    setToggleAddCommentForm: (toggleAddCommentForm: boolean) => ({
      toggleAddCommentForm,
    }),
    setHideEditorGear: (hideEditorGear: boolean) => ({ hideEditorGear }),
    setPortfolioContent: (portfolioContent: string) => ({
      portfolioContent,
    }),
    setBoardModifiable: (boardModifiable: any) => ({
      boardModifiable,
    }),
    setBoardRemovable: (boardRemovable: any) => ({
      boardRemovable,
    }),
    setToggleSelected: (toggleSelected: any) => ({
      toggleSelected,
    }),
    setCompleteOrModify: (completeOrModify: any) => ({
      completeOrModify,
    }),
    setCompleteOrRemove: (completeOrRemove: any) => ({
      completeOrRemove,
    }),
    setSearchGear: (searchGear: boolean) => ({
      searchGear,
    }),
    setBoardThumbnail: (boardThumbnail: any) => ({
      boardThumbnail,
    }),

    setAllImgsAreLoaded: (allImgsAreLoaded: boolean) => ({
      allImgsAreLoaded,
    }),
    setAlignGear: (alignGear: boolean) => ({
      alignGear,
    }),
  },
});
const Main = () => {
  const { state, actions } = useContext(MainContext);
  const navigate = useNavigate();

  const [zIdx, setZIdx] = useState(2);
  const [rightBlock, setRightBlock] = useState();
  const [selectedList, setSelectedList] = useState<number[]>([]);
  const [writeSelectedIndex, setWriteSelectedIndex] = useState<number>();
  const [maxWno, setMaxWno] = useState<number>();
  const [selectedListOthers, setSelectedListOthers] = useState<number[]>([]);
  const [modifySelectedIndex, setModifySelectedIndex] = useState<number>();
  const [removeSelectedIndex, setRemoveSelectedIndex] = useState<number>();
  const [viewSelectedIndex, setViewSelectedIndex] = useState<number>();
  const [viewSelectedIndexGear, setViewSelectedIndexGear] =
    useState<boolean>(false);
  const [selectedView, setSelectedView] = useState<boolean>(false);
  const [toggleBackBtn, setToggleBackBtn] = useState<boolean>(false);
  const [hashSelected, setHashSelected] = useState<boolean>(false);
  const [toolsSelected, setToolsSelected] = useState<boolean>(false);
  const [onGlobalSearch, setOnGlobalSearch] = useState<boolean>(false);
  const [toggleAddCommentForm, setToggleAddCommentForm] =
    useState<boolean>(true);
  const [hideEditorGear, setHideEditorGear] = useState<boolean>(false);
  const [portfolioContent, setPortfolioContent] = useState<string>('');

  const [boardModifiable, setBoardModifiable] = useState<boolean>();
  const [boardRemovable, setBoardRemovable] = useState<boolean>();
  const [toggleSelected, setToggleSelected] = useState<boolean>(false);
  const [completeOrModify, setCompleteOrModify] = useState<boolean>();
  const [completeOrRemove, setCompleteOrRemove] = useState<boolean>();
  const [searchGear, setSearchGear] = useState<boolean>();
  const [boardThumbnail, setBoardThumbnail] = useState<any>('');
  const [allImgsAreLoaded, setAllImgsAreLoaded] = useState<boolean>(false);
  const [alignGear, setAlignGear] = useState<boolean>(false);
  const value = {
    state: {
      zIdx,
      rightBlock,
      selectedList,
      writeSelectedIndex,
      maxWno,
      modifySelectedIndex,
      removeSelectedIndex,
      viewSelectedIndex,
      viewSelectedIndexGear,
      selectedListOthers,
      selectedView,
      toggleBackBtn,
      hashSelected,
      toolsSelected,
      onGlobalSearch,
      toggleAddCommentForm,
      hideEditorGear,
      portfolioContent,
      boardModifiable,
      boardRemovable,
      toggleSelected,
      completeOrModify,
      completeOrRemove,
      searchGear,
      boardThumbnail,
      allImgsAreLoaded,
      alignGear,
    },
    actions: {
      setZIdx,
      setRightBlock,
      setSelectedList,
      setWriteSelectedIndex,
      setMaxWno,
      setModifySelectedIndex,
      setRemoveSelectedIndex,
      setViewSelectedIndex,
      setViewSelectedIndexGear,
      setSelectedListOthers,
      setSelectedView,
      setToggleBackBtn,
      setHashSelected,
      setToolsSelected,
      setOnGlobalSearch,
      setToggleAddCommentForm,
      setHideEditorGear,
      setPortfolioContent,
      setBoardModifiable,
      setBoardRemovable,
      setToggleSelected,
      setCompleteOrModify,
      setCompleteOrRemove,
      setSearchGear,
      setBoardThumbnail,
      setAllImgsAreLoaded,
      setAlignGear,
    },
  };

  const initSelectedList = () => {
    const searchType = document.getElementById(
      'searchFormType',
    ) as HTMLSelectElement;
    const searchInput = document.getElementById(
      'searchInput',
    ) as HTMLInputElement;

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
      `/boards?searchType=${searchType}&keyword='${searchInput?.value}'`,
    );
  };

  const changeLogoEye = () => {
    const logoEye = document?.getElementById('logoEye');
    logoEye?.classList.add('rotate');
    setTimeout(() => {
      logoEye?.classList.remove('rotate');
    }, 1500);
  };

  const LaptopAndTabletH: boolean = useMediaQuery({
    query: '(min-width:1025px) and (max-width:1280px)',
  });
  const tabletH: boolean = useMediaQuery({
    query: '(min-width:769px) and (max-width:1024px)',
  });
  const mobileHAndTabletV: boolean = useMediaQuery({
    query: '(min-width:481px) and (max-width:768px)',
  });
  const mobileV: boolean = useMediaQuery({ query: '(max-width:480px)' });
  return (
    <MainContext.Provider value={value as any}>
      <Wrapper onClick={() => changeLogoEye()}>
        {LaptopAndTabletH ? (
          <>
            <HeaderContainer />
            <BoardListContainer />
            <Outlet />
            <RightBottom />
          </>
        ) : tabletH ? (
          <>
            <Bracket />
            <HeaderContainer />
            <BoardListContainer />
            <Outlet />
            <RightBottom />
          </>
        ) : mobileHAndTabletV ? (
          <>
            <Bracket />
            <HeaderContainer />
            <BoardListContainer />
            <Outlet />
            <RightBottom />
          </>
        ) : mobileV ? (
          <>
            <Bracket />
            <HeaderContainer />
            <BoardListContainer />
            <Outlet />
            <RightBottom />
          </>
        ) : (
          // Desktop
          <>
            <Left homeHv={true} portfolioHv={true} />
            <Bracket />
            <HeaderContainer />
            <BoardListContainer />
            <Outlet />
            <RightBottom />
          </>
        )}
      </Wrapper>
    </MainContext.Provider>
  );
};
export default Main;
