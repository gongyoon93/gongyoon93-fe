import { useSetRecoilState } from 'recoil';
import { userState } from 'src/lib/atoms';

interface IuseRemoveUserStateProps {}

const useRemoveUserState = () => {
  const setUserState = useSetRecoilState(userState);

  const removeLocalStorage = () => {
    localStorage.removeItem('accessToken');
  };

  return { setUserState, removeLocalStorage };
};

export default useRemoveUserState;
