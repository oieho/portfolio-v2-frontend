import React from 'react';
import { useSelector } from 'react-redux';
import BoardList from '../components/common/BoardList';
import { connect, useDispatch } from 'react-redux';
import { BoardListPayload, fetchSelectedList } from '../modules/boardSlice';
import { RootState } from '../modules';
import { getAuthorized } from '../modules/selector';

interface Props {
  readonly isAuthorized: boolean;
}
const BoardListContainer = ({ isAuthorized }: Props) => {
  const dispatch = useDispatch();

  const { myInfo, boards } = useSelector((state: any) => ({
    myInfo: state.auth.myInfo,
    boards: state.boardSlice.data,
  }));
  const onSelectedList = (selected: BoardListPayload) => {
    dispatch(fetchSelectedList(selected) as any);
  };
  return (
    <BoardList
      boards={boards}
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
