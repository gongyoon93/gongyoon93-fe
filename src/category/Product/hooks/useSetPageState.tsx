import { useRecoilValue, useSetRecoilState } from 'recoil';
import { pageState } from 'src/lib/atoms';

const useSetPageState = () => {
  const setPageState = useSetRecoilState(pageState);
  const pageStateValue = useRecoilValue(pageState);
  const setLocalStorage = (page: number) => {
    const pageState = {
      page,
    };
    localStorage.setItem('pageValue', JSON.stringify(pageState));
  };

  return { setLocalStorage, setPageState, pageStateValue };
};

export default useSetPageState;
