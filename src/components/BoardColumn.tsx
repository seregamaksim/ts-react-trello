import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import BoardColumnCard from './BoardColumnCard';
import { TBoardColumn, TCard, TComment } from '../App';

interface IBoardColumnProps {
  data: TBoardColumn;
  removeColumn: (id: number) => void;
  addCard: (data: TCard) => void;
  removeCard: (id: number) => void;
  getCardsByIdColumn: (id: number) => TCard[];
  openModal: (arg: boolean) => void;
  setDataCardModal: (data: TCard) => void;
  getCommentsById: (id: number) => TComment[];
  renameColumn: (id: number, title: string) => void;
  className?: string;
}

export default function BoardColumn(props: IBoardColumnProps) {
  const cardsCurrentColumn = props.getCardsByIdColumn(props.data.id);
  const [newCardValue, setNewCardValue] = useState('');
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState(props.data.title);
  const titleTextareaRef = useRef<HTMLTextAreaElement>(null);

  function addNewCard(e: React.SyntheticEvent): void {
    e.preventDefault();
    if (newCardValue.length > 0) {
      props.addCard({
        id: Date.now(),
        title: newCardValue,
        columnId: props.data.id,
      });
      setNewCardValue('');
    }
  }
  return (
    <BoardColumnItem className={props.className}>
      <div>
        <BoardColumnHeader>
          <BoardColumnTitle>{props.data.title}</BoardColumnTitle>
          <BoardColumnTitleTextarea
            rows={1}
            value={newCardTitle}
            ref={titleTextareaRef}
            onChange={(e) => setNewCardTitle(e.target.value)}
            onBlur={(e) => {
              if (newCardTitle !== props.data.title) {
                props.renameColumn(props.data.id, newCardTitle);
              }
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (newCardTitle !== props.data.title) {
                  props.renameColumn(props.data.id, newCardTitle);
                  if (titleTextareaRef.current) {
                    titleTextareaRef.current.blur();
                  }
                }
              }
            }}
          />
          <button onClick={() => props.removeColumn(props.data.id)}>X</button>
        </BoardColumnHeader>
        <BoardColumnCardsList>
          {cardsCurrentColumn.map((item) => (
            <StyledBoardColumnCard
              key={item.id}
              data={item}
              removeCard={props.removeCard}
              openModal={props.openModal}
              setDataCardModal={props.setDataCardModal}
              getCommentsById={props.getCommentsById}
            />
          ))}
        </BoardColumnCardsList>
        <footer>
          {!isAddCardPopupOpen && (
            <button onClick={() => setIsAddCardPopupOpen(true)}>
              Add one more card
            </button>
          )}
          {isAddCardPopupOpen && (
            <div>
              <form onSubmit={addNewCard}>
                <BoardColumnFormInput
                  type="text"
                  name="card-title"
                  value={newCardValue}
                  placeholder="Enter card title"
                  onChange={(e) => setNewCardValue(e.target.value)}
                />
                <button>Add</button>
                <button
                  type="button"
                  onClick={() => setIsAddCardPopupOpen(false)}
                >
                  Close
                </button>
              </form>
            </div>
          )}
        </footer>
      </div>
    </BoardColumnItem>
  );
}

const BoardColumnItem = styled.li`
  padding: 10px;
  background-color: var(--lightgray);
`;
const BoardColumnHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--lightgray2);
  margin-bottom: 10px;
`;
const BoardColumnTitle = styled.h2`
  font-size: 18px;
  display: none;
`;
const BoardColumnFormInput = styled.input`
  display: block;
  width: 100%;
  margin-bottom: 10px;
`;
const BoardColumnCardsList = styled.ul`
  margin-bottom: 10px;
`;
const StyledBoardColumnCard = styled(BoardColumnCard)`
  margin-bottom: 8px;
  &:last-child {
    margin-bottom: 0;
  }
`;
const BoardColumnTitleTextarea = styled.textarea`
  font-family: inherit;
  font-size: 18px;
  font-weight: bold;
  line-height: 1.2;
  background: transparent;
  border: 0;
  resize: none;

  &:focus {
    border: 1px solid var(--lightgray);
    background-color: var(--white);
  }
`;
