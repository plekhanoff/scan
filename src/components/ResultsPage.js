import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './ResultsPage.css';
import Header from './Header';
import footer from '../img/footer.png';
import find_soon from '../img/find_soon.png';
import spend_time from '../img/spend_time.png';
import target from '../img/target.png';
import { checkToken } from '../redux/actions/authActions';

console.log('ResultsPage rendered');

const ResultsPage = () => {
  const [histograms, setHistograms] = useState(null);
  const [searchData, setSearchData] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [searchParams, setSearchParams] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleDocuments, setVisibleDocuments] = useState(10);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    const loadResults = async () => {
      if (!isAuthenticated) {
        const tokenValid = dispatch(checkToken());
        if (!tokenValid) {
          console.log('Перенаправление на страницу входа: нет активной сессии');
          navigate('/login');
          return;
        }
      }
      
      try {
        setLoading(true);
        
        // Получаем данные из localStorage
        const histogramsData = localStorage.getItem('histogramsData');
        const searchResults = localStorage.getItem('searchData');
        const savedSearchParams = localStorage.getItem('searchParams');
        const documentsData = localStorage.getItem('documentsData');
        
        if (!histogramsData || !searchResults) {
          setError('Данные поиска не найдены. Пожалуйста, выполните поиск.');
          setLoading(false);
          return;
        }
        
        try {
      
          const parsedHistograms = JSON.parse(histogramsData);
          setHistograms(parsedHistograms);

          const parsedSearchData = JSON.parse(searchResults);
          setSearchData(parsedSearchData);

          if (savedSearchParams) {
            setSearchParams(JSON.parse(savedSearchParams));
          }
          
        
          let processedDocs = [];
          
          if (documentsData) {
            try {
              const parsedDocuments = JSON.parse(documentsData);
              
             
              processedDocs = parsedDocuments.map((doc, index) => {
               
                const item = doc.ok || doc;
                
                if (!item) {
                  console.warn(`Документ ${index} имеет неверный формат:`, doc);
                  return {
                    id: `doc-${index}`,
                    title: `Публикация ${index + 1}`,
                    date: new Date().toISOString(),
                    source: 'Источник не указан',
                    content: '',
                    url: '#',
                  };
                }
                
                return {
                  id: item.id || `doc-${index}`,
                  title: item.title?.text || `Публикация ${index + 1}`,
                  date: item.issueDate || new Date().toISOString(),
                  source: item.source?.name || 'Источник не указан',
                  content: item.content?.markup || '',
                  attributes: item.attributes || {},
                  url: item.url || '#',
                };
              });
            } catch (docParseError) {
              console.error('Ошибка при обработке данных документов:', docParseError);
            }
          }
        
          if (processedDocs.length === 0 && parsedSearchData && parsedSearchData.items) {
            processedDocs = parsedSearchData.items.map((item, index) => ({
              id: item.encodedId || `doc-${index}`,
              title: `Публикация ${index + 1}`,
              date: new Date().toISOString(),
              source: `Источник (влияние: ${item.influence || 'не указано'})`,
              url: '#',
            }));
          }
          
          setDocuments(processedDocs);
        } catch (parseError) {
          console.error('Ошибка при разборе данных:', parseError);
          setError('Ошибка при обработке данных: неверный формат данных');
          setLoading(false);
          return;
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Ошибка при загрузке результатов:', err);
        setError('Ошибка при загрузке результатов: ' + err.message);
        setLoading(false);
      }
    };
    
    loadResults();
  }, [isAuthenticated, dispatch, navigate]);


  const loadMoreDocuments = () => {
    setVisibleDocuments(prev => Math.min(prev + 10, documents.length));
  };


  const renderHistograms = () => {
    if (!histograms || !histograms.data) {
      return (
        <div className="histograms-container">
          <h3>Статистика публикаций</h3>
          <p>Данные статистики недоступны</p>
        </div>
      );
    }
    
    return (
      <div className="histograms-container">
        <h3>Статистика публикаций</h3>
        {histograms.data.map((histogram, index) => (
          <div key={index} className="histogram">
            <h4>{histogram.histogramType === 'totalDocuments' ? 'Всего публикаций' : 'Риск-факторы'}</h4>
            <div className="histogram-bars">
              {histogram.data.map((point, pIndex) => (
                <div key={pIndex} className="histogram-point">
                  <div className="date">{new Date(point.date).toLocaleDateString()}</div>
                  <div 
                    className="bar" 
                    style={{ 
                      height: `${Math.max(5, point.value * 5)}px`,
                      backgroundColor: histogram.histogramType === 'totalDocuments' ? '#4CAF50' : '#FF5722'
                    }}
                  ></div>
                  <div className="value">{point.value}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };
  

  const renderDocumentContent = (doc) => {
    if (!doc.content) return <p>Содержимое документа недоступно</p>;
    

    let content = doc.content;
    try {

      if (typeof content === 'string') {
        content = content.replace(/<\/?[^>]+(>|$)/g, " ");

        if (content.length > 500) {
          content = content.substring(0, 500) + "...";
        }
      } else {
        content = "Содержимое документа в неподдерживаемом формате";
      }
    } catch (e) {
      console.error("Ошибка при обработке содержимого документа:", e);
      content = "Ошибка при обработке содержимого документа";
    }
    
    return <p className="doc-content">{content}</p>;
  };

  if (loading) return (
    <div className="results-page loading">
      <Header />
      <div className="loading-spinner">Загрузка результатов...</div>
    </div>
  );

  if (error) return (
    <div className="results-page error">
      <Header />
      <div className="error-message">{error}</div>
      <Link to="/search" className="btn-return">
        <button type="button" className="button-class">Вернуться к поиску</button>
      </Link>
    </div>
  );

  return (
    <div className="results-page">
      <Header />
      
      <div className='upper'>
        <div className='spaling'>
          <div className="find_soon">
            <img src={find_soon} alt="напись крупным" />
          </div>
          <div className="spend_time">
            <img src={spend_time} alt="напись мелким" />
          </div>
        </div>
        <div className='girlvstarget'>
          <div className="target">
            <img src={target} alt="с мишенью" />
          </div>
        </div>
      </div>
      
      <div className='results'>
        <div className="summary-container">
          <h2>Общая сводка</h2>
          <div className="summary-info">
            <p>Всего публикаций найдено: <strong>{searchData?.items?.length || 0}</strong></p>
            {searchParams && (
              <div className="search-params">
                <p>Параметры поиска:</p>
                <ul>
                  <li>ИНН: <strong>{searchParams.inn}</strong></li>
                  <li>Период: <strong>{new Date(searchParams.startDate).toLocaleDateString()} - {new Date(searchParams.endDate).toLocaleDateString()}</strong></li>
                  <li>Количество документов: <strong>{searchParams.documentsCount}</strong></li>
                </ul>
              </div>
            )}
          </div>
        </div>
        
        {renderHistograms()}
        
        <div className="documents-container">
          <h2>Список публикаций</h2>
          {documents.length === 0 ? (
            <p>Нет результатов для отображения.</p>
          ) : (
            <ul className="results-list">
              {documents.slice(0, visibleDocuments).map((doc) => (
                <li key={doc.id} className="result-item">
                  <h3>{doc.title}</h3>
                  <div className="doc-meta">
                    <p>Дата: <strong>{new Date(doc.date).toLocaleDateString()}</strong></p>
                    <p>Источник: <strong>{doc.source}</strong></p>
                    {doc.attributes && (
                      <div className="doc-attributes">
                        {doc.attributes.wordCount && <span className="doc-attr">Слов: {doc.attributes.wordCount}</span>}
                        {doc.attributes.isTechNews && <span className="doc-attr tech-news">Техническая новость</span>}
                        {doc.attributes.isAnnouncement && <span className="doc-attr announcement">Анонс</span>}
                        {doc.attributes.isDigest && <span className="doc-attr digest">Дайджест</span>}
                      </div>
                    )}
                  </div>
                  {renderDocumentContent(doc)}
                  <a href={doc.url} target="_blank" rel="noopener noreferrer" className="view-link">
                    Просмотреть публикацию
                  </a>
                </li>
              ))}
            </ul>
          )}
          
          {documents.length > visibleDocuments && (
            <div className='more_results'>
              <button type="button" className="button-class" onClick={loadMoreDocuments}>
                Показать больше
              </button>
            </div>
          )}
        </div>
        
        <div className="back-to-search">
          <Link to="/search" className="btn-return">
            <button type="button" className="button-class">
              Новый поиск
            </button>
          </Link>
        </div>
      </div>
      
      <div className="footer">
        <img src={footer} alt="подвал" />
      </div>
    </div>
  );
};

export default ResultsPage;
