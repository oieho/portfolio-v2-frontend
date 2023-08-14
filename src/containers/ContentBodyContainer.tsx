import React from 'react';
import { useSelector } from 'react-redux';
import ContentBody from '../components/common/ContentBody';
import { RootState } from '../modules';

const ContentBodyContainer = () => {
  const { board } = useSelector(({ auth, board, loading }: RootState) => ({
    board: board.board,
  }));

  return <ContentBody board={board} />;
};

export default ContentBodyContainer;
