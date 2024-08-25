import styled, { keyframes } from 'styled-components';
import React, {
  useState,
  useLayoutEffect,
  useEffect,
  useContext,
  useRef,
} from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Board } from '../../App';
import { MainContext } from '../../pages/Main';
import CloseBtn from './button/AddButton';
import MiniBtn from './button/AddButton';
import 'suneditor/dist/css/suneditor.min.css';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

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
const OuterWrapper = styled.div`
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
const ContentWrapper = styled.div`
  position: relative;
  left: -4.8rem;
  top: 1.92rem;
  box-shadow: 0px 15px 25px -6px rgba(0, 0, 0, 0.33);
  border-radius: 1rem;
  width: 52.8rem;
  height: 44.92rem;
  border: 0.375rem solid #000000;
  z-index: 2;
  overflow: hidden;
`;
const Content = styled.div`
  position: relative;
  font-size: 0.8rem;
  font-weight: 350;
  line-height: 168%;
  letter-spacing: 0.018rem;
  top: -0.0319rem;
  left: -0.04rem;
  background: rgba(255, 255, 255, 0.98);
  width: 52.1rem;
  height: 44.2506rem;
  z-index: 2;
  overflow: hidden;
  img {
    opacity: 1;
  }
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #000;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #444;
  }
  ::-webkit-scrollbar-thumb:active {
    background: #000;
  }
`;

const LoadingMessage = styled.div`
  position: absolute;
  top: calc(50% - 0.2125rem);
  left: 50%;
  transform: translate(-50%, -50%);
  color: #000;
  font-size: 0.85rem;
  font-weight: bold;
`;

const LoadingText = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  display: inline;
  position: relative;
`;

const DotContainer = styled.div`
  display: flex;
  width: 100%; // 컨테이너의 너비를 전체로 설정
  overflow: hidden;
`;

const dotSequence = keyframes`
  0% {
    opacity: .75;
  }
  50% {
    opacity: 1;
  }
  75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0;
  }
`;

const Dot = styled.span<{ index: number }>`
  display: inline-block;
  width: 0.4rem;
  height: 0.4rem;
  opacity: 0;
  background: black;
  border-radius: 50%;
  margin-right: 0.37em;
  position: relative;
  animation: ${dotSequence} 1s ease-out infinite;
  animation-delay: ${({ index }) => index * 0.1}s;
`;

