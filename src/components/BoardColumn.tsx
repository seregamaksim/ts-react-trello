import { useEffect, useState } from 'react';
import styled from 'styled-components';
import BoardColumnCard from './BoardColumnCard';
import { TBoardColumn, TCard } from '../App';

export default function BoardColumn(props: {
  data: TBoardColumn;
  removeColumn: (id: number) => void;
  addCard: (data: TCard) => void;
  removeCard: (id: number) => void;
  getCardsByIdColumn: (id: number) => TCard[];
  // setDataCardModal: (data: TCard) => void;
  // openCardModal: (arg: boolean) => void;
  className?: string;
}) {
  // const [cards, setCards] = useState<TCard[]>([]);
  const cardsCurrentColumn = props.getCardsByIdColumn(props.data.id);
  const [newCardValue, setNewCardValue] = useState('');
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);

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
  // function removeCard(id: number) {
  //   let newCards = cards.filter((item) => item.id !== id);
  //   setCards(newCards);
  // }
  return (
    <BoardColumnItem className={props.className}>
      <div>
        <BoardColumnHeader>
          <BoardColumnTitle>{props.data.title}</BoardColumnTitle>
          <button onClick={() => props.removeColumn(props.data.id)}>X</button>
        </BoardColumnHeader>
        <BoardColumnCardsList>
          {cardsCurrentColumn.map((item) => (
            <StyledBoardColumnCard
              key={item.id}
              data={item}
              removeCard={props.removeCard}
              // setDataCardModal={props.setDataCardModal}
              // openCardModal={props.openCardModal}
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
