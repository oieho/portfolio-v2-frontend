import styled, { keyframes } from 'styled-components';
import React, {
  useEffect,
  useContext,
  useRef,
  useState,
  useCallback,
  LegacyRef,
} from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MyInfo } from '../../App';
import { Board, Comment } from '../../App';
import Button from './button/Button';
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
const Content = styled.div`
  position: relative;
  left: -4.8rem;
  top: 1.92rem;
  background: #ffffff;
  opacity: 0.955;
  box-shadow: 0px 15px 25px -6px rgba(0, 0, 0, 0.03);
  border-radius: 1rem;
  width: 52.8rem;
  height: 44.927rem;
  border: 6px solid #000000;
  z-index: 2;
  cursor: pointer;
`;

const Description = styled.div`
  position: absolute;
  background: #f5f5f5;
  top: 13.31rem;
  right: 65.75rem;
  width: 16.63rem;
  height: 35.69rem;
  box-shadow: 0px 15px 25px -6px rgba(0, 0, 0, 0.03);
  border-radius: 1rem;
  font-size: 0.75rem;
  z-index: 2;
  transition: height 0.45s 0.3s ease-out;
`;
const Inputs = styled.ul`
  position: relative;
  list-style: none;
  padding: 0;
  left: 0.55rem;
`;
const InputLi = styled.li`
  position: relative;
  height: 3.23rem;
`;
const SubjectInput = styled.input`
  position: absolute;
  width: 15.5rem;
  line-height: 2rem;
  border: 1px solid #ededed;
  outline: none;
  padding: 0.4rem;
  background: #fff;
  border-radius: 1rem;
  z-index: 1;
  font-weight: 300;
`;
const TitleTit = styled.span`
  position: relative;
  top: 0.45rem;
  left: 0.85rem;
  z-index: 2;
  font-weight: 600;
  color: #000000;
  position: absolute;
`;

const TitleDesc = styled.span`
  width: 9.43rem;
  position: relative;
  top: 1.46rem;
  left: 0.85rem;
  z-index: 2;
  font-weight: 400;
  color: #a5a5a5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: absolute;
`;
const RegDateTit = styled.span`
  position: relative;
  top: 0.45rem;
  left: 10.42rem;
  z-index: 2;
  font-weight: 600;
  color: #000000;
  word-spacing: -0.1rem;
  position: absolute;
`;
const RegDateDesc = styled.span`
  position: relative;
  top: 1.46rem;
  left: 10.42rem;
  z-index: 2;
  font-weight: 400;
  color: #a5a5a5;

  position: absolute;
`;
const DescWrapper = styled.div`
  position: relative;
  width: 15.5rem;
  height: 10.2rem;
  border: 1px solid #ededed;
  outline: none;
  padding: 0.4rem;
  background: #ffffff;
  border-radius: 1rem;
`;
const DescTit = styled.span`
  position: absolute;
  top: 0.45rem;
  left: 0.73rem;
  z-index: 2;
  font-weight: 600;
  color: #000000;
  position: absolute;
`;
const DescTextarea = styled.textarea`
  position: relative;
  top: 1.13rem;
  left: 0.2rem;
  width: 14.5rem;
  height: 8.3rem;
  padding-right: 0.307rem;
  font-size: 0.73rem;
  color: #a5a5a5;
  background-color: #ffffff;
  line-height: 1.168rem;
  outline: none;
  border: none;
  resize: none;
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
const CommentWrapper = styled.div`
  position: relative;
  top: 7.43rem;
  width: 15.5rem;
  height: 20.4rem;
  border: 1px solid #dfdfdf;
  background: linear-gradient(
    to bottom,
    rgba(231, 233, 233),
    rgba(233, 231, 226)
  );
  outline: none;
  padding: 0.25rem;
  border-radius: 1rem;
  & div:nth-of-type(n + 2) {
    margin-top: 2.5rem;
    margin-bottom: 0.5rem;
  }