interface Props {
  readonly board: Board[] | any;
}
const ContentBody = ({ board }: Props) => {
  const { actions, state } = useContext(MainContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBoardsBySorting(sortParams);
  }, []);

  const createMarkup = () => {
    return { __html: board.portfolioContent };
  };
  const navigate = useNavigate();
  const [pageTitle, setPageTitle] = useState('Default Title');
  const [boards, setBoards] = useState<any>([]);

  const { wno } = useParams<{ wno: any }>();
  const [searchParams] = useSearchParams();
  const titleQParam = searchParams.get('title');
  const countQParam = searchParams.get('count');
  const regDateQParam = searchParams.get('regDate');
  const searchTypeQParam = searchParams.get('searchType');
  const keywordQParam = searchParams.get('keyword');
  const selectedQParam = searchParams.get('selected');
  const toolOrHashTagQParam = searchParams.get('toolOrHashTag');
  const isModifiedQParam = searchParams.get('isModified');
  const editorImages = document.querySelectorAll(
    '.sun-editor-editable .se-image-container a img',
  );
  editorImages.forEach((image: any) => {
    image.style.outline = 'none';
  });
  const contentRef = useRef(null) as any;
  const sortParams = {
    wno: wno - 1,
    titleQParam,
    countQParam,
    regDateQParam,
    searchTypeQParam,
    keywordQParam,
    selectedQParam,
    toolOrHashTagQParam,
    isModifiedQParam,
  };

  useLayoutEffect(() => {
    setPageTitle(`${board.title}`);
  }, [board.title]);

  const fetchBoardsBySorting = async (sortParams: any) => {
    try {
      const response = await axios.get('/boards/prevnextImgs', {
        params: {
          searchType: sortParams.searchTypeQParam,
          keyword: sortParams.keywordQParam,
          title: sortParams.titleQParam,
          count: sortParams.countQParam,
          regDate: sortParams.regDateQParam,
          selected: null ? state.maxWno : sortParams.selectedQParam,
          toolOrHashTag: sortParams.toolOrHashTagQParam,
          isModified: sortParams.isModifiedQParam,
        },
      });
      setBoards(response.data);
    } catch (error) {
      console.error('Error fetching boards:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };
  const navigateToPrevBoard = async (currentWno: number, sortParams: any) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    actions.setViewSelectedIndexGear(true);
    actions.setModifySelectedIndex(-1);

    if (boards.length <= 0) {
      setLoading(false);
      return alert('이전 글이 없습니다.');
    }

    const minWno = boards.reduce(
      (min: number, board: any) => Math.min(min, board.workBoard.wno),
      Number.MIN_VALUE,
    );

    if (state.alignGear === true) {
      let wnoArray: number[] = boards.map((board: any) => board.workBoard.wno);
      console.log(wnoArray);

      const currentIndex = wnoArray.indexOf(currentWno + 1);
      let prevWno = wnoArray[currentIndex - 1];

      while (prevWno !== undefined) {
        const exists = boards.some(
          (board: any) => board.workBoard.wno === prevWno,
        );
        if (exists) {
          actions.setViewSelectedIndex(prevWno);
          if (state.selectedView === true) {
            navigate(
              `/boards/view/${prevWno}?selected=${state.selectedList}&title=${titleQParam}&count=${countQParam}&regDate=${regDateQParam}&searchType=${searchTypeQParam}&keyword=${keywordQParam}&toolOrHashTag=${toolOrHashTagQParam}`,
            );
          } else {
            navigate(
              `/boards/view/${prevWno}?&title=${titleQParam}&count=${countQParam}&regDate=${regDateQParam}&searchType=${searchTypeQParam}&keyword=${keywordQParam}&toolOrHashTag=${toolOrHashTagQParam}`,
            );
          }
          setLoading(false);
          return;
        } else {
          let newIdx = currentIndex - 1;
          prevWno = wnoArray[newIdx];
        }
      }
    } else {
      let prevWno = currentWno;

      while (prevWno >= minWno) {
        const exists = boards.some(
          (board: any) => board.workBoard.wno === prevWno,
        );
        if (exists) {
          actions.setViewSelectedIndex(prevWno);
          if (state.selectedView === true) {
            navigate(
              `/boards/view/${prevWno}?selected=${state.selectedList}&title=${titleQParam}&count=${countQParam}&regDate=${regDateQParam}&searchType=${searchTypeQParam}&keyword=${keywordQParam}&toolOrHashTag=${toolOrHashTagQParam}`,
            );
          } else {
            navigate(
              `/boards/view/${prevWno}?&title=${titleQParam}&count=${countQParam}&regDate=${regDateQParam}&searchType=${searchTypeQParam}&keyword=${keywordQParam}&toolOrHashTag=${toolOrHashTagQParam}`,
            );
          }
          setLoading(false);
          return;
        } else {
          prevWno--;
        }
      }
    }

    setLoading(false);
    alert('이전 글이 없습니다.');
  };

  const navigateToNextBoard = async (currentWno: number, sortParams: any) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    actions.setViewSelectedIndexGear(true);
    actions.setModifySelectedIndex(-1);
    if (boards.length === 0) {
      setLoading(false);
      return alert('다음 글이 없습니다.');
    }

    const maxWno = boards.reduce(
      (max: number, board: any) => Math.max(max, board.workBoard.wno),
      Number.MIN_VALUE,
    );

    if (state.alignGear === true) {
      let wnoArray: number[] = [];
      wnoArray = boards.map((board: any) => board.workBoard.wno);

      const currentIndex = wnoArray.indexOf(currentWno - 1);

      let nextWno = wnoArray[currentIndex + 1];

      while (nextWno !== undefined) {
        const exists = boards.some(
          (board: any) => board.workBoard.wno === nextWno,
        );
        console.log(nextWno);
        if (exists) {
          actions.setViewSelectedIndex(nextWno);
          if (state.selectedView === true) {
            navigate(
              `/boards/view/${nextWno}?selected=${state.selectedList}&title=${titleQParam}&count=${countQParam}&regDate=${regDateQParam}&searchType=${searchTypeQParam}&keyword=${keywordQParam}&toolOrHashTag=${toolOrHashTagQParam}`,
              {
                state: { searchType: null, keyword: null },
              },
            );
          } else {
            navigate(
              `/boards/view/${nextWno}?&title=${titleQParam}&count=${countQParam}&regDate=${regDateQParam}&searchType=${searchTypeQParam}&keyword=${keywordQParam}&toolOrHashTag=${toolOrHashTagQParam}`,
              {
                state: { searchType: null, keyword: null },
              },
            );
          }
          setLoading(false);
          return;
        } else {
          let newIdx = currentIndex + 1;
          nextWno = wnoArray[newIdx];
        }
      }
    } else {
      let nextWno = currentWno;

      while (nextWno <= maxWno) {
        const exists = boards.some(
          (board: any) => board.workBoard.wno === nextWno,
        );
        if (exists) {
          actions.setViewSelectedIndex(nextWno);
          if (state.selectedView === true) {
            navigate(
              `/boards/view/${nextWno}?selected=${state.selectedList}&title=${titleQParam}&count=${countQParam}&regDate=${regDateQParam}&searchType=${searchTypeQParam}&keyword=${keywordQParam}&toolOrHashTag=${toolOrHashTagQParam}`,
              {
                state: { searchType: null, keyword: null },
              },
            );
          } else {
            navigate(
              `/boards/view/${nextWno}?&title=${titleQParam}&count=${countQParam}&regDate=${regDateQParam}&searchType=${searchTypeQParam}&keyword=${keywordQParam}&toolOrHashTag=${toolOrHashTagQParam}`,
              {
                state: { searchType: null, keyword: null },
              },
            );
          }
          setLoading(false);
          return;
        } else {
          nextWno++;
        }
      }
    }
    setLoading(false);
    alert('다음 글이 없습니다.');
  };

  const handleMouseDown = (event: Event) => {
    event.preventDefault();
  };

  const hideContent = () => {
    setTimeout(() => {
      actions.setToggleBackBtn(false);
    }, 700);

    const selectedQParam = searchParams.get('selected');
    const titleQParam = searchParams.get('title');
    const countQParam = searchParams.get('count');
    const regDateQParam = searchParams.get('regDate');
    const searchTypeQParam = searchParams.get('searchType');
    const keywordQParam = searchParams.get('keyword');

    if (contentRef.current) {
      contentRef.current.style.display = 'none';
    }

    const saying = document.getElementById('saying');
    saying!.style.opacity = '1';
    saying!.style.transition = 'opacity 0.2s 0.75s ease-out';

    navigate(
      `/boards?selected=${selectedQParam}&title=${titleQParam}&count=${countQParam}&regDate=${regDateQParam}&searchType=${searchTypeQParam}&keyword=${keywordQParam}&toolOrHashTag=${toolOrHashTagQParam}`,
    );
  };

  return (
    <>
      <Helmet>
        <title>OIEHO - [{pageTitle}]</title>
      </Helmet>
      <Wrapper>
        <OuterWrapper onClick={() => hideContent()} title="보기 폼 닫기" />
        <ContentWrapper>
          <MiniBtn
            style={{
              top: '0.4rem',
              left: '47.28rem',
              zIndex: '3',
            }}
            onClick={() =>
              navigateToPrevBoard(board.wno - 1, {
                titleQParam,
                countQParam,
                regDateQParam,
                searchTypeQParam,
                keywordQParam,
                toolOrHashTagQParam,
              })
            }
            onMouseDown={handleMouseDown}
          >
            <span title="Prev">&lt;</span>
          </MiniBtn>
          <MiniBtn
            style={{
              top: '0.4rem',
              left: '48.68rem',
              zIndex: '3',
            }}
            onClick={() =>
              navigateToNextBoard(board.wno + 1, {
                titleQParam,
                countQParam,
                regDateQParam,
                searchTypeQParam,
                keywordQParam,
                toolOrHashTagQParam,
              })
            }
            onMouseDown={handleMouseDown}
          >
            <span title="Next">&gt;</span>
          </MiniBtn>
          <CloseBtn
            style={{
              backgroundColor: '#ff0b0b',
              top: '0.4rem',
              left: '50.04rem',
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
          </CloseBtn>
          {loading ? (
            <Content>
              <LoadingMessage>
                <LoadingText>
                  <DotContainer>
                    {[...Array(5)].map((_, index) => (
                      <Dot key={index} index={index} />
                    ))}
                  </DotContainer>
                </LoadingText>
              </LoadingMessage>
            </Content>
          ) : (
            <Content
              ref={contentRef}
              className="sun-editor-editable"
              dangerouslySetInnerHTML={createMarkup()}
            ></Content>
          )}
        </ContentWrapper>
      </Wrapper>
    </>
  );
};

export default ContentBody;
