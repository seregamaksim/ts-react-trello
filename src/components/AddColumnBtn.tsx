import { useState } from 'react';
import styled from 'styled-components';

const AddColumnWrapper = styled.div`
  position: relative;
`;
const AddColumnButton = styled.button`
  min-width: 270px;
  padding: 10px;
  border-radius: 10px;
  font-size: 16px;
  color: var(--white);
  border: 0;
  background-color: var(--lightblue);
  cursor: pointer;
`;
const AddColumnPopup = styled.div<{ isOpenPopup: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  padding: 25px 10px 10px;
  background-color: var(--lightgray);
  min-width: 270px;
  display: ${(props) => (props.isOpenPopup ? 'block' : 'none')};
`;
const AddColumnPopupClose = styled.button`
  position: absolute;
  right: 5px;
  top: 5px;
  background: none;
  border: 0;
  cursor: pointer;
`;
const AddColumnPopupForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const AddColumnPopupInput = styled.input`
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 3px 5px;
`;
const AddColumnPopupBtn = styled.button`
  background-color: var(--lightblue);
  border: 0;
  border-radius: 5px;
  padding: 5px 10px;
  color: var(--white);
`;

export default function AddColumnBtn(props: { addHandle: any }) {
  const [columnTitle, setColumnTitle] = useState<string>('');
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);

  function addColumn(e: React.SyntheticEvent): void {
    e.preventDefault();
    props.addHandle((prevBoardColumns: object[]) =>
      prevBoardColumns.concat({ id: Date.now(), title: columnTitle })
    );
    setColumnTitle('');
  }

  return (
    <AddColumnWrapper>
      <AddColumnButton
        onClick={() => {
          setIsOpenPopup(true);
        }}
      >
        Add one more column
      </AddColumnButton>
      {isOpenPopup && (
        <AddColumnPopup isOpenPopup={isOpenPopup}>
          <AddColumnPopupClose
            onClick={() => {
              setIsOpenPopup(false);
            }}
          >
            X
          </AddColumnPopupClose>
          <AddColumnPopupForm onSubmit={addColumn}>
            <AddColumnPopupInput
              type="text"
              name="column-title"
              placeholder="Enter column name"
              value={columnTitle}
              onChange={(e) => setColumnTitle(e.target.value)}
            />
            <AddColumnPopupBtn>Add column</AddColumnPopupBtn>
          </AddColumnPopupForm>
        </AddColumnPopup>
      )}
    </AddColumnWrapper>
  );
}
