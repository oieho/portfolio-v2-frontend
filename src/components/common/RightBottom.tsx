import styled, { CSSProperties } from 'styled-components';
import { RefObject, useEffect, useRef, useState } from 'react';

const Wrapper = styled.div`
  position: absolute;
  left: -0.1rem;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const RightBlock = styled.div`
  position: relative;
  background: f5f5f5;
  left: 30.65rem;
  width: 16.625rem;
  height: 10rem;
  top: 0;
`;

const Saying = styled.div`
  position: absolute;
  top: 21.31rem;
  left: 0.03rem;
  border-radius: 1rem;
  width: 100%;
  height: 5.063rem;
  opacity: 1;
`;
const Copyright = styled.img`
  position: absolute;
  padding: 0;
  margin: 0;
  top: 27.4rem;
  border-radius: 1rem;
  width: 100%;
  height: 2rem;
`;

const SLbracket = styled.img`
  position: absolute;
  transition: all 1.5s ease-out;
`;
const SRbracket = styled.img`
  position: absolute;
  transition: all 1.5s ease-out;
`;
const Stexttit = styled.span`
  width: 90%;
  position: absolute;
  left: 1.65rem;
  font-size: 0.75rem;
  color: #dadada;
  opacity: 1;
  transition: all 0.8s ease-out;
`;
const Stext = styled.span`
  text-align: center;
  position: absolute;
  left: 0.9rem;
  top: 2.1rem;
  width: 89%;
  height: 2rem;
  font-size: 0.75rem;
  color: #000;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
`;
const Ctxt = styled.span`
  position: absolute;
  left: 2.6rem;
  bottom: -18.9rem;
  font-size: 0.68rem;
  span {
    font-weight: bold;
  }
`;
const RightBottom = () => {
  const [sText, setStext] = useState<string>();
  const [mvlslb, setMvlslb] = useState<number>(7.2);
  const [mvrslb, setMvrslb] = useState(7.2);
  const [mvstexttit, setMvstexttit] = useState<number>(1.4);
  const [octstexttit, setOctstexttit] = useState(0);
  const [mvstext, setMvstext] = useState<number>(0);
  const [octstext, setOctstext] = useState(0);
  const movel = useRef(null) as CSSProperties;
  const mover = useRef(null) as CSSProperties;
  const movestexttit = useRef(null) as CSSProperties &
    (RefObject<HTMLSpanElement> | null | undefined);
  const movestext = useRef() as InnerHTML &
    CSSProperties &
    (RefObject<HTMLSpanElement> | null | undefined);
  useEffect(() => {
    let text1 = 'Books are ships which pass through the vast seas of time..';
    let text2 = 'The harder you work, the more likely you can reach the goal.';
    let text3 = 'This too shall pass away.';
    let text4 =
      "Life is like a box of chocolates, You never know what you're gonna get.";
    let text5 = 'I find the harder I work, the more luck I have.';
    const arr = [text1, text2, text3, text4, text5];
    let randomInt = Math.floor(Math.random() * arr.length);
    setStext((movestext.innerHTML = arr[randomInt]));
    var toggleMvtxt = false;
    const animate = setTimeout(() => {
      toggleMvtxt = true;
      setMvlslb((movel.left = 0.2));
      setMvrslb((mover.right = 0.2));
      setTimeout(() => {
        setMvstexttit((movestexttit.top = 0.8));
        setOctstexttit((movestexttit.opacity = 1));
      }, 2200);
      setTimeout(() => {
        setMvstext((movestext.top = 2.2));
        setOctstext((movestext.opacity = 1));
      }, 3500);
      if (toggleMvtxt === true) {
        clearTimeout(animate);
      }
    }, 1000);
  }, [sText, movel, mover, setMvlslb, setMvrslb]);

  return (
    <Wrapper>
      <RightBlock>
        <Saying id="saying">
          <SLbracket
            style={{ left: `${mvlslb}rem` }}
            src={process.env.PUBLIC_URL + '/images/slbracket.png'}
            alt="Square Left Bracket of Saying"
          />
          <Stexttit
            style={{ top: `${mvstexttit}rem`, opacity: `${octstexttit}` }}
            ref={movestexttit}
          >
            Random Saying when changing a path
          </Stexttit>
          <Stext
            style={{ top: `${mvstext}rem`, opacity: `${octstext}` }}
            ref={movestext}
          >
            {sText}
          </Stext>
          <SRbracket
            style={{ right: `${mvrslb}rem` }}
            src={process.env.PUBLIC_URL + '/images/srbracket.png'}
            alt="Square Right Bracket of Saying"
          ></SRbracket>
        </Saying>
        <Copyright
          src={process.env.PUBLIC_URL + '/images/copyrightbg.png'}
          alt="Copyright Background Image"
        />
        <Ctxt>
          copyright ⓒ <span>oieho</span> all right reserved.
        </Ctxt>
      </RightBlock>
    </Wrapper>
  );
};

export default RightBottom;
