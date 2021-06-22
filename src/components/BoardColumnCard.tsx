import { useState } from 'react';
import styled from 'styled-components';
import { TColumnCard } from './BoardColumn';

type TBoardColumnCardProps = {
  data: {
    id: number;
    title: string;
    columnId: number;
  };
  removeCard: (id: number) => void;
  setDataCardModal: (data: TColumnCard) => void;
  openCardModal: (arg: boolean) => void;
  className?: string;
};

const CardItemRemove = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0;
  pointer-events: none;
  z-index: 2;
`;
const CardItem = styled.li`
  background-color: var(--white);
  border-radius: 3px;
  box-shadow: 0 1px 0 rgb(9 30 66 / 25%);
  padding: 6px;
  cursor: pointer;
  position: relative;
  &:hover {
    background-color: #f4f5f7;
    ${CardItemRemove} {
      opacity: 1;
      pointer-events: all;
    }
  }
`;
const CardItemTitleWrap = styled.div`
  margin-bottom: 10px;
`;
const CardItemInfoWrap = styled.div`
  display: flex;
`;
const CardItemInfoElem = styled.p`
  font-size: 12px;
`;
const CardItemLink = styled.a`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 1;
`;
export default function BoardColumnCard(props: TBoardColumnCardProps) {
  const [commentCount, setCommentCount] = useState(0);
  return (
    <CardItem className={props.className}>
      <CardItemLink
        onClick={() => {
          props.setDataCardModal(props.data);
          props.openCardModal(true);
        }}
      ></CardItemLink>
      <CardItemRemove onClick={() => props.removeCard(props.data.id)}>
        X
      </CardItemRemove>
      <CardItemTitleWrap>
        <p>{props.data.title}</p>
      </CardItemTitleWrap>
      <CardItemInfoWrap>
        <CardItemInfoElem>
          💬 <span>{commentCount}</span>
        </CardItemInfoElem>
      </CardItemInfoWrap>
    </CardItem>
  );
}