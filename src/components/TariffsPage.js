import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import './TariffsPage.css';
import footer from '../img/footer.png';
import checkmark from '../img/checkmark.svg';

const TariffsPage = () => {
  return (
    <div className="tariffs-page">
      <Header />
      
      <div className="tariffs-container">
        <h1 className="tariffs-title">Тарифы</h1>
        <p className="tariffs-subtitle">Выберите наиболее подходящий для вас тариф</p>
        
        <div className="tariff-cards">
          <div className="tariff-card">
            <div className="tariff-header">
              <h3>Базовый</h3>
              <p className="tariff-description">Для небольшого исследования</p>
            </div>
            <div className="tariff-price">
              <div className="price-block">
                <span className="current-price">799 ₽</span>
                <span className="old-price">1 200 ₽</span>
              </div>
              <p className="price-note">или 150 ₽/мес при рассрочке на 24 мес.</p>
            </div>
            <div className="tariff-features">
              <p className="feature-title">В тариф входит:</p>
              <ul>
                <li><img src={checkmark} alt="✓" /> Безлимитная история запросов</li>
                <li><img src={checkmark} alt="✓" /> Безопасная сделка</li>
                <li><img src={checkmark} alt="✓" /> Поддержка 24/7</li>
                <li><img src={checkmark} alt="✓" /> До 5 компаний</li>
                <li><img src={checkmark} alt="✓" /> 10 запросов в день</li>
              </ul>
            </div>
            <Link to="/login" className="tariff-button">Подробнее</Link>
          </div>

          <div className="tariff-card recommended">
            <div className="tariff-badge">Рекомендуем</div>
            <div className="tariff-header">
              <h3>Бизнес</h3>
              <p className="tariff-description">Для корпоративных клиентов</p>
            </div>
            <div className="tariff-price">
              <div className="price-block">
                <span className="current-price">2 299 ₽</span>
                <span className="old-price">3 600 ₽</span>
              </div>
              <p className="price-note">или 279 ₽/мес при рассрочке на 24 мес.</p>
            </div>
            <div className="tariff-features">
              <p className="feature-title">В тариф входит:</p>
              <ul>
                <li><img src={checkmark} alt="✓" /> Безлимитная история запросов</li>
                <li><img src={checkmark} alt="✓" /> Безопасная сделка</li>
                <li><img src={checkmark} alt="✓" /> Приоритетная поддержка 24/7</li>
                <li><img src={checkmark} alt="✓" /> До 20 компаний</li>
                <li><img src={checkmark} alt="✓" /> 100 запросов в день</li>
                <li><img src={checkmark} alt="✓" /> Доступ к расширенной аналитике</li>
              </ul>
            </div>
            <Link to="/login" className="tariff-button">Подробнее</Link>
          </div>

          <div className="tariff-card">
            <div className="tariff-header">
              <h3>Профессиональный</h3>
              <p className="tariff-description">Для профессионального мониторинга</p>
            </div>
            <div className="tariff-price">
              <div className="price-block">
                <span className="current-price">3 999 ₽</span>
                <span className="old-price">6 000 ₽</span>
              </div>
              <p className="price-note">или 520 ₽/мес при рассрочке на 24 мес.</p>
            </div>
            <div className="tariff-features">
              <p className="feature-title">В тариф входит:</p>
              <ul>
                <li><img src={checkmark} alt="✓" /> Безлимитная история запросов</li>
                <li><img src={checkmark} alt="✓" /> Безопасная сделка</li>
                <li><img src={checkmark} alt="✓" /> Экспертная поддержка 24/7</li>
                <li><img src={checkmark} alt="✓" /> Неограниченное количество компаний</li>
                <li><img src={checkmark} alt="✓" /> Безлимитное количество запросов</li>
                <li><img src={checkmark} alt="✓" /> Доступ к API</li>
                <li><img src={checkmark} alt="✓" /> Экспорт данных</li>
              </ul>
            </div>
            <Link to="/login" className="tariff-button">Подробнее</Link>
          </div>
        </div>
      </div>
      
      <div className="footer">
        <img src={footer} alt="подвал" />
      </div>
    </div>
  );
};

export default TariffsPage; 