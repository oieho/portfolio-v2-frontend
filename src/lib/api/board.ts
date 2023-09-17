import client from './client';

export const getSearchResult = (searchType: string, keyword: string) =>
  client.get('/boards', {
    params: { searchType: searchType, keyword: keyword },
  });

export const fetchBoard = (boardNo: number) => client.get(`/boards/${boardNo}`);
export const fetchCommentList = (boardNo: number[]) =>
  client.get(`/boards/comment/${boardNo}`);

export const modifyBoard = (
  boardNo: string,
  title: string,
  content: string,
  writer: string,
) => client.put(`/boards/${boardNo}`, { title, content, writer });

export const removeBoard = (wno: number) =>
  client.delete('/boards/remove', {
    params: { wno: wno },
  });

export const removeComment = (
  cno: number,
  wno: number,
  uid: number,
  rnum: number,
  rdepth: number,
) =>
  client.delete('/boards/comment/remove', {
    params: { cno, wno, uid, rnum, rdepth },
  });
