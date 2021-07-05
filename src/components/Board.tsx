import BoardColumn from './BoardColumn';
import AddColumnBtn from './AddColumnBtn';
import styled from 'styled-components';
import { TBoardColumn, TCard, TComment } from '../App';

interface IBoardProps {
  boardColumns: TBoardColumn[];
  addColumn: (data: TBoardColumn) => void;
  addCard: (data: TCard) => void;
  removeColumn: (id: number) => void;
  removeCard: (id: number) => void;
  getCardsByIdColumn: (id: number) => TCard[];
  openModal: (arg: boolean) => void;
  setDataCard: (data: TCard) => void;
  getCommentsById: (id: number) => TComment[];
  renameColumn: (id: number, title: string) => void;
}

export default function Board(props: IBoardProps) {
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
                openModal={props.openModal}
                setDataCardModal={props.setDataCard}
                getCommentsById={props.getCommentsById}
                renameColumn={props.renameColumn}
              />
            );
          })}
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
