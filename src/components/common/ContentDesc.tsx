import styled, { keyframes } from 'styled-components';
import {
  useEffect,
  useRef,
  LegacyRef,
  useContext,
  useState,
  useCallback,
} from 'react';
import { useDispatch } from 'react-redux';

import { MyInfo } from '../../App';
import { Board, Comment } from '../../App';
import { MainContext } from '../../pages/Main';
import Button from './button/Button';
import AddCommentBtn from './button/AddButton';

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Description = styled.div`
  position: absolute;
  background: #f5f5f5;
  top: -20.54rem;
  left: 22.28rem;
  width: 16.64rem;
  height: 35.66rem;
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
  top: 1.5rem;
  left: 0.85rem;
  z-index: 2;
  font-size: 0.72rem;
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
  top: 1.47rem;
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
  font-size: 0.72rem;
  color: #a5a5a5;
  background-color: #ffffff;
  line-height: 1.168rem;
  outline: none;
  border: none;
  resize: none;
  z-index: 1;
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
    background-color: rgba(255, 255, 255, 0.39);
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
  padding: 0.5rem;
  margin: 0.1rem 0.33rem 0.1rem 0.1rem;
  border: 1px solid #e6eaea;
  width: 11.5rem;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 1rem;
  &:nth-child(2n + 1) {
    margin-top: 0.19rem;
    margin-bottom: 0.5rem;
  }
  &.depthTrueRight {
    background-color: rgba(255, 255, 255, 0.39);
    float: right;
    width: 10rem;
  }
  &.depthFalseRight {
    float: right;
    width: 11.5rem;
  }
`;

