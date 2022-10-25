import { atom } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

interface UserState {
  isLogin: boolean;
  token: string;
  id: string;
  name: string;
}

export const userState = atom<UserState>({
  key: `userState/${uuidv4()}`,
  default: { isLogin: false, token: '', id: '', name: '' },
});
