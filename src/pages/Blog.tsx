import Left from '../components/common/Left';
import RightBottom from '../components/common/RightBottom';
import HeaderContainer from '../containers/HeaderContainer';
import Desc from '../components/common/Desc';
import Bracket from '../components/common/Bracket';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: #afafaf;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Blog = () => {
  return (
    <Wrapper>
      <Left portfolioHv={true} homeHv={false} />
      <Bracket />
      <HeaderContainer />
      <Desc />

      <RightBottom />
    </Wrapper>
  );
};

export default Blog;