`;
const CommentScrollArea = styled.div`
  width: 99.4%;
  height: 100%;
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
const CommentDesc = styled.div`
  position: relative;
  float: right;
  padding: 0.5rem;
  margin: 0.1rem 0.33rem 0.1rem 0.1rem;
  border: 1px solid #e6eaea;
  width: 11.5rem;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 1rem;
  &.depthTrueLeft {
    background-color: rgba(255, 255, 255, 0.47);
    float: left;
    width: 10rem;
  }
  &.depthFalseLeft {
    float: left;
    width: 11.5rem;
  }
  &:nth-child(2n + 1) {
    margin-top: 0.2rem;
    margin-bottom: 0.5rem;
  }
`;
const CommentDesc2 = styled.div`
  position: relative;
  float: left;
  padding: 0.6rem;
  margin: 0.1rem;
  border: 1px solid #e6eaea;
  width: 11.5rem;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 1rem;
  &:nth-child(2n + 1) {
    margin-top: 0.19rem;
    margin-bottom: 0.5rem;
  }
  &.depthTrueRight {
    background-color: rgba(255, 255, 255, 0.47);
    float: right;
    width: 10rem;
  }
  &.depthFalseRight {
    float: right;
    width: 11.5rem;
  }
`;
const CommentDescUl = styled.ul`
  padding: 0 0 0 0.2rem;
  font-size: 0.73rem;
  line-height: 1.19rem;
  list-style: none;

  & li:nth-child(1) {
    width: 7.5rem;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  & li:nth-child(2) {
    color: #a5a5a5;
  }
  & li:nth-child(3) {
    position: relative;
    font-weight: 300;
  }
`;
const CommentDepthToLeft = styled.hr`
  background-image: url('/images/board/clampLineToLeft.png');
  background-size: cover;
  width: 0.688rem;
  height: 0.688rem;
  border: none;
  position: absolute;
  left: 10.4rem;
  top: 1.27rem;
`;
const CommentDepthToRight = styled.hr`
  background-image: url('/images/board/clampLineToRight.png');
  background-size: cover;
  width: 0.688rem;
  height: 0.688rem;
  border: none;
  position: absolute;
  right: 10.4rem;
  top: 1.27rem;
`;
const baloonVeryBad = keyframes`
  0%,100%{ transform:translateY(0) rotate(6deg);}
  20%{ transform:translateY(-15px) rotate(-8deg); }
`;
const baloonBad = keyframes`
  0%,100%{ transform:translateY(0) rotate(-6deg);}
  50%{ transform:translateY(-20px) rotate(8deg); }
`;
const baloonNormal = keyframes`
 0%,100%{ transform:translate(0, -10px) rotate(6eg);}
  70%{ transform:translate(-20px, 10px) rotate(-8deg); }
`;
const baloonGood = keyframes`
  0%,100%{ transform:translate(10px, -10px) rotate(-8eg);}
  50%{ transform:translate(-15px, 10px) rotate(10deg); }
`;
const baloonVeryGood = keyframes`
  0%,100%{ transform:translateY(0) rotate(6deg);}
  20%{ transform:translateY(-15px) rotate(-8deg); }
`;
const VeryBad = styled.hr`
  width: 2.16rem;
  height: 4.75rem;
  border: none;

  background-size: cover;

  &.veryBad {
    position: absolute;
    top: -3.3rem;
    right: -2.55rem;
    transform: rotate(-30deg);
    background-image: url('/images/board/baloons/veryBad.png');
    animation: ${baloonVeryBad} 6s ease-in-out infinite;
  }
  &.veryBad2 {
    position: absolute;
    top: -3.3rem;
    left: -2.4rem;
    transform: rotate(30deg);
    border: none;
    background-image: url('/images/board/baloons/veryBad.png');
    background-size: cover;
    animation: ${baloonVeryBad} 6s ease-in-out infinite;
  }
  &.veryBadDepthToLeft {
    position: absolute;
    top: -3.3rem;
    right: -3.9rem;
    transform: rotate(30deg);
    border: none;
    background-image: url('/images/board/baloons/veryBad.png');
    background-size: cover;
    animation: ${baloonVeryBad} 6s ease-in-out infinite;
  }
  &.veryBadDepthToRight {
    position: absolute;
    top: -3.3rem;
    left: -4.4rem;
    transform: rotate(30deg);
    border: none;
    background-image: url('/images/board/baloons/veryBad.png');
    background-size: cover;
    animation: ${baloonVeryBad} 6s ease-in-out infinite;
  }
`;
const Bad = styled.hr`
  width: 2.16rem;
  height: 4.75rem;
  &.bad {
    position: absolute;
    top: -3.3rem;
    right: -2.5rem;
    transform: rotate(-30deg);
    border: none;
    background-image: url('/images/board/baloons/bad.png');
    background-size: cover;
    animation: ${baloonBad} 6s ease-in-out infinite;
  }
  &.bad2 {
    position: absolute;
    top: -3.7rem;
    left: -2.46rem;
    transform: rotate(33deg);
    border: none;
    background-image: url('/images/board/baloons/bad.png');
    background-size: cover;
    animation: ${baloonBad} 6s ease-in-out infinite;
  }
  &.badDepthToLeft {
    position: absolute;
    top: -3.7rem;
    right: -3.96rem;
    transform: rotate(33deg);
    border: none;
    background-image: url('/images/board/baloons/bad.png');
    background-size: cover;
    animation: ${baloonBad} 6s ease-in-out infinite;
  }
  &.badDepthToRight {
    position: absolute;
    top: -3.7rem;
    left: -4.4rem;
    transform: rotate(33deg);
    border: none;
    background-image: url('/images/board/baloons/bad.png');
    background-size: cover;
    animation: ${baloonBad} 6s ease-in-out infinite;
  }
`;
const Normal = styled.hr`
  width: 2.16rem;
  height: 4.75rem;
  &.normal {
    position: absolute;
    top: -2.9rem;
    right: -3.15rem;
    border: none;
    background-image: url('/images/board/baloons/normal.png');
    background-size: cover;
    animation: ${baloonNormal} 6s ease-in-out infinite;
  }
  &.normal2 {
    position: absolute;
    top: -2.65rem;
    left: -2.95rem;
    transform: rotate(3deg);
    border: none;
    background-image: url('/images/board/baloons/normal.png');
    background-size: cover;
    animation: ${baloonNormal} 6s ease-in-out infinite;
  }
  &.normalDepthToLeft {
    position: absolute;
    top: -2.65rem;
    right: -4.45rem;
    transform: rotate(3deg);
    border: none;
    background-image: url('/images/board/baloons/normal.png');
    background-size: cover;
    animation: ${baloonNormal} 6s ease-in-out infinite;
  }
  &.normalDepthToRight {
    position: absolute;
    top: -2.65rem;
    left: -4.45rem;
    transform: rotate(3deg);
    border: none;
    background-image: url('/images/board/baloons/normal.png');
    background-size: cover;
    animation: ${baloonNormal} 6s ease-in-out infinite;
  }
`;
const Good = styled.hr`
  width: 2.16rem;
  height: 4.75rem;
  &.good {
    position: absolute;
    top: -3.2rem;
    right: -2.4rem;
    transform: rotate(-33deg);
    border: none;
    background-image: url('/images/board/baloons/good.png');
    background-size: cover;
    animation: ${baloonGood} 6s ease-in-out infinite;
  }
  &.good2 {
    position: absolute;
    top: -3.3rem;
    left: -2.5rem;
    transform: rotate(30deg);
    border: none;
    background-image: url('/images/board/baloons/good.png');
    background-size: cover;
    animation: ${baloonGood} 6s ease-in-out infinite;
  }
  &.goodDepthToLeft {
    position: absolute;
    top: -3.3rem;
    right: -3.9rem;
    transform: rotate(30deg);
    border: none;
    background-image: url('/images/board/baloons/good.png');
    background-size: cover;
    animation: ${baloonGood} 6s ease-in-out infinite;
  }
  &.goodDepthToRight {
    position: absolute;
    top: -3.3rem;
    left: -4.4rem;
    transform: rotate(30deg);
    border: none;
    background-image: url('/images/board/baloons/good.png');
    background-size: cover;
    animation: ${baloonGood} 6s ease-in-out infinite;
  }
`;
const VeryGood = styled.hr`
  width: 2.16rem;
  height: 4.75rem;
  &.veryGood {
    position: absolute;
    top: -3.2rem;
    right: -2.5rem;
    transform: rotate(-33deg);
    border: none;
    background-image: url('/images/board/baloons/veryGood.png');
    background-size: cover;
    animation: ${baloonVeryGood} 6s ease-in-out infinite;
  }
  &.veryGood2 {
    position: absolute;
    top: -3.2rem;
    left: -2.4rem;
    transform: rotate(30deg);
    border: none;
    background-image: url('/images/board/baloons/veryGood.png');
    background-size: cover;
    animation: ${baloonVeryGood} 6s ease-in-out infinite;
  }
  &.veryGoodDepthToLeft {
    position: absolute;
    top: -3.2rem;
    right: -3.9rem;
    transform: rotate(30deg);
    border: none;
    background-image: url('/images/board/baloons/veryGood.png');
    background-size: cover;
    animation: ${baloonVeryGood} 6s ease-in-out infinite;
  }
  &.veryGoodDepthToRight {
    position: absolute;
    top: -3.2rem;
    left: -4.4rem;
    transform: rotate(30deg);
    border: none;
    background-image: url('/images/board/baloons/veryGood.png');
    background-size: cover;
    animation: ${baloonVeryGood} 6s ease-in-out infinite;
  }
`;
const NoComment = styled.div`
  padding: 0.19rem 0 0 0.46rem;
  font-weight: 600;
  font-size: 0.75rem;
`;
const CoverBackBtn = styled.span`
  display: block;
  position: absolute;
  background-color: #afafaf;
  background-image: url('/images/coverBackBtnbg.png');
  width: 1.5rem;
  height: 3.6rem;
  right: -1.53rem;
  top: 4.487rem;
  z-index: 1;
`;
const AddCommentBtn = styled.span`
  position: absolute;
  display: inline-block;
  background-color: #000000;
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  width: 1.12rem;
  height: 1.12rem;
  border-radius: 50%;
  left: 0.27rem;
  bottom: 0.27rem;
  cursor: pointer;
  transform: rotate(0deg);
  z-index: 2;
  &:hover {
    @keyframes rotate_image {
      100% {
        transform: rotate(360deg);
      }
    }
    animation: rotate_image 2s linear infinite;
  }
  span {
    position: relative;
    bottom: 0.3rem;
    &:hover {
      color: greenyellow;
    }
    &:active {
      color: #ffffff;
    }
  }
`;
const ShowStarsBtn = styled.span`
  position: absolute;
  display: inline-block;
  background-color: #000000;
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  width: 1.12rem;
  height: 1.12rem;
  border-radius: 50%;
  left: 1.27rem;
  bottom: 0.27rem;
  cursor: pointer;
  transform: rotate(0deg);
  opacity: 0;
  transition: all 1s;
  z-index: 1;
  hr {
    position: relative;
    background-image: url('/images/board/starDefault.png');
    background-size: cover;
    border: none;
    width: 0.65rem;
    height: 0.65rem;
    right: 0.01rem;
    bottom: 0.32rem;
    &:hover {
      background-image: url('/images/board/starOvGreen.png');
      background-size: cover;

      @keyframes rotate_image {
        100% {
          transform: rotate(360deg);
        }
      }
      animation: rotate_image 2s linear infinite;
    }
    &:active {
      background-image: url('/images/board/starDefault.png');
    }
  }
`;
const AddCommentFormWrapper = styled.div`
  position: relative;
  width: 15.2rem;
`;
const AddCommentForm = styled.div`
  position: relative;
  background-color: #ffffff;
  width: 11.73rem;
  height: 3.36rem;
  right: 0.3rem;
  bottom: 1.8rem;
  border: 1px solid #ededed;
  outline: none;
  padding: 0.4rem;
  border-radius: 1rem;
  opacity: 0;
  transition: opacity 0.1s 1s;
`;
const StarWrapper = styled.span`
  position: absolute;
  top: 0.38rem;
  left: 0.9rem;
  opacity: 1;
  transition: opacity 0.5s;
  z-index: 1;
  hr {
    display: inline-block;
    background-image: url('/images/board/star.png');
    background-size: cover;
    border: none;
    cursor: pointer;
    width: 1.1rem;
    height: 0.98rem;
    margin-right: 0.07rem;
  }
  hr.hovered {
    background-image: url('/images/board/starDefault.png');
    background-size: cover;
    border: none;
  }
`;
const AddCommentTextarea = styled.textarea`
  position: relative;
  top: 0.15rem;
  left: 0.16rem;
  width: 10.55rem;
  height: 2.2rem;
  padding-right: 0.307rem;
  font-size: 0.73rem;
  color: #a5a5a5;
  background-color: #ffffff;
  line-height: 1.168rem;
  transition: opacity 0.3s 0.5s;
  opacity: 1;
  outline: none;
  border: none;
  resize: none;

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
const ScrollUpBtn = styled.span`
  position: absolute;
  display: inline-block;
  background-color: #000000;
  color: #ffffff;
  font-size: 1.1rem;
  text-align: center;
  width: 1.12rem;
  height: 1.12rem;
  border-radius: 50%;
  right: 1.085rem;
  bottom: 0.27rem;
  cursor: pointer;
  transform: rotate(0deg);
  transition: all 1s;
  z-index: 1;
  opacity: 0;
  hr {
    position: relative;
    background-image: url('/images/board/scrollUp.png');
    background-size: cover;
    border: none;
    width: 0.65rem;
    height: 0.65rem;
    right: 0.01rem;
    bottom: 0.32rem;
    &:hover {
      background-image: url('/images/board/scrollUpOv.png');
      background-size: cover;

      @keyframes upAndDown_image {
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
      animation: upAndDown_image 1.35s linear infinite;
    }
    &:active {
      background-image: url('/images/board/scrollUp.png');
    }
  }
`;
interface Props {
  readonly registerComment: (
    commentVal: string,
    selectedLook: number,
    wno: number,
    userNo: number,
  ) => any;
  readonly myInfo: MyInfo | null;
  readonly board: Board[] | any;
  readonly comment: Comment[] | any;
  readonly isLoading: boolean;
}
const ContentBody = ({
  registerComment,
  myInfo,
  board,
  comment,
  isLoading,
}: Props) => {
  const { actions, state } = useContext(MainContext);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const contentRef = useRef(null) as any;

  const [boardRegDateDays, setBoardRegDateDays] = useState() as any;
  const [toggleAddCommentForm, setToggleAddCommentForm] =
    useState<boolean>(true);
  const [star, setStar] = useState<number>(-3);
  const [commentVal, setCommentVal] = useState('');
  const [scrollDownGear, setScrollDownGear] = useState<boolean>(false);

  const descRef = useRef(null) as unknown as HTMLSpanElement &
    (LegacyRef<HTMLDivElement> | undefined) as any;
  const commentRef = useRef(null) as unknown as HTMLDivElement &
    (LegacyRef<HTMLDivElement> | undefined) as any;
  const addbtnRef = useRef(null) as unknown as HTMLSpanElement &
    (LegacyRef<HTMLDivElement> | undefined) as any;
  const selectStarBtnRef = useRef(null) as unknown as HTMLSpanElement &
    (LegacyRef<HTMLDivElement> | undefined) as any;
  const textareaRef = useRef(null) as unknown as HTMLSpanElement &
    (LegacyRef<HTMLDivElement> | undefined) as any;
  const scrollUpBtnRef = useRef(null) as unknown as HTMLSpanElement &
    (LegacyRef<HTMLDivElement> | undefined) as any;

  const hideContent = () => {
    const selectedQParam = searchParams.get('selected');
    const titleQParam = searchParams.get('title');
    const countQParam = searchParams.get('count');
    const regDateQParam = searchParams.get('regDate');
    const searchTypeQParam = searchParams.get('searchType');
    const keywordQParam = searchParams.get('keyword');
    contentRef.current.style.display = 'none';
    const saying = document.getElementById('saying');
    saying!.style.opacity = '1';
    saying!.style.transition = 'opacity 0.2s 0.75s ease-out';
    navigate(
      `/boards?selected=${selectedQParam}&title=${titleQParam}&count=${countQParam}&regDate=${regDateQParam}&searchType=${searchTypeQParam}&keyword=${keywordQParam}`,
    );
  };

  useEffect(() => {
    if (scrollDownGear === true) {
      commentRef.current.scrollTop = commentRef.current.scrollHeight;
    }
    actions.setZIdx(state.zIdx++);
    descRef.current.style.zIndex = state.zIdx;

    const convertDateForm = (newRegDate: any) => {
      if (!Array.isArray(newRegDate)) {
        return '';
      }

      const year = newRegDate[0];
      const month =
        newRegDate[1] < 10
          ? newRegDate[1].toString().padStart(2, '0')
          : newRegDate[1];
      const date =
        newRegDate[2] < 10
          ? newRegDate[2].toString().padStart(2, '0')
          : newRegDate[2];

      return year + '-' + month + '-' + date;
    };
    setBoardRegDateDays(convertDateForm(board.regDate));
  }, [actions, board.regDate, comment, scrollDownGear, state.zIdx]);

  const addCommentForm = document.getElementById('addCommentForm');
  const saying = document.getElementById('saying');
  const starWrapper = document.getElementById('starWrapper');

  const showAndHideCommentForm = (show: boolean) => {
    if (show === true) {
      setToggleAddCommentForm(false);
      saying!.style.transition = 'opacity 0.3s ease-in';
      saying!.style.opacity = '0';
      descRef.current.style.height = '39.36rem';
      addCommentForm!.style.transition = 'opacity 0.2s 0.6s';
      addCommentForm!.style.opacity = '1';
      starWrapper!.style.opacity = '1';
      starWrapper!.style.zIndex = '1';
      selectStarBtnRef.current.style.opacity = '1';
      selectStarBtnRef.current.style.left = '1.57rem';
      textareaRef.current.focus();
    } else {
      setToggleAddCommentForm(true);
      addCommentForm!.style.opacity = '0';
      addCommentForm!.style.transition = 'opacity 0.2s';
      descRef.current.style.height = '35.66rem';
      descRef.current.style.transition = 'height 0.45s 0.1s ease-in';
      addbtnRef.current.style.display = 'block';
      saying!.style.opacity = '1';
      saying!.style.transition = 'opacity 0.2s 1.15s ease-out';
      selectStarBtnRef.current.style.opacity = '0';
      selectStarBtnRef.current.style.left = '0';
    }
  };

  const controlTextArea = (e: Event) => {
    if (myInfo?.roleType !== 'USER' && myInfo?.roleType !== 'ADMIN') {
      e.preventDefault();
      alert('권한이 없습니다. 회원만 이용 가능합니다.');
    } else if (star >= -2 && star <= 2) {
    } else {
      e.preventDefault();
      alert('공감온도를 선택 후 입력바랍니다.');
    }
  };

  const selectStar = (starNum: number) => {
    const star = document.getElementsByClassName(
      'star',
    ) as HTMLCollectionOf<HTMLElement>;
    const starImages = [
      "url('/images/board/star.png')",
      "url('/images/board/starDefault.png')",
    ];
    for (var i = 0; i < star.length; i++) {
      const currStar = star[i];
      const currStarValue = i - 2;
      if (currStarValue <= starNum) {
        currStar.style.backgroundImage = starImages[1];
        switch (starNum) {
          case -2:
            setStar(-2);
            break;
          case -1:
            setStar(-1);
            break;
          case 0:
            setStar(0);
            break;
          case 1:
            setStar(1);
            break;
          case 2:
            setStar(2);
            break;
          default:
            break;
        }
      } else {
        currStar.style.backgroundImage = starImages[0];
      }
    }
    textareaRef.current.style.transition = ' opacity 0.3s 0.6s';

    textareaRef.current.style.opacity = '1';
    textareaRef.current.focus();
    setTimeout(() => {
      starWrapper!.style.opacity = '0';
      starWrapper!.style.zIndex = '0';
    }, 380);
  };
  const showStars = () => {
    starWrapper!.style.opacity = '1';
    starWrapper!.style.zIndex = '1';
    textareaRef.current.style.transition = ' opacity 0s 0s';
    textareaRef.current.style.opacity = '0';
  };
  const viewStars = () => {
    const stars = document.querySelectorAll('hr');

    function selectStar(num: number) {
      for (let i = 0; i < num; i++) {
        stars[i].classList.add('hovered');
      }

      for (let i = num; i < stars.length; i++) {
        stars[i].classList.remove('hovered');
      }
    }

    for (let i = 0; i < stars.length; i++) {
      stars[i].addEventListener('mouseover', () => selectStar(i + 1));
    }
  };
  const ifScrollingShowBtn = () => {
    scrollUpBtnRef.current.style.opacity = 1;
  };
  const scrollToTop = () => {
    scrollUpBtnRef.current.style.opacity = 0;
    commentRef.current.scrollTop = 0;
  };
  const onChangeContent = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCommentVal(e.target.value);
    },
    [],
  );
  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (myInfo?.roleType !== 'USER' && myInfo?.roleType !== 'ADMIN') {
        alert('회원만 이용 가능합니다.');
      } else if (commentVal.length === 0) {
        alert('빈 문자를 입력하셨습니다.');
        textareaRef.current.focus();
        return;
      }

      try {
        setScrollDownGear(true);
        registerComment(commentVal, star, board.wno, myInfo!.userNo);
        textareaRef.current.value = '';
        setCommentVal('');
      } catch (error) {
        console.error(error);
        setScrollDownGear(false);
        alert('댓글 등록에 실패하였습니다.');
      }
    },
    [board.wno, commentVal, myInfo, registerComment, star],
  );
  return (
    <Wrapper>
      <Content
        title="클릭 후 닫기"
        ref={contentRef}
        onClick={() => hideContent()}
      >
        {state.zIdx}
      </Content>

      <Description id="addComment" ref={descRef}>
        <Inputs>
          <InputLi>
            <TitleTit>TITLE</TitleTit>
            <TitleDesc>{board.title}</TitleDesc>
            <RegDateTit>REG. DATE</RegDateTit>
            <RegDateDesc>{boardRegDateDays}</RegDateDesc>
            <SubjectInput
              maxLength={30}
              name="title"
              type="text"
              autoComplete="title"
              readOnly
              disabled
            />
          </InputLi>
          <InputLi>
            <DescWrapper>
              <DescTit>DESCRIPTION</DescTit>
              <DescTextarea value={board.description} readOnly disabled />
            </DescWrapper>
          </InputLi>
          <InputLi>
            <CommentWrapper>
              <CommentScrollArea
                onScroll={ifScrollingShowBtn}
                id="scrollArea"
                ref={commentRef}
              >
                {comment.length ? (
                  comment.map((commentItem: any, index: number) => {
                    const year = parseInt(commentItem.regDate[0]);
                    const month =
                      parseInt(commentItem.regDate[1]) < 10
                        ? commentItem.regDate[1].toString().padStart(2, '0')
                        : commentItem.regDate[1];
                    const day =
                      parseInt(commentItem.regDate[2]) < 10
                        ? commentItem.regDate[2].toString().padStart(2, '0')
                        : commentItem.regDate[2];
                    const hours =
                      parseInt(commentItem.regDate[3]) < 10
                        ? commentItem.regDate[3].toString().padStart(2, '0')
                        : commentItem.regDate[3];
                    var minutes =
                      parseInt(commentItem.regDate[4]) < 10
                        ? commentItem.regDate[4].toString().padStart(2, '0')
                        : commentItem.regDate[4];
                    var seconds =
                      parseInt(commentItem.regDate[5]) < 10
                        ? commentItem.regDate[5].toString().padStart(2, '0')
                        : commentItem.regDate[5];
                    if (typeof commentItem.regDate[5] === 'undefined') {
                      seconds = '00';
                    } else if (typeof commentItem.regDate[4] === 'undefined') {
                      minutes = '00';
                    }
                    const regdate =
                      year +
                      '-' +
                      month +
                      '-' +
                      day +
                      ' ' +
                      hours +
                      ':' +
                      minutes +
                      ':' +
                      seconds;
                    return (
                      <div key={index}>
                        {index % 2 === 0 ? (
                          <>
                            {commentItem.depth === 1 ? (
                              <>
                                <CommentDesc className="depthTrueLeft">
                                  <CommentDepthToLeft />
                                  <CommentDescUl>
                                    <li>
                                      {commentItem.userName === null
                                        ? '탈퇴한 회원'
                                        : commentItem.userName}
                                    </li>
                                    <li>{commentItem.text}</li>
                                    <li>
                                      {regdate}
                                      {commentItem.face === -2 && (
                                        <VeryBad className="veryBadDepthToLeft" />
                                      )}
                                      {commentItem.face === -1 && (
                                        <Bad className="badDepthToLeft" />
                                      )}
                                      {commentItem.face === 0 && (
                                        <Normal className="normalDepthToLeft" />
                                      )}
                                      {commentItem.face === 1 && (
                                        <Good className="goodDepthToLeft" />
                                      )}
                                      {commentItem.face === 2 && (
                                        <VeryGood className="veryGoodDepthToLeft" />
                                      )}
                                    </li>
                                  </CommentDescUl>
                                </CommentDesc>
                              </>
                            ) : (
                              <CommentDesc className="depthFalseLeft">
                                <CommentDescUl>
                                  <li>
                                    {commentItem.userName === null
                                      ? '탈퇴한 회원'
                                      : commentItem.userName}
                                  </li>
                                  <li>{commentItem.text}</li>
                                  <li>
                                    {regdate}
                                    {commentItem.face === -2 && (
                                      <VeryBad className="veryBad" />
                                    )}
                                    {commentItem.face === -1 && (
                                      <Bad className="bad" />
                                    )}
                                    {commentItem.face === 0 && (
                                      <Normal className="normal" />
                                    )}
                                    {commentItem.face === 1 && (
                                      <Good className="good" />
                                    )}
                                    {commentItem.face === 2 && (
                                      <VeryGood className="veryGood" />
                                    )}
                                  </li>
                                </CommentDescUl>
                              </CommentDesc>
                            )}
                          </>
                        ) : (
                          <>
                            {commentItem.depth === 1 ? (
                              <>
                                <CommentDesc2 className="depthTrueRight">
                                  <CommentDepthToRight />

                                  <CommentDescUl>
                                    <li>{commentItem.userName}</li>
                                    <li>{commentItem.text}</li>
                                    <li>
                                      {regdate}
                                      {commentItem.face === -2 && (
                                        <VeryBad className="veryBadDepthToRight" />
                                      )}
                                      {commentItem.face === -1 && (
                                        <Bad className="badDepthToRight" />
                                      )}
                                      {commentItem.face === 0 && (
                                        <Normal className="normalDepthToRight" />
                                      )}
                                      {commentItem.face === 1 && (
                                        <Good className="goodDepthToRight" />
                                      )}
                                      {commentItem.face === 2 && (
                                        <VeryGood className="veryGoodDepthToRight" />
                                      )}
                                    </li>
                                  </CommentDescUl>
                                </CommentDesc2>
                              </>
                            ) : (
                              <CommentDesc2 className="depthFalseRight">
                                <CommentDescUl>
                                  <li>{commentItem.userName}</li>
                                  <li>{commentItem.text}</li>
                                  <li>
                                    {regdate}
                                    {commentItem.face === -2 && (
                                      <VeryBad className="veryBad2" />
                                    )}
                                    {commentItem.face === -1 && (
                                      <Bad className="bad2" />
                                    )}
                                    {commentItem.face === 0 && (
                                      <Normal className="normal2" />
                                    )}
                                    {commentItem.face === 1 && (
                                      <Good className="good2" />
                                    )}
                                    {commentItem.face === 2 && (
                                      <VeryGood className="veryGood2" />
                                    )}
                                  </li>
                                </CommentDescUl>
                              </CommentDesc2>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <NoComment>Comment is empty.</NoComment>
                )}
                {toggleAddCommentForm === true ? (
                  <AddCommentBtn
                    ref={addbtnRef}
                    onClick={() => {
                      showAndHideCommentForm(true);
                    }}
                  >
                    <span>+</span>
                  </AddCommentBtn>
                ) : (
                  <AddCommentBtn
                    ref={addbtnRef}
                    onClick={() => {
                      showAndHideCommentForm(false);
                    }}
                  >
                    <span>-</span>
                  </AddCommentBtn>
                )}
                {myInfo?.roleType !== 'USER' && myInfo?.roleType !== 'ADMIN' ? (
                  <></>
                ) : (
                  <ShowStarsBtn ref={selectStarBtnRef} onClick={showStars}>
                    <hr />
                  </ShowStarsBtn>
                )}
                <ScrollUpBtn ref={scrollUpBtnRef} onClick={scrollToTop}>
                  <hr />
                </ScrollUpBtn>
              </CommentScrollArea>
              <AddCommentFormWrapper>
                <AddCommentForm id="addCommentForm">
                  {myInfo?.roleType !== 'USER' &&
                  myInfo?.roleType !== 'ADMIN' ? (
                    <></>
                  ) : (
                    <StarWrapper id="starWrapper">
                      <hr
                        className="star"
                        onClick={() => selectStar(-2)}
                        onMouseOver={() => viewStars()}
                        title="매우 나쁨"
                      />
                      <hr
                        className="star"
                        onClick={() => selectStar(-1)}
                        onMouseOver={() => viewStars()}
                        title="나쁨"
                      />
                      <hr
                        className="star"
                        onClick={() => selectStar(0)}
                        onMouseOver={() => viewStars()}
                        title="보통"
                      />
                      <hr
                        className="star"
                        onClick={() => selectStar(1)}
                        onMouseOver={() => viewStars()}
                        title="좋음"
                      />
                      <hr
                        className="star"
                        onClick={() => selectStar(2)}
                        onMouseOver={() => viewStars()}
                        title="매우좋음"
                      />
                    </StarWrapper>
                  )}
                  {myInfo?.roleType !== 'USER' &&
                  myInfo?.roleType !== 'ADMIN' ? (
                    <form method="post" onSubmit={onSubmit}>
                      <AddCommentTextarea
                        placeholder="댓글 등록은 회원만 이용 가능합니다."
                        ref={textareaRef}
                        value={commentVal}
                        onChange={onChangeContent}
                        onKeyPress={(e: any) => controlTextArea(e)}
                        disabled
                        readOnly
                      />
                      <Button
                        style={{
                          width: `3.53rem`,
                          height: `3.28rem`,
                          left: `11.9rem`,
                          bottom: `2.77rem`,
                          paddingTop: `0.01rem`,
                          position: `relative`,
                        }}
                      >
                        댓글 등록
                      </Button>
                    </form>
                  ) : (
                    <form method="post" onSubmit={onSubmit}>
                      <AddCommentTextarea
                        ref={textareaRef}
                        onChange={onChangeContent}
                        onKeyPress={(e: any) => controlTextArea(e)}
                      />
                      <Button
                        style={{
                          width: `3.53rem`,
                          height: `3.28rem`,
                          left: `11.9rem`,
                          bottom: `2.77rem`,
                          paddingTop: `0.01rem`,
                          position: `relative`,
                        }}
                      >
                        댓글 등록
                      </Button>
                    </form>
                  )}
                </AddCommentForm>
              </AddCommentFormWrapper>
            </CommentWrapper>
          </InputLi>
        </Inputs>
        <CoverBackBtn />
      </Description>
    </Wrapper>
  );
};

export default ContentBody;
