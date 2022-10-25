import Link from 'next/link';
import { useSetRecoilState } from 'recoil';
import { useRemoveUserState, useSetUserState } from 'src/category/Auth/hooks';
import { snackbarState } from 'src/lib/atoms';
import styled from 'styled-components';

const Header = () => {
  const {
    userStateValue: { isLogin, name },
  } = useSetUserState();
  const { removeLocalStorage, setUserState } = useRemoveUserState();
  const setSnackBar = useSetRecoilState(snackbarState);
  const onLogout = () => {
    removeLocalStorage();
    setUserState({ isLogin: false, token: '', id: '', name: '' });
    setSnackBar((pre) => [
      ...pre,
      {
        id: Date.now().toString(),
        type: 'notice',
        message: '🌠 로그아웃 되었습니다.',
      },
    ]);
  };
  return (
    <Container>
      <Title>
        <Link href='/'>
          <p>HAUS</p>
        </Link>
      </Title>
      <StateArea>
        {isLogin ? (
          <>
            <p>{name}</p>
            <LogoutBtn onClick={() => onLogout()}>logout</LogoutBtn>
          </>
        ) : (
          <Link href='/login'>
            <a>login</a>
          </Link>
        )}
      </StateArea>
    </Container>
  );
};

export default Header;

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.span`
  p {
    font-size: 48px;
    cursor: pointer;
  }
`;

const StateArea = styled.div`
  display: flex;
  flex-flow: column nowrap;
  p {
    font-size: 14px;
  }
`;

const LogoutBtn = styled.button`
  font-size: 14px;
  cursor: pointer;
`;
