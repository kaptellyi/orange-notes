import React, { ReactElement, useState, useEffect, useRef } from 'react';
import {
  convertFromRaw,
  convertToRaw,
  Editor,
  EditorState,
  RawDraftContentState,
  RichUtils,
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import {
  AlignTextStyle,
  DraftStyleName,
  StyleTypes,
  TriggeredPaletteStyle,
  ColorPrefix,
  CustomColor,
  PaletteStyle,
  InlineStyle,
  ColorName,
  NoteQuery,
} from '../../patterns';
import customStyles from './customStyles';

interface Props {
  initialContent?: RawDraftContentState;
  draftStyleName?: DraftStyleName;
  inlineStyle?: InlineStyle;
  trigerredPaletteStyles?: TriggeredPaletteStyle;
  viewType: NoteQuery['viewType'];
  setEditorContent: (text: RawDraftContentState) => void;
  updateStyles: (style: StyleTypes[] | PaletteStyle) => void;
  onEditorChanges: (isKeyPressed: boolean, editorHasText: boolean) => void;
}

const defaultPlaceholder = 'Plan to conquer the world...';
const EditorNote = ({
  initialContent,
  draftStyleName,
  inlineStyle,
  viewType,
  trigerredPaletteStyles,
  updateStyles,
  onEditorChanges,
  setEditorContent,
}: Props): ReactElement => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [styledPalette, setStyledPalette] = useState<
    {
      [key in ColorPrefix]: ColorName | undefined;
    }
  >({
    COLOR: undefined,
    'BG-COLOR': undefined,
  });
  const [alignStyle, setAlignStyle] = useState<AlignTextStyle>('left');
  const [placeholderValue, setPlaceholderValue] = useState(defaultPlaceholder);
  const editorRef = useRef<Editor>(null!);
  const currentContent = editorState.getCurrentContent();
  const inlineStyles = editorState.getCurrentInlineStyle();
  const blockType = editorState
    .getCurrentContent()
    .getBlockMap()
    .first()
    .getType();

  useEffect(() => {
    if (!initialContent) return;
    // set note's text
    const contentFromRaw = convertFromRaw(initialContent);
    const newState = EditorState.createWithContent(contentFromRaw);
    setEditorState(EditorState.moveFocusToEnd(newState));
  }, []);

  // Transfer Editor's Text
  useEffect(() => {
    const content = convertToRaw(currentContent);
    const text = currentContent.hasText();
    const lastChangeType = editorState.getLastChangeType();

    const keyPressed =
      lastChangeType === 'insert-characters' ||
      lastChangeType === 'backspace-character' ||
      lastChangeType === 'change-inline-style' ||
      lastChangeType === 'insert-fragment' ||
      lastChangeType === 'change-block-type';

    setEditorContent(content);
    onEditorChanges(keyPressed, text);
  }, [currentContent]);

  // Update inline styles
  useEffect(() => {
    const styles: StyleTypes[] = [];
    inlineStyles.forEach((s) => {
      if (s) styles.push(s as StyleTypes);
    });
    styles.push(blockType as StyleTypes);
    styles.push(alignStyle);

    updateStyles(styles);
  }, [inlineStyles, alignStyle, blockType]);

  // Update palette styles
  useEffect(() => {
    const newPaletteState: PaletteStyle = {
      // color type can be either font or background
      type: trigerredPaletteStyles?.type || undefined,
      style: {
        COLOR: styledPalette.COLOR,
        'BG-COLOR': styledPalette['BG-COLOR'],
      },
    };

    updateStyles(newPaletteState);
  }, [styledPalette]);

  // Listen to color changes
  useEffect(() => {
    const newPaletteStyles: typeof styledPalette = {
      COLOR: undefined,
      'BG-COLOR': undefined,
    };

    inlineStyles.forEach((style) => {
      const prefix: ColorPrefix[] = ['BG-COLOR', 'COLOR'];
      if (!style) return;
      if (!customStyles[style as CustomColor]) return;
      // set background color without prefix
      if (style.includes(prefix[0]))
        newPaletteStyles['BG-COLOR'] = style.slice(
          prefix[0].length + 1
        ) as ColorName;
      // set font color without prefix
      else if (style.includes(prefix[1]))
        newPaletteStyles.COLOR = style.slice(prefix[1].length + 1) as ColorName;
      // set colors to undefined if wasn't found any
      else {
        newPaletteStyles.COLOR = undefined;
        newPaletteStyles['BG-COLOR'] = undefined;
      }
    });

    // prevent unnecessary re-rendering
    if (
      newPaletteStyles.COLOR !== styledPalette.COLOR ||
      newPaletteStyles['BG-COLOR'] !== styledPalette['BG-COLOR']
    ) {
      setStyledPalette(newPaletteStyles);
    }
  }, [editorState]);

  // Style handlers
  useEffect(() => {
    if (!inlineStyle) return;
    if (draftStyleName === 'text-weight') toggleInlineStyle(inlineStyle.type);
    if (draftStyleName === 'text-align')
      toggleAlignStyle(inlineStyle.type as AlignTextStyle);
    if (draftStyleName === 'block-type') toggleBlockType(inlineStyle.type);
  }, [inlineStyle]);

  useEffect(() => {
    if (!trigerredPaletteStyles) return;
    const palettePrefix =
      trigerredPaletteStyles.type === 'font-color' ? 'COLOR' : 'BG-COLOR';
    changeColor(trigerredPaletteStyles.style, palettePrefix);
  }, [trigerredPaletteStyles]);

  const toggleInlineStyle = (style: StyleTypes) => {
    const newEditorState = RichUtils.toggleInlineStyle(editorState, style);
    setEditorState(newEditorState);
  };

  const toggleAlignStyle = (style: AlignTextStyle) => setAlignStyle(style);

  const toggleBlockType = (style: StyleTypes) => {
    const newEditorState = RichUtils.toggleBlockType(editorState, style);
    setEditorState(newEditorState);

    // Toggle placeholder regarding the block type
    if (blockType === 'unstyled') setPlaceholderValue('');
    else setPlaceholderValue(defaultPlaceholder);
  };

  const changeColor = (
    colorName: ColorName | undefined,
    prefix: ColorPrefix
  ) => {
    const customColor = `${prefix}-${colorName}`;
    const selection = editorState.getSelection();
    const currentStyle = editorState.getCurrentInlineStyle();

    let nextEditorState = EditorState.push(
      editorState,
      editorState.getCurrentContent(),
      'change-inline-style'
    );

    // Override last applied color of the specific type:
    // font color shouldn't override highlight color
    if (selection.isCollapsed() && nextEditorState.size !== 0) {
      nextEditorState = currentStyle.reduce((state, color) => {
        if (!state || !color) return editorState;
        if (color.slice(prefix.length + 1) !== styledPalette[prefix])
          return state;
        return RichUtils.toggleInlineStyle(state, color);
      }, nextEditorState);
    }
    if (!currentStyle.has(customColor)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        customColor
      );
    }

    setEditorState(nextEditorState);
  };

  return (
    <Editor
      ref={editorRef}
      customStyleMap={customStyles}
      textAlignment={alignStyle}
      editorState={editorState}
      onChange={setEditorState}
      placeholder={placeholderValue}
      ariaLabel="aria label"
    />
  );
};

export default React.memo(EditorNote);
