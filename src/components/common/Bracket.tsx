import styled from 'styled-components';
import { useRef } from 'react';

const LeftBracketBlock = styled.div`
  position: absolute;
`;
const LeftBracketImg = styled.img`
  position: relative;
  top: 365px;
  left: -524px;
  z-index: 3;
  transition: all 0.1s ease-out;
`;

const RightBracketImg = styled.img`
  position: relative;
  bottom: -312px;
  right: 578px;
  z-index: 2;
  transition: all 0.1s ease-out;
`;
const LeftBracket = () => {
  const lBracket = useRef<any>();
  const rBracket = useRef<any>();
  onmousemove = (e) => {
    lBracket.current.style.top = 367 + e.pageX / 150 + 'px';
    lBracket.current.style.left = -524 + e.pageY / 90 + 'px';
    rBracket.current.style.bottom = -314 + e.pageX / 150 + 'px';
    rBracket.current.style.right = 578 + e.pageY / 100 + 'px';
  };

  return (
    <LeftBracketBlock>
      <LeftBracketImg
        ref={lBracket}
        src={process.env.PUBLIC_URL + '/images/leftbracket.png'}
        alt="leftbracket"
      />
      <RightBracketImg
        ref={rBracket}
        src={process.env.PUBLIC_URL + '/images/rightbracket.png'}
        alt="rightbracket"
      />
    </LeftBracketBlock>
  );
};

export default LeftBracket;
