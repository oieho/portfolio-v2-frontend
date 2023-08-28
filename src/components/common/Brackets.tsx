import styled from 'styled-components';
import React from 'react';

const BracketsBlock = styled.div`
  position: absolute;
`;

const Brackets = (e: MouseEvent) => {
  return <BracketsBlock></BracketsBlock>;
};

export default Brackets;
