import React from 'react';
import Carousel from './Carousel';
import { Link } from 'react-router-dom';
import './MainPage.css';
import Header from './Header';
import fatboy from '../img/fatboy.png';
import shield1 from '../img/shield1.png';
import shield2 from '../img/shield2.png';
import group_14 from '../img/group_14.png';
import footer from '../img/footer.png';


const MainPage = () => {
  return (
    <div className="main-page">
      <Header /> 
      <header>
        <div className="main-header">
        <div className="header-content">
              <img src={shield2} alt="надпись крупным" />
              <div className="shield1">
                <img src={shield1} alt="напись мелким" />
              </div>
             <Link to="/search" className="btn-search">
                                 <button type="button" className="button-class">
                                     Запросить данные
                                     </button>
                                 </Link>
        </div>  
          <div className="fatboy">
              <img src={fatboy} alt="толстяк" />
            </div>
        </div>
      </header>

      <section className="why-us">
        <h3>Почему именно мы?</h3>
        <Carousel />
      </section>
      <div className="group_14">
           <img src={group_14} alt="толстяк" />
        </div>
        <h2>Наши тарифы</h2>  
      <section className="pricing">
        <div className="pricing-card">
          <h3>Тариф Beginner</h3>
          <p>Базовый тариф для стартапов.</p>
          <button className="btn-more">Подробнее</button>
        </div>
        <div className="pricing-card current">
          <h3>Тариф Pro</h3>
          <span className="badge">Текущий тариф</span>
          <p>Расширенные возможности для бизнеса.</p>
          <button className="btn-more">Перейти в личный кабинет</button>
        </div>
        <div className="pricing-card">
          <h3>Тариф Enterprise</h3>
          <p>Индивидуальные решения для крупных компаний.</p>
          <button className="btn-more">Подробнее</button>
        </div>
      </section>
      <div className="footer">
           <img src={footer} alt="подвал" />
        </div>
    </div>
  );
};

export default MainPage;
