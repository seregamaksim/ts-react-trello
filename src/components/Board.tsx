import { useState } from 'react';
import BoardColumn from './BoardColumn';
import AddColumnBtn from './AddColumnBtn';
interface BoardColumnInterface {
  id: number;
  title: string;
}

const initialState = [
  { id: 0, title: 'TODO' },
  { id: 1, title: 'In Progress' },
  { id: 2, title: 'Testing' },
  { id: 3, title: 'Done' },
];
export default function Board() {
  const [boardColumns, setBoardColumns] =
    useState<BoardColumnInterface[]>(initialState);
  return (
    <div>
      <ul>
        {boardColumns.map((item) => {
          return <BoardColumn key={item.id} title={item.title} />;
        })}
      </ul>

      <AddColumnBtn addHandle={setBoardColumns} />
    </div>
  );
}
