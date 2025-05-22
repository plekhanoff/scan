import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { logout, checkToken } from '../redux/actions/authActions';
import './Header.css';
import logo_scan from '../img/logo_scan.png';

const HeaderContainer = styled.header`
  background-color: #FFFFFF;
  color: black;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isValid = dispatch(checkToken());
        console.log('Токен проверен, результат:', isValid);
      } catch (error) {
        console.error('Ошибка при проверке токена:', error);
      }
    };
    
    checkAuth();
  }, [dispatch]);
  
  const handleLogout = (e) => {
    e.preventDefault(); 
    try {
      dispatch(logout());
      console.log('Выход выполнен успешно');
      navigate('/'); 
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };
  

  const isActiveLink = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };
  

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <HeaderContainer>
      <div className='MainHeader'>
        <div className="logo_scan">
          <Link to="/">
            <img src={logo_scan} alt="логотип" />
          </Link>
        </div>
        
        {/* Гамбургер для мобильного меню */}
        <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <span className={isMobileMenuOpen ? 'active' : ''}></span>
        </div>
        
        <div className={`header-menu ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <ul className='header_item_list'>
            <li className='header_item_list__main'>
              <Link 
                to="/" 
                className={`header_item_list__link ${isActiveLink('/') ? 'header_item_list__link--active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Главная
              </Link>
            </li> 
            <li className='header_item_list__tax'>
              <Link 
                to="/tariffs" 
                className={`header_item_list__link ${isActiveLink('/tariffs') ? 'header_item_list__link--active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Тарифы
              </Link>
            </li> 
            <li className='header_item_list__faq'>
              <Link 
                to="/faq" 
                className={`header_item_list__link ${isActiveLink('/faq') ? 'header_item_list__link--active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="auth-section">
          {isAuthenticated ? (
            <div className="user-info">
              <span className="user-greeting">Добро пожаловать, {user || 'Пользователь'}!</span>
              <div className="user-actions">
                <Link to="/search" className="search-link">
                  <button type="button" className={`button-class ${isActiveLink('/search') ? 'active-button' : ''}`}>
                    Поиск
                  </button>
                </Link>
                <button onClick={handleLogout} className="button-class logout-button">
                  Выйти
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="btn-login">
              <button type="button" className={`button-class ${isActiveLink('/login') ? 'active-button' : ''}`}>
                Войти
              </button>
            </Link>
          )}
        </div>
      </div>  
    </HeaderContainer>
  );
};

export default Header;
