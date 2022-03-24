import axios from "axios";
import { useState } from "react";
import { Todo } from "../types/api/todo";
import { todoCard } from "../types/todoCard";

// 全てのTodo一覧を取得するカスタムフック
export const useAllTodos = () => {
  const [todos, setTodos] = useState<Array<todoCard>>([]);
  const [todoLoading, setTodoLoading] = useState(false);
  const [todoError, setTodoError] = useState(false);

  const getTodos = () => {
    setTodoLoading(true);
    setTodoError(false);
  
    axios.get<Array<Todo>>('https://jsonplaceholder.typicode.com/todos').then((res) => {
      const todoData = res.data.map((todo) => ({
        id: todo.id,
        userId: todo.userId,
        title: todo.title,
        completed: todo.completed,
      }));
      setTodos(todoData);
    }).catch(() => {
      setTodoError(true);
    }).finally(() => {
      setTodoLoading(false);
    });
  };

  return { getTodos, todos, todoLoading, todoError };
};