import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import SocialLogin from './components/common/SocialLogin';
import MailSender from './containers/MailSenderContainer';
import MemberJoin from './containers/MemberJoinContainer';
import MemberInfo from './containers/MemberInfoContainer';
import MemberModifyPassword from './containers/MemberModifyPasswordContainer';
import MemberFindId from './containers/MemberFindIdContainer';
import MemberFindPassword from './containers/MemberFindPasswordContainer';
import MemberModify from './containers/MemberModifyContainer';
import ContentDesc from './containers/ContentDescContainer';
import ContentBody from './containers/ContentBodyContainer';
import ContentDescOnWriting from './containers/ContentDescOnWritingContainer';
import ContentBodyOnWriting from './containers/ContentBodyOnWritingContainer';
import ContentDescOnModifing from './containers/ContentDescOnModifingContainer';
import ContentBodyOnModifing from './containers/ContentBodyOnModifingContainer';
import Blog from './pages/Blog';
import { Helmet } from 'react-helmet-async';
const App = () => {
  return (
    <>
      <Helmet>
        <title>OIEHO - [메인 페이지]</title>
      </Helmet>
      <Routes>
        <Route path="/*" element={<Main />}>
          <Route
            path="boards/view/:wno"
            element={
              <>
                <ContentBody />
                <ContentDesc />
              </>
            }
          />
          <Route
            path="boards/write"
            element={
              <>
                <ContentBodyOnWriting />
                <ContentDescOnWriting />
              </>
            }
          />
          <Route
            path="boards/modify/:wno"
            element={
              <>
                <ContentBodyOnModifing />
                <ContentDescOnModifing />
              </>
            }
          />

          <Route path="*/#/socialLogin" element={<SocialLogin />} />
          <Route path="join" element={<MemberJoin />} />
          <Route path="memberInfo" element={<MemberInfo />} />
          <Route path="modifyPassword" element={<MemberModifyPassword />} />
          <Route path="modify" element={<MemberModify />} />
          <Route path="findId" element={<MemberFindId />} />
          <Route path="findPassword" element={<MemberFindPassword />} />
          <Route path="mailSender" element={<MailSender />} />
        </Route>
        <Route path="/blog" element={<Blog />}></Route>
      </Routes>
    </>
  );
};
export interface Board {
  wno: string;
  portfolioContent: string;
  title: string;
  category: string;
  description: string;
  tools: string[];
  tags: string[];
  hits: number;
  regDate: string;
  map: any;
  cno: number;
  0: number | string;
  1: number | string;
  2: number | string;
  3: number | string;
  4: number | string;
  5: number | string;
  6: number | string;
  7: number | string;
  8: number | string;
  9: number | string | any;
}
export interface Comment {
  userNo: number;
  userName: string;
  wno: string;
  face: string[];
  text: string;
  depth: number;
  regDte: string;
}
export interface SearchResult {
  boards: [];
}

export interface searchInput {
  searchType: string;
  keyword: string;
}

export interface LoginInput {
  userId: string;
  password: string;
  autoLogin: boolean;
}
export interface ConfirmInput {
  userId: string;
  cpassword: string;
}
export interface AuthInfo {
  auth: string;
}
export interface MyInfo {
  userNo: number;
  userId: string;
  userName: string;
  authList: AuthInfo[];
  userEmail: string;
  providerType: string;
  regDate: string;
  roleType: string;
}
export interface Modifyts {
  userId: string;
  password: string;
  userEmail: string;
  userName: string;
}
export interface Member {
  userNo: number;
  userId: string;
  password: string;
  userEmail: string;
  userName: string;
  providerType: string;
}
export interface ModifyInfo {
  modifyInfo: boolean;
}
export interface TryLoginAuth {
  tryLoginAuth: boolean;
}
export interface ToggleLogin {
  toggleLogin: boolean;
}
export interface CountInfo {
  todayVar: number;
  totalVar: number;
}
export default App;
