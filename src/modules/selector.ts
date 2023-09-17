import { createSelector } from 'reselect';
import { RootState } from './index';
const getAccessToken = (state: RootState) => state.auth.accessToken;
const getMyInfo = (state: RootState) => state.auth.myInfo;
export const getAuthorized = createSelector(
  [getAccessToken, getMyInfo],
  (accessToken, myInfo) => accessToken.length > 0 || !!myInfo,
);

// export const isAdmin = createSelector(
//   [getAuthorized, getMyInfo],
//   (isAuthorized, myInfo) =>
//     isAuthorized && !!myInfo && myInfo.authList[0].auth === 'ROLE_ADMIN',
// );
export const isMember = createSelector(
  [getAuthorized, getMyInfo],
  (isAuthorized, myInfo) =>
    isAuthorized && !!myInfo && myInfo.authList[0].auth === 'ROLE_MEMBER',
);
