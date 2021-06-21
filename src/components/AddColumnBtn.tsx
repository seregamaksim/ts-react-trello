import { useState } from 'react';

export default function AddColumnBtn(props: { addHandle: any }) {
  const [columnTitle, setColumnTitle] = useState('');
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  function addColumn(e: any) {
    e.preventDefault();
    props.addHandle((prevBoardColumns: object[]) =>
      prevBoardColumns.concat({ id: Date.now(), title: columnTitle })
    );
    setColumnTitle('');
  }

  return (
    <div>
      <button
        onClick={() => {
          setIsOpenPopup(true);
        }}
      >
        Add one more column
      </button>
      {isOpenPopup && (
        <div>
          <button
            onClick={() => {
              setIsOpenPopup(false);
            }}
          >
            X
          </button>
          <form onSubmit={addColumn}>
            <input
              type="text"
              name="column-title"
              value={columnTitle}
              onChange={(e) => setColumnTitle(e.target.value)}
            />
            <button>Add column</button>
          </form>
        </div>
      )}
    </div>
  );
}
