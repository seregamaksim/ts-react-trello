import { useEffect, useState } from 'react';
import styled from 'styled-components';
import BoardColumnCard from './BoardColumnCard';

export type TColumnCard = {
  id: number;
  title: string;
};
export type TCard = {
  id: number;
  title: string;
  columnTitle: string;
};
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
export default function BoardColumn(props: {
  data: TColumnCard;
  removeColumn: (id: number) => void;
  setDataCardModal: (data: TCard) => void;
  openCardModal: (arg: boolean) => void;
  className?: string;
}) {
  const [cards, setCards] = useState<TCard[]>([]);
  const [newCardValue, setNewCardValue] = useState('');
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);

  function addNewCard(e: React.SyntheticEvent): void {
    e.preventDefault();
    setCards(
      cards.concat({
        id: Date.now(),
        title: newCardValue,
        columnTitle: props.data.title,
      })
    );
    setNewCardValue('');
  }
  function removeCard(id: number) {
    let newCards = cards.filter((item) => item.id !== id);
    setCards(newCards);
  }
  useEffect(() => {
    console.log('cards', cards);
  }, [cards]);
  return (
    <BoardColumnItem className={props.className}>
      <div>
        <BoardColumnHeader>
          <BoardColumnTitle>{props.data.title}</BoardColumnTitle>
          <button onClick={() => props.removeColumn(props.data.id)}>X</button>
        </BoardColumnHeader>
        <BoardColumnCardsList>
          {cards.map((item) => (
            <StyledBoardColumnCard
              key={item.id}
              data={item}
              removeCard={removeCard}
              setDataCardModal={props.setDataCardModal}
              openCardModal={props.openCardModal}
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
