import { IconName } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { Button } from '../../assets/StyledComponents';
import { useRender } from '../../hooks';
import {
  Category,
  CheckboxesList,
  ListSettingsI,
  NotesList,
  TypeOption,
} from '../../patterns';
import Backdrop from '../../UI/Backdrop';
import Modal from '../../UI/Modal';
import { assignTimeStamp, preventWhiteSpace } from '../../utils';
import Icons from './Icons';
import * as Styled from './Styled';

interface Props {
  isOpen: boolean;
  activeList: Category | undefined;
  closeSettings: () => void;
  createList: (list: Category) => void;
  editList: (list: Category) => void;
  deleteCurrentList: () => void;
}

const ListSettings = ({
  isOpen,
  activeList,
  closeSettings,
  createList,
  editList,
  deleteCurrentList,
}: Props): ReactElement | null => {
  const name = activeList?.name || 'Untitled';
  const nameRef = useRef<HTMLInputElement>(undefined!);
  const [listType, setListType] = useState<TypeOption>('notes');
  const [activeIcon, setActiveIcon] = useState<IconName>('file');
  const [modalVisible, setModalVisible] = useState(false);
  const [render, animationEndHandler] = useRender(isOpen);

  useEffect(() => {
    if (activeList) {
      setListType(activeList.type);
      setActiveIcon(activeList.icon);
    } else {
      setListType('notes');
      setActiveIcon('file');
    }
  }, [activeList]);

  const toggleListType = () =>
    setListType(listType === 'notes' ? 'checkboxes' : 'notes');

  const gatherListInfo = (): ListSettingsI => ({
    name: nameRef.current.value,
    icon: activeIcon,
    // id is get assigned from firebase, so value doesn't matter
    id: activeList?.id || '',
    type: listType,
    createdAt: assignTimeStamp(),
  });

  const setListContent = (listSettings: ListSettingsI): Category => {
    if (listSettings.type === 'notes') {
      const oldList = activeList as NotesList | undefined;
      const list: NotesList = {
        ...listSettings,
        type: 'notes',
        notes: oldList?.notes || [],
        removedNotes: oldList?.removedNotes || [],
      };
      return list;
    }
    const oldList = activeList as CheckboxesList | undefined;
    const list: CheckboxesList = {
      ...listSettings,
      type: 'checkboxes',
      checkboxes: oldList?.checkboxes || [],
    };
    return list;
  };

  const confirmList = () => {
    const newList = setListContent(gatherListInfo());
    if (activeList?.name === newList.name && activeList.icon === newList.icon)
      return closeSettings();
    if (!activeList) createList(newList);
    else editList(newList);
    closeSettings();
  };

  const initDeleteList = () => setModalVisible(true);
  const cancelDeleteList = () => setModalVisible(false);
  const confirmDeleteList = () => {
    setModalVisible(false);
    closeSettings();
    deleteCurrentList();
  };

  const modalText = () => {
    const name = activeList?.name.fontcolor('orange') || 'name';

    const text = (
      <span
        dangerouslySetInnerHTML={{
          __html: `Are you sure you want to delete ${name}?`,
        }}
      />
    );

    return text;
  };

  return !render ? null : (
    <>
      <Modal
        visible={modalVisible}
        confirmHandler={confirmDeleteList}
        cancelHandler={cancelDeleteList}
        text={modalText()}
      />
      <Backdrop visible={isOpen} clickHandler={closeSettings} />
      <Styled.ListSettings isOpen={isOpen} onAnimationEnd={animationEndHandler}>
        <Styled.ListName>
          <h4>List Name</h4>
          <Styled.Input
            ref={nameRef}
            defaultValue={name}
            onKeyDown={preventWhiteSpace}
          />
        </Styled.ListName>
        <Styled.ListType>
          <h4>List&apos;s type</h4>
          <Styled.TypeOptions>
            {!activeList && (
              <FontAwesomeIcon
                icon="arrow-alt-circle-left"
                onClick={toggleListType}
              />
            )}
            <Styled.ActiveOption>{listType}</Styled.ActiveOption>
            {!activeList && (
              <FontAwesomeIcon
                icon="arrow-alt-circle-right"
                onClick={toggleListType}
              />
            )}
          </Styled.TypeOptions>
        </Styled.ListType>
        <Icons
          activeIcon={activeIcon}
          changeIcon={(ip: IconName) => setActiveIcon(ip)}
        />
        <Styled.StngsButtons>
          <Button onClick={confirmList}>Confirm</Button>
          <Button onClick={closeSettings}>Cancel</Button>
        </Styled.StngsButtons>
        <Styled.DeleteListIcon
          data-testid="delete-list"
          active={modalVisible ? 'true' : 'false'}
          icon="trash-alt"
          onClick={initDeleteList}
        />
      </Styled.ListSettings>
    </>
  );
};

export default React.memo(ListSettings);
