import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useSetUserState } from 'src/category/Auth/hooks';
import { snackbarState } from 'src/lib/atoms';
import Snackbar from '../Snackbar/Snackbar';

export default function Auth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { setUserState } = useSetUserState();
  const [snackbarQueue, setSnackbarQueue] = useRecoilState(snackbarState);

  useEffect(() => {
    const isUser = localStorage.getItem('accessToken');

    if (isUser) {
      const { isLogin, token, id, name } = JSON.parse(isUser);
      setUserState({ isLogin, token, id, name });
      if (router.pathname === '/login') {
        router.push('/');
      }
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    timer = setTimeout(() => setSnackbarQueue([]), 6000);
    return () => clearTimeout(timer);
  }, [snackbarQueue]);

  return (
    <>
      <Snackbar>
        {snackbarQueue.map(({ id, message, type }) => (
          <Snackbar.Item key={id} data-set={id} message={message} type={type} />
        ))}
      </Snackbar>
      {children}
    </>
  );
}
