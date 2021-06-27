import { FormEvent, useState } from 'react';
import { TCard, TComment } from '../App';

interface IModalCardProps {
  dataCard: TCard | null;
  isOpen: boolean;
  userName: string;
  setIsOpenCard: (arg: boolean) => void;
  addComment: (data: TComment) => void;
  getCommentsById: (id: number) => TComment[];
  removeComment: (id: number) => void;
}

export default function ModalCard(props: IModalCardProps) {
  const [commentVal, setCommentVal] = useState('');

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
  if (props.dataCard && props.isOpen) {
    const comments = props.getCommentsById(props.dataCard.id);

    return (
      <div className={props.isOpen ? 'modal active' : 'modal'}>
        <div className="modal__wrapper">
          <div>
            <h2>{props.dataCard.title}</h2>
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
