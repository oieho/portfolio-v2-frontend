import styled from 'styled-components';

const EmptySpace = styled.div`
  display: none;
`;

const ContentDescLessThan769 = ({
  registerComment,
  modifyComment,
  replyComment,
  myInfo,
  ifNotLoggedDisplayBlock,
  board,
  comment,
  onRemove,
  extractsMaxUid,
  isLoading,
  isAuthorized,
}: any) => {
  return <EmptySpace></EmptySpace>;
};

export default ContentDescLessThan769;
