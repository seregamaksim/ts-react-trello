import styled from 'styled-components';
import { TCard, TComment } from '../App';

type TBoardColumnCardProps = {
  data: TCard;
  removeCard: (id: number) => void;
  openModal: (arg: boolean) => void;
  setDataCardModal: (data: TCard) => void;
  getCommentsById: (id: number) => TComment[];
  className?: string;
};

export default function BoardColumnCard(props: TBoardColumnCardProps) {
  const commentsCount = props.getCommentsById(props.data.id).length;
  function openModal() {
    props.openModal(true);
    props.setDataCardModal(props.data)
    document.body.style.overflow = 'hidden';
  }
  return (
    <CardItem className={props.className}>
      <CardItemLink
        onClick={openModal}
      ></CardItemLink>
      <CardItemRemove onClick={() => props.removeCard(props.data.id)}>
        X
      </CardItemRemove>
      <CardItemTitleWrap>
        <p>{props.data.title}</p>
      </CardItemTitleWrap>
      <CardItemInfoWrap>
        <CardItemInfoElem>
          💬 <span>{commentsCount}</span>
        </CardItemInfoElem>
      </CardItemInfoWrap>
    </CardItem>
  );
}

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
