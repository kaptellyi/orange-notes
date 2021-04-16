import React, {
  ReactElement,
  useReducer,
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import qs from 'query-string';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RawDraftContentState } from 'draft-js';
import EditorNote from './EditorNote';
import * as Styled from './Styled';
import SubStylesList from './SubStylesList';
import { draftStyles } from './draftStyles';
import PaletteStylesList from './PaletteStylesList';
import Slider from '../../UI/Slider';
import {
  StyleTypes,
  DraftStyleName,
  SliderI,
  TriggeredPaletteStyle,
  PaletteStyle,
  InlineStyle,
  NoteI,
  NotesList,
  NoteQuery,
  ListParams,
} from '../../patterns';
import Modal from '../../UI/Modal';
import { listSelector } from '../../store/slices/listSlice';
import { assignTimeStamp, preventWhiteSpace } from '../../utils';
import Loading from '../../UI/Loading';
import { FaIcon } from '../../assets/StyledComponents';
import { useActions } from '../../hooks';

export type EditorChanges = {
  isKeyPressed: boolean;
  hasTitle: boolean;
  hasContent: boolean;
};

interface EditorReducerState {
  // editor's text
  content: RawDraftContentState;
  // if we can confirm changes
  isConfirmable: boolean;
  pinned: boolean;
  contentChanges: {
    isKeyPressed: boolean;
    hasTitle: boolean;
    hasContent: boolean;
  };
  // active bar of styles
  activeBar: DraftStyleName | undefined;
  // styles that have been used the latest
  triggeredStyles: {
    inlineStyle: InlineStyle | undefined;
    paletteStyle: TriggeredPaletteStyle | undefined;
  };
  activeInlineStyles: StyleTypes[];
  // color styles
  activePaletteStyle: PaletteStyle | undefined;
}

type EditorActions =
  | { type: 'set-content'; content: RawDraftContentState }
  | { type: 'toggle-confirmable'; isConfirmable: boolean }
  | { type: 'toggle-pinned'; isPinned: boolean }
  | {
      type: 'toggle-editor-state';
      changes: EditorChanges;
    }
  | { type: 'toggle-style-bar'; style: DraftStyleName | undefined }
  | { type: 'toggle-inline-style'; style: StyleTypes }
  | {
      type: 'toggle-palette-style';
      style: TriggeredPaletteStyle;
    }
  | { type: 'set-inline-styles'; styles: StyleTypes[] }
  | { type: 'set-palette-style'; style: PaletteStyle };

const initialState: EditorReducerState = {
  content: undefined!,
  isConfirmable: false,
  pinned: false,
  contentChanges: {
    isKeyPressed: false,
    hasTitle: false,
    hasContent: false,
  },
  activeBar: undefined,
  triggeredStyles: {
    inlineStyle: undefined,
    paletteStyle: undefined,
  },
  activeInlineStyles: [],
  activePaletteStyle: undefined,
};

const editorReducer = (
  state: EditorReducerState,
  action: EditorActions
): EditorReducerState => {
  switch (action.type) {
    case 'set-content':
      return { ...state, content: action.content };
    case 'toggle-confirmable':
      return { ...state, isConfirmable: action.isConfirmable };
    case 'toggle-pinned':
      return { ...state, pinned: action.isPinned };
    case 'toggle-editor-state':
      return { ...state, contentChanges: action.changes };
    case 'toggle-style-bar':
      return { ...state, activeBar: action.style };
    case 'toggle-inline-style': {
      const triggeredStyleActive = state.activeInlineStyles.find(
        (style) => style === action.style
      );
      return {
        ...state,
        triggeredStyles: {
          ...state.triggeredStyles,
          inlineStyle: {
            type: action.style,
            active: triggeredStyleActive !== undefined,
          },
        },
      };
    }
    case 'toggle-palette-style':
      return {
        ...state,
        triggeredStyles: {
          ...state.triggeredStyles,
          paletteStyle: action.style,
        },
      };
    case 'set-inline-styles':
      return { ...state, activeInlineStyles: action.styles };
    case 'set-palette-style':
      return { ...state, activePaletteStyle: action.style };
    default:
      return state;
  }
};

