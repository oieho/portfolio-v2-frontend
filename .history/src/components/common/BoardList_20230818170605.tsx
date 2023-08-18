import styled from 'styled-components';
import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  useContext,
} from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Board } from '../../App';
import { MyInfo } from '../../App';
import BoardTableContent from './BoardTableContent';
import { List, ListRowRenderer } from 'react-virtualized';
import {
  fetchList,
  fetchSelectedList,
  fetchHashTags,
  fetchTools,
} from '../../modules/boardSlice';
import { useAppDispatch } from '../../index';
import AddCommentBtn from './button/AddButton';
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
const BoardListBlock = styled.div`
  position: relative;
  left: -4.8rem;
  top: 1.91rem;
  background: #f5f5f5;
  box-shadow: 0px 15px 25px -6px rgba(0, 0, 0, 0.03);
  border-radius: 1rem;
  width: 52.8rem;
  height: 44.9rem;
  z-index: 1; // 중요 z-index로 순서 제어
`;
const BoardTitle = styled.img`
  float: left;
  position: relative;
  left: 1.96rem;
  top: 0.3rem;
  width: 6.063rem;
  height: 1.813rem;
  cursor: pointer;
`;
const SearchArea = styled.span`
  float: right;
  margin-right: 1.98rem;
  position: relative;
  top: 0.79rem;
  width: 14rem;
  height: 1.813rem;
`;
const Sorting = styled.span`
  position: absolute;
  top: -0.9rem;
  font-size: 0.75rem;
  font-weight: 400;
  line-tracking: 20%;
  z-index: 3;
`;
const SelectSort = styled.select`
  background: none;
  border: none;
  font-weight: 600;
  &:focus {
    outline: none;
  }
`;
const Option = styled.option`
  height: 50px;
  line-height: 50px;
  color: #ffffff;
  background: #000000;
  zoom: 1.1;
`;
const SearchLine = styled.div`
  position: relative;
  display: inline-block;
  height: 0.125rem;
  width: 14rem;
  border-radius: 10rem;
  background: #000000;
  z-index: 2;
  &.hoverSearchLine {
    height: 0.153rem;
    background: #000000;
    z-index: 2;
  }
`;
const Button = styled.button`
  background-image: url('/images/board/enter.png');
  background-size: cover;
  position: relative;
  display: inline-block;
  float: right;
  right: 0rem;
  top: -1.76rem;
  z-index: 2;
  width: 2.128rem;
  height: 1.128rem;
  border: none;
  cursor: pointer;
  &:hover {
    background-image: url('/images/board/enterOv.gif');
    background-size: cover;
    width: 2.128rem;
    height: 1.128rem;
    border: none;
  }
  &:active {
    background-image: url('/images/board/enterOv.png');
  }
`;
const SearchInput = styled.input`
  position: absolute;
  top: 0.27rem;
  left: 0rem;
  width: 12rem;
  height: 1.063rem;
  background: #f5f5f5;
  border: none;
  outline: none;
  padding: 0.4rem;
  z-index: 1;
  font-size: 0.85rem;

  &:focus {
    font-weight: bold;
  }
`;
const BoardTableHeader = styled.table`
  position: absolute;
  top: 5.9rem;
  left: 1.43rem;
  width: 49.61rem;
`;

