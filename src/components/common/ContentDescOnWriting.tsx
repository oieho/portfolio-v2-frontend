import styled from 'styled-components';
import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  LegacyRef,
  useContext,
  useState,
  useCallback,
} from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MyInfo } from '../../App';
import { MainContext } from '../../pages/Main';

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Description = styled.div`
  position: absolute;
  background: #f5f5f5;
  top: -20.54rem;
  left: 22.28rem;
  width: 16.64rem;
  height: 35.66rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  z-index: 2;
  transition: height 0.45s 0.3s ease-out;
`;
const Inputs = styled.ul`
  position: relative;
  list-style: none;
  padding: 0;
  left: 0.55rem;
`;
const InputLi = styled.li`
  position: relative;
  height: 3.23rem;
`;
const InputSharp = styled.span`
  position: absolute;
  margin: 0.1rem 0 0 0.6rem;
  padding: 0;
  z-index: 2;
  font-size: 0.77rem;
  font-weight: 600;
`;
const SubjectInput = styled.input`
  position: relative;
  width: 9.84rem;
  line-height: 2rem;
  border: 1px solid #ededed;
  outline: none;
  padding: 0.4rem;
  background: #fff;
  border-radius: 1rem;
  z-index: 1;
  font-weight: 300;
`;
const SubjectInput2 = styled.input`
  position: relative;
  width: 15.5rem;
  line-height: 2rem;
  border: 1px solid #ededed;
  outline: none;
  padding: 0.4rem;
  background: #fff;
  border-radius: 1rem;
  z-index: 1;
  font-weight: 300;
`;
const Imperative = styled.span`
  position: absolute;
  margin: 0.05rem 0 0 0.1rem;
  font-weight: 600;
  font-size: 0.9rem;
  color: #ff1616;
  cursor: default;
  z-index: 2;
`;
const Title = styled.span`
  position: relative;
  top: 0.39rem;
  left: 0.85rem;
  z-index: 2;
  font-weight: 600;
  color: #000000;
  position: absolute;
`;

const Desc = styled.span`
  width: 19.43rem;
  position: relative;
  top: 1.46rem;
  left: 0.72rem;
  z-index: 2;
  font-size: 0.72rem;
  font-weight: 400;
  color: #a5a5a5;
  position: absolute;
`;
const TitleInput = styled.input`
  position: relative;
  top: -0.03rem;
  left: 0rem;
  width: 8.39rem;
  border: none;
  outline: none;
  background: #ffffff;
  font-size: 0.72rem;
  font-weight: 400;
  color: #a5a5a5;
  z-index: 1;
`;
const Thumbnail = styled.div`
  position: relative;
  top: -2.9rem;
  left: 10.2rem;
  width: 5.3rem;
  height: 6.14rem;
  background: #ffffff;
  border: 1px solid #ededed;
  border-radius: 1rem;
`;
const ThumbnailInput = styled.input`
  display: none;
`;

const ThumbnailLabel = styled.label`
  position: relative;
  display: inline-block;
  top: 1.76rem;
  left: 0.96rem;
  width: 3.313rem;
  height: 3.313rem;
  background-image: url('/images/board/imgUpload.png');
  background-size: cover;
  background-repeat: no-repeat;
  border: 1px solid #f0f0f0;
  border-radius: 0.3rem;
  cursor: pointer;
  z-index: 2;
`;
const RegDateTit = styled.span`
  position: relative;
  top: 0.41rem;
  left: 0.79rem;
  z-index: 2;
  font-weight: 600;
  color: #000000;
  word-spacing: -0.1rem;
  position: absolute;
`;
const RegDateDesc = styled.span`
  position: absolute;
  top: 1.43rem;
  left: 0.79rem;
  z-index: 2;
  font-weight: 400;
  color: #a5a5a5;
`;
const Delimeter = styled.span`
  position: absolute;
  top: 1.48rem;
  left: 0.87rem;
  font-size: 0.65rem;
  z-index: 2;
`;
const ToolsTextarea = styled.textarea`
  position: relative;
  top: -1.21rem;
  left: 2.96rem;
  width: 11.3rem;
  height: 2.4rem;
  font-size: 0.72rem;
  font-weight: 400;
  color: #a5a5a5;
  line-height: 1.092rem;
  outline: none;
  border: none;
  resize: none;
  z-index: 1;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #f5f5f5;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #000;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  ::-webkit-scrollbar-thumb:active {
    background: #000;
  }
`;
const DescWrapper = styled.div`
  position: relative;
  width: 15.5rem;
  height: 18.84rem;
  border: 1px solid #ededed;
  outline: none;
  padding: 0.4rem;
  background: #ffffff;
  border-radius: 1rem;
`;
const DescTit = styled.span`
  position: absolute;
  top: 0.45rem;
  left: 0.73rem;
  z-index: 2;
  font-weight: 600;
  color: #000000;
  letter-spacing: 0.015rem;
`;
const DescTextarea = styled.textarea`
  position: relative;
  top: 1.13rem;
  left: 0.2rem;
  width: 14.5rem;
  height: 16.76rem;
  padding-right: 0.307rem;
  font-size: 0.72rem;
  color: #a5a5a5;
  background-color: #ffffff;
  line-height: 1.168rem;
  outline: none;
  border: none;
  resize: none;
  z-index: 1;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #f5f5f5;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #000;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  ::-webkit-scrollbar-thumb:active {
    background: #000;
  }
`;
const HashtagInput = styled.input`
  position: relative;
  margin-right: 0.32rem;
  color: #a5a5a5;
  top: -0.53rem;
  width: 4.96rem;
  height: 2.25rem;
  border: 1px solid #ededed;
  outline: none;
  padding: 0.4rem 0.8rem 0.4rem 1.2rem;
  background: #fff;
  border-radius: 0.9rem;
  z-index: 1;
  font-weight: 300;
  font-size: 0.72rem;
`;

