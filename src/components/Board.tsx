import { useState } from 'react';
import BoardColumn from './BoardColumn';
import AddColumnBtn from './AddColumnBtn';
import styled from 'styled-components';
import ModalCard from './ModalCard';

type TBoardColumnInterface = {
  id: number;
  title: string;
};

export type TCard = {
  id: number;
  title: string;
};
const initialState = [
  { id: 0, title: 'TODO' },
  { id: 1, title: 'In Progress' },
  { id: 2, title: 'Testing' },
  { id: 3, title: 'Done' },
];
const BoardWrap = styled.div`
  display: flex;
  padding: 15px;
`;
const BoardColumns = styled.ul`
  display: flex;
  align-items: flex-start;
  margin-right: 15px;
  &:empty {
    margin-right: 0;
  }
`;
const StyledBoardColumn = styled(BoardColumn)`
  min-width: 270px;
  margin-right: 15px;
  &:last-child {
    margin-right: 0;
  }
`;
export default function Board() {
  const localBoardColumns = JSON.parse(
    localStorage.getItem('boardColumns') || '[]'
  );
  const [boardColumns, setBoardColumns] = useState<TBoardColumnInterface[]>(
    localBoardColumns || initialState
  );

  const [isOpenCard, setIsOpenCard] = useState(false);
  const [dataCard, setDataCard] = useState<TCard | null>(null);

  localStorage.setItem('boardColumns', JSON.stringify(boardColumns));

  function removeColumn(id: number): void {
    const newColumns = boardColumns.filter((item) => item.id !== id);
    setBoardColumns(newColumns);
  }

  return (
    <BoardWrap className="test">
      <BoardColumns>
        {(localBoardColumns || boardColumns) &&
          boardColumns.map((item) => {
            return (
              <StyledBoardColumn
                key={item.id}
                data={item}
                removeColumn={removeColumn}
                setDataCardModal={setDataCard}
                openCardModal={setIsOpenCard}
              />
            );
          })}
      </BoardColumns>

      <AddColumnBtn addHandle={setBoardColumns} />

      <ModalCard
        setIsOpenCard={setIsOpenCard}
        isOpen={isOpenCard}
        dataCard={dataCard}
      />
    </BoardWrap>
  );
}
