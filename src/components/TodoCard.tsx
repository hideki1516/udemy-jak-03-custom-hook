import { VFC } from "react";
import { todoCard } from "../types/todoCard";

type Props = {
  todo: todoCard;
};

export const TodoCard: VFC<Props> = (props) => {
  const { todo } = props;

  const todoState = todo.completed ? '完' : '未';

  const style = {
    padding: '5px 20px',
    margin: '20px',
    border: '1px solid #000',
    borderRadius: '4px',
  }

  return (
    <div style={style}>
      <p>ID：{todo.userId} - {todo.id}</p>
      <p>TITLE：{todo.title}</p>
      <p>STATE：{todoState}</p>
    </div>
  );
};