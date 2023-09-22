import React, { useEffect } from 'react';
import { getAuthorized } from '../modules/selector';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import ContentDesc from '../components/common/ContentDesc';
import { RootState } from '../modules';
import {
  fetchOne,
  FETCH_ONE,
  fetchComment,
  fetchCommentAndScroll,
} from '../modules/board';
import { useParams, useSearchParams } from 'react-router-dom';
import * as api from '../lib/api/board';
import axios from 'axios';

interface Props {
  readonly isAuthorized: boolean;
}
const ContentDescContainer = ({ isAuthorized }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const scrollArea = document.getElementById('scrollArea');

  const [searchParams] = useSearchParams();
  const selectedQParam = searchParams.get('selected');
  const titleQParam = searchParams.get('title');
  const countQParam = searchParams.get('count');
  const regDateQParam = searchParams.get('regDate');
  const searchTypeQParam = searchParams.get('searchType');
  const keywordQParam = searchParams.get('keyword');

  const { wno } = useParams<{ wno: any }>();

  useEffect(() => {
    dispatch(fetchOne(wno));
    dispatch(fetchComment(wno));
  }, [dispatch, wno]);
  const { myInfo, board, comment, isLoading } = useSelector(
    ({ auth, board, loading }: RootState) => ({
      myInfo: auth.myInfo,
      board: board.board,
      comment: board.comment,
      isLoading: loading[FETCH_ONE],
    }),
  );

  const registerComment = async (
    face: number,
    text: string,
    wno: number,
    userNo: number,
  ) => {
    const config = {
      params: {
        face: face,
        text: text,
        wno: wno,
        userNo: userNo,
      },
    };
    const wnoParam = wno;
    await axios
      .get('/boards/comment/register', config)
      .then((response) => {
        dispatch(fetchComment(wnoParam as any));
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 403) {
          alert('댓글이 차단되었습니다.');
        }
      });
  };
  const modifyComment = async (
    face: number,
    text: string,
    wno: number,
    uid: number,
    userNo: number,
    roleType: string,
  ) => {
    await axios
      .put('/boards/comment/modify', {
        face,
        text,
        workBoard: { wno: wno },
        uid,
        member: { userNo: userNo, roleType: roleType },
      })
      .then((response) => {
        const scrollTop = scrollArea!.scrollTop;
        dispatch(fetchCommentAndScroll({ wno, scrollTop }));
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 403) {
          alert('수정이 차단되었습니다.');
        }
      });
  };
  const replyComment = async (
    face: number,
    text: string,
    wno: number,
    uid: number,
    depth: number,
    rdepth: number,
    userNo: number,
  ) => {
    const config = {
      params: {
        face: face,
        text: text,
        wno: wno,
        uid: uid,
        depth: depth,
        rdepth: rdepth,
        userNo: userNo,
      },
    };
    await axios
      .get('/boards/comment/reply', config)
      .then((response) => {
        const scrollTop = scrollArea!.scrollTop;
        console.log(scrollTop);
        dispatch(fetchCommentAndScroll({ wno, scrollTop }));
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 403) {
          alert('댓글이 차단되었습니다.');
        }
      });
  };
  const onRemove = async (
    cno: number,
    wno: number,
    uid: number,
    rnum: number,
    rdepth: number,
  ) => {
    try {
      await api.removeComment(cno, wno, uid, rnum, rdepth);
      const scrollTop = scrollArea!.scrollTop;
      alert('삭제가 완료되었습니다.');
      navigate(
        `?selected=${selectedQParam}&title=${titleQParam}&count=${countQParam}&regDate=${regDateQParam}&searchType=${searchTypeQParam}&keyword=${keywordQParam}`,
      );
      dispatch(fetchCommentAndScroll({ wno, scrollTop }));
    } catch (e: any) {
      if (e.response.status === 400) {
        alert('잘못된 요청입니다.');
      } else if (e.response.status === 401) {
        alert('로그인이 필요합니다.');
        navigate('/login');
      } else if (e.response.status === 403) {
        alert('댓글이 달린 글은 삭제할 수 없습니다.');
      } else {
        alert(e.response.data.message);
      }
    }
  };
  const extractsMaxUid = async (wno: number, rdepth: number) => {
    let result;
    await axios
      .post('/boards/comment/getMaxUidPerOneRdepth', {
        workBoard: { wno: wno },
        rdepth,
      })
      .then((response) => {
        result = response.data;
      });
    return result;
  };
  return (
    <ContentDesc
      registerComment={registerComment}
      modifyComment={modifyComment}
      replyComment={replyComment}
      myInfo={myInfo}
      board={board}
      comment={comment}
      onRemove={onRemove}
      extractsMaxUid={extractsMaxUid}
      isLoading={isLoading}
      isAuthorized={isAuthorized}
    />
  );
};

export default connect((state: RootState) => {
  return {
    isAuthorized: getAuthorized(state),
  };
})(ContentDescContainer);
