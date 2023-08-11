import { ReactNode } from 'react';
import styled, { CSSProperties } from 'styled-components';

const StyledButton = styled.button`
  position: absolute;
  cursor: pointer;
  font-family: 'Noto Sans KR';
  font-size: 0.8rem;
  background: #000;
  width: 5.222rem;
  margin-left: -0.35rem;
  padding: 0 0.9rem;
  color: #fff;
  height: 2.56rem;
  font-weight: 500;
  border-radius: 17px;
  letter-spacing: 0.01rem;
  &:hover {
    font-family: 'Noto Sans KR';
    font-weight: 800;
    background: #000;
    color: #fff;
    height: 2.56rem;
  }
  &:active {
    font-weight: 500;
  }
`;
interface propsStr {
  children: ReactNode;
  style?: CSSProperties | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | any;
}
const Button = (props: propsStr) => <StyledButton {...props} />;

export default Button;
