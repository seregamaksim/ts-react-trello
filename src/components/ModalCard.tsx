import { FormEvent, useState } from 'react';
import styled from 'styled-components';
import { TBoardColumn, TCard, TComment, TDescription } from '../App';
import ModalCardTitle from './ModalCardTitle';
import Comment from './Comment';
import Description from './Description';
import AddForm from './AddForm';
import isEmpty from '../helpers/isEmpty';

interface IModalCardProps {
  dataCard: TCard;
  isOpen: boolean;
  userName: string;
  setIsOpenCard: (arg: boolean) => void;
  addComment: (data: TComment) => void;
  getCommentsById: (id: number) => TComment[];
  removeComment: (id: number) => void;
  renameCard: (id: number, title: string) => void;
  changeComment: (id: number, body: string) => void;
  addDescription: (data: TDescription) => void;
  removeDescription: (id: number) => void;
  getDescriptionById: (id: number) => TDescription;
  getColumnById: (id: number) => TBoardColumn;
  changeDescription: (id: number, body: string) => void;
}
interface ModalProps {
  readonly $isOpen: boolean;
}
export default function ModalCard(props: IModalCardProps) {
  const [commentVal, setCommentVal] = useState('');
  const [descrText, setDescrText] = useState('');
  const comments = props.getCommentsById(props.dataCard.id);
  const description = props.getDescriptionById(props.dataCard.id);
  const columnInfo = props.getColumnById(props.dataCard.columnId);

  function submitComment(e: FormEvent) {
    e.preventDefault();
    if (commentVal.length > 0) {
      if (props.dataCard) {
        props.addComment({
          id: Date.now(),
          body: commentVal,
          cardId: props.dataCard.id,
        });
      }
      setCommentVal('');
    }
  }
  function submitDescription(e: FormEvent) {
    e.preventDefault();
    if (descrText.length > 0) {
      if (props.dataCard) {
        props.addDescription({
          id: Date.now(),
          body: descrText,
          cardId: props.dataCard.id,
        });
      }
      setDescrText('');
    }
  }
  return (
    <Modal $isOpen={props.isOpen}>
      <div className="modal__wrapper">
        <div>
          <ModalCardTitle
            dataCard={props.dataCard}
            renameCard={props.renameCard}
          />
          <p>{`Inside a column ${columnInfo.title}`}</p>
          <ModalCardAuthor>
            Author: <span>{props.userName}</span>
          </ModalCardAuthor>
          <ModalCardCloseBtn
            onClick={() => {
              document.body.style.overflow = '';
              props.setIsOpenCard(false);
            }}
          >
            X
          </ModalCardCloseBtn>
        </div>
        <hr />
        <div>
          <ModalCardSectionTitle>Description:</ModalCardSectionTitle>
          <DescrWrapper>
            {!isEmpty(description) && (
              <Description
                data={description}
                removeDescription={props.removeDescription}
                changeDescription={props.changeDescription}
              />
            )}
          </DescrWrapper>
          {isEmpty(description) && (
            <AddForm
              submitHandler={submitDescription}
              textAreaValue={descrText}
              changeTextValue={setDescrText}
              buttonValue="Add description"
            />
          )}
        </div>
        <hr />
        <div>
          <ModalCardSectionTitle>Comments:</ModalCardSectionTitle>
          <CommentsList>
            {comments.map((item) => {
              return (
                <StyledComment
                  key={item.id}
                  data={item}
                  userName={props.userName}
                  removeComment={props.removeComment}
                  changeComment={props.changeComment}
                />
              );
            })}
          </CommentsList>
          <AddForm
            submitHandler={submitComment}
            textAreaValue={commentVal}
            changeTextValue={setCommentVal}
            buttonValue="Add comment"
          />
        </div>
      </div>
    </Modal>
  );
}

const Modal = styled.div.attrs<ModalProps>(({ $isOpen }) => ({
  className: $isOpen ? 'modal active' : 'modal',
}))<ModalProps>``;
const ModalCardCloseBtn = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
`;
const CommentsList = styled.ul`
  margin-bottom: 20px;
  &:empty {
    margin-bottom: 0;
  }
`;
const ModalCardSectionTitle = styled.h4`
  margin-bottom: 15px;
`;
const StyledComment = styled(Comment)`
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
`;
const ModalCardAuthor = styled.p`
  font-size: 12px;
  span {
    font-weight: bold;
  }
`;
const DescrWrapper = styled.div`
  margin-bottom: 20px;
  &:empty {
    margin-bottom: 0;
  }
`;
