import React, { ReactElement } from 'react';
import Search from '../Search';
import { Category, NoteSortType } from '../../patterns';
import * as Styled from './Styled';
import { useRender } from '../../hooks';

interface Props {
  list: Category | undefined;
  sortType: NoteSortType;
  selectedNotesNotEmpty: boolean;
  toggleSidebar: () => void;
  openListSettings: () => void;
  removeSelectedNotes: () => void;
  clearSelectedNotes: () => void;
  searchNotes: (noteTitle: string) => void;
  toggleSortType: () => void;
}

export const Navigation = ({
  sortType,
  list,
  selectedNotesNotEmpty,
  toggleSidebar,
  openListSettings,
  removeSelectedNotes,
  clearSelectedNotes,
  searchNotes,
  toggleSortType,
}: Props): ReactElement => {
  const [renderSelectedNav, animationEndHandler] = useRender(
    selectedNotesNotEmpty
  );

  return (
    <Styled.Wrapper selectedNotesPresent={selectedNotesNotEmpty}>
      <Styled.Navigation selectedNotesPresent={selectedNotesNotEmpty}>
        <Styled.NavColumn>
          <Styled.Icon icon="bars" onClick={toggleSidebar} />
          {list && list.type === 'notes' && (
            <Search activeList={list} searchHandler={searchNotes} />
          )}
        </Styled.NavColumn>
        <Styled.NavColumn>
          {list && list.type === 'notes' && (
            <>
              <Styled.Icon
                data-testid="nav-test-item"
                active={sortType === 'column' ? 'true' : 'false'}
                onClick={toggleSortType}
                icon="grip-lines"
              />
              <Styled.Icon
                data-testid="nav-test-item"
                active={sortType === 'square' ? 'true' : 'false'}
                onClick={toggleSortType}
                icon="th-large"
              />
            </>
          )}
          <Styled.Icon icon="cog" onClick={openListSettings} />
        </Styled.NavColumn>
      </Styled.Navigation>
      {renderSelectedNav && (
        <Styled.SelectedNotesNav
          active={selectedNotesNotEmpty}
          onAnimationEnd={animationEndHandler}
          data-testid="selected-nav"
        >
          <Styled.SelectedNotesNavInner>
            <div>
              <Styled.Icon icon="times" onClick={clearSelectedNotes} />
            </div>
            <div>
              <Styled.Icon icon="copy" onClick={toggleSidebar} />
              <Styled.Icon icon="folder-minus" onClick={removeSelectedNotes} />
            </div>
          </Styled.SelectedNotesNavInner>
        </Styled.SelectedNotesNav>
      )}
    </Styled.Wrapper>
  );
};

export default Navigation;
