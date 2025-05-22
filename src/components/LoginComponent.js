import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import { login, checkToken } from '../redux/actions/authActions'; 
import './LoginComponent.css'; 
import footer from '../img/footer.png';
import Characters from '../img/Characters.png';
import Characters2 from '../img/Characters2.png';

const LoginComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ login: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const authState = useSelector(state => state.auth);
  

  useEffect(() => {
    const isTokenValid = dispatch(checkToken());
    if (isTokenValid) {
      navigate('/search');
    }
  }, [dispatch, navigate]);
  

  useEffect(() => {
    if (authState.isAuthenticated) {
      navigate('/search');
    }
    
    if (authState.error) {
      setError(authState.error);
      setIsSubmitting(false);
    }
  }, [authState, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    try {
      await dispatch(login(loginData));
     
    } catch (err) {
      setError('Ошибка авторизации. Пожалуйста, проверьте Ваши данные.');
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className='auth'>
      <Header />
      <div className="row">
        <div className="login-page">
          <div className="Characters2">
            <img src={Characters2} alt="надпись большими" />
          </div>
          <div className="Characters">
            <img src={Characters} alt="двое_с_ключом" />
          </div>
        </div>
        <div className="login-container">
          <h2>Авторизация</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="login">Логин:</label>
              <input
                type="text"
                id="login"
                name="login"
                value={loginData.login}
                onChange={handleChange}
                disabled={isSubmitting}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Пароль:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                disabled={isSubmitting}
                required
              />
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Выполняется вход...' : 'Войти'}
            </button>
          </form>
        </div>
      </div>
      <div className="footer">
        <img src={footer} alt="подвал" />
      </div>
    </div>
  );
};

export default LoginComponent;
