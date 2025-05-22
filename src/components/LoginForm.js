import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions';
import styled from 'styled-components';

const FormContainer = styled.form`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const LoginForm = () => {
  const [loginData, setLoginData] = useState({ login: '', password: '' });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginData));
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <input
        type="text"
        name="login"
        placeholder="Логин"
        value={loginData.login}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Пароль"
        value={loginData.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Войти</button>
    </FormContainer>
  );
};

export default LoginForm;