const rightToLeft = keyframes`
0%{
    right: -14.126rem;
}
  100% {
    right: 0rem;
  }
`;
const leftToRight = keyframes`
0%{
    left: -14.126rem;
}
  100% {
    left: 0rem;
  }
`;
const CommentDescOnModifyCompleted = styled.div`
  position: relative;
  float: right;

  animation: ${rightToLeft} 2s 0.25s ease-in-out 1;
  padding: 0.5rem;
  margin: 0.1rem 0.33rem 0.1rem 0.1rem;
  width: 11.5rem;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 1rem;
  &.depthTrueLeft {
    background-color: rgba(255, 255, 255, 0.39);
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
const CommentDescOnReplyCompleted = styled.div`
  position: relative;
  float: right;

  animation: ${rightToLeft} 2s 0.25s ease-in-out 1;
  padding: 0.5rem;
  margin: 0.1rem 0.33rem 0.1rem 0.1rem;
  width: 11.5rem;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 1rem;
  &.depthTrueLeft {
    background-color: rgba(255, 255, 255, 0.39);
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
const CommentDescOnModifyCompletedRight = styled.div`
  position: relative;
  float: left;

  animation: ${leftToRight} 2s 0.25s ease-in-out 1;
  padding: 0.5rem;
  margin: 0.1rem 0.33rem 0.1rem 0.1rem;
  width: 11.5rem;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 1rem;
  &.depthTrueRight {
    background-color: rgba(255, 255, 255, 0.39);
    float: right;
    width: 10rem;
  }
  &.depthFalseRight {
    float: right;
    width: 11.5rem;
  }
  &:nth-child(2n + 1) {
    margin-top: 0.2rem;
    margin-bottom: 0.5rem;
  }
`;
const CommentDescOnReplyCompletedRight = styled.div`
  position: relative;
  float: left;

  animation: ${leftToRight} 2s 0.25s ease-in-out 1;
  padding: 0.5rem;
  margin: 0.1rem 0.33rem 0.1rem 0.1rem;
  width: 11.5rem;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 1rem;
  &.depthTrueRight {
    background-color: rgba(255, 255, 255, 0.39);
    float: right;
    width: 10rem;
  }
  &.depthFalseRight {
    float: right;
    width: 11.5rem;
  }
  &:nth-child(2n + 1) {
    margin-top: 0.2rem;
    margin-bottom: 0.5rem;
  }
`;
const CommentBtns = styled.span`
  position: absolute;
  height: 0.7rem;
  right: 0.38rem;
  top: 0.37rem;
  width: 100%;
  text-align: right;
  z-index: 2;

  span[title='답글'] {
    position: relative;
    display: inline-block;
    width: 0.7rem;
    height: 0.7rem;
    vertical-align: top;
    border-radius: 50%;
    background: #000;
    cursor: pointer;

    &:hover > hr {
      width: 0.36525rem;
      height: 0.28rem;
      background-image: url('/images/board/commentReplyBtnOv.png');
    }
    &:active > hr {
      width: 0.36525rem;
      height: 0.28rem;
      background-image: url('/images/board/commentReplyBtn.png');
    }
    hr {
      position: relative;
      background-image: url('/images/board/commentReplyBtn.png');
      background-size: cover;
      border: none;
      width: 0.36525rem;
      height: 0.28rem;
      left: 0.04rem;
      bottom: 0.16rem;
    }
  }
  span[title='수정'] {
    position: relative;
    display: inline-block;
    width: 0.7rem;
    height: 0.7rem;
    bottom: 0rem;
    margin-left: 0.1373rem;

    border-radius: 50%;
    border: none;
    background: #000;
    cursor: pointer;

    &:hover > hr {
      width: 0.4295rem;
      height: 0.3693rem;
      background-image: url('/images/board/commentModifyBtnOv.png');
    }
    &:active > hr {
      width: 0.4295rem;
      height: 0.3693rem;
      background-image: url('/images/board/commentModifyBtn.png');
    }
    hr {
      position: relative;
      width: 0.4295rem;
      height: 0.3693rem;
      bottom: 0.24rem;
      right: 0.019rem;
      background-image: url('/images/board/commentModifyBtn.png');
      background-size: cover;
      border: none;
    }
  }
  span[title='공감온도'] {
    position: relative;
    display: inline-block;
    width: 0.7rem;
    height: 0.7rem;
    margin-left: 0.1373rem;
    border-radius: 50%;
    border: none;
    background: #000;
    cursor: pointer;
    &:hover > hr {
      width: 0.53rem;
      height: 0.46rem;
      background-image: url('/images/board/starOvGreen.png');
    }
    &:active > hr {
      width: 0.53rem;
      height: 0.46rem;
      background-image: url('/images/board/starDefault.png');
    }
    hr {
      position: relative;
      width: 0.53rem;
      height: 0.46rem;
      top: -0.25rem;
      left: 0.03rem;
      background-image: url('/images/board/starDefault.png');
      background-size: cover;
      border: none;
    }
  }
  span[title='완료'] {
    position: relative;
    display: inline-block;
    vertical-align: top;
    width: 0.7rem;
    height: 0.7rem;
    margin-left: 0.1373rem;
    border-radius: 50%;
    border: none;
    background: #000;
    cursor: pointer;

    &:hover > hr {
      width: 0.39rem;
      height: 0.32rem;
      background-image: url('/images/board/commentCheckBtnOv.png');
    }
    &:active > hr {
      width: 0.39rem;
      height: 0.32rem;
      background-image: url('/images/board/commentCheckBtn.png');
    }
    hr {
      position: relative;
      width: 0.39rem;
      height: 0.32rem;
      bottom: 0.16rem;
      left: -0.005rem;
      background-image: url('/images/board/commentCheckBtn.png');
      background-size: cover;
      border: none;
    }
  }
  span[title='삭제'] {
    position: relative;
    display: inline-block;
    text-align: center;
    vertical-align: top;
    margin: 0 0 0 0.1373rem;
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 50%;
    border: none;
    background-image: radial-gradient(circle, #ff0000, #ff628e);
    background-size: 150% 150%; /* scale을 2배로 조정함 */
    cursor: pointer;
    &:hover > hr {
      width: 0.3815rem;
      height: 0.4rem;
      background-image: url('/images/board/commentDeleteBtnOv.png');
    }
    &:active > hr {
      width: 0.3815rem;
      height: 0.4rem;
      background-image: url('/images/board/commentDeleteBtn.png');
    }
    hr {
      position: relative;
      width: 0.3815rem;
      height: 0.4rem;
      bottom: 0.24rem;
      left: 0.01rem;
      background-image: url('/images/board/commentDeleteBtn.png');
      background-size: cover;
      border: none;
    }
  }
`;

const CommentDescUl = styled.ul`
  padding: 0 0 0 0.17rem;
  font-size: 0.72rem;
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
    width: 10.05rem;
    color: #a5a5a5;
    overflow-wrap: break-word;
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
  z-index: 3;
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
  z-index: 3;
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
    right: -2.9rem;
    transform: rotate(-30deg);
    background-image: url('/images/board/baloons/veryBad.png');
    animation: ${baloonVeryBad} 6s ease-in-out infinite;
  }
  &.veryBad2 {
    position: absolute;
    top: -3.3rem;
    left: -3.3rem;
    transform: rotate(30deg);
    border: none;
    background-image: url('/images/board/baloons/veryBad.png');
    background-size: cover;
    animation: ${baloonVeryBad} 6s ease-in-out infinite;
  }
  &.veryBadDepthToLeft {
    position: absolute;
    top: -3.3rem;
    right: -4.2rem;
    transform: rotate(30deg);
    border: none;
    background-image: url('/images/board/baloons/veryBad.png');
    background-size: cover;
    animation: ${baloonVeryBad} 6s ease-in-out infinite;
  }
  &.veryBadDepthToRight {
    position: absolute;
    top: -3.3rem;
    left: -4.7rem;
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
    right: -3rem;
    transform: rotate(-30deg);
    border: none;
    background-image: url('/images/board/baloons/bad.png');
    background-size: cover;
    animation: ${baloonBad} 6s ease-in-out infinite;
  }
  &.bad2 {
    position: absolute;
    top: -3.7rem;
    left: -3.2rem;
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
    left: -4.5rem;
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
    left: -4.5rem;
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
    right: -3.7rem;
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
    right: -4.2rem;
    transform: rotate(30deg);
    border: none;
    background-image: url('/images/board/baloons/good.png');
    background-size: cover;
    animation: ${baloonGood} 6s ease-in-out infinite;
  }
  &.goodDepthToRight {
    position: absolute;
    top: -3.3rem;
    left: -4.5rem;
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
    right: -2.8rem;
    transform: rotate(-33deg);
    border: none;
    background-image: url('/images/board/baloons/veryGood.png');
    background-size: cover;
    animation: ${baloonVeryGood} 6s ease-in-out infinite;
  }
  &.veryGood2 {
    position: absolute;
    top: -3.2rem;
    left: -3.2rem;
    transform: rotate(30deg);
    border: none;
    background-image: url('/images/board/baloons/veryGood.png');
    background-size: cover;
    animation: ${baloonVeryGood} 6s ease-in-out infinite;
  }
  &.veryGoodDepthToLeft {
    position: absolute;
    top: -3.2rem;
    right: -4.2rem;
    transform: rotate(30deg);
    border: none;
    background-image: url('/images/board/baloons/veryGood.png');
    background-size: cover;
    animation: ${baloonVeryGood} 6s ease-in-out infinite;
  }
  &.veryGoodDepthToRight {
    position: absolute;
    top: -3.2rem;
    left: -4.7rem;
    transform: rotate(30deg);
    border: none;
    background-image: url('/images/board/baloons/veryGood.png');
    background-size: cover;
    animation: ${baloonVeryGood} 6s ease-in-out infinite;
  }
`;
const StarWrapperOnModify = styled.span`
  position: absolute;
  top: 0.2rem;
  left: 0.38rem;
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
const ModifyCommentTextareaWrapper = styled.div`
  position: relative;
  left: -0.22rem;
  background-color: #ffffff;
  width: 10.49rem;
  height: 5rem;
  padding-right: 0.5rem;
  border: 1px solid #e8e8e8;
  border-radius: 0.85rem;
  z-index: 0;
`;
const ModifyCommentTextarea = styled.textarea`
  position: relative;
  top: 0.3rem;
  width: 10.26rem;
  height: 4.37rem;
  font-size: 0.72rem;
  border-radius: 0.85rem;
  transition: opacity 0.3s 0.5s;
  opacity: 1;
  color: #a5a5a5;
  line-height: 1.19rem;
  border: none;
  outline: none;
  resize: none;

  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #ffffff;
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

const ReplyCommentTextareaWrapper = styled.div`
  position: relative;
  margin-top: 0.3rem;
  left: -0.22rem;
  background-color: #ffffff;
  width: 10.49rem;
  height: 5rem;
  padding-right: 0.5rem;
  border: 1px solid #e8e8e8;
  border-radius: 0.85rem;
`;
const ReplyCommentTextarea = styled.textarea`
  position: relative;
  top: 0.3rem;
  width: 10.26rem;
  height: 4.37rem;
  font-size: 0.72rem;
  border: 1px solid #e8e8e8;
  border-radius: 0.85rem;
  transition: opacity 0.3s 0.5s;
  opacity: 1;
  color: #a5a5a5;
  line-height: 1.19rem;
  border: none;
  outline: none;
  resize: none;

  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #ffffff;
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
  width: 1.55rem;
  height: 3.65rem;
  right: -1.55rem;
  top: 4.464rem;
  z-index: 1;
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
  width: 11.52rem;
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
  width: 10.32rem;
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
    selectedLook: number,
    commentVal: string,
    wno: number,
    userNo: number,
  ) => any;
  readonly modifyComment: (
    selectedLook: number,
    commentVal: string,
    wno: number,
    uid: number,
    userNo: number,
    roleType: string,
  ) => any;
  readonly replyComment: (
    selectedLook: number,
    commentVal: string,
    wno: number,
    uid: number,
    depth: number,
    rdepth: number,
    userNo: number,
  ) => any;
  readonly myInfo: MyInfo | null;
  readonly board: Board[] | any;
  readonly comment: Comment[] | any;
  readonly onRemove: (
    cno: number,
    wno: number,
    uid: number,
    rnum: number,
    rdepth: number,
  ) => void;
  readonly extractsMaxUid: (wno: number, rdepth: number) => any;
  readonly isLoading: boolean;
  readonly isAuthorized: boolean;
}
const ContentDesc = ({
  registerComment,
  modifyComment,
  replyComment,
  myInfo,
  board,
  comment,
  onRemove,
  extractsMaxUid,
  isLoading,
  isAuthorized,
}: Props) => {
  const { state, actions } = useContext(MainContext);
  const dispatch = useDispatch();
  const [boardRegDateDays, setBoardRegDateDays] = useState() as any;
  const [star, setStar] = useState<number>(-3);
  const [starOnModify, setStarOnModify] = useState<number>(-3);
  const [starOnReply, setStarOnReply] = useState<number>(-3);

  const [showStarToggle, setShowStarToggle] = useState<boolean>(false);
  const [showStarOnModifyToggle, setShowStarOnModifyToggle] =
    useState<boolean>(false);
  const [showStarOnReplyToggle, setShowStarOnReplyToggle] =
    useState<boolean>(false);

  const [commentVal, setCommentVal] = useState('');
  const [modifyCommentVal, setModifyCommentVal] = useState('');
  const [replyCommentVal, setReplyCommentVal] = useState('');
  const [selectedCommentUid, setSelectedCommentUid] = useState<number | null>(
    null,
  );
  const [scrollDownGear, setScrollDownGear] = useState<boolean>(false);
  const [toggleAddCommentForm, setToggleAddCommentForm] =
    useState<boolean>(true);
  const [reply, setReply] = useState<boolean>(false);
  const [modify, setModify] = useState<boolean>(false);
  const [modifyCompleted, setModifyCompleted] = useState<boolean>(false);
  const [modifyCompletedAdmin, setModifyCompletedAdmin] =
    useState<boolean>(false);

  const [replyCompleted, setReplyCompleted] = useState<boolean>(false);
  const [replyCompletedAdmin, setReplyCompletedAdmin] =
    useState<boolean>(false);
  const [lastReply, setLastReply] = useState<number>();

  const descRef = useRef(null) as unknown as HTMLDivElement &
    (LegacyRef<HTMLDivElement> | undefined) as any;
  const commentRef = useRef(null) as unknown as HTMLDivElement &
    (LegacyRef<HTMLDivElement> | undefined) as any;
  const addbtnRef = useRef(null) as unknown as HTMLSpanElement &
    (LegacyRef<HTMLSpanElement> | undefined) as any;
  const selectStarBtnRef = useRef(null) as unknown as HTMLSpanElement &
    (LegacyRef<HTMLSpanElement> | undefined) as any;
  const textareaRef = useRef(null) as unknown as HTMLTextAreaElement &
    (LegacyRef<HTMLTextAreaElement> | undefined) as any;
  const replyTextareaRef = useRef(null) as unknown as HTMLTextAreaElement &
    (LegacyRef<HTMLTextAreaElement> | undefined) as any;
  const modifyTextareaRef = useRef(null) as unknown as HTMLTextAreaElement &
    (LegacyRef<HTMLTextAreaElement> | undefined) as any;
  const scrollUpBtnRef = useRef(null) as unknown as HTMLSpanElement &
    (LegacyRef<HTMLSpanElement> | undefined) as any;
  const starWrapperOnModify = useRef(null) as unknown as HTMLSpanElement &
    (LegacyRef<HTMLSpanElement> | undefined) as any;
  const starWrapperOnReply = useRef(null) as unknown as HTMLSpanElement &
    (LegacyRef<HTMLSpanElement> | undefined) as any;

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
  }, [
    actions,
    board.regDate,
    board.wno,
    comment,
    dispatch,
    scrollDownGear,
    state.zIdx,
  ]);

  const addCommentForm = document.getElementById('addCommentForm');
  const saying = document.getElementById('saying');
  const starWrapper = document.getElementById('starWrapper');

  const showAndHideCommentForm = useCallback(
    (show: boolean) => {
      if (show === true) {
        setToggleAddCommentForm(false);
        actions.setToggleAddCommentForm(false);
        saying!.style.transition = 'opacity 0.3s ease-in';
        saying!.style.opacity = '0';
        descRef.current.style.height = '39.36rem';
        addCommentForm!.style.transition = 'opacity 0.2s 0.6s';
        addCommentForm!.style.opacity = '1';
        if (starWrapper !== null) {
          starWrapper!.style.opacity = '1';
          starWrapper!.style.zIndex = '1';
          selectStarBtnRef.current.style.opacity = '1';
          selectStarBtnRef.current.style.left = '1.57rem';
        }
        textareaRef.current.focus();
      } else {
        setToggleAddCommentForm(true);
        actions.setToggleAddCommentForm(true);
        addCommentForm!.style.opacity = '0';
        addCommentForm!.style.transition = 'opacity 0.2s';
        descRef.current.style.height = '35.66rem';
        descRef.current.style.transition = 'height 0.45s 0.1s ease-in';
        if (addbtnRef === null) {
          addbtnRef!.current.style.display = 'block';
        }
        saying!.style.opacity = '1';
        saying!.style.transition = 'opacity 0.2s 1.15s ease-out';
        if (starWrapper !== null) {
          selectStarBtnRef.current.style.opacity = '0';
          selectStarBtnRef.current.style.left = '0';
        }
      }
    },
    [
      actions,
      addbtnRef,
      addCommentForm,
      descRef,
      saying,
      selectStarBtnRef,
      setToggleAddCommentForm,
      starWrapper,
      textareaRef,
    ],
  );

  const controlTextArea = (e: Event) => {
    if (myInfo?.roleType !== 'USER' && myInfo?.roleType !== 'ADMIN') {
      e.preventDefault();
      alert('권한이 없습니다. 회원만 이용 가능합니다.');
    } else if (
      (star >= -2 && star <= 2) ||
      (starOnModify >= -2 && starOnModify <= 2) ||
      (starOnReply >= -2 && starOnReply <= 2)
    ) {
    } else if (star === -3 || starOnModify === -3) {
      e.preventDefault();
      alert('공감온도를 선택 후 입력바랍니다.');
    }
  };

  const starImages = [
    "url('/images/board/star.png')",
    "url('/images/board/starDefault.png')",
  ];
  const selectStar = (starNum: number) => {
    const star = document.getElementsByClassName(
      'star',
    ) as HTMLCollectionOf<HTMLElement>;
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
    textareaRef.current.style.transition = 'opacity 0.3s 0.6s';
    textareaRef.current.style.opacity = '1';
    textareaRef.current.focus();
    setTimeout(() => {
      starWrapper!.style.opacity = '0';
      starWrapper!.style.zIndex = '0';
      starWrapper!.style.transition = 'opacity 0.5s';
    }, 380);
  };

  const selectStarOnModify = (starNum: number, comment: string) => {
    const starOnModify = document.getElementsByClassName(
      'starOnModify',
    ) as HTMLCollectionOf<HTMLElement>;
    for (var i = 0; i < starOnModify.length; i++) {
      const currStar = starOnModify[i];
      const currStarValue = i - 2;
      if (currStarValue <= starNum) {
        currStar.style.backgroundImage = starImages[1];
        switch (starNum) {
          case -2:
            setStarOnModify(-2);
            break;
          case -1:
            setStarOnModify(-1);
            break;
          case 0:
            setStarOnModify(0);
            break;
          case 1:
            setStarOnModify(1);
            break;
          case 2:
            setStarOnModify(2);
            break;
          default:
            break;
        }
      } else {
        currStar.style.backgroundImage = starImages[0];
      }
    }
    modifyTextareaRef.current.style.transition = 'opacity 0.3s 0.6s';
    modifyTextareaRef.current.style.opacity = '1';
    modifyTextareaRef.current.focus();
    if (starWrapperOnModify !== null) {
      setTimeout(() => {
        starWrapperOnModify!.current.style.opacity = '0';
        starWrapperOnModify!.current.style.zIndex = '0';
        starWrapperOnModify!.current.style.transition = 'opacity 0.5s';
        setModifyCommentVal(comment);
      }, 380);
    }
  };
  const selectStarOnReply = (starNum: number, comment: string) => {
    const starOnReply = document.getElementsByClassName(
      'starOnReply',
    ) as HTMLCollectionOf<HTMLElement>;
    for (var i = 0; i < starOnReply.length; i++) {
      const currStar = starOnReply[i];
      const currStarValue = i - 2;
      if (currStarValue <= starNum) {
        currStar.style.backgroundImage = starImages[1];
        switch (starNum) {
          case -2:
            setStarOnReply(-2);
            break;
          case -1:
            setStarOnReply(-1);
            break;
          case 0:
            setStarOnReply(0);
            break;
          case 1:
            setStarOnReply(1);
            break;
          case 2:
            setStarOnReply(2);
            break;
          default:
            break;
        }
      } else {
        currStar.style.backgroundImage = starImages[0];
      }
    }
    replyTextareaRef.current.style.transition = 'opacity 0.3s 0.6s';
    replyTextareaRef.current.style.opacity = '1';
    replyTextareaRef.current.focus();
    if (starWrapperOnReply !== null) {
      setTimeout(() => {
        starWrapperOnReply!.current.style.opacity = '0';
        starWrapperOnReply!.current.style.zIndex = '0';
        starWrapperOnReply!.current.style.transition = 'opacity 0.5s';
      }, 380);
    }
  };
  const showStars = () => {
    if (showStarToggle) {
      starWrapper!.style.opacity = '0';
      starWrapper!.style.zIndex = '0';
      textareaRef.current.style.transition = ' opacity 0s 0s';
      textareaRef.current.style.opacity = '1';
      setShowStarToggle(false);
      return;
    }
    starWrapper!.style.opacity = '1';
    starWrapper!.style.zIndex = '1';
    textareaRef.current.style.transition = ' opacity 0s 0s';
    textareaRef.current.style.opacity = '0';
    setShowStarToggle(true);
  };
  const showStarsOnModify = () => {
    if (showStarOnModifyToggle) {
      starWrapperOnModify!.current.style.opacity = '0';
      starWrapperOnModify!.current.style.zIndex = '0';
      modifyTextareaRef.current.style.transition = ' opacity 0s 0s';
      modifyTextareaRef.current.style.opacity = '1';
      setShowStarOnModifyToggle(false);
      return;
    }
    starWrapperOnModify!.current.style.opacity = '1';
    starWrapperOnModify!.current.style.zIndex = '1';
    modifyTextareaRef.current.style.transition = ' opacity 0s 0s';
    modifyTextareaRef.current.style.opacity = '0';
    setShowStarOnModifyToggle(true);
  };
  const showStarsOnReply = () => {
    if (showStarOnReplyToggle) {
      starWrapperOnReply!.current.style.opacity = '0';
      starWrapperOnReply!.current.style.zIndex = '0';
      replyTextareaRef.current.style.transition = ' opacity 0s 0s';
      replyTextareaRef.current.style.opacity = '1';
      setShowStarOnReplyToggle(false);
      return;
    }
    starWrapperOnReply!.current.style.opacity = '1';
    starWrapperOnReply!.current.style.zIndex = '1';
    replyTextareaRef.current.style.transition = ' opacity 0s 0s';
    replyTextareaRef.current.style.opacity = '0';
    setShowStarOnReplyToggle(true);
  };
  const viewStars = () => {
    const stars = document.getElementsByClassName('star');

    function selectStar(num: number) {
      for (let i = 0; i < num; i++) {
        stars[i].classList.add('hovered');
      }

      for (let i = num; i < stars.length; i++) {
        stars[i].classList.remove('hovered');
      }
    }

    for (let i = 0; i < stars.length; i++) {
      stars[i].addEventListener('mouseenter', () => selectStar(i + 1));
    }
  };
  const viewOutStars = () => {
    const stars = document.getElementsByClassName('star');

    function selectStar(num: number) {
      for (let i = 0; i < num; i++) {
        stars[i].classList.remove('hovered');
      }

      for (let i = num; i < stars.length; i++) {
        stars[i].classList.remove('hovered');
      }
    }

    for (let i = 0; i < stars.length; i++) {
      stars[i].addEventListener('mouseout', () => selectStar(i + 1));
    }
  };
  const viewStarsOnModify = () => {
    const stars = document.getElementsByClassName('starOnModify');

    function selectStar(num: number) {
      for (let i = 0; i < num; i++) {
        stars[i].classList.add('hovered');
      }

      for (let i = num; i < stars.length; i++) {
        stars[i].classList.remove('hovered');
      }
    }

    for (let i = 0; i < stars.length; i++) {
      stars[i].addEventListener('mouseenter', () => selectStar(i + 1));
    }
  };
  const viewOutStarsOnModify = () => {
    const stars = document.getElementsByClassName('starOnModify');

    function selectStar(num: number) {
      for (let i = 0; i < num; i++) {
        stars[i].classList.remove('hovered');
      }

      for (let i = num; i < stars.length; i++) {
        stars[i].classList.remove('hovered');
      }
    }

    for (let i = 0; i < stars.length; i++) {
      stars[i].addEventListener('mouseout', () => selectStar(i + 1));
    }
  };
  const viewStarsOnReply = () => {
    const stars = document.getElementsByClassName('starOnReply');

    function selectStar(num: number) {
      for (let i = 0; i < num; i++) {
        stars[i].classList.add('hovered');
      }

      for (let i = num; i < stars.length; i++) {
        stars[i].classList.remove('hovered');
      }
    }

    for (let i = 0; i < stars.length; i++) {
      stars[i].addEventListener('mouseenter', () => selectStar(i + 1));
    }
  };
  const viewOutStarsOnReply = () => {
    const stars = document.getElementsByClassName('starOnReply');

    function selectStar(num: number) {
      for (let i = 0; i < num; i++) {
        stars[i].classList.remove('hovered');
      }

      for (let i = num; i < stars.length; i++) {
        stars[i].classList.remove('hovered');
      }
    }

    for (let i = 0; i < stars.length; i++) {
      stars[i].addEventListener('mouseout', () => selectStar(i + 1));
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

  const onChangeModifyComment = useCallback((e: any) => {
    setModifyCommentVal(e.target.value);
  }, []);

  const onChangeReplyComment = useCallback((e: any) => {
    setReplyCommentVal(e.target.value);
  }, []);
  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (myInfo?.roleType !== 'USER' && myInfo?.roleType !== 'ADMIN') {
        alert('회원만 이용 가능합니다.');
      } else if (star === -3) {
        alert('공감온도를 선택해주세요.');
        return;
      } else if (commentVal.length === 0) {
        alert('빈 문자를 입력하셨습니다.');
        textareaRef.current.focus();
        return;
      }

      try {
        setScrollDownGear(true);
        setReplyCompleted(false);
        setModifyCompleted(false);
        setModifyCompletedAdmin(false);
        setReplyCompletedAdmin(false);
        registerComment(star, commentVal, board.wno, myInfo!.userNo);
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

  const deleteComment = (
    cno: number,
    wno: number,
    uid: number,
    rnum: number,
    rdepth: number,
  ) => {
    const message = '댓글을 삭제하시겠습니까?';
    const onConfirm = (
      cno: number,
      wno: number,
      uid: number,
      rnum: number,
      rdepth: number,
    ) => {
      setReplyCompleted(false);
      setModifyCompleted(false);
      setModifyCompletedAdmin(false);
      setReplyCompletedAdmin(false);
      onRemove(cno, wno, uid, rnum, rdepth);
    };
    const onCancel = () => console.log('댓글 삭제가 취소되었습니다.');
    if (!onConfirm || typeof onConfirm !== 'function') {
      return;
    }
    if (onCancel && typeof onCancel !== 'function') {
      return;
    }
    const confirmAction = () => {
      if (window.confirm(message)) {
        onConfirm(cno, wno, uid, rnum, rdepth);
      } else {
        onCancel();
      }
    };
    return confirmAction;
  };

  const onSubmitOnModify = useCallback(
    (uid: number) => {
      if (starOnModify === -3) {
        alert('공감온도를 선택해주세요.');
        return;
      } else if (modifyCommentVal.length === 0) {
        alert('빈 문자를 입력하셨습니다.');
        modifyTextareaRef.current.focus();
        return;
      }

      try {
        modifyComment(
          starOnModify,
          modifyCommentVal,
          board.wno,
          uid,
          myInfo!.userNo,
          myInfo!.roleType,
        );
        setModify(false);
        setModifyCommentVal('');
        setModifyCompleted(true);
        setModifyCompletedAdmin(false);
        setReplyCompleted(false);

        if (myInfo?.roleType === 'ADMIN') {
          setModifyCompleted(false);
          setModifyCompletedAdmin(true);
          setReplyCompletedAdmin(false);
        }
        setStarOnModify(-3);
      } catch (error) {
        console.error(error);
        alert('댓글 수정에 실패하였습니다.');
      }
    },
    [starOnModify, modifyCommentVal, modifyComment, board.wno, myInfo],
  );

  const onSubmitOnReply = useCallback(
    (uid: number, depth: number, rdepth: number) => {
      if (starOnReply === -3) {
        alert('공감온도를 선택해주세요.');
        return;
      } else if (replyCommentVal.length === 0) {
        alert('빈 문자를 입력하셨습니다.');
        replyTextareaRef.current.focus();
        return;
      }

      try {
        replyComment(
          starOnReply,
          replyCommentVal,
          board.wno,
          uid,
          depth,
          rdepth,
          myInfo!.userNo,
        );
        setReply(false);
        setReplyCommentVal('');
        setReplyCompleted(true);
        setReplyCompletedAdmin(false);
        setModifyCompleted(false);
        if (myInfo?.roleType === 'ADMIN') {
          setReplyCompleted(false);
          setReplyCompletedAdmin(true);
          setModifyCompletedAdmin(false);
        }
        setStarOnReply(-3);
      } catch (error) {
        console.error(error);
        alert('답변 등록에 실패하였습니다.');
      }
    },
    [board.wno, myInfo, replyComment, replyCommentVal, starOnReply],
  );

  const getMaxUidPerOneRdepth = (wno: number, rdepth: number) => {
    extractsMaxUid(wno, rdepth).then((result: number) => {
      setLastReply(result + 1);
    });
  };
  return (
    <Wrapper>
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
                            {commentItem.depth === 0 ? (
                              <>
                                {reply === true &&
                                commentItem.uid === selectedCommentUid ? (
                                  <>
                                    <CommentDesc className="depthFalseLeft">
                                      <CommentBtns>
                                        <span
                                          title="완료"
                                          onClick={() => {
                                            onSubmitOnReply(
                                              commentItem.uid,
                                              commentItem.depth,
                                              commentItem.rdepth,
                                            );
                                          }}
                                        >
                                          <hr />
                                        </span>
                                        <span
                                          title="공감온도"
                                          onClick={showStarsOnReply}
                                        >
                                          <hr />
                                        </span>
                                        {commentItem.userNo ===
                                          myInfo?.userNo && (
                                          <>
                                            <span
                                              style={{ bottom: '0.09rem' }}
                                              onClick={() => {
                                                setStarOnReply(-3);
                                                setModifyCommentVal('');
                                                setSelectedCommentUid(
                                                  commentItem.uid,
                                                );
                                                setModify(true);
                                                setStarOnModify(-3);
                                                setReply(false);
                                              }}
                                              title="수정"
                                            >
                                              <hr />
                                            </span>
                                            <span
                                              title="삭제"
                                              onClick={deleteComment(
                                                commentItem.cno,
                                                commentItem.wno,
                                                commentItem.uid,
                                                commentItem.rnum,
                                                commentItem.rdepth,
                                              )}
                                            >
                                              <hr />
                                            </span>
                                          </>
                                        )}
                                      </CommentBtns>
                                      <CommentDescUl>
                                        <li>{commentItem.userName}</li>
                                        <li>{commentItem.text}</li>
                                        <li>
                                          <ReplyCommentTextareaWrapper>
                                            <StarWrapperOnModify
                                              ref={starWrapperOnReply}
                                            >
                                              <hr
                                                className="starOnReply"
                                                onClick={() =>
                                                  selectStarOnReply(
                                                    -2,
                                                    commentItem.text,
                                                  )
                                                }
                                                onMouseOver={() =>
                                                  viewStarsOnReply()
                                                }
                                                onMouseOut={() =>
                                                  viewOutStarsOnReply()
                                                }
                                                title="매우 나쁨"
                                              />
                                              <hr
                                                className="starOnReply"
                                                onClick={() =>
                                                  selectStarOnReply(
                                                    -1,
                                                    commentItem.text,
                                                  )
                                                }
                                                onMouseOver={() =>
                                                  viewStarsOnReply()
                                                }
                                                onMouseOut={() =>
                                                  viewOutStarsOnReply()
                                                }
                                                title="나쁨"
                                              />
                                              <hr
                                                className="starOnReply"
                                                onClick={() =>
                                                  selectStarOnReply(
                                                    0,
                                                    commentItem.text,
                                                  )
                                                }
                                                onMouseOver={() =>
                                                  viewStarsOnReply()
                                                }
                                                onMouseOut={() =>
                                                  viewOutStarsOnReply()
                                                }
                                                title="보통"
                                              />
                                              <hr
                                                className="starOnReply"
                                                onClick={() =>
                                                  selectStarOnReply(
                                                    1,
                                                    commentItem.text,
                                                  )
                                                }
                                                onMouseOver={() =>
                                                  viewStarsOnReply()
                                                }
                                                onMouseOut={() =>
                                                  viewOutStarsOnReply()
                                                }
                                                title="좋음"
                                              />
                                              <hr
                                                className="starOnReply"
                                                onClick={() =>
                                                  selectStarOnReply(
                                                    2,
                                                    commentItem.text,
                                                  )
                                                }
                                                onMouseOver={() =>
                                                  viewStarsOnReply()
                                                }
                                                onMouseOut={() =>
                                                  viewOutStarsOnReply()
                                                }
                                                title="매우좋음"
                                              />
                                            </StarWrapperOnModify>
                                            <ReplyCommentTextarea
                                              ref={replyTextareaRef}
                                              maxLength={150}
                                              onChange={(e: any) => {
                                                onChangeReplyComment(e);
                                              }}
                                              onKeyPress={(e: any) =>
                                                controlTextArea(e)
                                              }
                                              value={replyCommentVal}
                                            />
                                          </ReplyCommentTextareaWrapper>
                                        </li>
                                        <li>
                                          {regdate}
                                          {commentItem.face === -2 && (
                                            <VeryBad
                                              style={{ top: `5rem` }}
                                              className="veryBad"
                                            />
                                          )}
                                          {commentItem.face === -1 && (
                                            <Bad
                                              style={{ top: `5rem` }}
                                              className="bad"
                                            />
                                          )}
                                          {commentItem.face === 0 && (
                                            <Normal
                                              style={{ top: `5rem` }}
                                              className="normal"
                                            />
                                          )}
                                          {commentItem.face === 1 && (
                                            <Good
                                              style={{ top: `5rem` }}
                                              className="good"
                                            />
                                          )}
                                          {commentItem.face === 2 && (
                                            <VeryGood
                                              style={{ top: `5rem` }}
                                              className="veryGood"
                                            />
                                          )}
                                        </li>
                                      </CommentDescUl>
                                    </CommentDesc>
                                  </>
                                ) : (
                                  <>
                                    {(modify === true &&
                                      index === selectedCommentUid &&
                                      commentItem.userNo === myInfo?.userNo) ||
                                    (modify === true &&
                                      index === selectedCommentUid &&
                                      myInfo?.roleType === 'ADMIN') ? (
                                      <>
                                        <CommentDesc className="depthFalseLeft">
                                          <CommentBtns>
                                            <span
                                              onClick={() => {
                                                setStarOnModify(-3);
                                                setReplyCommentVal('');
                                                setSelectedCommentUid(
                                                  commentItem.uid,
                                                );
                                                setReply(true);
                                                setModify(false);
                                                getMaxUidPerOneRdepth(
                                                  commentItem.wno,
                                                  commentItem.rdepth,
                                                );
                                                setStarOnReply(-3);
                                              }}
                                              title="답글"
                                            >
                                              <hr />
                                            </span>
                                            <span
                                              title="공감온도"
                                              onClick={showStarsOnModify}
                                            >
                                              <hr />
                                            </span>
                                            <span
                                              title="완료"
                                              onClick={() => {
                                                onSubmitOnModify(
                                                  commentItem.uid,
                                                );
                                              }}
                                            >
                                              <hr />
                                            </span>
                                            <span
                                              title="삭제"
                                              onClick={deleteComment(
                                                commentItem.cno,
                                                commentItem.wno,
                                                commentItem.uid,
                                                commentItem.rnum,
                                                commentItem.rdepth,
                                              )}
                                            >
                                              <hr />
                                            </span>
                                          </CommentBtns>
                                          <CommentDescUl>
                                            <li>{commentItem.userName}</li>
                                            <li>
                                              <ModifyCommentTextareaWrapper id="controlScrollCapturing">
                                                <StarWrapperOnModify
                                                  ref={starWrapperOnModify}
                                                >
                                                  <hr
                                                    className="starOnModify"
                                                    onClick={() =>
                                                      selectStarOnModify(
                                                        -2,
                                                        commentItem.text,
                                                      )
                                                    }
                                                    onMouseOver={() =>
                                                      viewStarsOnModify()
                                                    }
                                                    onMouseOut={() =>
                                                      viewOutStarsOnModify()
                                                    }
                                                    title="매우 나쁨"
                                                  />
                                                  <hr
                                                    className="starOnModify"
                                                    onClick={() =>
                                                      selectStarOnModify(
                                                        -1,
                                                        commentItem.text,
                                                      )
                                                    }
                                                    onMouseOver={() =>
                                                      viewStarsOnModify()
                                                    }
                                                    onMouseOut={() =>
                                                      viewOutStarsOnModify()
                                                    }
                                                    title="나쁨"
                                                  />
                                                  <hr
                                                    className="starOnModify"
                                                    onClick={() =>
                                                      selectStarOnModify(
                                                        0,
                                                        commentItem.text,
                                                      )
                                                    }
                                                    onMouseOver={() =>
                                                      viewStarsOnModify()
                                                    }
                                                    onMouseOut={() =>
                                                      viewOutStarsOnModify()
                                                    }
                                                    title="보통"
                                                  />
                                                  <hr
                                                    className="starOnModify"
                                                    onClick={() =>
                                                      selectStarOnModify(
                                                        1,
                                                        commentItem.text,
                                                      )
                                                    }
                                                    onMouseOver={() =>
                                                      viewStarsOnModify()
                                                    }
                                                    onMouseOut={() =>
                                                      viewOutStarsOnModify()
                                                    }
                                                    title="좋음"
                                                  />
                                                  <hr
                                                    className="starOnModify"
                                                    onClick={() =>
                                                      selectStarOnModify(
                                                        2,
                                                        commentItem.text,
                                                      )
                                                    }
                                                    onMouseOver={() =>
                                                      viewStarsOnModify()
                                                    }
                                                    onMouseOut={() =>
                                                      viewOutStarsOnModify()
                                                    }
                                                    title="매우좋음"
                                                  />
                                                </StarWrapperOnModify>
                                                <ModifyCommentTextarea
                                                  ref={modifyTextareaRef}
                                                  maxLength={150}
                                                  onChange={(e: any) => {
                                                    onChangeModifyComment(e);
                                                  }}
                                                  onKeyPress={(e: any) =>
                                                    controlTextArea(e)
                                                  }
                                                  value={modifyCommentVal}
                                                />
                                              </ModifyCommentTextareaWrapper>
                                            </li>
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
                                      </>
                                    ) : (modifyCompleted === true &&
                                        modifyCompletedAdmin === false &&
                                        reply === false &&
                                        index === selectedCommentUid &&
                                        commentItem.userNo ===
                                          myInfo?.userNo) ||
                                      (modifyCompletedAdmin === true &&
                                        modifyCompleted === false &&
                                        reply === false &&
                                        index === selectedCommentUid) ? (
                                      <CommentDescOnModifyCompleted className="depthFalseLeft">
                                        <CommentBtns>
                                          {commentItem.userNo ===
                                            myInfo?.userNo ||
                                          myInfo?.roleType === 'ADMIN' ? (
                                            <>
                                              <span
                                                onClick={() => {
                                                  setReplyCommentVal('');
                                                  setSelectedCommentUid(
                                                    commentItem.uid,
                                                  );
                                                  setReply(true);
                                                  setModify(false);
                                                  getMaxUidPerOneRdepth(
                                                    commentItem.wno,
                                                    commentItem.rdepth,
                                                  );
                                                  setStarOnReply(-3);
                                                }}
                                                title="답글"
                                              >
                                                <hr />
                                              </span>
                                              <span
                                                onClick={() => {
                                                  setModifyCommentVal('');

                                                  setModify(true);
                                                  setReply(false);
                                                  setStarOnModify(-3);
                                                }}
                                                title="수정"
                                              >
                                                <hr />
                                              </span>
                                              <span
                                                title="삭제"
                                                onClick={deleteComment(
                                                  commentItem.cno,
                                                  commentItem.wno,
                                                  commentItem.uid,
                                                  commentItem.rnum,
                                                  commentItem.rdepth,
                                                )}
                                              >
                                                <hr />
                                              </span>
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </CommentBtns>
                                        <CommentDescUl>
                                          <li>{commentItem.userName}</li>
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
                                      </CommentDescOnModifyCompleted>
                                    ) : (
                                      <CommentDesc className="depthFalseLeft">
                                        <CommentBtns>
                                          {commentItem.userNo ===
                                            myInfo?.userNo ||
                                          myInfo?.roleType === 'ADMIN' ? (
                                            <>
                                              <span
                                                onClick={() => {
                                                  setReplyCommentVal('');
                                                  setSelectedCommentUid(
                                                    commentItem.uid,
                                                  );
                                                  setReply(true);
                                                  setModify(false);
                                                  getMaxUidPerOneRdepth(
                                                    commentItem.wno,
                                                    commentItem.rdepth,
                                                  );
                                                  setStarOnReply(-3);
                                                }}
                                                title="답글"
                                              >
                                                <hr />
                                              </span>
                                              <span
                                                onClick={() => {
                                                  setModifyCommentVal('');
                                                  setSelectedCommentUid(index);
                                                  setModify(true);
                                                  setReply(false);
                                                  setStarOnModify(-3);
                                                }}
                                                title="수정"
                                              >
                                                <hr />
                                              </span>
                                              <span
                                                title="삭제"
                                                onClick={deleteComment(
                                                  commentItem.cno,
                                                  commentItem.wno,
                                                  commentItem.uid,
                                                  commentItem.rnum,
                                                  commentItem.rdepth,
                                                )}
                                              >
                                                <hr />
                                              </span>
                                            </>
                                          ) : (
                                            myInfo?.roleType === 'USER' && (
                                              <span
                                                onClick={() => {
                                                  setReplyCommentVal('');
                                                  setSelectedCommentUid(
                                                    commentItem.uid,
                                                  );
                                                  setReply(true);
                                                  setModify(false);
                                                  getMaxUidPerOneRdepth(
                                                    commentItem.wno,
                                                    commentItem.rdepth,
                                                  );
                                                  setStarOnReply(-3);
                                                }}
                                                title="답글"
                                              >
                                                <hr />
                                              </span>
                                            )
                                          )}
                                        </CommentBtns>
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
                                )}
                              </>
                            ) : (
                              commentItem.depth === 1 && (
                                <>
                                  {(modify === true &&
                                    index === selectedCommentUid &&
                                    commentItem.userNo === myInfo?.userNo) ||
                                  (modify === true &&
                                    index === selectedCommentUid &&
                                    myInfo?.roleType === 'ADMIN') ? (
                                    <>
                                      <CommentDesc className="depthTrueLeft">
                                        <CommentDepthToLeft />
                                        <CommentBtns>
                                          <span
                                            title="공감온도"
                                            onClick={showStarsOnModify}
                                          >
                                            <hr />
                                          </span>
                                          <span
                                            title="완료"
                                            onClick={() => {
                                              onSubmitOnModify(commentItem.uid);
                                            }}
                                          >
                                            <hr />
                                          </span>
                                          <span
                                            title="삭제"
                                            onClick={deleteComment(
                                              commentItem.cno,
                                              commentItem.wno,
                                              commentItem.uid,
                                              commentItem.rnum,
                                              commentItem.rdepth,
                                            )}
                                          >
                                            <hr />
                                          </span>
                                        </CommentBtns>
                                        <CommentDescUl>
                                          <li>{commentItem.userName}</li>
                                          <li>
                                            <ModifyCommentTextareaWrapper
                                              style={{ width: `8.99rem` }}
                                              id="controlScrollCapturing"
                                            >
                                              <StarWrapperOnModify
                                                ref={starWrapperOnModify}
                                              >
                                                <hr
                                                  className="starOnModify"
                                                  onClick={() =>
                                                    selectStarOnModify(
                                                      -2,
                                                      commentItem.text,
                                                    )
                                                  }
                                                  onMouseOver={() =>
                                                    viewStarsOnModify()
                                                  }
                                                  onMouseOut={() =>
                                                    viewOutStarsOnModify()
                                                  }
                                                  title="매우 나쁨"
                                                />
                                                <hr
                                                  className="starOnModify"
                                                  onClick={() =>
                                                    selectStarOnModify(
                                                      -1,
                                                      commentItem.text,
                                                    )
                                                  }
                                                  onMouseOver={() =>
                                                    viewStarsOnModify()
                                                  }
                                                  onMouseOut={() =>
                                                    viewOutStarsOnModify()
                                                  }
                                                  title="나쁨"
                                                />
                                                <hr
                                                  className="starOnModify"
                                                  onClick={() =>
                                                    selectStarOnModify(
                                                      0,
                                                      commentItem.text,
                                                    )
                                                  }
                                                  onMouseOver={() =>
                                                    viewStarsOnModify()
                                                  }
                                                  onMouseOut={() =>
                                                    viewOutStarsOnModify()
                                                  }
                                                  title="보통"
                                                />
                                                <hr
                                                  className="starOnModify"
                                                  onClick={() =>
                                                    selectStarOnModify(
                                                      1,
                                                      commentItem.text,
                                                    )
                                                  }
                                                  onMouseOver={() =>
                                                    viewStarsOnModify()
                                                  }
                                                  onMouseOut={() =>
                                                    viewOutStarsOnModify()
                                                  }
                                                  title="좋음"
                                                />
                                                <hr
                                                  className="starOnModify"
                                                  onClick={() =>
                                                    selectStarOnModify(
                                                      2,
                                                      commentItem.text,
                                                    )
                                                  }
                                                  onMouseOver={() =>
                                                    viewStarsOnModify()
                                                  }
                                                  onMouseOut={() =>
                                                    viewOutStarsOnModify()
                                                  }
                                                  title="매우좋음"
                                                />
                                              </StarWrapperOnModify>
                                              <ModifyCommentTextarea
                                                ref={modifyTextareaRef}
                                                maxLength={150}
                                                onChange={(e: any) => {
                                                  onChangeModifyComment(e);
                                                }}
                                                onKeyPress={(e: any) =>
                                                  controlTextArea(e)
                                                }
                                                value={modifyCommentVal}
                                                style={{ width: `8.76rem` }}
                                              />
                                            </ModifyCommentTextareaWrapper>
                                          </li>
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
                                  ) : (modifyCompleted === true &&
                                      modifyCompletedAdmin === false &&
                                      reply === false &&
                                      index === selectedCommentUid &&
                                      commentItem.userNo === myInfo?.userNo) ||
                                    (modifyCompletedAdmin === true &&
                                      modifyCompleted === false &&
                                      reply === false &&
                                      index === selectedCommentUid) ? (
                                    <CommentDescOnModifyCompleted className="depthTrueLeft">
                                      <CommentDepthToLeft />
                                      <CommentBtns>
                                        {commentItem.userNo ===
                                          myInfo?.userNo ||
                                        myInfo?.roleType === 'ADMIN' ? (
                                          <>
                                            <span
                                              onClick={() => {
                                                setModifyCommentVal('');

                                                setModify(true);
                                                setStarOnModify(-3);
                                                setReply(false);
                                              }}
                                              title="수정"
                                            >
                                              <hr />
                                            </span>
                                            <span
                                              title="삭제"
                                              onClick={deleteComment(
                                                commentItem.cno,
                                                commentItem.wno,
                                                commentItem.uid,
                                                commentItem.rnum,
                                                commentItem.rdepth,
                                              )}
                                            >
                                              <hr />
                                            </span>
                                          </>
                                        ) : (
                                          <></>
                                        )}
                                      </CommentBtns>
                                      <CommentDescUl>
                                        <li>{commentItem.userName}</li>
                                        <li style={{ width: `8.65rem` }}>
                                          {commentItem.text}
                                        </li>
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
                                    </CommentDescOnModifyCompleted>
                                  ) : (replyCompleted === true &&
                                      replyCompletedAdmin === false &&
                                      modify === false &&
                                      lastReply === commentItem.uid) ||
                                    (replyCompletedAdmin === true &&
                                      replyCompleted === false &&
                                      modify === false &&
                                      lastReply === commentItem.uid) ? (
                                    <CommentDescOnReplyCompleted className="depthTrueLeft">
                                      <CommentDepthToLeft />
                                      <CommentBtns>
                                        {(commentItem.userNo ===
                                          myInfo?.userNo ||
                                          myInfo?.roleType === 'ADMIN') && (
                                          <>
                                            <span
                                              onClick={() => {
                                                setSelectedCommentUid(index);
                                                setModify(true);
                                                setStarOnModify(-3);
                                                setModifyCommentVal('');
                                              }}
                                              title="수정"
                                            >
                                              <hr />
                                            </span>
                                            <span
                                              title="삭제"
                                              onClick={deleteComment(
                                                commentItem.cno,
                                                commentItem.wno,
                                                commentItem.uid,
                                                commentItem.rnum,
                                                commentItem.rdepth,
                                              )}
                                            >
                                              <hr />
                                            </span>
                                          </>
                                        )}
                                      </CommentBtns>
                                      <CommentDescUl>
                                        <li>
                                          {commentItem.userName === null
                                            ? '탈퇴한 회원'
                                            : commentItem.userName}
                                        </li>
                                        <li style={{ width: `8.65rem` }}>
                                          {commentItem.text}
                                        </li>
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
                                    </CommentDescOnReplyCompleted>
                                  ) : (
                                    <CommentDesc className="depthTrueLeft">
                                      <CommentDepthToLeft />
                                      <CommentBtns>
                                        {(commentItem.userNo ===
                                          myInfo?.userNo ||
                                          myInfo?.roleType === 'ADMIN') && (
                                          <>
                                            <span
                                              onClick={() => {
                                                setSelectedCommentUid(index);
                                                setModify(true);
                                                setStarOnModify(-3);
                                                setModifyCommentVal('');
                                              }}
                                              title="수정"
                                            >
                                              <hr />
                                            </span>
                                            <span
                                              title="삭제"
                                              onClick={deleteComment(
                                                commentItem.cno,
                                                commentItem.wno,
                                                commentItem.uid,
                                                commentItem.rnum,
                                                commentItem.rdepth,
                                              )}
                                            >
                                              <hr />
                                            </span>
                                          </>
                                        )}
                                      </CommentBtns>
                                      <CommentDescUl>
                                        <li>
                                          {commentItem.userName === null
                                            ? '탈퇴한 회원'
                                            : commentItem.userName}
                                        </li>
                                        <li style={{ width: `8.65rem` }}>
                                          {commentItem.text}
                                        </li>
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
                                  )}
                                </>
                              )
                            )}
                          </>
                        ) : (
                          //오른쪽 정렬 시작
                          <>
                            {commentItem.depth === 0 ? (
                              <>
                                {reply === true &&
                                commentItem.uid === selectedCommentUid ? (
                                  <>
                                    <CommentDesc2 className="depthFalseRight">
                                      <CommentBtns>
                                        <span
                                          title="완료"
                                          onClick={() => {
                                            onSubmitOnReply(
                                              commentItem.uid,
                                              commentItem.depth,
                                              commentItem.rdepth,
                                            );
                                          }}
                                        >
                                          <hr />
                                        </span>
                                        <span
                                          title="공감온도"
                                          onClick={showStarsOnReply}
                                        >
                                          <hr />
                                        </span>
                                        {(commentItem.userNo ===
                                          myInfo?.userNo ||
                                          myInfo?.roleType === 'ADMIN') && (
                                          <>
                                            <span
                                              style={{ bottom: '0.09rem' }}
                                              onClick={() => {
                                                setStarOnReply(-3);
                                                setModifyCommentVal('');
                                                setSelectedCommentUid(
                                                  commentItem.uid,
                                                );
                                                setModify(true);
                                                setReply(false);
                                                setStarOnModify(-3);
                                              }}
                                              title="수정"
                                            >
                                              <hr />
                                            </span>
                                            <span
                                              title="삭제"
                                              onClick={deleteComment(
                                                commentItem.cno,
                                                commentItem.wno,
                                                commentItem.uid,
                                                commentItem.rnum,
                                                commentItem.rdepth,
                                              )}
                                            >
                                              <hr />
                                            </span>
                                          </>
                                        )}
                                      </CommentBtns>
                                      <CommentDescUl>
                                        <li>{commentItem.userName}</li>
                                        <li>{commentItem.text}</li>
                                        <li>
                                          <ReplyCommentTextareaWrapper>
                                            <StarWrapperOnModify
                                              ref={starWrapperOnReply}
                                            >
                                              <hr
                                                className="starOnReply"
                                                onClick={() =>
                                                  selectStarOnReply(
                                                    -2,
                                                    commentItem.text,
                                                  )
                                                }
                                                onMouseOver={() =>
                                                  viewStarsOnReply()
                                                }
                                                onMouseOut={() =>
                                                  viewOutStarsOnReply()
                                                }
                                                title="매우 나쁨"
                                              />
                                              <hr
                                                className="starOnReply"
                                                onClick={() =>
                                                  selectStarOnReply(
                                                    -1,
                                                    commentItem.text,
                                                  )
                                                }
                                                onMouseOver={() =>
                                                  viewStarsOnReply()
                                                }
                                                onMouseOut={() =>
                                                  viewOutStarsOnReply()
                                                }
                                                title="나쁨"
                                              />
                                              <hr
                                                className="starOnReply"
                                                onClick={() =>
                                                  selectStarOnReply(
                                                    0,
                                                    commentItem.text,
                                                  )
                                                }
                                                onMouseOver={() =>
                                                  viewStarsOnReply()
                                                }
                                                onMouseOut={() =>
                                                  viewOutStarsOnReply()
                                                }
                                                title="보통"
                                              />
                                              <hr
                                                className="starOnReply"
                                                onClick={() =>
                                                  selectStarOnReply(
                                                    1,
                                                    commentItem.text,
                                                  )
                                                }
                                                onMouseOver={() =>
                                                  viewStarsOnReply()
                                                }
                                                onMouseOut={() =>
                                                  viewOutStarsOnReply()
                                                }
                                                title="좋음"
                                              />
                                              <hr
                                                className="starOnReply"
                                                onClick={() =>
                                                  selectStarOnReply(
                                                    2,
                                                    commentItem.text,
                                                  )
                                                }
                                                onMouseOver={() =>
                                                  viewStarsOnReply()
                                                }
                                                onMouseOut={() =>
                                                  viewOutStarsOnReply()
                                                }
                                                title="매우좋음"
                                              />
                                            </StarWrapperOnModify>
                                            <ReplyCommentTextarea
                                              ref={replyTextareaRef}
                                              maxLength={150}
                                              onChange={(e: any) => {
                                                onChangeReplyComment(e);
                                              }}
                                              onKeyPress={(e: any) =>
                                                controlTextArea(e)
                                              }
                                              value={replyCommentVal}
                                            />
                                          </ReplyCommentTextareaWrapper>
                                        </li>
                                        <li>
                                          {regdate}
                                          {commentItem.face === -2 && (
                                            <VeryBad
                                              style={{ top: `5rem` }}
                                              className="veryBad2"
                                            />
                                          )}
                                          {commentItem.face === -1 && (
                                            <Bad
                                              style={{ top: `5rem` }}
                                              className="bad2"
                                            />
                                          )}
                                          {commentItem.face === 0 && (
                                            <Normal
                                              style={{ top: `5rem` }}
                                              className="normal2"
                                            />
                                          )}
                                          {commentItem.face === 1 && (
                                            <Good
                                              style={{ top: `5rem` }}
                                              className="good2"
                                            />
                                          )}
                                          {commentItem.face === 2 && (
                                            <VeryGood
                                              style={{ top: `5rem` }}
                                              className="veryGood2"
                                            />
                                          )}
                                        </li>
                                      </CommentDescUl>
                                    </CommentDesc2>
                                  </>
                                ) : (
                                  <>
                                    {(modify === true &&
                                      index === selectedCommentUid &&
                                      commentItem.userNo === myInfo?.userNo) ||
                                    (modify === true &&
                                      index === selectedCommentUid &&
                                      myInfo?.roleType === 'ADMIN') ? (
                                      <>
                                        <CommentDesc2 className="depthFalseRight">
                                          <CommentBtns>
                                            <span
                                              onClick={() => {
                                                setStarOnModify(-3);
                                                setReplyCommentVal('');
                                                setSelectedCommentUid(
                                                  commentItem.uid,
                                                );
                                                setReply(true);
                                                setModify(false);
                                                getMaxUidPerOneRdepth(
                                                  commentItem.wno,
                                                  commentItem.rdepth,
                                                );
                                                setStarOnReply(-3);
                                              }}
                                              title="답글"
                                            >
                                              <hr />
                                            </span>
                                            <span
                                              title="공감온도"
                                              onClick={showStarsOnModify}
                                            >
                                              <hr />
                                            </span>
                                            <span
                                              title="완료"
                                              onClick={() => {
                                                onSubmitOnModify(
                                                  commentItem.uid,
                                                );
                                              }}
                                            >
                                              <hr />
                                            </span>
                                            <span
                                              title="삭제"
                                              onClick={deleteComment(
                                                commentItem.cno,
                                                commentItem.wno,
                                                commentItem.uid,
                                                commentItem.rnum,
                                                commentItem.rdepth,
                                              )}
                                            >
                                              <hr />
                                            </span>
                                          </CommentBtns>
                                          <CommentDescUl>
                                            <li>{commentItem.userName}</li>
                                            <li>
                                              <ModifyCommentTextareaWrapper id="controlScrollCapturing">
                                                <StarWrapperOnModify
                                                  ref={starWrapperOnModify}
                                                >
                                                  <hr
                                                    className="starOnModify"
                                                    onClick={() =>
                                                      selectStarOnModify(
                                                        -2,
                                                        commentItem.text,
                                                      )
                                                    }
                                                    onMouseOver={() =>
                                                      viewStarsOnModify()
                                                    }
                                                    onMouseOut={() =>
                                                      viewOutStarsOnModify()
                                                    }
                                                    title="매우 나쁨"
                                                  />
                                                  <hr
                                                    className="starOnModify"
                                                    onClick={() =>
                                                      selectStarOnModify(
                                                        -1,
                                                        commentItem.text,
                                                      )
                                                    }
                                                    onMouseOver={() =>
                                                      viewStarsOnModify()
                                                    }
                                                    onMouseOut={() =>
                                                      viewOutStarsOnModify()
                                                    }
                                                    title="나쁨"
                                                  />
                                                  <hr
                                                    className="starOnModify"
                                                    onClick={() =>
                                                      selectStarOnModify(
                                                        0,
                                                        commentItem.text,
                                                      )
                                                    }
                                                    onMouseOver={() =>
                                                      viewStarsOnModify()
                                                    }
                                                    onMouseOut={() =>
                                                      viewOutStarsOnModify()
                                                    }
                                                    title="보통"
                                                  />
                                                  <hr
                                                    className="starOnModify"
                                                    onClick={() =>
                                                      selectStarOnModify(
                                                        1,
                                                        commentItem.text,
                                                      )
                                                    }
                                                    onMouseOver={() =>
                                                      viewStarsOnModify()
                                                    }
                                                    onMouseOut={() =>
                                                      viewOutStarsOnModify()
                                                    }
                                                    title="좋음"
                                                  />
                                                  <hr
                                                    className="starOnModify"
                                                    onClick={() =>
                                                      selectStarOnModify(
                                                        2,
                                                        commentItem.text,
                                                      )
                                                    }
                                                    onMouseOver={() =>
                                                      viewStarsOnModify()
                                                    }
                                                    onMouseOut={() =>
                                                      viewOutStarsOnModify()
                                                    }
                                                    title="매우좋음"
                                                  />
                                                </StarWrapperOnModify>
                                                <ModifyCommentTextarea
                                                  ref={modifyTextareaRef}
                                                  maxLength={150}
                                                  onChange={(e: any) => {
                                                    onChangeModifyComment(e);
                                                  }}
                                                  onKeyPress={(e: any) =>
                                                    controlTextArea(e)
                                                  }
                                                  value={modifyCommentVal}
                                                />
                                              </ModifyCommentTextareaWrapper>
                                            </li>
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
                                      </>
                                    ) : (modifyCompleted === true &&
                                        modifyCompletedAdmin === false &&
                                        reply === false &&
                                        index === selectedCommentUid &&
                                        commentItem.userNo ===
                                          myInfo?.userNo) ||
                                      (modifyCompletedAdmin === true &&
                                        modifyCompleted === false &&
                                        reply === false &&
                                        index === selectedCommentUid) ? (
                                      <CommentDescOnModifyCompletedRight className="depthFalseRight">
                                        <CommentBtns>
                                          {commentItem.userNo ===
                                            myInfo?.userNo ||
                                          myInfo?.roleType === 'ADMIN' ? (
                                            <>
                                              <span
                                                onClick={() => {
                                                  setReplyCommentVal('');
                                                  setSelectedCommentUid(
                                                    commentItem.uid,
                                                  );
                                                  setReply(true);
                                                  setModify(false);
                                                  getMaxUidPerOneRdepth(
                                                    commentItem.wno,
                                                    commentItem.rdepth,
                                                  );
                                                  setStarOnReply(-3);
                                                }}
                                                title="답글"
                                              >
                                                <hr />
                                              </span>
                                              <span
                                                onClick={() => {
                                                  setModifyCommentVal('');
                                                  setModify(true);
                                                  setReply(false);
                                                  setStarOnModify(-3);
                                                }}
                                                title="수정"
                                              >
                                                <hr />
                                              </span>
                                              <span
                                                title="삭제"
                                                onClick={deleteComment(
                                                  commentItem.cno,
                                                  commentItem.wno,
                                                  commentItem.uid,
                                                  commentItem.rnum,
                                                  commentItem.rdepth,
                                                )}
                                              >
                                                <hr />
                                              </span>
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </CommentBtns>
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
                                      </CommentDescOnModifyCompletedRight>
                                    ) : (
                                      <CommentDesc2 className="depthFalseRight">
                                        <CommentBtns>
                                          {commentItem.userNo ===
                                            myInfo?.userNo ||
                                          myInfo?.roleType === 'ADMIN' ? (
                                            <>
                                              <span
                                                onClick={() => {
                                                  setReplyCommentVal('');
                                                  setSelectedCommentUid(
                                                    commentItem.uid,
                                                  );
                                                  setReply(true);
                                                  setModify(false);
                                                  getMaxUidPerOneRdepth(
                                                    commentItem.wno,
                                                    commentItem.rdepth,
                                                  );
                                                  setStarOnReply(-3);
                                                }}
                                                title="답글"
                                              >
                                                <hr />
                                              </span>
                                              <span
                                                onClick={() => {
                                                  setModifyCommentVal('');
                                                  setSelectedCommentUid(index);
                                                  setModify(true);
                                                  setReply(false);
                                                  setStarOnModify(-3);
                                                }}
                                                title="수정"
                                              >
                                                <hr />
                                              </span>
                                              <span
                                                title="삭제"
                                                onClick={deleteComment(
                                                  commentItem.cno,
                                                  commentItem.wno,
                                                  commentItem.uid,
                                                  commentItem.rnum,
                                                  commentItem.rdepth,
                                                )}
                                              >
                                                <hr />
                                              </span>
                                            </>
                                          ) : (
                                            myInfo?.roleType === 'USER' && (
                                              <span
                                                onClick={() => {
                                                  setReplyCommentVal('');
                                                  setSelectedCommentUid(
                                                    commentItem.uid,
                                                  );
                                                  setModify(false);
                                                  setReply(true);
                                                  getMaxUidPerOneRdepth(
                                                    commentItem.wno,
                                                    commentItem.rdepth,
                                                  );
                                                  setStarOnReply(-3);
                                                }}
                                                title="답글"
                                              >
                                                <hr />
                                              </span>
                                            )
                                          )}
                                        </CommentBtns>
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
                              </>
                            ) : (
                              commentItem.depth === 1 && (
                                <>
                                  {(modify === true &&
                                    index === selectedCommentUid &&
                                    commentItem.userNo === myInfo?.userNo) ||
                                  (modify === true &&
                                    index === selectedCommentUid &&
                                    myInfo?.roleType === 'ADMIN') ? (
                                    <>
                                      <CommentDesc2 className="depthTrueRight">
                                        <CommentDepthToRight />
                                        <CommentBtns>
                                          <span
                                            title="공감온도"
                                            onClick={showStarsOnModify}
                                          >
                                            <hr />
                                          </span>
                                          <span
                                            title="완료"
                                            onClick={() => {
                                              onSubmitOnModify(commentItem.uid);
                                            }}
                                          >
                                            <hr />
                                          </span>
                                          <span
                                            title="삭제"
                                            onClick={deleteComment(
                                              commentItem.cno,
                                              commentItem.wno,
                                              commentItem.uid,
                                              commentItem.rnum,
                                              commentItem.rdepth,
                                            )}
                                          >
                                            <hr />
                                          </span>
                                        </CommentBtns>
                                        <CommentDescUl>
                                          <li>{commentItem.userName}</li>
                                          <li>
                                            <ModifyCommentTextareaWrapper
                                              style={{ width: `8.99rem` }}
                                              id="controlScrollCapturing"
                                            >
                                              <StarWrapperOnModify
                                                ref={starWrapperOnModify}
                                              >
                                                <hr
                                                  className="starOnModify"
                                                  onClick={() =>
                                                    selectStarOnModify(
                                                      -2,
                                                      commentItem.text,
                                                    )
                                                  }
                                                  onMouseOver={() =>
                                                    viewStarsOnModify()
                                                  }
                                                  onMouseOut={() =>
                                                    viewOutStarsOnModify()
                                                  }
                                                  title="매우 나쁨"
                                                />
                                                <hr
                                                  className="starOnModify"
                                                  onClick={() =>
                                                    selectStarOnModify(
                                                      -1,
                                                      commentItem.text,
                                                    )
                                                  }
                                                  onMouseOver={() =>
                                                    viewStarsOnModify()
                                                  }
                                                  onMouseOut={() =>
                                                    viewOutStarsOnModify()
                                                  }
                                                  title="나쁨"
                                                />
                                                <hr
                                                  className="starOnModify"
                                                  onClick={() =>
                                                    selectStarOnModify(
                                                      0,
                                                      commentItem.text,
                                                    )
                                                  }
                                                  onMouseOver={() =>
                                                    viewStarsOnModify()
                                                  }
                                                  onMouseOut={() =>
                                                    viewOutStarsOnModify()
                                                  }
                                                  title="보통"
                                                />
                                                <hr
                                                  className="starOnModify"
                                                  onClick={() =>
                                                    selectStarOnModify(
                                                      1,
                                                      commentItem.text,
                                                    )
                                                  }
                                                  onMouseOver={() =>
                                                    viewStarsOnModify()
                                                  }
                                                  onMouseOut={() =>
                                                    viewOutStarsOnModify()
                                                  }
                                                  title="좋음"
                                                />
                                                <hr
                                                  className="starOnModify"
                                                  onClick={() =>
                                                    selectStarOnModify(
                                                      2,
                                                      commentItem.text,
                                                    )
                                                  }
                                                  onMouseOver={() =>
                                                    viewStarsOnModify()
                                                  }
                                                  onMouseOut={() =>
                                                    viewOutStarsOnModify()
                                                  }
                                                  title="매우좋음"
                                                />
                                              </StarWrapperOnModify>
                                              <ModifyCommentTextarea
                                                ref={modifyTextareaRef}
                                                maxLength={150}
                                                onChange={(e: any) => {
                                                  onChangeModifyComment(e);
                                                }}
                                                onKeyPress={(e: any) =>
                                                  controlTextArea(e)
                                                }
                                                value={modifyCommentVal}
                                                style={{ width: `8.76rem` }}
                                              />
                                            </ModifyCommentTextareaWrapper>
                                          </li>
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
                                  ) : (modifyCompleted === true &&
                                      modifyCompletedAdmin === false &&
                                      reply === false &&
                                      index === selectedCommentUid &&
                                      commentItem.userNo === myInfo?.userNo) ||
                                    (modifyCompletedAdmin === true &&
                                      modifyCompleted === false &&
                                      reply === false &&
                                      index === selectedCommentUid) ? (
                                    <CommentDescOnModifyCompletedRight className="depthTrueRight">
                                      <CommentDepthToRight />
                                      <CommentBtns>
                                        {commentItem.userNo ===
                                          myInfo?.userNo ||
                                        myInfo?.roleType === 'ADMIN' ? (
                                          <>
                                            <span
                                              onClick={() => {
                                                setModifyCommentVal('');

                                                setModify(true);
                                                setReply(false);
                                                setStarOnModify(-3);
                                              }}
                                              title="수정"
                                            >
                                              <hr />
                                            </span>
                                            <span
                                              title="삭제"
                                              onClick={deleteComment(
                                                commentItem.cno,
                                                commentItem.wno,
                                                commentItem.uid,
                                                commentItem.rnum,
                                                commentItem.rdepth,
                                              )}
                                            >
                                              <hr />
                                            </span>
                                          </>
                                        ) : (
                                          <></>
                                        )}
                                      </CommentBtns>
                                      <CommentDescUl>
                                        <li>{commentItem.userName}</li>
                                        <li style={{ width: `8.65rem` }}>
                                          {commentItem.text}
                                        </li>
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
                                    </CommentDescOnModifyCompletedRight>
                                  ) : (replyCompleted === true &&
                                      replyCompletedAdmin === false &&
                                      modify === false &&
                                      lastReply === commentItem.uid) ||
                                    (replyCompletedAdmin === true &&
                                      replyCompleted === false &&
                                      modify === false &&
                                      lastReply === commentItem.uid) ? (
                                    <CommentDescOnReplyCompletedRight className="depthTrueRight">
                                      <CommentDepthToRight />
                                      <CommentBtns>
                                        {(commentItem.userNo ===
                                          myInfo?.userNo ||
                                          myInfo?.roleType === 'ADMIN') && (
                                          <>
                                            <span
                                              onClick={() => {
                                                setSelectedCommentUid(index);
                                                setModify(true);
                                                setStarOnModify(-3);
                                                setModifyCommentVal('');
                                              }}
                                              title="수정"
                                            >
                                              <hr />
                                            </span>
                                            <span
                                              title="삭제"
                                              onClick={deleteComment(
                                                commentItem.cno,
                                                commentItem.wno,
                                                commentItem.uid,
                                                commentItem.rnum,
                                                commentItem.rdepth,
                                              )}
                                            >
                                              <hr />
                                            </span>
                                          </>
                                        )}
                                      </CommentBtns>
                                      <CommentDescUl>
                                        <li>{commentItem.userName}</li>
                                        <li style={{ width: `8.65rem` }}>
                                          {commentItem.text}
                                        </li>
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
                                    </CommentDescOnReplyCompletedRight>
                                  ) : (
                                    <CommentDesc2 className="depthTrueRight">
                                      <CommentDepthToRight />
                                      <CommentBtns>
                                        {(commentItem.userNo ===
                                          myInfo?.userNo ||
                                          myInfo?.roleType === 'ADMIN') && (
                                          <>
                                            <span
                                              onClick={() => {
                                                setSelectedCommentUid(index);
                                                setModify(true);
                                                setStarOnModify(-3);
                                                setModifyCommentVal('');
                                              }}
                                              title="수정"
                                            >
                                              <hr />
                                            </span>
                                            <span
                                              title="삭제"
                                              onClick={deleteComment(
                                                commentItem.cno,
                                                commentItem.wno,
                                                commentItem.uid,
                                                commentItem.rnum,
                                                commentItem.rdepth,
                                              )}
                                            >
                                              <hr />
                                            </span>
                                          </>
                                        )}
                                      </CommentBtns>
                                      <CommentDescUl>
                                        <li>
                                          {commentItem.userName === null
                                            ? '탈퇴한 회원'
                                            : commentItem.userName}
                                        </li>
                                        <li style={{ width: `8.65rem` }}>
                                          {commentItem.text}
                                        </li>
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
                                  )}
                                </>
                              )
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
                    <span style={{ left: '0.33rem', bottom: '-0.02rem' }}>
                      -
                    </span>
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
                        onMouseOut={() => viewOutStars()}
                        title="매우 나쁨"
                      />
                      <hr
                        className="star"
                        onClick={() => selectStar(-1)}
                        onMouseOver={() => viewStars()}
                        onMouseOut={() => viewOutStars()}
                        title="나쁨"
                      />
                      <hr
                        className="star"
                        onClick={() => selectStar(0)}
                        onMouseOver={() => viewStars()}
                        onMouseOut={() => viewOutStars()}
                        title="보통"
                      />
                      <hr
                        className="star"
                        onClick={() => selectStar(1)}
                        onMouseOver={() => viewStars()}
                        onMouseOut={() => viewOutStars()}
                        title="좋음"
                      />
                      <hr
                        className="star"
                        onClick={() => selectStar(2)}
                        onMouseOver={() => viewStars()}
                        onMouseOut={() => viewOutStars()}
                        title="매우좋음"
                      />
                    </StarWrapper>
                  )}
                  {!isAuthorized &&
                  myInfo?.roleType !== 'USER' &&
                  myInfo?.roleType !== 'ADMIN' ? (
                    <form method="post" onSubmit={onSubmit}>
                      <AddCommentTextarea
                        placeholder="댓글 등록은 회원만 이용 가능합니다."
                        ref={textareaRef}
                        maxLength={150}
                        value={commentVal}
                        onChange={onChangeContent}
                        onKeyPress={(e: any) => controlTextArea(e)}
                        disabled
                        readOnly
                      />
                      <Button
                        style={{
                          width: `3.65rem`,
                          height: `3.28rem`,
                          left: `11.76rem`,
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
                        maxLength={150}
                        onChange={onChangeContent}
                        onKeyPress={(e: any) => controlTextArea(e)}
                      />
                      <Button
                        style={{
                          width: `3.53rem`,
                          height: `3.28rem`,
                          left: `11.76rem`,
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

export default ContentDesc;
