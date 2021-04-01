import React, { ReactElement } from 'react';
import { FaIcon } from '../../assets/StyledComponents';
import { Category, NoteI } from '../../patterns';
import Backdrop from '../../UI/Backdrop';
import * as Styled from './Styled';
import Toolkit from './Toolkit';

interface Props {
  isOpen: boolean;
  lists: Category[];
  activeList: Category | undefined;
  selectedNotes: NoteI[];
  closeSidebar: () => void;
  createList: () => void;
  changeList: (list: Category) => void;
  openTrash: () => void;
}

const Sidebar = ({
  isOpen,
  lists,
  activeList,
  selectedNotes,
  closeSidebar,
  createList,
  changeList,
  openTrash,
}: Props): ReactElement | null => {
  const listEls = lists.map((l, i) => {
    return (
      <Styled.SidebarItem
        disabled={selectedNotes.length !== 0 && l.type === 'checkboxes'}
        key={l.id}
        onClick={() => {
          const newActiveList = lists.find((list) => list.id === l.id);
          if (newActiveList) changeList(newActiveList);
        }}
      >
        <FaIcon
          size="lg"
          icon={l.icon}
          active={l.id === activeList?.id ? 'true' : 'false'}
          data-testid={`sidebar-${l.icon}`}
        />
      </Styled.SidebarItem>
    );
  });

  return (
    <>
      <Backdrop visible={isOpen} clickHandler={closeSidebar} />
      <Styled.SidebarWrapper isOpen={isOpen}>
        <Styled.Sidebar>{listEls}</Styled.Sidebar>
        <Toolkit
          activeList={activeList}
          isAllowedToOpen={selectedNotes.length === 0}
          isSidebarOpen={isOpen}
          createList={createList}
          openTrash={openTrash}
        />
      </Styled.SidebarWrapper>
    </>
  );
};

export default Sidebar;
