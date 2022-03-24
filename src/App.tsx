import React, { useState } from 'react';
import { useAllUsers } from './hooks/useAllUsers';
import { UserCard } from './components/UserCard';
import { TodoCard } from './components/TodoCard';
import { useAllTodos } from './hooks/useAllTodos';

function App() {
  const { getUsers, userProfiles, loading, error } = useAllUsers();
  const { getTodos, todos, todoLoading, todoError } = useAllTodos();

  // カスタムフックの呼び出し（全てのUser一覧を取得する）
  const onClickFetchUser = () => getUsers();

  // カスタムフックの呼び出し（全てのTodo一覧を取得する）
  const onClickFetchTodo = () => getTodos();

  return (
    <div className="App">
      <button onClick={onClickFetchTodo}>Todoデータ取得</button>
      <button onClick={onClickFetchUser}>データ取得</button>
      <br />
      {/* errorがtrueの場合：データの取得に失敗しました
      errorがfalseの場合（データ取得に成功）：loadingを処理
      loadingがtrueの場合：Loading...
      loadingがfalseの場合（データ取得が終了）：コンポーネントを表示 */}
      {error ? (
        <p style={{ color: 'red'}}>データの取得に失敗しました</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {userProfiles.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </>
      )}

      {todoError ? (
        <p style={{ color: 'red'}}>データの取得に失敗しました</p>
      ) : todoLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {todos.map((todo) => (
            <TodoCard key={todo.id} todo={todo} />
          ))}
        </>
      )}
    </div>
  );
}

export default App;
