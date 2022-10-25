import React, { useState } from 'react';

const useValidation = () => {
  const [id, setId] = useState('');
  const [isId, setIsId] = useState<boolean | null>(null);
  const [isIdError, setIsIdError] = useState<boolean>(false);
  const [password, setPassword] = useState('');
  const [isPassword, setIsPassword] = useState<boolean | null>(null);
  const [isPasswordError, setIsPasswordError] = useState<boolean>(false);

  const onIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setId(value);

    if (value === '') {
      setIsId(null);
      return;
    }

    const check = value.match(/^[A-Za-z0-9]{5,30}$/);

    if (check === null) {
      setIsId(false);
    } else {
      setIsId(true);
      setIsIdError(false);
    }
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    if (value === '') {
      setIsPassword(null);
      return;
    }

    const check = value.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,30}$/g);

    if (check === null) {
      setIsPassword(false);
    } else {
      setIsPassword(true);
      setIsPasswordError(false);
    }
  };

  const onIdError = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!isId) {
      setIsIdError(true);
    }
  };

  const onPasswordError = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!isPassword) {
      setIsPasswordError(true);
    }
  };

  return {
    id,
    isId,
    isIdError,
    password,
    isPassword,
    isPasswordError,
    onIdChange,
    onIdError,
    onPasswordChange,
    onPasswordError,
  };
};

export default useValidation;
