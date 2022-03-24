import axios from "axios";
import { useState } from "react";
import { User } from "../types/api/user";
import { UserProfile } from "../types/userProfile";

// 全てのUser一覧を取得するカスタムフック
export const useAllUsers = () => {
  const [userProfiles, setUserProfiles] = useState<Array<UserProfile>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // データを取得するトリガーとなる関数を設定する
  const getUsers = () => {
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
  };

  // カスタムフックとして返す処理・値をreturnにまとめる
  return { getUsers, userProfiles, loading, error };
};