import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import './SearchPage.css';
import footer from '../img/footer.png';
import set from '../img/set.png';
import find from '../img/find.png';
import rocketman from '../img/rocketman.png';
import document from '../img/document.png';
import folders from '../img/folders.png';
import { validateInn } from '../utils/validation';
import { getHistograms, searchPublications, getDocuments } from '../api';
import { checkToken } from '../redux/actions/authActions';
import './SearchPage.css';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useState({
    inn: '',
    maxFullness: false,
    businessContext: false,
    mainRole: false,
    tonality: 'any',
    onlyWithRiskFactors: false,
    includeTechNews: false,
    includeAnnouncements: false,
    includeDigests: false,
    documentsCount: 10,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchStage, setSearchStage] = useState('idle'); 
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const token = useSelector(state => state.auth.token);
  
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        if (!isAuthenticated) {
          const tokenValid = dispatch(checkToken());
          
          if (!tokenValid) {
            console.log('Перенаправление на страницу входа: нет активной сессии');
            navigate('/login');
            return false;
          }
        }
        return true;
      } catch (error) {
        console.error('Ошибка при проверке авторизации:', error);
        setError('Произошла ошибка при проверке авторизации. Пожалуйста, попробуйте войти снова.');
        navigate('/login');
        return false;
      }
    };
    
    verifyAuth();
  }, [isAuthenticated, dispatch, navigate]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    setSearchStage('validating');
    
    try {
      const errorObj = {};
      if (!validateInn(searchParams.inn, errorObj)) {
        setError(errorObj.message);
        setIsSubmitting(false);
        setSearchStage('error');
        return;
      }
      
      const currentToken = localStorage.getItem('token') || token;
      console.log('Текущий токен для запроса:', currentToken ? 'Токен существует' : 'Токен отсутствует');
      
      if (!currentToken) {
        setError('Необходима авторизация! Пожалуйста, войдите в систему.');
        setIsSubmitting(false);
        setSearchStage('error');
        navigate('/login');
        return;
      }
      
      const requestData = {
        issueDateInterval: {
          startDate: `${searchParams.startDate}T00:00:00+03:00`,
          endDate: `${searchParams.endDate}T23:59:59+03:00`
        },
        searchContext: {
          targetSearchEntitiesContext: {
            targetSearchEntities: [
              {
                type: 'company',
                sparkId: null,
                entityId: null,
                inn: searchParams.inn,
                maxFullness: searchParams.maxFullness,
                inBusinessNews: searchParams.businessContext
              }
            ],
            onlyMainRole: searchParams.mainRole,
            tonality: searchParams.tonality,
            onlyWithRiskFactors: searchParams.onlyWithRiskFactors,
            riskFactors: {
              and: [],
              or: [],
              not: []
            },
            themes: {
              and: [],
              or: [],
              not: []
            }
          },
          themesFilter: {
            and: [],
            or: [],
            not: []
          }
        },
        searchArea: {
          includedSources: [],
          excludedSources: [],
          includedSourceGroups: [],
          excludedSourceGroups: []
        },
        attributeFilters: {
          excludeTechNews: !searchParams.includeTechNews,
          excludeAnnouncements: !searchParams.includeAnnouncements,
          excludeDigests: !searchParams.includeDigests
        },
        similarMode: "duplicates",
        limit: parseInt(searchParams.documentsCount),
        sortType: "sourceInfluence",
        sortDirectionType: "desc",
        intervalType: "month",
        histogramTypes: [
          "totalDocuments",
          "riskFactors"
        ]
      };
    
      console.log('Отправляемые данные:', requestData);
    
      setSearchStage('fetching-histograms');
      console.log('Начинаем получение гистограмм...');
      const histogramsData = await getHistograms(requestData, currentToken);
      console.log('Получены гистограммы:', histogramsData);
      

      setSearchStage('fetching-results');
      console.log('Начинаем поиск публикаций...');
      const searchData = await searchPublications(requestData, currentToken);
      console.log('Результаты поиска:', searchData);
      

      try {
        localStorage.setItem('histogramsData', JSON.stringify(histogramsData));
        localStorage.setItem('searchData', JSON.stringify(searchData));
        localStorage.setItem('searchParams', JSON.stringify({
          inn: searchParams.inn,
          startDate: searchParams.startDate,
          endDate: searchParams.endDate,
          documentsCount: searchParams.documentsCount
        }));
      } catch (storageError) {
        console.error('Ошибка при сохранении данных в localStorage:', storageError);
      
      }
      
      let documents = [];
      if (searchData && searchData.items && searchData.items.length > 0) {
        setSearchStage('fetching-docs');
        const docIds = searchData.items.slice(0, Math.min(10, searchData.items.length)).map(item => item.encodedId);
        
        if (docIds.length > 0) {
          console.log('Начинаем получение документов...');
          try {
            documents = await getDocuments(docIds, currentToken);
            console.log('Получены документы:', documents);
            
            if (documents && documents.length > 0) {
              localStorage.setItem('documentsData', JSON.stringify(documents));
            }
          } catch (docError) {
            console.error('Ошибка при получении документов:', docError);
          }
        }
      }
      
      setSearchStage('complete');
      setIsSubmitting(false);
      
      navigate('/results');
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
      
      let errorMessage = 'Ошибка при выполнении запроса: ';
      
      if (error.response) {
        errorMessage += error.response.data?.message || `Статус ${error.response.status}`;
        

        if (error.response.status === 401) {
          errorMessage = 'Сессия истекла. Пожалуйста, войдите снова.';
          setTimeout(() => navigate('/login'), 2000);
        }
      } else if (error.request) {
        errorMessage += 'Нет ответа от сервера. Проверьте подключение к интернету.';
      } else {
        errorMessage += error.message;
      }
      
      setError(errorMessage);
      setIsSubmitting(false);
      setSearchStage('error');
    }
  };
  
  return (
    <div className="search-page">
      <Header />
      <div className='main'>
        <div className="search-container">
          <div className="find">
            <img src={find} alt="напись крупным" />
          </div>
          <div className="set">
            <img src={set} alt="напись мелким" />
          </div>

          <form onSubmit={handleSubmit} className="search-form">
            <div className='forms'>
              <div className="form-group">
                <label htmlFor="inn">ИНН компании*</label>
                <input
                  type="text"
                  id="inn"
                  name="inn"
                  value={searchParams.inn}
                  onChange={handleChange}
                  placeholder="10 или 12 цифр"
                  disabled={isSubmitting}
                  required
                />
                {error && <p className="error-message">{error}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="tonality">Тональность*</label>
                <select
                  id="tonality"
                  name="tonality"
                  value={searchParams.tonality}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                >
                  <option value="any">Любая</option>
                  <option value="positive">Позитивная</option>
                  <option value="negative">Негативная</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="documentsCount">Количество документов в выдаче*</label>
                <input
                  type="number"
                  id="documentsCount"
                  name="documentsCount"
                  value={searchParams.documentsCount}
                  onChange={handleChange}
                  min="1"
                  max="1000"
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="startDate">Дата начала поиска*</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={searchParams.startDate}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="endDate">Дата окончания поиска*</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={searchParams.endDate}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                />
              </div>
            </div>
            <div className='checkboxes'>
              <div className="checkbox-group">
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="maxFullness"
                    name="maxFullness"
                    checked={searchParams.maxFullness}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                  <label htmlFor="maxFullness">Признак максимальной полноты</label>
                </div>

                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="businessContext"
                    name="businessContext"
                    checked={searchParams.businessContext}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                  <label htmlFor="businessContext">Упоминания в бизнес-контексте</label>
                </div>

                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="mainRole"
                    name="mainRole"
                    checked={searchParams.mainRole}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                  <label htmlFor="mainRole">Главная роль в публикации</label>
                </div>
              </div>

              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="onlyWithRiskFactors"
                  name="onlyWithRiskFactors"
                  checked={searchParams.onlyWithRiskFactors}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                <label htmlFor="onlyWithRiskFactors">Публикации только с риск-факторами</label>
              </div>

              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="includeTechNews"
                  name="includeTechNews"
                  checked={searchParams.includeTechNews}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                <label htmlFor="includeTechNews">Включать технические новости рынков</label>
              </div>

              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="includeAnnouncements"
                  name="includeAnnouncements"
                  checked={searchParams.includeAnnouncements}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                <label htmlFor="includeAnnouncements">Включать анонсы и календари</label>
              </div>

              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="includeDigests"
                  name="includeDigests"
                  checked={searchParams.includeDigests}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                <label htmlFor="includeDigests">Включать сводки новостей</label>
              </div>
              <button type="submit" className="button-class" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    {searchStage === 'validating' && 'Проверка данных...'}
                    {searchStage === 'fetching-histograms' && 'Получение статистики...'}
                    {searchStage === 'fetching-results' && 'Поиск публикаций...'}
                    {searchStage === 'fetching-docs' && 'Загрузка документов...'}
                    {(searchStage === 'idle' || searchStage === 'error') && 'Поиск...'}
                  </>
                ) : 'Поиск'}
              </button>
            </div>
          </form>
        </div>
        <div className='picks'>
          <div className="folder">
            <img src={folders} alt="folders" />
          </div>
          <div className="document">
            <img src={document} alt="document" />
          </div>

          <div className="rocketman">
            <img src={rocketman} alt="ракета" />
          </div>
        </div>
      </div>
      <div className="footer">
        <img src={footer} alt="подвал" />
      </div>
    </div>
  );
};

export default SearchPage;
