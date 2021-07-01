import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { TCard } from '../App';
import TextareaAutosize from 'react-textarea-autosize';

interface IModalCardTitleProps {
  dataCard: TCard;
  renameCard: (id: number, title: string) => void;
}

export default function ModalCardTitle(props: IModalCardTitleProps) {
  const [newCardTitle, setNewCardTitle] = useState(props.dataCard.title);
  const titleTextareaRef = useRef<HTMLTextAreaElement>(null);
  function onBlurHandler(e: React.SyntheticEvent) {
    if (newCardTitle.length === 0) {
      if (titleTextareaRef.current) {
        titleTextareaRef.current.focus();
      }
      return false;
    }
    if (newCardTitle !== props.dataCard.title && newCardTitle.length !== 0) {
      props.renameCard(props.dataCard.id, newCardTitle);
    }
  }
  function onKeyHandler(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (newCardTitle.length === 0) {
        if (titleTextareaRef.current) {
          titleTextareaRef.current.focus();
        }
        return false;
      }
      if (newCardTitle !== props.dataCard.title) {
        props.renameCard(props.dataCard.id, newCardTitle);
        if (titleTextareaRef.current) {
          titleTextareaRef.current.blur();
        }
      } else {
        if (titleTextareaRef.current) {
          titleTextareaRef.current.blur();
        }
      }
    }
  }

  return (
    <>
      <StyledModalCardTitle>{props.dataCard.title}</StyledModalCardTitle>
      <ModalCardTitleTextarea
        rows={1}
        spellCheck="false"
        value={newCardTitle}
        ref={titleTextareaRef}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setNewCardTitle(e.target.value);
        }}
        onBlur={onBlurHandler}
        onKeyPress={onKeyHandler}
      />
    </>
  );
}

const StyledModalCardTitle = styled.h2`
  display: none;
`;
const ModalCardTitleTextarea = styled(TextareaAutosize)`
  font-family: inherit;
  font-size: 18px;
  font-weight: bold;
  line-height: 1.2;
  background: transparent;
  resize: none;
  border: 1px solid transparent;
  &:focus {
    border-color: var(--lightgray);
    background-color: var(--white);
  }
`;
