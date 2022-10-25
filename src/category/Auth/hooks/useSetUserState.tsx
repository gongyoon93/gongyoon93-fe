import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from 'src/lib/atoms';

const useSetUserState = () => {
  const setUserState = useSetRecoilState(userState);
  const userStateValue = useRecoilValue(userState);
  const setLocalStorage = (token: string, id: string, name: string) => {
    const userState = {
      isLogin: true,
      token,
      id,
      name,
    };
    localStorage.setItem('accessToken', JSON.stringify(userState));
  };

  return { setLocalStorage, setUserState, userStateValue };
};

export default useSetUserState;
