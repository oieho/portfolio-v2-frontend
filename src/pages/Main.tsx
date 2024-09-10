import Left from '../components/common/Left';
import RightBottom from '../components/common/RightBottom';
import HeaderContainer from '../containers/HeaderContainer';
import Bracket from '../components/common/Bracket';
import BoardListContainer from '../containers/BoardListContainer';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import React, { useState, createContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import MobileHAndTabletVRightContainer from '../containers/RightMobileHAndTabletVContainer';

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
  overflow-x: hidden;

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
    readIndex: 0,
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
    afterHitSetBtnCallContentDesc: false,
    toggleShowDesc: false,
    toggleShowDescCount: 0,
    afterHideSetContentDesc: false,
    toggleShowDescType: '',
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
    setReadIndex: (readIndex: number) => ({
      readIndex,
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
    setAfterHitSetBtnCallContentDesc: (
      afterHitSetBtnCallContentDesc: boolean,
    ) => ({
      afterHitSetBtnCallContentDesc,
    }),
    setToggleShowDesc: (toggleShowDesc: boolean) => ({
      toggleShowDesc,
    }),
    setToggleShowDescCount: (toggleShowDescCount: number) => ({
      toggleShowDescCount,
    }),
    setAfterHideSetContentDesc: (afterHideSetContentDesc: boolean) => ({
      afterHideSetContentDesc,
    }),
    setToggleShowDescType: (toggleShowDescType: string) => ({
      toggleShowDescType,
    }),
  },
});
const Main = () => {
  const [zIdx, setZIdx] = useState(2);
  const [rightBlock, setRightBlock] = useState();
  const [selectedList, setSelectedList] = useState<number[]>([]);
  const [writeSelectedIndex, setWriteSelectedIndex] = useState<number>();
  const [maxWno, setMaxWno] = useState<number>();
  const [selectedListOthers, setSelectedListOthers] = useState<number[]>([]);
  const [readIndex, setReadIndex] = useState<number>();
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
  const [afterHitSetBtnCallContentDesc, setAfterHitSetBtnCallContentDesc] =
    useState<boolean>(false);
  const [toggleShowDesc, setToggleShowDesc] = useState<boolean>(false);
  const [toggleShowDescCount, setToggleShowDescCount] = useState<any>(0);
  const [afterHideSetContentDesc, setAfterHideSetContentDesc] =
    useState<boolean>(false);
  const [toggleShowDescType, setToggleShowDescType] = useState<string>('');

  const value = {
    state: {
      zIdx,
      rightBlock,
      selectedList,
      writeSelectedIndex,
      maxWno,
      readIndex,
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
      afterHitSetBtnCallContentDesc,
      toggleShowDesc,
      toggleShowDescCount,
      afterHideSetContentDesc,
      toggleShowDescType,
    },
    actions: {
      setZIdx,
      setRightBlock,
      setSelectedList,
      setWriteSelectedIndex,
      setMaxWno,
      setReadIndex,
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
      setAfterHitSetBtnCallContentDesc,
      setToggleShowDesc,
      setToggleShowDescCount,
      setAfterHideSetContentDesc,
      setToggleShowDescType,
    },
  };

  const changeLogoEye = () => {
    const logoEye = document?.getElementById('logoEye');
    logoEye?.classList.add('rotate');
    setTimeout(() => {
      logoEye?.classList.remove('rotate');
    }, 1500);
  };

  //H : horizontal, V : vertical
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
            <HeaderContainer />
            <BoardListContainer />
            <Outlet />
            <RightBottom />
          </>
        ) : mobileHAndTabletV ? (
          <>
            <HeaderContainer />
            <BoardListContainer />
            <Outlet />
            <MobileHAndTabletVRightContainer />
          </>
        ) : mobileV ? (
          <>
            <HeaderContainer />
            <BoardListContainer />
            <Outlet />
            <MobileHAndTabletVRightContainer />
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
