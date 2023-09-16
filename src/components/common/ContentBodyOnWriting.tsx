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
  background: #ffffff;
  box-shadow: 0px 15px 25px -6px rgba(0, 0, 0, 0.03);
  border-radius: 1rem;
  width: 52.8rem;
  height: 44.92rem;
  border: 6px solid #000000;
  z-index: 999999999;
  overflow: hidden;
`;
const ToolBar = styled.div`
  width: 52.8rem;
  top: -5.4rem;
  position: relative;
  z-index: 2;
`;
const SunEditorWrapper = styled.div`
  position: relative;
  opacity: 0.955;
  top: -0.12rem;
  width: 52.17rem;
  left: -0.05rem;
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
    actions.setCloseWriting(false);
    const selectedQParam = searchParams.get('selected');
    const titleQParam = searchParams.get('title');
    const countQParam = searchParams.get('count');
    const regDateQParam = searchParams.get('regDate');
    const searchTypeQParam = searchParams.get('searchType');
    const keywordQParam = searchParams.get('keyword');
    contentRef.current.style.display = 'none';
    const saying = document.getElementById('saying');
    saying!.style.opacity = '1';
    saying!.style.transition = 'opacity 0.2s 0.75s ease-out';
    deliveryImgInfoOnWriting.setImgInfoOnWriting([]);

    navigate(
      `/boards?selected=${selectedQParam}&title=${titleQParam}&count=${countQParam}&regDate=${regDateQParam}&searchType=${searchTypeQParam}&keyword=${keywordQParam}`,
    );
  }, [actions, deliveryImgInfoOnWriting, navigate, searchParams]);
  useEffect(() => {
    setContent('');

    if (state.hideEditorGear === true) {
      hideContent();
      actions.setHideEditorGear(false);
    }
  }, [actions, deliveryImgInfoOnWriting, hideContent, state.hideEditorGear]);

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
      <OuterWrapper onClick={() => hideContent()} title="쓰기 폼 닫기" />
      <Content ref={contentRef}>
        <CloseBtn
          style={{
            backgroundColor: '#ff0b0b',
            top: '0.4rem',
            left: '50.6rem',
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
              top: '-0.38rem',
              transform: 'rotate(45deg)',
            }}
          >
            +
          </span>
        </CloseBtn>
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
              height: '37.7rem',
              mode: 'classic',

              resizeEnable: false,
              charCounter: true,
              charCounterType: 'char',
              maxCharCount: 200000,
              imageAccept: '.jpg, .png, .bmp, .gif',
              imageMultipleFile: true,
              imageUploadSizeLimit: 5242880,
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
