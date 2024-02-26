import React from 'react';
import { useSelector } from 'react-redux';
import CountDownTimer from '../components/common/CountDownTimer';
import { RootState } from '../modules';
interface Props {
  readonly timeToLive: number;
}
const CounterDownTimerContainer = ({ timeToLive }: Props) => {
  console.log('countDownTimerContainer' + timeToLive);
  return <CountDownTimer timeToLive={timeToLive} />;
};

export default CounterDownTimerContainer;
