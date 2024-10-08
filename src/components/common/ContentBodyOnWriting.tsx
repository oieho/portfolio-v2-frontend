import styled from 'styled-components';
import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useRef,
} from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import CloseBtn from './button/AddButton';
import { MainContext } from '../../pages/Main';
import { observer } from 'mobx-react';
import store from '../../modules/mobxStore';

import SunEditor from 'suneditor-react';
import SunEditorCore from 'suneditor/src/lib/core';
import 'suneditor/dist/css/suneditor.min.css';
import CodeMirror from 'codemirror';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/lib/codemirror.css';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const OuterWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  cursor: pointer;
`;
const Content = styled.div`
  position: relative;
  left: -4.8rem;
  top: 1.92rem;
  box-shadow: 0px 15px 25px -6px rgba(0, 0, 0, 0.33);
  border-radius: 1rem;
  width: 52.8rem;
  height: 44.92rem;
  border: 0.375rem solid #000000;
  z-index: 2;
  box-sizing: border-box;
  background: #ffffff;
  overflow-x: hidden;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    margin: 0.5rem;
    background: #ffffff;
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
  @media (min-width: 1025px) and (max-width: 1280px) {
    position: relative;
    top: 1.94rem;
    left: -9.8rem;
    margin-left: 2.2rem;
    width: calc(100% - 324.99px - 28.16px);
    z-index: 2;
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    position: relative;
    top: 1.94rem;
    left: -9.49rem;
    width: calc(100% - 303.99px - 28.16px);
    margin-left: 1.7rem;
  }
  @media (min-width: 1px) and (max-width: 768px) {
    position: relative;
    top: 1.94rem;
    left: -2.75rem;
    width: calc(100% - 80px - 28.16px);
    margin-left: 1.7rem;
  }
`;
const ToolBar = styled.div`
  width: 52.8rem;
  top: -5.4rem;
  position: relative;
  z-index: 2;
`;
const MiniBtnWrapper = styled.span`
  position: relative;
  width: 100%;
  height: 100%;
  @media (min-width: 1px) and (max-width: 1280px) {
    left: calc(100% - 836px);
  }
`;
const SunEditorWrapper = styled.div`
  position: relative;
  opacity: 0.955;
  top: -0.12rem;
  width: 52.17rem;
  left: -0.05rem;
  @media (min-width: 1px) and (max-width: 1280px) {
    width: 100%;
  }
