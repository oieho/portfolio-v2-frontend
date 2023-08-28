import { ReactNode } from 'react';
import styled from 'styled-components';

const ResponsiveBlock = styled.div`
  position: relative;
  background-color: #f5f5f5;
  top: 1.95rem;
  right: 4.85rem;
  width: 52.688rem;
  height: 44.95rem;
  box-shadow: 0px 15px 25px -6px rgba(0, 0, 0, 0.03);
  border-radius: 1rem;
  z-index: 1;
  @media (max-width: 1024px) {
    width: 768px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;
interface childrenProps{
  children:ReactNode;
}
const Responsive = ({ children, ...rest }:childrenProps) => {
  return <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>;
};

export default Responsive;
