import React from 'react';
import ContentBodyOnWriting from '../components/common/ContentBodyOnWriting';
import axios from 'axios';

const ContentBodyOnWritingContainer = () => {
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

  return <ContentBodyOnWriting uploadToServer={uploadToServer} />;
};

export default ContentBodyOnWritingContainer;