const NoteSettings = (): ReactElement => {
  const history = useHistory<ListParams>();
  const { listId, noteId, viewType } = qs.parse(
    history.location.search
  ) as NoteQuery;
  const { activeList, loading } = useSelector(listSelector) as {
    activeList: NotesList | undefined;
    loading: boolean;
  };
  const {
    setActiveListAction,
    updateListActionAsync,
    setErrorAction,
  } = useActions();

  const delegatedNote =
    activeList?.notes.find((n) => n.id === noteId) ||
    activeList?.removedNotes.find((n) => n.id === noteId);
  const titleRef = useRef<HTMLInputElement>(undefined!);
  const [editorState, dispatchEditor] = useReducer(editorReducer, initialState);
  const [modalVisible, setModalVisible] = useState(false);
  const [slider, setSlider] = useState<SliderI>({
    active: false,
    targetPosX: 0,
    targetWidth: 0,
  });

  useEffect(() => {
    // enable reloading the pages without alerts outside of Note Settings
    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  useEffect(() => {
    // set note
    if (!activeList) {
      if (typeof listId === 'string') {
        setActiveListAction(listId);
      } else
        setErrorAction({
          name: 'Delegated note was not found',
          message: 'Delegated note was not found',
        });
      return;
    }

    // set note's content
    if (!delegatedNote || loading) return;
    dispatchEditor({
      type: 'toggle-confirmable',
      isConfirmable: false,
    });

    fillContent(delegatedNote);
  }, [delegatedNote]);

  useEffect(() => {
    if (loading) return;
    canConfirm();
  }, [editorState.contentChanges]);

  const fillContent = (note: NoteI) => {
    titleRef.current.value = note.name;
    dispatchEditor({
      type: 'toggle-pinned',
      isPinned: note.pinned,
    });
  };

  const canConfirm = () => {
    // removed note is never confirmable
    if (viewType === 'removed') return;
    let isConfirmable = false;

    Object.values(editorState.contentChanges).reduce((previous, current) => {
      isConfirmable = previous && current;
      return current;
    });
    isConfirmable = isConfirmable && titleRef.current.value.length > 0;
    // prevent unnecessary render updates
    if (editorState.isConfirmable !== isConfirmable) {
      dispatchEditor({
        type: 'toggle-confirmable',
        isConfirmable,
      });
    }
    if (isConfirmable) {
      // to alert the user that reloading the page will cause loss of data
      window.onbeforeunload = () => '';
    }
  };

  const selectBar = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
    newActiveBar: DraftStyleName
  ) => {
    event.preventDefault();
    // close active sidebar
    if (editorState.activeBar === newActiveBar) {
      dispatchEditor({
        type: 'toggle-style-bar',
        style: undefined,
      });
      return setSlider({
        active: false,
      });
    }

    // open active sidebar
    const target = event.target as SVGElement;
    const { left, width } = target.getBoundingClientRect();
    dispatchEditor({
      type: 'toggle-style-bar',
      style: newActiveBar,
    });
    setSlider({
      active: true,
      targetPosX: left,
      targetWidth: width,
    });
  };

  const toggleInlineStyle = (style: StyleTypes) => {
    dispatchEditor({
      type: 'toggle-inline-style',
      style,
    });
  };

  const togglePaletteStyle = (style: TriggeredPaletteStyle) => {
    dispatchEditor({
      type: 'toggle-palette-style',
      style,
    });
  };

  const setEditorContentHandler = useCallback(
    (content: RawDraftContentState) =>
      dispatchEditor({
        type: 'set-content',
        content,
      }),
    []
  );

  const editorChangesHandler = useCallback(
    (isKeyPressed: boolean, editorHasText: boolean) => {
      dispatchEditor({
        type: 'toggle-editor-state',
        changes: {
          hasTitle: titleRef.current.value.trim().length !== 0,
          hasContent: editorHasText,
          isKeyPressed,
        },
      });
    },
    [titleRef]
  );

  const titleInputHandler = () => {
    dispatchEditor({
      type: 'toggle-editor-state',
      changes: {
        ...editorState.contentChanges,
        isKeyPressed: true,
      },
    });
  };

  const updateStylesHandler = useCallback(
    (styles: StyleTypes[] | PaletteStyle) => {
      if (Array.isArray(styles)) {
        dispatchEditor({
          type: 'set-inline-styles',
          styles,
        });
      } else
        dispatchEditor({
          type: 'set-palette-style',
          style: styles,
        });
    },
    []
  );

  const pin = () => {
    dispatchEditor({
      type: 'toggle-editor-state',
      changes: {
        ...editorState.contentChanges,
        isKeyPressed: true,
      },
    });
    dispatchEditor({
      type: 'toggle-pinned',
      isPinned: !editorState.pinned,
    });
  };

  const pinNoteHandler = () => {
    const pinnedNote = activeList!.notes.find((n) => n.pinned);
    // ask user if he wants to repin another pinned note to the current one
    if (pinnedNote && pinnedNote.id !== delegatedNote?.id)
      return setModalVisible(true);

    pin();
  };

  const repinNoteHandler = () => {
    pin();
    setModalVisible(false);
  };

  const inlineStylesHas = (style: StyleTypes) => {
    const match = editorState.activeInlineStyles.find((s) => {
      return s === style;
    });
    return match !== undefined;
  };

  const createNote = (): NoteI => ({
    name: titleRef.current.value.trim(),
    content: editorState.content,
    id: new Date().getTime().toString(),
    timeStamp: assignTimeStamp(),
    pinned: editorState.pinned,
  });

  const updateNotes = (notes: NoteI[], newNote: NoteI) => {
    const splittedNotes = notes.filter((n) => n.id !== newNote.id);
    const updatedNotes = [newNote, ...splittedNotes];
    return updatedNotes;
  };

  const confirmNote = () => {
    if (!activeList) return;
    if (!editorState.isConfirmable) return history.push('/');
    let note = createNote();
    if (delegatedNote) {
      note = { ...note, id: delegatedNote.id };
    }
    // unpin notes if current note is to gets pinned
    const oldNotes = activeList.notes.map((n) => ({
      ...n,
      pinned: note.pinned ? false : n.pinned,
    }));
    const notes = updateNotes(oldNotes, note);
    updateListActionAsync({ ...activeList, notes }, true);
    history.push('/');
  };

  const cancelModalHandler = () => setModalVisible(false);

  // Render Elements
  const frontStylesLists = draftStyles.map((el, i) => (
    <FaIcon
      key={i.toString()}
      icon={el.icon}
      active={el.name === editorState.activeBar ? 'true' : 'false'}
      onMouseDown={(e) => selectBar(e, el.name)}
      data-testid={`draft-style-${el.name}`}
    />
  ));

  const subLists = draftStyles.map((el, i) => {
    if (!el.subStyles) return undefined;
    // palette styles
    if (el.name === 'palette') {
      return (
        <PaletteStylesList
          paletteStyle={editorState.activePaletteStyle}
          makeStyleActive={togglePaletteStyle}
          key={i.toString()}
          isOpen={editorState.activeBar === 'palette'}
          subStyles={el.subStyles}
        />
      );
    }
    // inline styles
    return (
      <Styled.SubStylesWrapper
        key={i.toString()}
        isOpen={el.name === editorState.activeBar}
      >
        <SubStylesList
          subStyles={el.subStyles}
          makeActiveStyle={toggleInlineStyle}
          isElementActive={inlineStylesHas}
        />
      </Styled.SubStylesWrapper>
    );
  });
  const memorizedSubLists = useMemo(() => subLists, [
    editorState.activeBar,
    editorState.activeInlineStyles,
    editorState.activePaletteStyle,
  ]);

  return loading ? (
    <Loading />
  ) : (
    <>
      <Modal
        visible={modalVisible}
        confirmHandler={repinNoteHandler}
        cancelHandler={cancelModalHandler}
        text="You've already got a pinned note. Are you sure you want to make this note pinned?"
      />
      <Styled.NoteSettings disabled={viewType === 'removed'}>
        <Styled.Header>
          <Styled.Title>create a title</Styled.Title>
          <Styled.Input
            ref={titleRef}
            onKeyDown={preventWhiteSpace}
            onInput={titleInputHandler}
            data-testid="settings-title"
          />
        </Styled.Header>
        <Styled.Main>
          <EditorNote
            initialContent={delegatedNote?.content}
            draftStyleName={editorState.activeBar}
            trigerredPaletteStyles={editorState.triggeredStyles.paletteStyle}
            inlineStyle={editorState.triggeredStyles.inlineStyle}
            viewType={viewType}
            setEditorContent={setEditorContentHandler}
            updateStyles={updateStylesHandler}
            onEditorChanges={editorChangesHandler}
          />
        </Styled.Main>

        {viewType === 'removed' ? undefined : (
          <Styled.Bottom>
            {/* Sub styles should appear above the front bars */}
            {memorizedSubLists}
            <Styled.FrontStylesBar>
              <FaIcon
                icon="map-pin"
                active={editorState.pinned ? 'true' : 'false'}
                onMouseDown={pinNoteHandler}
                data-testid="draft-style-pinned"
              />
              {frontStylesLists}
              <FaIcon
                icon={editorState.isConfirmable ? 'check' : 'times'}
                onClick={confirmNote}
                data-testid="confirmation-btn"
              />
            </Styled.FrontStylesBar>
            <div
              data-testid={slider.active ? 'slider-active' : 'slider-inactive'}
            >
              <Slider
                active={slider.active}
                targetPosX={slider.targetPosX}
                targetWidth={slider.targetWidth}
              />
            </div>
          </Styled.Bottom>
        )}
      </Styled.NoteSettings>
    </>
  );
};

export default React.memo(NoteSettings);
