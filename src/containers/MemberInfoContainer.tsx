import React from 'react';
import { useSelector } from 'react-redux';
import MemberInfo from '../components/common/MemberInfo';
import { RootState } from '../modules';
import { FETCH_ONE } from '../modules/member';

const MemberInfoContainer = () => {
  const { myInfo, isLoading } = useSelector(({ auth, loading }: RootState) => ({
    myInfo: auth.myInfo,
    isLoading: loading[FETCH_ONE],
  }));

  return <MemberInfo myInfo={myInfo} isLoading={isLoading} />;
};
export default MemberInfoContainer;
