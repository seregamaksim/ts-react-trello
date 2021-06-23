import React, { useEffect, useState } from 'react';
import Board from './components/Board';
import LoginModal from './components/LoginModal';
import ModalCard from './components/ModalCard';

export type TBoardColumn = {
  id: number;
  title: string;
};
export type TCard = {
  id: number;
  title: string;
  columnId: number;
};

const initialStateColumns = [
  { id: 0, title: 'TODO' },
  { id: 1, title: 'In Progress' },
  { id: 2, title: 'Testing' },
  { id: 3, title: 'Done' },
];

function App() {
  const [userName, setUserName] = useState('');
  const localUserName = localStorage.getItem('userName');
  // const localBoardColumns = JSON.parse(
  //   localStorage.getItem('boardColumns') || '[]'
  // );
  // const [boardColumns, setBoardColumns] = useState<TBoardColumn[]>(
  //   localBoardColumns || initialStateColumns
  // );
  const [boardColumns, setBoardColumns] =
    useState<TBoardColumn[]>(initialStateColumns);
  const [cards, setCards] = useState<TCard[]>([]);
  // const [isOpenCard, setIsOpenCard] = useState(false);
  // const [dataCard, setDataCard] = useState<TCard | null>(null);

  // localStorage.setItem('boardColumns', JSON.stringify(boardColumns));

  function removeColumn(id: number): void {
    const newColumns = boardColumns.filter((item) => item.id !== id);
    setBoardColumns(newColumns);
  }
  function addColumn(data: TBoardColumn) {
    const newColumns = boardColumns.concat(data);
    setBoardColumns(newColumns);
  }
  function removeCard(id: number) {
    let newCards = cards.filter((item) => item.id !== id);
    setCards(newCards);
  }
  function addCard(data: TCard) {
    const newCards = cards.concat(data);
    setCards(newCards);
  }
  function getCardsByIdColumn(id: number) {
    const neededCards = cards.filter((item) => item.columnId === id);
    return neededCards;
  }
  return (
    <>
      {!localUserName && <LoginModal setUserName={setUserName} />}
      <Board
        addColumn={addColumn}
        removeColumn={removeColumn}
        boardColumns={boardColumns}
        getCardsByIdColumn={getCardsByIdColumn}
        addCard={addCard}
        removeCard={removeCard}
      />
      {/* <ModalCard
        dataCard={dataCard}
        setIsOpenCard={setIsOpenCard}
        isOpen={isOpenCard}
      /> */}
    </>
  );
}

export default App;
