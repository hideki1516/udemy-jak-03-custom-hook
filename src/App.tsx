import React, { useState } from 'react';
import { UserCard } from './components/UserCard';
import axios from "axios";
import { User } from './types/api/user';
import { UserProfile } from './types/userProfile';
import { TodoCard } from './components/TodoCard';
import { todo } from './types/api/todo';
import { todoCard } from './types/todoCard';

function App() {
  const [userProfiles, setUserProfiles] = useState<Array<UserProfile>>([]);

  // ローディング
  const [loading, setLoading] = useState(false);

  // エラーの判定
  const [error, setError] = useState(false);

  const onClickFetchUser = () => {
    setLoading(true);
    setError(false);

    axios.get<Array<User>>('https://jsonplaceholder.typicode.com/users').then((res) => {
      // データを取得 → mapで展開して任意の形式に変換してから使用する
      const data = res.data.map((user) => ({
        id: user.id,
        name: `${user.name}(${user.username})`,
        email: user.email,
        address: `${user.address.city} ${user.address.suite} ${user.address.street}`,
      }));
      setUserProfiles(data);
    }).catch(() => {
      setError(true);
    }).finally(() => {
      // finally() ... axiosの実行が終わった最後に処理される
      // ES2018以降に使用できるので、tsconfig.jsonに"es2018"を追記する
      setLoading(false);
    });
  }

  const [todos, setTodos] = useState<Array<todoCard>>([]);

  const onClickFetchTodo = () => {
    setLoading(true);
    setError(false);

    axios.get<Array<todo>>('https://jsonplaceholder.typicode.com/todos').then((res) => {
      const todoData = res.data.map((todo) => ({
        // id: `${todo.userId} - ${todo.id}`,
        id: todo.id,
        userId: todo.userId,
        title: todo.title,
        completed: todo.completed,
      }));
      setTodos(todoData);
    }).catch(() => {
      setError(true);
    }).finally(() => {
      setLoading(false);
    });
  };

  return (
    <div className="App">
      <button onClick={onClickFetchTodo}>Todoデータ取得</button>
      <button onClick={onClickFetchUser}>データ取得</button>
      <br />
      {/* errorがtrueの場合：データの取得に失敗しました
      errorがfalseの場合（データ取得に成功）：loadingを処理
      loadingがtrueの場合：Loading...
      loadingがfalseの場合（データ取得が終了）：コンポーネントを表示 */}
      { error ? (
        <p style={{ color: 'red'}}>データの取得に失敗しました</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {userProfiles.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </>
      ) }
      
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} />
      ))}

    </div>
  );
}

export default App;
