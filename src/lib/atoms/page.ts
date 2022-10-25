import { atom } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

export const pageState = atom<number>({ key: `pageState/${uuidv4()}`, default: 1 });
