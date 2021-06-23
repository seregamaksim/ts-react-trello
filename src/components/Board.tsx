import { useState } from 'react';
import BoardColumn from './BoardColumn';
import AddColumnBtn from './AddColumnBtn';
import styled from 'styled-components';
import { TBoardColumn, TCard } from '../App';

type TBoardProps = {
  boardColumns: TBoardColumn[];
  addColumn: (data: TBoardColumn) => void;
  addCard: (data: TCard) => void;
  removeColumn: (id: number) => void;
  removeCard: (id: number) => void;
  getCardsByIdColumn: (id: number) => TCard[];
};

export default function Board(props: TBoardProps) {
  return (
    <BoardWrap>
      <BoardColumns>
        {props.boardColumns &&
          props.boardColumns.map((item) => {
            return (
              <StyledBoardColumn
                key={item.id}
                data={item}
                removeColumn={props.removeColumn}
                getCardsByIdColumn={props.getCardsByIdColumn}
                addCard={props.addCard}
                removeCard={props.removeCard}
                // setDataCardModal={setDataCard}
                // openCardModal={setIsOpenCard}
              />
            );
          })}
        {/* {(localBoardColumns || props.boardColumns) &&
          props.boardColumns.map((item) => {
            return (
              <StyledBoardColumn
                key={item.id}
                data={item}
                removeColumn={props.removeColumn}
                setDataCardModal={setDataCard}
                openCardModal={setIsOpenCard}
              />
            );
          })} */}
      </BoardColumns>

      <AddColumnBtn addHandle={props.addColumn} />
    </BoardWrap>
  );
}

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
