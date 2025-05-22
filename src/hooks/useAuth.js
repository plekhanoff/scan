import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (loginData) => {
    try {
      const response = await axios.post('https://gateway.scan-interfax.ru/api/v1/account/login', loginData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
      localStorage.setItem('accessToken', response.data.accessToken);
      setIsAuthenticated(true);
    } catch (err) {
      setError(err.response.data);
      console.error('Ошибка авторизации:', err.response.data);
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setIsAuthenticated(false);
  };

  return { isAuthenticated, loading, error, login, logout };
};

export default useAuth;
