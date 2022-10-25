import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import { useRouter } from 'next/router';
import { useLogin, useSetUserState, useValidation } from 'src/category/Auth/hooks';

const LoginPage: NextPage = () => {
  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState(true);

  const { setUserState } = useSetUserState();
  const {
    id,
    password,
    isId,
    isPassword,
    isIdError,
    isPasswordError,
    onIdChange,
    onIdError,
    onPasswordChange,
    onPasswordError,
  } = useValidation();

  const { isSuccess, mutate: loginMutate } = useLogin();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = { id, password };
    loginMutate(body);
  };

  useEffect(() => {
    if (isId && isPassword) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [isId, isPassword]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isSuccess) {
      timer = setTimeout(() => {
        setUserState((pre) => ({ ...pre, isLogin: true }));
        router.push('/');
      }, 500);
    }
    return () => clearTimeout(timer);
  }, [isSuccess, router, setUserState]);

  return (
    <>
      <Header />
      <Form onSubmit={onSubmit}>
        <InputLabel label='' htmlFor='inputId'>
          아이디
        </InputLabel>
        <TextInput
          id='inputId'
          type='text'
          value={id}
          onChange={onIdChange}
          onBlur={onIdError}
          isError={isIdError}
        />
        {isIdError ? <ErrorLabel>올바른 아이디 형식으로 입력해주세요.</ErrorLabel> : ''}
        <InputLabel label='password' htmlFor='inputPw'>
          비밀번호
        </InputLabel>
        <TextInput
          id='inputPw'
          type='password'
          value={password}
          onChange={onPasswordChange}
          onBlur={onPasswordError}
          isError={isPasswordError}
        />
        {isPasswordError ? <ErrorLabel>올바른 비밀번호 형식으로 입력해주세요.</ErrorLabel> : ''}
        <LoginButton disabled={isDisabled}>로그인</LoginButton>
      </Form>
    </>
  );
};

export default LoginPage;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  padding: 0 20px 40px;
  label {
    font-weight: 600;
    font-size: 13px;
    color: #6c6c7d;
  }
`;

const InputLabel = styled.label<{ label: string }>`
  margin-top: ${(props) => (props.label === 'password' ? '16px' : '0')};
`;

const TextInput = styled.input<{ isError: boolean }>`
  border: 1px solid #000;
  margin-top: 8px;
  padding: 16px;
  background: #f7f7fa;
  border-radius: 12px;
  background: ${(props) => (props.isError ? '#FDEDEE' : '#f7f7fa')};
`;

const LoginButton = styled.button`
  margin-top: 40px;
  padding: 20px;
  border-radius: 12px;
  color: #fff;
  background-color: #e2e2ea;
  &:enabled {
    transition: background-color 0.5s;
    background-color: #222;
  }
`;

const ErrorLabel = styled.p`
  margin-top: 8px;
  font-weight: 400;
  font-size: 13px;
  color: #ed4e5c;
`;
