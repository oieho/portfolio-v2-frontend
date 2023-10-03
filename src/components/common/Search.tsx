import styled from 'styled-components';
import { useRef, useContext, useCallback, useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../index';
import { fetchList } from '../../modules/boardSlice';
import { MainContext } from '../../pages/Main';
import hotkeys from 'hotkeys-js';
const Line = styled.div`
  position: relative;
  display: inline-block;
  top: 0.9rem;
  left: 1.1rem;
  height: 0.12rem;
  width: 26.5rem;
  border-radius: 10rem;
  background: #000000;
  z-index: 2;
  &.hoverSearchLine {
    height: 0.15rem;
    top: 0.9rem;
    background: #000000;
    z-index: 3;
  }
`;
const Button = styled.button`
  background-image: url('/images/searchicon.png');
  background-size: cover;
  position: relative;
  display: inline-block;
  width: 1.8rem;
  height: 1.8rem;
  top: 0.55rem;
  left: -1.1rem;
  z-index: 2;
  border: none;
  cursor: pointer;
  &:active {
    position: relative;
    top: 0.76rem;
    left: -1rem;
  }
  &.magnifierhover {
    left: -1.12rem;
    transition: 0.1s ease-in;
  }
  &.magnifierNOThover {
    left: -0.05rem;

    transition: 0.1s 0.65s ease-out;
  }
`;
const SearchInput = styled.input`
  position: relative;
  top: 0.1rem;
  left: -27.3rem;
  width: 24.56rem;
  line-height: 2rem;
  border: none;
  outline: none;
  padding: 0.4rem;
  background: #f5f5f5;
  border-radius: 1rem;
  z-index: 1;
  font-size: 0.85rem;

  &:focus {
    font-weight: bold;
  }
`;
const Search = () => {
  const { state, actions } = useContext(MainContext);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [searchLineHover, setSearchLineHover] = useState(false);
  const [magnifierHover, setMagnifierHover] = useState(false);

  const inputRef = useRef(null) as any;
  const searchInput = document.getElementById(
    'searchInput',
  ) as HTMLInputElement;
  const globalSearchInput = document.getElementById(
    'globalSearchInput',
  ) as HTMLInputElement;

  const [searchParams] = useSearchParams();
  const titleQParam = searchParams.get('title');
  const countQParam = searchParams.get('count');
  const regDateQParam = searchParams.get('regDate');
  const searchTypeQParam = searchParams.get('searchType');
  const keywordQParam = searchParams.get('keyword');

  hotkeys('ctrl+/', function (event, handler) {
    // Prevent the default refresh event under WINDOWS system
    event.preventDefault();
    inputRef.current.focus();
  });
  useEffect(() => {
    inputRef.current.focus();
  }, [
    countQParam,
    dispatch,
    keywordQParam,
    regDateQParam,
    state.onGlobalSearch,
    state.selectedList,
    state.selectedView,
    titleQParam,
  ]);

  const setAni = () => {
    if (!searchLineHover) {
      setMagnifierHover(true);
      setSearchLineHover(true);
    } else {
      setMagnifierHover(false);
      setSearchLineHover(false);
    }
  };
  const setLine = () => {
    if (!searchLineHover) {
      setSearchLineHover(true);
      setMagnifierHover(true);
    } else {
      setSearchLineHover(false);
      setMagnifierHover(false);
    }
  };

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      searchInput!.value = '';

      try {
        e.preventDefault();
        actions.setOnGlobalSearch(true);
        actions.setHashSelected(false);
        actions.setToolsSelected(false);
        const encodedKeyword = encodeURIComponent(globalSearchInput?.value);

        navigate(
          `/boards?searchType=${searchTypeQParam}&keyword=${encodedKeyword}`,
        );
      } catch (e) {
        console.log('error message : ' + e);
      }
    },
    [
      actions,
      globalSearchInput?.value,
      navigate,
      searchInput,
      searchTypeQParam,
    ],
  );
  return (
    <>
      <form onSubmit={onSubmit}>
        <Line className={searchLineHover ? 'hoverSearchLine' : ''} />
        <Button
          className={magnifierHover ? 'magnifierhover' : 'magnifierNOThover'}
          onMouseOver={() => setAni()}
          onMouseOut={() => setAni()}
        />
        <SearchInput
          id="globalSearchInput"
          onFocus={() => setLine()}
          onBlur={() => setLine()}
          ref={inputRef}
          placeholder="검색어를 입력하세요. (CTRL + /)"
        />
      </form>
    </>
  );
};

export default Search;
