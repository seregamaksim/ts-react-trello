import { useRef, useState } from 'react';
import styled from 'styled-components';
import { TComment } from '../App';
import TextareaAutosize from 'react-textarea-autosize';

interface IComment {
  data: TComment;
  userName: string;
  removeComment: (id: number) => void;
  changeComment: (id: number, body: string) => void;
  className?: string;
}

export default function Comment(props: IComment) {
  const [commentText, setCommentText] = useState(props.data.body);
  const textTextareaRef = useRef<HTMLTextAreaElement>(null);
  function onBlurHandler(e: React.SyntheticEvent) {
    if (commentText.length === 0) {
      if (textTextareaRef.current) {
        textTextareaRef.current.focus();
      }
      return false;
    }
    if (commentText !== props.data.body && commentText.length !== 0) {
      props.changeComment(props.data.id, commentText);
    }
  }
  function onKeyHandler(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (commentText.length === 0) {
        if (textTextareaRef.current) {
          textTextareaRef.current.focus();
        }
        return false;
      }
      if (commentText !== props.data.body) {
        props.changeComment(props.data.id, commentText);
        if (textTextareaRef.current) {
          textTextareaRef.current.blur();
        }
      } else {
        if (textTextareaRef.current) {
          textTextareaRef.current.blur();
        }
      }
    }
  }
  return (
    <CommentItem className={props.className}>
      <CommentText>{props.data.body}</CommentText>
      <CommentTextTextarea
        rows={1}
        spellCheck="false"
        ref={textTextareaRef}
        value={commentText}
        onChange={(e) => {
          setCommentText(e.target.value);
        }}
        onBlur={onBlurHandler}
        onKeyPress={onKeyHandler}
      ></CommentTextTextarea>
      <CommentAuthor>
        Author: <span>{props.userName}</span>
      </CommentAuthor>
      <CommentDeleteBtn onClick={() => props.removeComment(props.data.id)}>
        X
      </CommentDeleteBtn>
    </CommentItem>
  );
}

const CommentItem = styled.li`
  border: 1px solid var(--lightgray);
  border-radius: 5px;
  position: relative;
`;

const CommentText = styled.p`
  display: none;
`;
const CommentTextTextarea = styled(TextareaAutosize)`
  font-family: inherit;
  font-size: 16px;
  line-height: 1.2;
  background: transparent;
  resize: none;
  border: 1px solid transparent;
  width: 90%;
  &:focus {
    border-color: var(--lightgray);
    background-color: var(--white);
  }
`;

const CommentAuthor = styled.p`
  font-size: 12px;

  & span {
    font-weight: bold;
  }
`;

const CommentDeleteBtn = styled.button`
  position: absolute;
  right: 0;
  top: 0;
`;
