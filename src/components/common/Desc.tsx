import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  left: 0;
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

const Description = styled.div`
  position: absolute;
  top: -15.55rem;
  background: red;
  box-shadow: 0px 15px 25px -6px rgba(0, 0, 0, 0.03);
  border-radius: 1rem;
  width: 100%;
  height: 35.67rem;
  z-index: 3;
`;
const Right = () => {
  return (
    <Wrapper>
      <RightBlock>
        <Description />
      </RightBlock>
    </Wrapper>
  );
};

export default Right;
