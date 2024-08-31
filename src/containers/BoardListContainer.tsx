import React from 'react';
import { useSelector } from 'react-redux';
import BoardList from '../components/common/BoardList';
import { connect, useDispatch } from 'react-redux';
import { BoardListPayload, fetchSelectedList } from '../modules/reduxThunk';
import { RootState } from '../modules';
import { getAuthorized } from '../modules/selector';

interface Props {
  readonly isAuthorized: boolean;
}
const BoardListContainer = ({ isAuthorized }: Props) => {
  const dispatch = useDispatch();

  const { myInfo, boards, loading } = useSelector((state: any) => ({
    myInfo: state.auth.myInfo,
    loading: state.reduxThunk.loading,
    boards: state.reduxThunk.data,
  }));
  const onSelectedList = (selected: BoardListPayload) => {
    dispatch(fetchSelectedList(selected) as any);
  };
  return (
    <BoardList
      boards={boards}
      loading={loading}
      onSelectedList={onSelectedList}
      myInfo={myInfo}
      isAuthorized={isAuthorized}
    />
  );
};

export default connect((state: RootState) => {
  return {
    isAuthorized: getAuthorized(state),
  };
})(BoardListContainer);
