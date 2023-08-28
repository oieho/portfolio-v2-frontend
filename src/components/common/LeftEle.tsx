import styled from 'styled-components';
import { useState, useEffect } from 'react';
import React from 'react';

const LeftEleBlock = styled.div``;
const SuperImg = styled.img`
  position: absolute;
  bottom: 19.7rem;
  left: -6.7rem;
  z-index: 0;
`;

const VarImg = styled.img`
  position: absolute;
  bottom: 18.75rem;
  left: -4.3rem;
  z-index: 0;
`;

const RequestMappingImg = styled.img`
  position: absolute;
  bottom: 13.5rem;
  left: -11.1rem;
  z-index: 1;
`;

const PaddingImg = styled.img`
  position: absolute;
  bottom: 7.8rem;
  left: -8.4rem;
  z-index: 0;
`;
const FunctionImg = styled.img`
  position: absolute;
  bottom: 6.5rem;
  left: -8.5rem;
  z-index: 0;
`;
const GetelementImg = styled.img`
  position: absolute;
  bottom: -4.5rem;
  left: -7.8rem;
  z-index: 0;
`;
const LeftEle = () => {
  const [seqVar2, setSeqVar2] = useState(0);
  const [images] = useState(() => {
    const images = [] as any[];
    for (let i = 0; i <= 1; i++) {
      const img = new Image();
      img.src = `/images/pngSequence2/padding${i}.png`;
      images.push(img);
    }
    return images;
  });

  useEffect(() => {
    const paddingAni = setInterval(() => {
      if (seqVar2 < images.length - 1) {
        setSeqVar2(seqVar2 + 1);
      } else {
        setSeqVar2(0);
      }
    }, 500);
    return () => clearInterval(paddingAni);
  }, [images.length, seqVar2]);
  return (
    <LeftEleBlock>
      <SuperImg
        src={process.env.PUBLIC_URL + '/images/super.png'}
        alt="super"
      />
      <VarImg src={process.env.PUBLIC_URL + '/images/var.png'} alt="var" />
      <RequestMappingImg
        src={process.env.PUBLIC_URL + '/images/requestmapping.png'}
        alt="requestmapping"
      />
      <PaddingImg src={images[seqVar2].src} alt="padding" />
      <FunctionImg
        src={process.env.PUBLIC_URL + '/images/function.png'}
        alt="function"
      />
      <GetelementImg
        src={process.env.PUBLIC_URL + '/images/getelement.png'}
        alt="function"
      />
    </LeftEleBlock>
  );
};

export default React.memo(LeftEle); // 똑같은 컴포넌트 재사용으로 인한 Memoization 적용
