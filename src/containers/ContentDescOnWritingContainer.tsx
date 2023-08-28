import React, { useContext } from 'react';
import { getAuthorized } from '../modules/selector';
import { connect, useSelector } from 'react-redux';
import ContentDescOnWriting from '../components/common/ContentDescOnWriting';
import { RootState } from '../modules';
import { FETCH_ONE } from '../modules/board';
import { MainContext } from '../pages/Main';
import { observer } from 'mobx-react';
import store from '../modules/mobxStore';
import axios from 'axios';

interface Props {
  readonly isAuthorized: boolean;
}
const ContentDescOnWritingContainer: React.FC<Props> = observer(
  ({ isAuthorized }: Props) => {
    const { actions } = useContext(MainContext);
    const { deliveryImgInfoOnWriting } = store;
    const { imgInfoOnWriting } = deliveryImgInfoOnWriting;
    const { myInfo, isLoading } = useSelector(
      ({ auth, loading }: RootState) => ({
        myInfo: auth.myInfo,
        isLoading: loading[FETCH_ONE],
      }),
    );

    const generateThumbnailDir = async (file: File) => {
      try {
        const result = await extractsMaxWno();
        actions.setMaxWno((result! + 1) as number);
        const formData = new FormData();
        formData.append('thumbnailFile', file);
        const response = await axios.post('/generateThumbnailDir', formData);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    };

    const extractsMaxWno = async () => {
      let result;
      await axios.post('/boards/getMaxWno').then((response) => {
        result = response.data;
      });
      return result;
    };

    const registerArticle = async (
      portfolioContent: string,
      title: string,
      thumbnailInfo: string,
      thumbnailFile: File,
      tools: string[],
      description: string,
      category: string,
      combinedHashTag: string[],
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

      formData.append('thumbnailFile', thumbnailFile);
      formData.append('portfolioContent', portfolioContent);
      formData.append('title', title);
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
              path: thumbnailInfo.substring(thumbnailInfo.lastIndexOf('\\'), 0),
            }),
          ],
          { type: 'application/json' },
        ),
      );

      tools.forEach((tool) => {
        formData.append('tools', tool);
      });
      formData.append('description', description);
      formData.append('category', category);
      combinedHashTag.forEach((hashTag) => {
        formData.append('hashTag', hashTag);
      });

      deliveryImgInfoOnWriting.setImgInfoOnWriting([]);

      await axios
        .post('/boards/register', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return (
      <ContentDescOnWriting
        registerArticle={registerArticle}
        myInfo={myInfo}
        generateThumbnailDir={generateThumbnailDir}
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
})(ContentDescOnWritingContainer);
