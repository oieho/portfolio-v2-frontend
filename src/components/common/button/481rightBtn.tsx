// App.js

import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotateGradient = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;
const InnerBtnCircleBorder = styled.span`
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #ffffff;
`;
const BtnCircleBorder = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #ffffff;
  box-sizing: border-box;
  transform-origin: center;

  &:hover > ${InnerBtnCircleBorder} {
    background: linear-gradient(to right, #ffffff, #b6b6b6);
    animation: ${rotateGradient} 1s linear infinite;
  }

  > ${InnerBtnCircleBorder} > span {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 27px;
    height: 27px;
    border-radius: 50%;
    background-color: #000000;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }
`;

const CircleBtn = ({ children }: any) => {
  return (
    <BtnCircleBorder>
      <InnerBtnCircleBorder>
        <span />
      </InnerBtnCircleBorder>
      {children}
    </BtnCircleBorder>
  );
};

export default CircleBtn;
