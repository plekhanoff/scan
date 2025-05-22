import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchResults } from '../redux/actions';
import axios from 'axios';
import styled from 'styled-components';

const FormContainer = styled.form`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SearchForm = () => {
  const [inn, setInn] = useState('');
  const dispatch = useDispatch();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://gateway.scan-interfax.ru/api/v1/objectsearch', { inn });
      dispatch(setSearchResults(response.data.items));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormContainer onSubmit={handleSearch}>
      <input
        type="text"
        value={inn}
        onChange={(e) => setInn(e.target.value)}
        placeholder="Введите ИНН"
        required
      />
      <button type="submit">Поиск</button>
    </FormContainer>
  );
};

export default SearchForm;
