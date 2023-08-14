import { ReactNode, forwardRef, RefObject } from 'react';
import styled, { CSSProperties } from 'styled-components';

const AddButton = styled.span`
  position: absolute;
  display: inline-block;
  background-color: #000000;
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 600;
  width: 1.12rem;
  height: 1.12rem;
  border-radius: 50%;
  left: 0.27rem;
  bottom: 0.27rem;
  cursor: pointer;
  transform: rotate(0deg);
  z-index: 2;
  /* &:hover {
    @keyframes rotate_image {
      100% {
        transform: rotate(360deg);
      }
    }
    animation: rotate_image 2s linear infinite;
  } */
  span {
    position: absolute;
    right: 0.156rem;
    bottom: -0.062rem;
    &:hover {
      color: greenyellow;
    }
    &:active {
      color: #ffffff;
    }
  }
  span[title='글 수정'] {
    position: absolute;
    font-size: 0.725rem;
    left: 0.089rem;
    bottom: 0.01rem;
    &:hover {
      color: greenyellow;
    }
    &:active {
      color: #ffffff;
    }
  }
  span[title='완료'] {
    position: absolute;
    left: 0.26rem;
    bottom: 0.001rem;
    font-weight: 500;
    font-size: 0.9rem;
    color: greenyellow;

    &:hover {
      color: #ffffff;
    }
    &:active {
      color: greenyellow;
    }
  }
  span[title='Prev'] {
    position: absolute;
    left: 0.22rem;
    bottom: 0.055rem;
    font-weight: 500;
    font-size: 0.9rem;
    color: #ffffff;

    &:hover {
      color: greenyellow;
    }
    &:active {
      color: #ffffff;
    }
  }
  span[title='Next'] {
    position: absolute;
    left: 0.28rem;
    bottom: 0.055rem;
    font-weight: 500;
    font-size: 0.9rem;
    color: #ffffff;

    &:hover {
      color: greenyellow;
    }
    &:active {
      color: #ffffff;
    }
  }
`;

interface AddButtonProps {
  children: ReactNode;
  style?: CSSProperties | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | any;
  onMouseDown?: React.MouseEventHandler<HTMLButtonElement> | any;
}
const Button = forwardRef<HTMLButtonElement, AddButtonProps>(
  ({ children, style, ...rest }, ref) => (
    <AddButton
      ref={ref as RefObject<HTMLButtonElement>}
      style={style}
      {...rest}
    >
      {children}
    </AddButton>
  ),
);
export default Button;
