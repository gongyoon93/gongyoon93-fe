import axios from 'axios';

interface UserInfo {
  isLogin: true;
  token: string;
}

const getToken = () => {
  const data = localStorage.getItem('accessToken');
  if (data) {
    const { token } = JSON.parse(data) as UserInfo;
    return token;
  }
  return false;
};

export const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 1000,
});
