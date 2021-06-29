import React, {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { TCard, TComment } from '../App';

interface IModalCardProps {
  dataCard: TCard | null;
  isOpen: boolean;
  userName: string;
  setIsOpenCard: (arg: boolean) => void;
  addComment: (data: TComment) => void;
  getCommentsById: (id: number) => TComment[];
  removeComment: (id: number) => void;
  renameCard: (id: number, title: string) => void;
}

export default function ModalCard(props: IModalCardProps) {
  const [commentVal, setCommentVal] = useState('');
  const [newCardTitle, setNewCardTitle] = useState('');
  const titleTextareaRef = useRef<HTMLTextAreaElement>(null);

  console.log('newCardTitle', newCardTitle);

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
  function onBlurHandler(e: React.SyntheticEvent) {
    if (props.dataCard) {
      if (newCardTitle.length === 0) {
        if (titleTextareaRef.current) {
          titleTextareaRef.current.focus();
        }
        return false;
      }
      if (newCardTitle !== props.dataCard.title && newCardTitle.length !== 0) {
        props.renameCard(props.dataCard.id, newCardTitle);
      }
    }
  }
  function onKeyHandler(e: KeyboardEvent) {
    if (e.key === 'Enter' && props.dataCard) {
      e.preventDefault();
      if (newCardTitle.length === 0) {
        if (titleTextareaRef.current) {
          titleTextareaRef.current.focus();
        }
        return false;
      }
      if (newCardTitle !== props.dataCard.title) {
        props.renameCard(props.dataCard.id, newCardTitle);
        if (titleTextareaRef.current) {
          titleTextareaRef.current.blur();
        }
      } else {
        if (titleTextareaRef.current) {
          titleTextareaRef.current.blur();
        }
      }
    }
  }
  if (props.dataCard && props.isOpen) {
    const comments = props.getCommentsById(props.dataCard.id);
    return (
      <div className={props.isOpen ? 'modal active' : 'modal'}>
        <div className="modal__wrapper">
          <div>
            <ModalCardTitle>{props.dataCard.title}</ModalCardTitle>
            <ModalCardTitleTextarea
              value={newCardTitle}
              name=""
              rows={1}
              ref={titleTextareaRef}
              onChange={(e) => {
                setNewCardTitle(e.target.value);
              }}
              onBlur={onBlurHandler}
              onKeyPress={onKeyHandler}
            />
            <p>{`Inside a column ${props.dataCard.columnId}`}</p>
            <button
              onClick={() => {
                document.body.style.overflow = '';
                props.setIsOpenCard(false);
              }}
            >
              X
            </button>
          </div>
          <hr />
          <div>
            <p>Description:</p>
          </div>
          <hr />
          <div>
            <p>Comments:</p>
            <ul>
              {comments.map((item) => {
                return (
                  <li key={item.id}>
                    <p>{item.body}</p>
                    <p>Author: {props.userName}</p>
                    <button onClick={() => props.removeComment(item.id)}>
                      X
                    </button>
                  </li>
                );
              })}
            </ul>
            <div>
              <form onSubmit={submitComment}>
                <input
                  type="text"
                  name="comment"
                  value={commentVal}
                  onChange={(e) => setCommentVal(e.target.value)}
                />
                <button>Add comment</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

const ModalCardTitle = styled.h2`
  display: none;
`;
const ModalCardTitleTextarea = styled.textarea`
  font-family: inherit;
  font-size: 18px;
  font-weight: bold;
  line-height: 1.2;
  background: transparent;
  border: 0;
  resize: none;

  &:focus {
    border: 1px solid var(--lightgray);
    background-color: var(--white);
  }
`;
