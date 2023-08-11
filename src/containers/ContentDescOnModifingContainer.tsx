import React, { useEffect } from 'react';
import { getAuthorized } from '../modules/selector';
import { connect, useDispatch, useSelector } from 'react-redux';
import ContentDescOnModifing from '../components/common/ContentDescOnModifing';
import { RootState } from '../modules';
import { fetchOne, FETCH_ONE } from '../modules/board';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import store from '../modules/mobxStore';
import axios from 'axios';

interface Props {
  readonly isAuthorized: boolean;
}
const ContentDescOnModifingContainer: React.FC<Props> = observer(
  ({ isAuthorized }: Props) => {
    const dispatch = useDispatch();
    const { deliveryImgInfoOnWriting } = store;
    const { imgInfoOnWriting } = deliveryImgInfoOnWriting;

    const { wno } = useParams<{ wno: any }>();
    useEffect(() => {
      dispatch(fetchOne(wno));
    }, [dispatch, wno]);
    const { myInfo, board, isLoading } = useSelector(
      ({ auth, board, loading }: RootState) => ({
        myInfo: auth.myInfo,
        board: board.board,
        isLoading: loading[FETCH_ONE],
      }),
    );

    const generateThumbnailDir = async (file: File) => {
      try {
        const formData = new FormData();
        formData.append('thumbnailFile', file);
        const response = await axios.post('/generateThumbnailDir', formData);
        console.log('response:::', response);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    };

    const displayThumbnail = async () => {
      try {
        const response = await axios.get(`/display/${wno}`, {
          responseType: 'arraybuffer', // byte[] 형식으로 응답 받기
        });
        return response;
      } catch (error) {
        console.log('Error:', error);
        throw error;
      }
    };

    const modifyArticle = async (
      wno: string,
      portfolioContent: string,
      title: string,
      thumbnailInfo: string,
      thumbnailFile: File,
      tools: string[],
      description: string,
      category: string,
      combinedHashTag: string[],
      hits: string,
    ) => {
      const formData = new FormData();
      formData.append(
        'boardImages',
        new Blob(
          [
            JSON.stringify(
              imgInfoOnWriting.map((file) => ({
                imgName: file.imgName,
                uuid: file.uuid,
                path: 'static' + file.path,
              })),
            ),
          ],
          { type: 'application/json' },
        ),
      );
      formData.append('wno', wno);
      formData.append('thumbnailFile', thumbnailFile);
      formData.append('portfolioContent', portfolioContent);
      formData.append('title', title);
      if (thumbnailInfo.length > 0) {
        formData.append(
          'thumbnailImage',
          new Blob(
            [
              JSON.stringify({
                imgName: thumbnailInfo.substring(
                  thumbnailInfo.lastIndexOf('_') + 1,
                ),
                uuid: thumbnailInfo.substring(
                  thumbnailInfo.lastIndexOf('\\') + 3,
                  thumbnailInfo.lastIndexOf('_'),
                ),
                path: thumbnailInfo.substring(
                  thumbnailInfo.lastIndexOf('\\'),
                  0,
                ),
              }),
            ],
            { type: 'application/json' },
          ),
        );
      }
      tools.forEach((tool) => {
        formData.append('tools', tool);
      });
      formData.append('description', description);
      formData.append('category', category);
      combinedHashTag.forEach((hashTag) => {
        formData.append('hashTag', hashTag);
      });
      formData.append('hits', hits);

      deliveryImgInfoOnWriting.setImgInfoOnWriting([]);

      await axios
        .put('/boards/modify', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .catch((error) => {
          console.log(error);
        });
    };
    return (
      <ContentDescOnModifing
        modifyArticle={modifyArticle}
        myInfo={myInfo}
        generateThumbnailDir={generateThumbnailDir}
        displayThumbnail={displayThumbnail}
        board={board}
        isLoading={isLoading}
        isAuthorized={isAuthorized}
      />
    );
  },
);

export default connect((state: RootState) => {
  return {
    isAuthorized: getAuthorized(state),
  };
})(ContentDescOnModifingContainer);
