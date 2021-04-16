import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { Category } from '../../patterns';
import * as Styled from './Styled';

enum SearchStageE {
  STATIC,
  NOT_ACTIVE,
  FOCUS,
  FOCUSED,
  BLURRED,
}

interface Props {
  activeList: Category;
  searchHandler: (value: string) => void;
}

const Search = ({ activeList, searchHandler }: Props): ReactElement | null => {
  const searchInpRef = useRef<HTMLInputElement>(undefined!);
  const [isEmptyValue, setIsEmptyValue] = useState(true);
  const [searchStage, setSearchStage] = useState<SearchStageE>(
    SearchStageE.STATIC
  );

  useEffect(() => {
    if (!searchInpRef.current) return;
    searchInpRef.current.value = '';
    setIsEmptyValue(true);
  }, [activeList]);

  const searchNoteClickHandler = () => {
    if (searchStage === SearchStageE.NOT_ACTIVE) {
      setSearchStage(SearchStageE.FOCUS);
    }
    searchInpRef.current.focus();
  };

  const onInputFocus = () => {
    if (searchStage === SearchStageE.STATIC)
      return setSearchStage(SearchStageE.FOCUS);
    // it ensures search either has gone to the "FOCUS" stage or came from the "BLURRED" one
    if (searchStage !== SearchStageE.NOT_ACTIVE)
      setSearchStage(SearchStageE.FOCUSED);
  };

  const onInputBlur = () => {
    if (isEmptyValue) setSearchStage(SearchStageE.NOT_ACTIVE);
    else setSearchStage(SearchStageE.BLURRED);
  };

  const onInputHandler = () => {
    const inpValue = searchInpRef.current.value.trim();
    setSearchStage(SearchStageE.FOCUSED);
    setIsEmptyValue(inpValue.length === 0);
    searchHandler(inpValue);
  };

  const animationEndHandler = () => {
    if (searchStage === SearchStageE.FOCUS)
      setSearchStage(SearchStageE.FOCUSED);
  };

  const dataTestid = () => {
    switch (searchStage) {
      case SearchStageE.STATIC:
        return 'static';
      case SearchStageE.FOCUS:
        return 'focus';
      case SearchStageE.FOCUSED:
        return 'focused';
      case SearchStageE.BLURRED:
        return 'blurred';
      case SearchStageE.NOT_ACTIVE:
        return 'not-active';
      default:
        return 'static';
    }
  };

  return (
    <Styled.Search
      initAnim={searchStage === SearchStageE.FOCUS}
      finishAnim={searchStage === SearchStageE.NOT_ACTIVE}
      focused={searchStage === SearchStageE.FOCUSED}
      blurred={searchStage === SearchStageE.BLURRED}
      isEmpty={isEmptyValue}
      onClick={searchNoteClickHandler}
      onAnimationEnd={animationEndHandler}
      data-testid={dataTestid()}
    >
      <input
        type="text"
        ref={searchInpRef}
        onInput={onInputHandler}
        onFocus={onInputFocus}
        onBlur={onInputBlur}
        data-testid="search"
      />
    </Styled.Search>
  );
};

export default Search;
