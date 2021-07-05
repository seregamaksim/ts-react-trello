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
export type TDescription = {
  id: number;
  body: string;
  cardId: number;
};
enum LOCALSTORAGE_KEYS {
  userName = 'userName',
  boardColumns = 'boardColumns',
  descriptions = 'descriptions',
  comments = 'comments',
}

const initialStateColumns = [
  { id: 0, title: 'TODO' },
  { id: 1, title: 'In Progress' },
  { id: 2, title: 'Testing' },
  { id: 3, title: 'Done' },
];

export default function App() {
  const [userName, setUserName] = useState('');
  const localUserName =
    localStorage.getItem(LOCALSTORAGE_KEYS.userName) || userName;
  const localBoardColumns = JSON.parse(
    localStorage.getItem(LOCALSTORAGE_KEYS.boardColumns) || '[]'
  );
  const localCards = JSON.parse(localStorage.getItem('cards') || '[]');
  const localDescriptions = JSON.parse(
    localStorage.getItem(LOCALSTORAGE_KEYS.descriptions) || '[]'
  );
  const localComments = JSON.parse(
    localStorage.getItem(LOCALSTORAGE_KEYS.comments) || '[]'
  );

  const [boardColumns, setBoardColumns] = useState<TBoardColumn[]>(
    localBoardColumns.length > 0 ? localBoardColumns : initialStateColumns
  );
  const [cards, setCards] = useState<TCard[]>(
    localCards.length > 0 ? localCards : []
  );
  const [isOpenCard, setIsOpenCard] = useState(false);
  const [dataCard, setDataCard] = useState<TCard | null>(null);
  const [comments, setComments] = useState<TComment[]>(
    localComments.length > 0 ? localComments : []
  );
  const [descriptions, setDescriptions] = useState<TDescription[]>(
    localDescriptions.length > 0 ? localDescriptions : []
  );

  localStorage.setItem('boardColumns', JSON.stringify(boardColumns));
  localStorage.setItem('cards', JSON.stringify(cards));
  localStorage.setItem('descriptions', JSON.stringify(descriptions));
  localStorage.setItem('comments', JSON.stringify(comments));

  function addColumn(data: TBoardColumn): void {
    setBoardColumns([...boardColumns, data]);
  }
  function removeColumn(id: number): void {
    const newColumns = boardColumns.filter((item) => item.id !== id);
    setBoardColumns(newColumns);
  }
  function getColumnById(id: number): TBoardColumn {
    const neededColumn = boardColumns.filter((item) => item.id === id);
    return neededColumn[0];
  }
  function removeCard(id: number): void {
    let newCards = cards.filter((item) => item.id !== id);
    setCards(newCards);
  }
  function addCard(data: TCard): void {
    setCards([...cards, data]);
  }
  function getCardsByIdColumn(id: number): TCard[] {
    const neededCards = cards.filter((item) => item.columnId === id);
    return neededCards;
  }
  function addComment(comment: TComment): void {
    setComments([...comments, comment]);
  }
  function removeComment(id: number): void {
    const newComments = comments.filter((item) => item.id !== id);
    setComments(newComments);
  }
  function changeComment(id: number, body: string): void {
    const newComments = comments.map((item) => {
      if (item.id === id) {
        item.body = body;
      }
      return item;
    });
    setComments(newComments);
  }
  function getCommentsById(id: number): TComment[] {
    const neededComments = comments.filter((item) => item.cardId === id);
    return neededComments;
  }
  function renameColumn(id: number, title: string): void {
    const newBoardColumns = boardColumns.map((item) => {
      if (item.id === id) {
        item.title = title;
      }
      return item;
    });
    setBoardColumns(newBoardColumns);
  }
  function renameCard(id: number, title: string) {
    const newCards = cards.map((item) => {
      if (item.id === id) {
        item.title = title;
      }
      return item;
    });
    setCards(newCards);
  }
  function addDescription(description: TDescription): void {
    setDescriptions([...descriptions, description]);
  }
  function removeDescription(id: number): void {
    const newDescriptions = descriptions.filter((item) => item.id !== id);
    setDescriptions(newDescriptions);
  }
  function getDescriptionById(id: number): TDescription {
    const neededDescription = descriptions.filter((item) => item.cardId === id);
    return neededDescription[0];
  }
  function changeDescription(id: number, body: string): void {
    const newDescriptions = descriptions.map((item) => {
      if (item.id === id) {
        item.body = body;
      }
      return item;
    });
    setDescriptions(newDescriptions);
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

      {isOpenCard && dataCard && (
        <ModalCard
          dataCard={dataCard}
          setIsOpenCard={setIsOpenCard}
          isOpen={isOpenCard}
          addComment={addComment}
          getCommentsById={getCommentsById}
          removeComment={removeComment}
          userName={localUserName}
          renameCard={renameCard}
          changeComment={changeComment}
          addDescription={addDescription}
          removeDescription={removeDescription}
          getDescriptionById={getDescriptionById}
          getColumnById={getColumnById}
          changeDescription={changeDescription}
        />
      )}
    </>
  );
}
