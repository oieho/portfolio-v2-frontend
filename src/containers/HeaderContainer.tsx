import React, { useEffect, useCallback, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { connect, useDispatch, useSelector } from 'react-redux';
import Header from '../components/common/Header';
import { getAuthorized } from '../modules/selector';
import { setAccessToken, setMyInfo } from '../modules/auth';
import client from '../lib/api/client';
import { MyInfo } from '../App';
import { RootState } from '../modules';
import { fetchCount } from '../modules/count';
import { MainContext } from '../pages/Main';
import { observer } from 'mobx-react';
import store from '../modules/mobxStore';
import Cookies from 'js-cookie';

interface Props {
  readonly isAuthorized: boolean;
  readonly myInfo: MyInfo | null;
}
const HeaderContainer: React.FC<Props> = observer(
  ({ isAuthorized, myInfo }: Props) => {
    const { state, actions } = useContext(MainContext);
    const { deliveryImgInfoOnWriting } = store;
    const { imgInfoOnWriting } = deliveryImgInfoOnWriting;
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const dispatch = useDispatch();

    const { countInfos } = useSelector((state: RootState) => ({
      countInfos: state.count.countInfos,
    }));
    useEffect(() => {
      dispatch(fetchCount());
    }, [dispatch]);

    const hideContent = useCallback(() => {
      setTimeout(() => {
        actions.setToggleBackBtn(false);
      }, 700);

      const selectedQParam = searchParams.get('selected');
      const titleQParam = searchParams.get('title');
      const countQParam = searchParams.get('count');
      const regDateQParam = searchParams.get('regDate');
      const searchTypeQParam = searchParams.get('searchType');
      const keywordQParam = searchParams.get('keyword');
      const saying = document.getElementById('saying');
      saying!.style.opacity = '1';
      saying!.style.transition = 'opacity 0.2s 0.75s ease-out';
      deliveryImgInfoOnWriting.setImgInfoOnWriting([]); // 배열 초기화 안하면 이전 저장 내역이 존재

      navigate(
        `/boards?selected=${selectedQParam}&title=${titleQParam}&count=${countQParam}&regDate=${regDateQParam}&searchType=${searchTypeQParam}&keyword=${keywordQParam}`,
      );
    }, [actions, deliveryImgInfoOnWriting, navigate, searchParams]);

    const onLogout = () => {
      delete client.defaults.headers.common.Authorization;
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      dispatch(setAccessToken(''));
      dispatch(setMyInfo(null as unknown as MyInfo));
      if (state.boardModifiable === true) {
        actions.setBoardModifiable((prevValue: boolean) => !prevValue);
        hideContent();
      } else if (state.boardRemovable === true) {
        actions.setBoardRemovable((prevValue: boolean) => !prevValue);
      }
    };
    return (
      <Header
        myInfo={myInfo}
        isAuthorized={isAuthorized}
        countInfos={countInfos}
        onLogout={onLogout}
      />
    );
  },
);

export default connect((state: RootState) => {
  return {
    isAuthorized: getAuthorized(state),
    myInfo: state.auth.myInfo,
  };
})(HeaderContainer);