const BoardTableBody = styled.table`
  position: absolute;
  top: 7rem;
  left: 1.21rem;
  text-align: center;
  width: 49.61rem;
`;
const EmptyTd = styled.td`
  font-size: 0.85rem;
  font-weight: bold;
  width: 1rem;
  height: 4.43rem;
  position: relative;
  top: 0.18rem;
  left: 0.36rem;
  background-color: #ffffff;
  border: 1px solid #e2e2e2;
  border-radius: 17px;
`;
const BoardTableTitles = styled.tr`
  width: 49.61rem;
  font-size: 0.75rem;
  font-weight: 400;
`;
const TotalWorks = styled.span`
  font-weight: bold;
`;
const TitleTit = styled.span`
  &:hover {
    font-weight: bold;
  }
  &:active {
    text-decoration: underline;
  }
  &:focus-within {
    font-weight: bold;
  }
`;
const TitleTd = styled.td`
  cursor: default;
  &.tHeadTd1 {
    width: 30.586rem;
    padding-left: 0.3rem;
    text-align: left;
  }
  &.tHeadTd2 {
    width: 6.129rem;
    text-align: center;
    &:hover {
      font-weight: bold;
    }
    &:active {
      text-decoration: underline;
    }
  }
  &.tHeadTd3 {
    position: relative;
    right: 0.8rem;
    width: 5.164rem;
    text-align: center;
  }
  &.tHeadTd4 {
    position: relative;
    width: 9.123rem;
    right: 0.24rem;
    text-align: center;
    &:hover {
      font-weight: bold;
    }
    &:active {
      text-decoration: underline;
    }
  }
`;
const Select = styled.span`
  cursor: default;
  &:hover {
    font-weight: bold;
  }
  &:active {
    text-decoration: underline;
  }
  &:focus-within {
    font-weight: bold;
  }
`;
const StyledList = styled(List)`
  width: calc(100.25%);
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

interface Props {
  boards: Board[] | any;
  readonly onSelectedList: (selectedList: any) => void;
  readonly myInfo: MyInfo | null;
  readonly isAuthorized: boolean;
}
const BoardList = ({ boards, onSelectedList, myInfo, isAuthorized }: Props) => {
  const { state, actions } = useContext(MainContext);
  const selectedList = state.selectedList;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const titleQParam = searchParams.get('title');
  const countQParam = searchParams.get('count');
  const regDateQParam = searchParams.get('regDate');
  const searchTypeQParam = searchParams.get('searchType');
  const keywordQParam = searchParams.get('keyword');
  const selectedListQParam = searchParams.get('selected');

  const [searchLineHover, setSearchLineHover] = useState(false);
  const [titleTit, setTitleTit] = useState('');
  const [countTit, setCountTit] = useState('');
  const [regDateTit, setRegDateTit] = useState('');
  const [searchType, setSearchType] = useState('');

  const searchInput = document.getElementById(
    'searchInput',
  ) as HTMLInputElement;
  const searchFormType = document.getElementById(
    'searchFormType',
  ) as HTMLSelectElement;
  const typeRef = useRef(null) as any;

  const setLine = () => {
    if (!searchLineHover) {
      setSearchLineHover(true);
    } else {
      setSearchLineHover(false);
    }
  };
  const rowRenderer: ListRowRenderer = useCallback(
    ({ index, style }: any) => {
      const board = boards[index];

      // boards 배열에서 null 값을 걸러내는 검사
      if (board === null) {
        return null; // null 값인 경우 렌더링하지 않음
      }

      return (
        <BoardTableContent
          key={index}
          index={index}
          boards={board}
          board={boards}
          style={style}
        />
      );
    },
    [boards],
  );
  const overscanIndicesGetter = ({
    cellCount,
    startIndex,
    stopIndex,
  }: {
    cellCount: number;
    stopIndex: number;
    startIndex: number;
  }) => {
    const loadCount = 8; // 한 번에 로드할 개수
    const overscanStartIndex = Math.max(0, startIndex - loadCount);
    const overscanStopIndex = Math.min(cellCount - 1, stopIndex + loadCount);

    return {
      overscanStartIndex,
      overscanStopIndex,
    };
  };

  const applyMore = useCallback(() => {
    if (state.selectedView === false) {
      state.selectedList.forEach((selected) => {
        const element2 = document.getElementById(`boardMore-${selected}`);
        if (element2) {
          element2.style.backgroundImage = "url('/images/board/more.png')";
        }
      });
    }
  }, [state.selectedList, state.selectedView]);

  useEffect(() => {
    if (state.searchGear === true) {
      searchInput.value = '';
      searchFormType.value = 'All';
      actions.setSearchGear(false);
    }
    let selected = {
      title: titleQParam,
      count: countQParam,
      regDate: regDateQParam,
      searchType: !searchTypeQParam ? typeRef.current.value : searchTypeQParam,
      keyword: !state.prevtDupFromKeyword
        ? keywordQParam
        : state.prevtDupFromKeyword,
      selectedList: state.selectedList,
    };
    if (state.onGlobalSearch === false) {
      if (searchTypeQParam === null && state.toggleSelected === false) {
        navigate(
          `/boards?searchType=${searchType}&keyword=${state.prevtDupFromKeyword}`,
        );
      } else if (state.hashSelected === true) {
        dispatch(fetchHashTags(selected) as any);
      } else if (state.toolsSelected === true) {
        dispatch(fetchTools(selected) as any);
      } else if (state.selectedView === false) {
        dispatch(fetchList(selected as any));
      } else if (state.selectedView === true) {
        dispatch(fetchSelectedList(selected) as any);
      }
    }
    applyMore();

    const sortArr = ['Titles', 'Count', 'Reg. Date'];
    setTitleTit(sortArr[0]);
    setCountTit(sortArr[1]);
    setRegDateTit(sortArr[2]);
  }, [
    actions,
    applyMore,
    countQParam,
    dispatch,
    keywordQParam,
    navigate,
    regDateQParam,
    searchFormType,
    searchInput,
    searchType,
    searchTypeQParam,
    state.hashSelected,
    state.onGlobalSearch,
    state.prevtDupFromKeyword,
    state.searchGear,
    state.selectedList,
    state.selectedView,
    state.toggleSelected,
    state.toolsSelected,
    titleQParam,
  ]);
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const rmTrBlack = useCallback(() => {
    const tableRows = document.querySelectorAll('.black');
    tableRows.forEach((row) => {
      row.classList.remove('black');
      row.classList.add('normal');
    });
  }, []);

  const rmTrBlackOnModify = useCallback(() => {
    actions.setModifySelectedIndex(-1);
    const tableRows = document.querySelectorAll('.blackOnModify');
    tableRows.forEach((row) => {
      row.classList.remove('blackOnModify');
      row.classList.add('normal');
    });
  }, [actions]);

  const titleLink = useCallback(
    (e: any) => {
      actions.setAlignGear(true);
      rmTrBlack();
      rmTrBlackOnModify();
      applyMore();
      navigate(
        `?selected=${selectedList.join(',')}&title=${
          titleQParam === 'desc' ? 'asc' : titleQParam === 'asc' ? null : 'desc'
        }&count=${countQParam}&regDate=${regDateQParam}&searchType=${searchTypeQParam}&keyword=${keywordQParam}`,
      );
    },
    [
      actions,
      applyMore,
      countQParam,
      keywordQParam,
      navigate,
      regDateQParam,
      rmTrBlack,
      rmTrBlackOnModify,
      searchTypeQParam,
      selectedList,
      titleQParam,
    ],
  );
  const countLink = useCallback(
    (e: any) => {
      actions.setAlignGear(true);
      rmTrBlack();
      rmTrBlackOnModify();
      applyMore();
      navigate(
        `?selected=${selectedListQParam}&title=${titleQParam}&count=${
          countQParam === 'desc' ? 'asc' : countQParam === 'asc' ? null : 'desc'
        }&regDate=${regDateQParam}&searchType=${searchTypeQParam}&keyword=${keywordQParam}`,
        { replace: true },
      );
    },
    [
      actions,
      applyMore,
      countQParam,
      keywordQParam,
      navigate,
      regDateQParam,
      rmTrBlack,
      rmTrBlackOnModify,
      searchTypeQParam,
      selectedListQParam,
      titleQParam,
    ],
  );
  const regDateLink = useCallback(
    (e: any) => {
      actions.setAlignGear(true);
      rmTrBlack();
      rmTrBlackOnModify();
      applyMore();
      navigate(
        `?selected=${selectedList.join(
          ',',
        )}&title=${titleQParam}&count=${countQParam}&regDate=${
          regDateQParam === 'desc'
            ? 'asc'
            : regDateQParam === 'asc'
            ? null
            : 'desc'
        }&searchType=${searchTypeQParam}&keyword=${keywordQParam}`,
      );
    },
    [
      actions,
      applyMore,
      countQParam,
      keywordQParam,
      navigate,
      regDateQParam,
      rmTrBlack,
      rmTrBlackOnModify,
      searchTypeQParam,
      selectedList,
      titleQParam,
    ],
  );

  const onChangeSearchType = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSearchType(e.target.value);
    },
    [],
  );

  const onChangeKeyword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      actions.setPrevtDupFromKeyword(searchInput!.value);
    },
    [actions, searchInput],
  );

  const onSelect = useCallback(() => {
    actions.setOnGlobalSearch(false);
    actions.setHashSelected(false);
    actions.setToolsSelected(false);
    applyMore();
    if (state.toggleSelected === true) {
      rmTrBlack();
      rmTrBlackOnModify();
      actions.setSelectedView(false);
      actions.setToggleSelected(false);
    } else if (state.toggleSelected === false) {
      actions.setSelectedView(true);
      actions.setToggleSelected(true);
      onSelectedList(state.selectedList);
      navigate(
        `/boards?selected=${state.selectedList}&title=${titleQParam}&count=${countQParam}&regDate=${regDateQParam}&searchType=${searchTypeQParam}&keyword=${state.prevtDupFromKeyword}`,
      );
    }
  }, [
    actions,
    applyMore,
    state.toggleSelected,
    state.selectedList,
    state.prevtDupFromKeyword,
    rmTrBlack,
    rmTrBlackOnModify,
    onSelectedList,
    navigate,
    titleQParam,
    countQParam,
    regDateQParam,
    searchTypeQParam,
  ]);
  const setBoardDefault = () => {
    //게시판 설정 최초 상태로 초기화
    // typeRef.current.value = 'All';
    // searchInput.value = '';
    // actions.setOnGlobalSearch(false);
    // actions.setToggleBackBtn(false);
    // actions.setCompleteOrModify(false);
    // actions.setBoardModifiable(false);
    // actions.setSelectedView(false);
    // actions.setHashSelected(false);
    // actions.setToolsSelected(false);
    // actions.setPrevtDupFromKeyword('');
    // actions.setToggleSelected(false);
    // const emptyArr = [] as any;
    // actions.setSelectedList(emptyArr);
    // actions.setSelectedListOthers(emptyArr);
    // rmTrBlack();
    // rmTrBlackOnModify();
    window.location.href =
      'http://oieho.netlify.com//boards?searchType=All&keyword=';
  };
  const showWriteForm = () => {
    const titleQParam = searchParams.get('title');
    const countQParam = searchParams.get('count');
    const regDateQParam = searchParams.get('regDate');
    const searchTypeQParam = searchParams.get('searchType');
    const keywordQParam = searchParams.get('keyword');
    setTimeout(() => {
      navigate(
        `boards/write?selected=${state.selectedList}&title=${titleQParam}&count=${countQParam}&regDate=${regDateQParam}&searchType=${searchTypeQParam}&keyword=${keywordQParam}`,
        {
          state: { searchType: null, keyword: null },
        },
      );
    }, 560);
  };
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();
        actions.setOnGlobalSearch(false);
        actions.setHashSelected(false);
        actions.setToolsSelected(false);
        actions.setSelectedList(selectedList);
        const encodedKeyword = encodeURIComponent(state.prevtDupFromKeyword);
        rmTrBlack();
        rmTrBlackOnModify();
        applyMore();

        navigate(
          `/boards?selected=${selectedList}&title=${titleQParam}&count=${countQParam}&regDate=${regDateQParam}&searchType=${
            typeRef.current.value
          }&keyword=${encodedKeyword.toString()}`,
        );
      } catch (e) {}
    },
    [
      actions,
      selectedList,
      state.prevtDupFromKeyword,
      rmTrBlack,
      rmTrBlackOnModify,
      applyMore,
      navigate,
      titleQParam,
      countQParam,
      regDateQParam,
    ],
  );
  return (
    <Wrapper>
      <BoardListBlock>
        <h2>
          <BoardTitle
            onClick={() => setBoardDefault()}
            alt="게시판 설정 초기화"
            title="게시판 설정 초기화"
            src={process.env.PUBLIC_URL + '/images/board/boardTit.png'}
          />
          <form onSubmit={onSubmit}>
            <SearchArea>
              <Sorting>
                Sort By Title :
                <SelectSort
                  id="searchFormType"
                  ref={typeRef}
                  onChange={onChangeSearchType as any}
                >
                  <Option value="All">All</Option>
                  <Option value="브로셔">Brochure</Option>
                  <Option value="로고">Logo</Option>
                  <Option value="포스터">Poster</Option>
                  <Option value="캐릭터">Character</Option>
                  <Option value="홈페이지">Homepage</Option>
                  <Option value="상세페이지">Detailed Page</Option>
                  <Option value="잡지">Magazine</Option>
                  <Option value="기타">etc</Option>
                </SelectSort>
              </Sorting>
              <SearchLine
                className={searchLineHover ? 'hoverSearchLine' : ''}
              />

              <Button
                type="submit"
                onClick={onChangeKeyword as any}
                title="검색"
              ></Button>
              <SearchInput
                id="searchInput"
                onFocus={() => setLine()}
                onBlur={() => setLine()}
              />
              {isAuthorized && myInfo?.roleType === 'ADMIN' && (
                <>
                  <AddCommentBtn
                    style={{
                      marginBottom: '-1.5em',
                      marginLeft: '9.87rem',
                    }}
                    onClick={() => {
                      actions.setHideEditorGear(false);
                      actions.setBoardModifiable(false);
                      actions.setBoardRemovable(false);
                      actions.setCompleteOrModify(false);
                      actions.setCompleteOrRemove(false);
                      showWriteForm();
                    }}
                  >
                    <span title="글 쓰기">+</span>
                  </AddCommentBtn>
                  <AddCommentBtn
                    style={{
                      marginBottom: '-1.5em',
                      marginLeft: '11.26rem',
                    }}
                    onClick={() => {
                      actions.setCompleteOrModify(
                        (prevValue: Boolean) => !prevValue,
                      );
                      actions.setBoardModifiable(
                        (prevValue: boolean) => !prevValue,
                      );
                      actions.setHideEditorGear(false); // 글 등록 후 수정을 누르면 수정 폼이 닫히는 현상을 해결
                      actions.setBoardRemovable(false);
                      actions.setCompleteOrRemove(false);
                      actions.setSelectedView(false);
                      actions.setToggleSelected(false);
                      actions.setSelectedList([]);
                      actions.setSelectedListOthers([]);
                      applyMore();
                    }}
                  >
                    <span
                      title="글 수정"
                      style={{
                        fontSize: '0.734rem',
                        fontWeight: 'bold',
                        left: '0.11rem',
                        bottom: '0.16rem',
                      }}
                    >
                      {state.completeOrModify === true ? (
                        <span
                          style={{
                            bottom: '-0.06rem',
                          }}
                          title="완료"
                        >
                          v
                        </span>
                      ) : (
                        <span title="글 수정">△</span>
                      )}
                    </span>
                  </AddCommentBtn>
                  <AddCommentBtn
                    style={{
                      marginBottom: '-1.5em',
                      marginLeft: '12.65rem',
                    }}
                    onClick={() => {
                      actions.setCompleteOrRemove(
                        (prevValue: Boolean) => !prevValue,
                      );
                      actions.setBoardRemovable(
                        (prevValue: boolean) => !prevValue,
                      );
                      actions.setBoardModifiable(false);
                      actions.setCompleteOrModify(false);
                      actions.setSelectedView(false);
                      actions.setToggleSelected(false);
                      actions.setSelectedList([]);
                      actions.setSelectedListOthers([]);
                      applyMore();
                    }}
                  >
                    <span
                      title="글 삭제"
                      style={{
                        left: '0.10rem',
                        bottom: '-0.02rem',
                      }}
                    >
                      {state.completeOrRemove === true ? (
                        <span
                          style={{
                            fontSize: '0.54rem',
                            fontWeight: 'bold',
                            right: '-0.01rem',
                            bottom: '0.20rem',
                          }}
                          title="완료"
                        >
                          V
                        </span>
                      ) : (
                        <span
                          style={{
                            fontSize: '1.31rem',
                            fontWeight: 'bold',
                            left: '0.19rem',
                            bottom: '-0.11rem',
                          }}
                          title="글 삭제"
                        >
                          -
                        </span>
                      )}
                    </span>
                  </AddCommentBtn>
                </>
              )}
            </SearchArea>
          </form>
        </h2>
        {boards && (
          <>
            <BoardTableHeader
              style={{ borderCollapse: 'collapse', borderSpacing: '0' }}
            >
              <thead>
                <BoardTableTitles>
                  <TitleTd className="tHeadTd1">
                    Total <TotalWorks>{boards.length}</TotalWorks>&nbsp;
                    <span onClick={titleLink}>
                      <TitleTit>
                        {titleQParam === 'desc'
                          ? titleTit + ' ↓'
                          : titleQParam === 'asc'
                          ? titleTit + ' ↑'
                          : titleTit}
                      </TitleTit>
                    </span>
                  </TitleTd>
                  <TitleTd className="tHeadTd2">
                    <span onClick={countLink}>
                      {countQParam === 'desc'
                        ? countTit + ' ↓'
                        : countQParam === 'asc'
                        ? countTit + ' ↑'
                        : countTit}
                    </span>
                  </TitleTd>
                  <TitleTd className="tHeadTd3">
                    <Select
                      onClick={() => {
                        if (state.toggleSelected === false) {
                          setTimeout(() => onSelect(), 800);
                        } else {
                          setTimeout(() => onSelect(), 0);
                        }
                      }}
                    >
                      {state.toggleSelected ? 'Selected' : 'Select'}
                    </Select>
                  </TitleTd>
                  <TitleTd className="tHeadTd4">
                    <span onClick={regDateLink}>
                      {regDateQParam === 'desc'
                        ? regDateTit + ' ↓'
                        : regDateQParam === 'asc'
                        ? regDateTit + ' ↑'
                        : regDateTit}
                    </span>
                  </TitleTd>
                </BoardTableTitles>
              </thead>
            </BoardTableHeader>
            <BoardTableBody>
              {!boards.length && (
                <tbody>
                  <tr>
                    <EmptyTd colSpan={4}>List is empty.</EmptyTd>
                  </tr>
                </tbody>
              )}
              {!!boards.length && (
                <tbody>
                  <tr>
                    <td>
                      <StyledList
                        className={'StyledList'}
                        width={815.18}
                        height={601.19}
                        rowHeight={82.01}
                        rowCount={boards.length}
                        overscanIndicesGetter={overscanIndicesGetter}
                        rowRenderer={rowRenderer}
                        style={{ outline: 'none' }}
                      />
                    </td>
                  </tr>
                </tbody>
              )}
            </BoardTableBody>
          </>
        )}
      </BoardListBlock>
    </Wrapper>
  );
};

export default React.memo(BoardList);
