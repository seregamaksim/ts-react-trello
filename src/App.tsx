import { useEffect, useState } from 'react';
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
export type TComment = {
  id: number;
  body: string;
  cardId: number;
};

const initialStateColumns = [
  { id: 0, title: 'TODO' },
  { id: 1, title: 'In Progress' },
  { id: 2, title: 'Testing' },
  { id: 3, title: 'Done' },
];

export default function App() {
  const [userName, setUserName] = useState('');
  const localUserName = localStorage.getItem('userName') || userName;
  // const localBoardColumns = JSON.parse(
  //   localStorage.getItem('boardColumns') || '[]'
  // );
  // const [boardColumns, setBoardColumns] = useState<TBoardColumn[]>(
  //  localBoardColumns.lenght > 0 ? localBoardColumns : initialStateColumns
  // );
  const [boardColumns, setBoardColumns] =
    useState<TBoardColumn[]>(initialStateColumns);
  const [cards, setCards] = useState<TCard[]>([]);
  const [isOpenCard, setIsOpenCard] = useState(false);
  const [dataCard, setDataCard] = useState<TCard | null>(null);
  const [comments, setComments] = useState<TComment[]>([]);

  // localStorage.setItem('boardColumns', JSON.stringify(boardColumns));

  function removeColumn(id: number): void {
    const newColumns = boardColumns.filter((item) => item.id !== id);
    setBoardColumns(newColumns);
  }
  function addColumn(data: TBoardColumn): void {
    const newColumns = boardColumns.concat(data);
    setBoardColumns(newColumns);
  }
  function removeCard(id: number): void {
    let newCards = cards.filter((item) => item.id !== id);
    setCards(newCards);
  }
  function addCard(data: TCard): void {
    const newCards = cards.concat(data);
    setCards(newCards);
  }
  function getCardsByIdColumn(id: number): TCard[] {
    const neededCards = cards.filter((item) => item.columnId === id);
    return neededCards;
  }
  function addComment(comment: TComment): void {
    const newComments = comments.concat(comment);
    setComments(newComments);
  }
  function removeComment(id: number): void {
    const newComments = comments.filter((item) => item.id !== id);
    setComments(newComments);
  }
  function getCommentsById(id: number): TComment[] {
    const neededComments = comments.filter((item) => item.cardId === id);
    return neededComments;
  }
  function renameColumn(id: number, title: string): void {
    let newBoardColumns = [...boardColumns];
    newBoardColumns.forEach((item) => {
      if (item.id === id) {
        item.title = title;
      }
    });
    setBoardColumns(newBoardColumns);
  }
  function renameCard(id: number, title: string) {
    let newCards = [...cards];
    newCards.forEach((item) => {
      if (item.id === id) {
        item.title = title;
      }
    });
    setCards(newCards);
  }
  useEffect(() => {
    const closeModal = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpenCard(false);
        document.body.style.overflow = '';
      }
    };

    window.addEventListener('keydown', closeModal);
    return () => window.removeEventListener('keydown', closeModal);
  }, []);

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
        openModal={setIsOpenCard}
        setDataCard={setDataCard}
        getCommentsById={getCommentsById}
        renameColumn={renameColumn}
      />
      {dataCard && (
        <ModalCard
          dataCard={dataCard}
          setIsOpenCard={setIsOpenCard}
          isOpen={isOpenCard}
          addComment={addComment}
          getCommentsById={getCommentsById}
          removeComment={removeComment}
          userName={localUserName}
          renameCard={renameCard}
        />
      )}
    </>
  );
}
