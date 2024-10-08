import styled from 'styled-components';
import React, { useState, useEffect } from 'react';

const SuccessMessage = styled.div`
  width: 266px;
  margin-top: 121px;
  position: absolute;
  color: #00b300;
  text-align: center;
  font-size: 0.875rem;
  @media (min-width: 1px) and (max-width: 768px) {
    position: absolute;
    top: 11.25rem;
    left: -3.4rem;
  }
`;
const ErrorMessage = styled.div`
  width: 266px;
  margin-top: 121px;
  position: absolute;
  color: #00b300;
  text-align: center;
  font-size: 0.875rem;
  @media (min-width: 1px) and (max-width: 768px) {
    position: absolute;
    top: 11.25rem;
    left: -3.4rem;
  }
`;
interface Props {
  readonly timeToLive: number;
}
const CountDownTimer = ({ timeToLive }: Props) => {
  const [remainingTime, setRemainingTime] = useState(timeToLive);
  const [showTimer, setShowTimer] = useState(false);
  useEffect(() => {
    if (!showTimer) {
      setShowTimer(true);
    }
    const intervalId = setInterval(() => {
      setRemainingTime(remainingTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [remainingTime, showTimer]);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = (remainingTime % 60).toString().padStart(2, '0');
  return (
    <div>
      {showTimer && remainingTime > 0 ? (
        <SuccessMessage>
          {minutes}:{seconds}
        </SuccessMessage>
      ) : (
        <ErrorMessage>시간이 만료되었습니다.</ErrorMessage>
      )}
    </div>
  );
};

export default CountDownTimer;