const Sorting = styled.span`
  position: absolute;
  top: 0.1rem;
  left: 1.3rem;
  font-weight: 400;
  line-tracking: 20%;
  z-index: 1;
`;
const SelectSort = styled.select`
  position: absolute;
  top: -0.25rem;
  left: 2rem;
  background: none;
  border: none;
  font-size: 0.69rem;
  font-weight: 400;
  color: #ffffff;
  text-align: right;
  appearance: none;
  z-index: 89999;
  &:focus {
    outline: none;
  }
`;
const Option = styled.option`
  height: 50px;
  line-height: 50px;
  background: #ededed;
  color: #000000;
  zoom: 1.1;
`;
const Button = styled.button`
  position: relative;
  top: -0.95rem;
  left: 0.37rem;
  font-family: 'Noto Sans KR';
  font-size: 0.8rem;
  background: #000;
  width: 15.5rem;
  margin-left: -0.35rem;
  padding-left: 2.77rem;
  color: #fff;
  height: 2.56rem;
  font-weight: 500;
  border-radius: 17px;
  letter-spacing: 0.01rem;
  cursor: pointer;
  &:hover {
    font-family: 'Noto Sans KR';
    font-weight: 800;
    background: #000;
    color: #fff;
    height: 2.56rem;
  }
  &:active {
    font-weight: 500;
  }
`;
const CoverBackBtn = styled.span`
  display: block;
  position: absolute;
  background-color: #afafaf;
  background-image: url('/images/coverBackBtnbg.png');
  width: 1.55rem;
  height: 3.65rem;
  right: -1.55rem;
  top: 4.464rem;
  z-index: 1;
`;
interface Props {
  readonly registerArticle: (
    portfolioContent: string,
    title: string,
    thumbnailInfo: string,
    thumbnailFile: File,
    tools: string[],
    description: string,
    category: string,
    combinedHashTag: string[],
  ) => any;
  readonly myInfo: MyInfo | null;
  readonly generateThumbnailDir: (file: File) => any;
  readonly extractsMaxWno: () => any;
  readonly isLoading: boolean;
  readonly isAuthorized: boolean;
}
const ContentDescOnWriting = ({
  registerArticle,
  myInfo,
  generateThumbnailDir,
  extractsMaxWno,
  isLoading,
  isAuthorized,
}: Props) => {
  const { state, actions } = useContext(MainContext);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const titleQParam = searchParams.get('title');
  const countQParam = searchParams.get('count');
  const regDateQParam = searchParams.get('regDate');
  const searchTypeQParam = searchParams.get('searchType');
  const keywordQParam = searchParams.get('keyword');

  const [title, setTitle] = useState<string>('');

  const [thumbnailInfo, setThumbnailInfo] = useState<string>('');
  const [thumbnailFile, setThumbnailFile] = useState<any>();
  const [tools, setTools] = useState<string[]>([]);
  const [boardRegDateDays, setBoardRegDateDays] = useState() as any;
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [hashTag1, setHashTag1] = useState<string>('');
  const [hashTag2, setHashTag2] = useState<string>('');
  const [hashTag3, setHashTag3] = useState<string>('');

  const [validateTitle, setValidateTitle] = useState<boolean>(false);
  const [validateThumbnail, setValidateThumbnail] = useState<boolean>(false);
  const [, setValidateTools] = useState<boolean>(false);
  const [validateDescription, setValidateDescription] =
    useState<boolean>(false);
  const [validateCategory, setValidateCategory] = useState<boolean>(false);

  const titleRef = useRef(null) as unknown as HTMLInputElement &
    (LegacyRef<HTMLInputElement> | undefined) as any;
  const toolsRef = useRef(null) as unknown as HTMLInputElement &
    (LegacyRef<HTMLInputElement> | undefined) as any;
  const descriptionRef = useRef(null) as unknown as HTMLTextAreaElement &
    (LegacyRef<HTMLTextAreaElement> | undefined) as any;
  const hashTag1Ref = useRef(null) as unknown as HTMLInputElement &
    (LegacyRef<HTMLInputElement> | undefined) as any;
  const hashTag2Ref = useRef(null) as unknown as HTMLInputElement &
    (LegacyRef<HTMLInputElement> | undefined) as any;
  const hashTag3Ref = useRef(null) as unknown as HTMLInputElement &
    (LegacyRef<HTMLInputElement> | undefined) as any;

  const descRef = useRef(null) as unknown as HTMLDivElement &
    (LegacyRef<HTMLDivElement> | undefined) as any;
  const categoryRef = useRef(null) as unknown as HTMLSelectElement &
    (LegacyRef<HTMLSelectElement> | undefined) as any;
  useEffect(() => {
    actions.setZIdx(state.zIdx++);
    descRef.current.style.zIndex = state.zIdx;

    const date = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      const hour = String(today.getHours()).padStart(2, '0');
      const minute = String(today.getMinutes()).padStart(2, '0');
      const second = String(today.getSeconds()).padStart(2, '0');

      const formattedDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
      return formattedDate;
    };
    setBoardRegDateDays(date());
  }, [actions, state.zIdx]);

  useLayoutEffect(() => {
    if (state.closeWriting === true) {
      // deliveryImgInfoOnWriting.setImgInfoOnWriting([]);
      actions.setCloseWriting(false);
    }
  }, []);

  const onChangeTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
      setValidateTitle(true);
    },
    [],
  );

  const onChangeTools = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const textareaValue = e.target.value;
      const splitValues = textareaValue.split(',');

      // 중복된 단어를 확인하는 정규표현식
      const duplicateRegex = /(\b\w+\b)\s*(?=.*\b\1\b)/g;

      const uniqueValues = splitValues.filter((value, index, self) => {
        // 중복된 단어가 있는지 검사
        return !duplicateRegex.test(value) && self.indexOf(value) === index;
      });

      setTools(uniqueValues);
      setValidateTools(true);
    },
    [],
  );
  const onChangeDescription = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setDescription(e.target.value);
      setValidateDescription(true);
    },
    [],
  );
  const onChangeCategory = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setCategory(e.target.value);
      setValidateCategory(true);
      if (categoryRef.current) {
        categoryRef.current.style.pointerEvents = 'none';
      }
    },
    [],
  );
  const onChangeHashTag1 = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (value === hashTag2 && hashTag2.length >= 2) {
        hashTag1Ref.current.value = '';
      } else if (value === hashTag3 && hashTag3.length >= 2) {
        hashTag1Ref.current.value = '';
      }

      setHashTag1(e.target.value);
    },
    [hashTag2, hashTag3],
  );
  const onChangeHashTag2 = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (value === hashTag1 && hashTag1.length >= 2) {
        hashTag2Ref.current.value = '';
      } else if (value === hashTag3 && hashTag3.length >= 2) {
        hashTag2Ref.current.value = '';
      }

      setHashTag2(e.target.value);
    },
    [hashTag1, hashTag3],
  );
  const onChangeHashTag3 = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (value === hashTag1 && hashTag1.length >= 2) {
        hashTag3Ref.current.value = '';
      } else if (value === hashTag2 && hashTag2.length >= 2) {
        hashTag3Ref.current.value = '';
      }

      setHashTag3(e.target.value);
    },
    [hashTag1, hashTag2],
  );
  const handleThumbnailChange = (e: any) => {
    const thumbnailLabel = document.getElementById('thumbnail');
    const thumbnailInput = e.target;
    const file = thumbnailInput.files[0];

    if (file) {
      generateThumbnailDir(file).then((result: any) => {
        setThumbnailInfo(result);
      });
      const reader = new FileReader();
      reader.onload = function (e: any) {
        thumbnailLabel!.style.backgroundImage = `url(${e.target.result})`;
      };
      reader.readAsDataURL(file);
    }
    setThumbnailFile(thumbnailInput.files[0]);
    setValidateThumbnail(true);
  };
  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (state.portfolioContent.length === 0) {
        alert('내용을 작성하지 않았습니다.');
        return;
      } else if (validateTitle !== true) {
        alert('제목을 작성하지 않았습니다.');
        titleRef.current.focus();
        return;
      } else if (validateThumbnail !== true) {
        alert('썸네일 이미지를 첨부하지 않았습니다.');
        return;
      } else if (validateDescription !== true) {
        alert('설명을 작성하지 않았습니다.');
        descriptionRef.current.focus();
        return;
      } else if (hashTag1.length === 0) {
        alert('첫 번째 해시태그를 작성하지 않았습니다.');
        hashTag1Ref.current.focus();
        return;
      } else if (hashTag2.length === 0) {
        alert('두 번째 해시태그를 작성하지 않았습니다.');
        hashTag2Ref.current.focus();
        return;
      } else if (hashTag1.length === 0 || hashTag2.length === 0) {
        alert('필수 해시태그를 작성하지 않았습니다.');
        hashTag1Ref.current.focus();
        return;
      } else if (validateCategory !== true) {
        alert('분류를 선택하지 않았습니다.');
        return;
      } else if (
        hashTag1 === hashTag2 ||
        hashTag1 === hashTag3 ||
        hashTag2 === hashTag3
      ) {
        alert('중복 된 해시태그는 등록할 수 없습니다.');
        return;
      }
      try {
        const combinedHashTag: string[] = [];
        combinedHashTag[0] = hashTag1;
        combinedHashTag[1] = hashTag2;
        if (hashTag3.length > 0) {
          combinedHashTag.push(hashTag3);
        }
        await registerArticle(
          state.portfolioContent,
          title,
          thumbnailInfo,
          thumbnailFile,
          tools,
          description,
          category,
          combinedHashTag,
        );
        const result = await extractsMaxWno();
        actions.setMaxWno(result! as number);
        setTitle('');
        setDescription('');
        actions.setHideEditorGear(true);

        const newSelectedList = [...state.selectedList];
        const isAlreadySelected = newSelectedList.includes(state.maxWno);
        if (isAlreadySelected) {
          actions.setSelectedList(newSelectedList);
        } else {
          const newSelectedList = [...state.selectedList, state.maxWno];
          actions.setSelectedList(newSelectedList);
        }
        setTimeout(() => {
          navigate(
            `/api/boards/view/${result}?selected=${state.selectedList}&title=${titleQParam}&count=${countQParam}&regDate=${regDateQParam}&searchType=${searchTypeQParam}&keyword=${keywordQParam}`,
            {
              state: { searchType: null, keyword: null },
            },
          );
        }, 1160);

        const tableRows = document.querySelectorAll('.black');
        tableRows.forEach((row) => {
          row.classList.remove('black');
        });
        const tableRows2 = document.querySelectorAll('.blackOnModify');
        tableRows2.forEach((row) => {
          row.classList.remove('blackOnModify');
        });
        const tableRows3 = document.querySelectorAll('.blackOnWrite');
        tableRows3.forEach((row) => {
          row.classList.remove('blackOnWrite');
        });
        actions.setWriteSelectedIndex(state.maxWno);
        actions.setViewSelectedIndex(-1);
        actions.setModifySelectedIndex(-1);
        actions.setRemoveSelectedIndex(-1);

        const element = document.getElementById(`boardMore-${state.maxWno}`);
        if (element) {
          element.style.backgroundImage =
            "url('/images/board/moreChecked.png')";
        }
        navigate('/'); // ThumbnailImg 재갱신
      } catch (error) {
        console.error(error);
        alert('글 등록에 실패하였습니다.');
      }
    },
    [
      actions,
      category,
      countQParam,
      description,
      extractsMaxWno,
      hashTag1,
      hashTag2,
      hashTag3,
      keywordQParam,
      navigate,
      regDateQParam,
      registerArticle,
      searchTypeQParam,
      state.maxWno,
      state.portfolioContent,
      state.selectedList,
      thumbnailFile,
      thumbnailInfo,
      title,
      titleQParam,
      tools,
      validateCategory,
      validateDescription,
      validateThumbnail,
      validateTitle,
    ],
  );

  return (
    <Wrapper>
      <Description id="addComment" ref={descRef}>
        <form method="post" onSubmit={onSubmit}>
          <Inputs>
            <InputLi>
              <Title style={{ letterSpacing: '0.07rem' }}>
                TITLE
                <Imperative title="필수 입력 사항">*</Imperative>
              </Title>
              <Desc>
                <TitleInput
                  ref={titleRef}
                  value={title}
                  maxLength={30}
                  onChange={onChangeTitle}
                />
              </Desc>

              <SubjectInput readOnly disabled />

              <Thumbnail>
                <Title style={{ letterSpacing: '0.04rem' }}>
                  IMAGE
                  <Imperative
                    style={{ marginLeft: '0.13rem' }}
                    title="필수 입력 사항"
                  >
                    *
                  </Imperative>
                </Title>

                <label htmlFor="thumbnailInput">
                  <ThumbnailLabel
                    id="thumbnail"
                    title="썸네일 이미지 업로드"
                    onClick={() =>
                      document.getElementById('thumbnailInput')?.click()
                    }
                  />
                  <ThumbnailInput
                    onChange={(e: any) => {
                      handleThumbnailChange(e);
                    }}
                    type="file"
                    id="thumbnailInput"
                  />
                </label>
              </Thumbnail>
            </InputLi>
            <InputLi>
              <RegDateTit title="Reg. Date">REG. DATE</RegDateTit>
              <RegDateDesc>{boardRegDateDays}</RegDateDesc>
              <SubjectInput readOnly disabled />
            </InputLi>
            <InputLi style={{ height: '19.77rem' }}>
              <DescWrapper>
                <DescTit>
                  DESCRIPTION<Imperative title="필수 입력 사항">*</Imperative>
                </DescTit>
                <DescTextarea
                  ref={descriptionRef}
                  value={description}
                  onChange={onChangeDescription}
                  maxLength={560}
                />
              </DescWrapper>
            </InputLi>
            <InputLi style={{ bottom: '0.55rem' }}>
              <Title title="tools">TOOLS</Title>
              <Delimeter title="콤마로 구분지어 다음과 같이 입력하시오. (A,B,+...)">
                (A,B,+...)
              </Delimeter>
              <Desc>
                <ToolsTextarea
                  ref={toolsRef}
                  value={tools}
                  onChange={onChangeTools}
                  maxLength={400}
                />
              </Desc>

              <SubjectInput2 readOnly disabled />
            </InputLi>
            <InputLi>
              <InputSharp>#</InputSharp>
              <HashtagInput
                ref={hashTag1Ref}
                value={hashTag1}
                onChange={(e: any) => {
                  onChangeHashTag1(e);
                }}
                maxLength={15}
              />
              <Imperative style={{ left: '4.1rem' }} title="필수 입력 사항">
                *
              </Imperative>
              <InputSharp>#</InputSharp>
              <HashtagInput
                value={hashTag2}
                ref={hashTag2Ref}
                onChange={(e: any) => {
                  onChangeHashTag2(e);
                }}
                maxLength={15}
              />
              <Imperative style={{ left: '9.35rem' }} title="필수 입력 사항">
                *
              </Imperative>
              <InputSharp>#</InputSharp>
              <HashtagInput
                ref={hashTag3Ref}
                value={hashTag3}
                onChange={(e: any) => {
                  onChangeHashTag3(e);
                }}
                maxLength={15}
              />
            </InputLi>
            <InputLi>
              <Sorting>
                <SelectSort
                  ref={categoryRef}
                  onChange={onChangeCategory as any}
                >
                  <Option>선택 후</Option>
                  <Option value="브로셔">Brochure</Option>
                  <Option value="로고">Logo</Option>
                  <Option value="포스터">Poster</Option>
                  <Option value="캐릭터">Character</Option>
                  <Option value="홈페이지">Homepage</Option>
                  <Option value="상세페이지">Detailed Page</Option>
                  <Option value="잡지">Magazine</Option>
                  <Option value="기타">etc</Option>
                </SelectSort>
              </Sorting>

              <Button>에 등록</Button>
            </InputLi>
          </Inputs>
        </form>
        <CoverBackBtn />
      </Description>
    </Wrapper>
  );
};

export default ContentDescOnWriting;
