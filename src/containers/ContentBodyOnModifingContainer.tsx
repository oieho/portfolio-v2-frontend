import React from 'react';
import ContentBodyOnModifing from '../components/common/ContentBodyOnModifing';
import { useSelector } from 'react-redux';
import { RootState } from '../modules';
import axios from 'axios';

const ContentBodyOnModifingContainer = () => {
  const { board } = useSelector(({ board }: RootState) => ({
    board: board.board,
  }));

  const uploadToServer = async (files: File) => {
    const formData = new FormData();
    formData.append('uploadFile', files);
    try {
      const response = await axios.post('/gettingUrlOnPortfolioImg', formData);
      return response.data;
    } catch (error) {
      // Handle error
      console.error(error);
      return null; // 또는 오류를 나타내는 다른 값
    }
  };

  return (
    <ContentBodyOnModifing uploadToServer={uploadToServer} board={board} />
  );
};

export default ContentBodyOnModifingContainer;