`;
interface Props {
  readonly uploadToServer: (files: any) => any;
}
const ContentBodyOnWriting: React.FC<Props> = observer(({ uploadToServer }) => {
  const { actions, state } = useContext(MainContext);
  const { deliveryImgInfoOnWriting } = store;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [content, setContent] = useState('');
  const contentRef = useRef(null) as any;
  const editor = useRef<SunEditorCore>();

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
    if (contentRef.current) {
      contentRef!.current.style.display = 'none';
    }

    if (!window.matchMedia('(min-width: 1px) and (max-width: 768px)').matches) {
      const saying = document.getElementById('saying');
      if (saying) {
        saying.style.opacity = '1';
        saying.style.transition = 'opacity 0.2s 0.75s ease-out';
      }
    }
    deliveryImgInfoOnWriting.setImgInfoOnWriting([]);

    navigate(
      `/boards?selected=${selectedQParam}&title=${titleQParam}&count=${countQParam}&regDate=${regDateQParam}&searchType=${searchTypeQParam}&keyword=${keywordQParam}`,
    );
  }, [actions, deliveryImgInfoOnWriting, navigate, searchParams]);

  const message = '정말로 창을 닫으시겠습니까?';

  const confirmHideContent = useCallback(() => {
    if (window.confirm(message)) {
      hideContent();
    }
    return confirmHideContent;
  }, [hideContent]);

  useEffect(() => {
    setContent('');

    if (state.hideEditorGear === true) {
      confirmHideContent();
      actions.setHideEditorGear(false);
    }
  }, [
    actions,
    confirmHideContent,
    deliveryImgInfoOnWriting,
    hideContent,
    state.hideEditorGear,
  ]);

  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editor.current = sunEditor;
    editor.current.core.focus();
    editor.current!.core.setContents('&nbsp;');
  };

  const onChangeContent = useCallback(
    (Content: string) => {
      actions.setPortfolioContent(Content);
    },
    [actions],
  );
  type UploadBeforeHandler = any;
  const handleImageUploadBefore: UploadBeforeHandler = (
    files: any[],
    info: object,
    core: any,
    uploadHandler: UploadBeforeHandler,
  ) => {
    try {
      for (const file of files) {
        uploadToServer(file).then((res: any) => {
          const resData = res;
          const imgInfo = {
            imgName: res.name,
            path: res.path,
            uuid: res.uuid,
          };
          const updatedFiles = [
            ...deliveryImgInfoOnWriting.imgInfoOnWriting,
            imgInfo,
          ];
          deliveryImgInfoOnWriting.setImgInfoOnWriting(updatedFiles);
          const response = {
            result: [
              {
                url: resData.url,
                name: resData.name,
                size: file.size,
              },
            ],
          };
          uploadHandler(response);
          response.result = null as any;
          return undefined;
        });
      }
    } catch (err) {
      uploadHandler(err!.toString());
    }
  };

  return (
    <Wrapper>
      <OuterWrapper
        onClick={() => {
          confirmHideContent();
        }}
        title="쓰기 폼 닫기"
      />
      <Content ref={contentRef}>
        <MiniBtnWrapper>
          <CloseBtn
            style={{
              backgroundColor: '#ff0b0b',
              top: '0.4rem',
              left: '50rem',
              zIndex: '1',
            }}
            onClick={() => {
              hideContent();
            }}
          >
            <span
              title="닫기"
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.fontWeight = '600';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.fontWeight = '400';
              }}
              style={{
                fontSize: '1.2rem',
                fontWeight: '400',
                color: '#ffffff',
                left: '0.3rem',
                top: '-0.28rem',
                transform: 'rotate(45deg)',
              }}
            >
              +
            </span>
          </CloseBtn>
        </MiniBtnWrapper>
        <SunEditorWrapper>
          <ToolBar className="sun-editor" />
          <SunEditor
            getSunEditorInstance={getSunEditorInstance}
            setContents={content}
            appendContents="&nbsp;"
            onImageUploadBefore={handleImageUploadBefore}
            onChange={onChangeContent}
            setOptions={{
              codeMirror: {
                src: CodeMirror,
                options: {
                  mode: 'htmlmixed',
                  htmlMode: true,
                  lineNumbers: true,
                  lineWrapping: true,
                },
              },
              katex: {
                src: katex,
                options: {
                  displayMode: false,
                  throwOnError: true,
                  output: 'htmlAndMathml',
                },
              },
              buttonList: [
                ['undo', 'redo'],
                ['font', 'fontSize', 'formatBlock'],
                ['paragraphStyle', 'blockquote'],
                [
                  'bold',
                  'underline',
                  'italic',
                  'strike',
                  'subscript',
                  'superscript',
                ],
                ['fontColor', 'hiliteColor', 'textStyle'],
                ['removeFormat'],
                ['outdent', 'indent'],
                ['align', 'horizontalRule', 'list', 'lineHeight'],
                // '/', // Line break
                [
                  'table',
                  'link',
                  'image',
                  'video',
                  'math' /**'video', 'audio' ,'math' */,
                ], // You must add the 'katex' library at options to use the 'math' plugin.
                /** ['imageGallery'] */ // You must add the "imageGalleryUrl".
                ['fullScreen', 'showBlocks', 'codeView'],
                ['removeFormat'],
                ['preview', 'print'],
              ],
              callBackSave: function (contents, isChanged) {
                alert(contents);
              },
              defaultStyle: "font-family: 'Roboto'; font-size: 14px;",
              font: [
                '맑은고딕',
                'Aria',
                '굴림',
                '바탕',
                'Comic Sans MS',
                'Courier New',
                'Impact',
                'Georgia',
                'tahoma',
                'Trebuchet MS',
                'Verdana',
              ],
              width: '100%',
              height: 'auto',
              mode: 'classic',

              resizeEnable: false,
              charCounter: true,
              charCounterType: 'char',
              maxCharCount: 200000,
              imageAccept: '.jpg, .png, .bmp, .gif',
              imageMultipleFile: true,
              imageUploadSizeLimit: 8388608,
              popupDisplay: 'local',
              iframeAttributes: {
                scrolling: 'yes',
              },
              // plugins: [font, image]
            }}
          />
        </SunEditorWrapper>
      </Content>
    </Wrapper>
  );
});

export default ContentBodyOnWriting;
