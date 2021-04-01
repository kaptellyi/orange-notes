import React, { ReactElement, useState, useEffect } from 'react';
import { FaIcon, NavItem } from '../../assets/StyledComponents';
import { useRender } from '../../hooks';
import { Category } from '../../patterns';
import * as Styled from './Styled';

interface Props {
  activeList: Category | undefined;
  isSidebarOpen: boolean;
  isAllowedToOpen: boolean;
  openTrash: () => void;
  createList: () => void;
}

const Toolkit = ({
  activeList,
  isSidebarOpen,
  isAllowedToOpen,
  createList,
  openTrash,
}: Props): ReactElement => {
  const [toolkitItemsOpen, setToolkitItemsOpen] = useState(false);
  const [render, animationEndHandler] = useRender(toolkitItemsOpen);

  useEffect(() => {
    if (!isSidebarOpen) setToolkitItemsOpen(false);
  }, [isSidebarOpen]);

  const toggleToolkitItems = () => {
    if (!isAllowedToOpen) return;
    setToolkitItemsOpen((prev) => !prev);
  };
  const hideToolkitItems = () => setToolkitItemsOpen(false);

  return (
    <Styled.Toolkit>
      {render && (
        <Styled.ToolkitItems
          showToolkit={toolkitItemsOpen}
          onAnimationEnd={animationEndHandler}
        >
          <NavItem>
            <FaIcon
              size="lg"
              icon="plus"
              onClick={() => {
                createList();
                hideToolkitItems();
              }}
            />
          </NavItem>
          {activeList?.type === 'notes' && (
            <NavItem onClick={openTrash}>
              <FaIcon size="lg" icon="trash-restore" />
            </NavItem>
          )}
        </Styled.ToolkitItems>
      )}
      <Styled.ToolkitToggler onClick={toggleToolkitItems} />
    </Styled.Toolkit>
  );
};

export default Toolkit;
