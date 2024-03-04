import React from 'react';
import CountDownTimer from '../components/common/CountDownTimer';
interface Props {
  readonly timeToLive: number;
}
const CounterDownTimerContainer = ({ timeToLive }: Props) => {
  console.log('countDownTimerContainer' + timeToLive);
  return <CountDownTimer timeToLive={timeToLive} />;
};

export default CounterDownTimerContainer;
