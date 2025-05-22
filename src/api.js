import axios from 'axios';
import { mockApi } from './utils/mockApi';


const USE_MOCK_API = false;

const API_BASE_URL = 'https://gateway.scan-interfax.ru';


const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 30000,
});

api.interceptors.request.use(
  (config) => {
    console.log(`API Запрос [${config.method.toUpperCase()}] ${config.url}`, 
      config.data ? `Данные: ${JSON.stringify(config.data)}` : '');
    return config;
  },
  (error) => {
    console.error('Ошибка при формировании запроса:', error);
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => {
    console.log(`API Ответ [${response.status}] ${response.config.url}`, 
      response.data ? 'Данные получены успешно' : '');
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(`API Ошибка [${error.response.status}] ${error.config?.url}:`, 
        error.response.data || error.message);
      
      if (error.response.status === 401) {
        console.error('Ошибка авторизации: неверный или просроченный токен');
        localStorage.removeItem('token');
        localStorage.removeItem('expire');
        localStorage.removeItem('user');
        window.location.href = '/login'; 
      }
    } else if (error.request) {
      console.error('Ошибка сети:', error.message);
    } else {
      console.error('Ошибка настройки запроса:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export const login = async (loginData) => {
  if (USE_MOCK_API) {
    return mockApi.login(loginData);
  }
  
  try {
    console.log('Отправляем запрос на вход:', loginData);
    const response = await api.post('/api/v1/account/login', loginData);
    console.log('Успешный вход:', response.data);
    
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
    
    const responseData = {
      ...response.data,
      expire: response.data.expire || oneYearFromNow.toISOString()
    };
    
    return responseData;
  } catch (error) {
    console.error('Ошибка входа:', error.response?.data || error.message);
    throw error;
  }
};

export const getAccountInfo = async (token) => {
  if (USE_MOCK_API) {
    return mockApi.getAccountInfo();
  }
  
  try {
    console.log('Запрашиваем информацию об аккаунте');
    const response = await api.get('/api/v1/account/info', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Получена информация об аккаунте:', response.data);
    return response.data;
  } catch (error) {
    console.error('Ошибка получения информации аккаунта:', error.response?.data || error.message);
    throw error;
  }
};


export const getHistograms = async (requestData, token) => {
  if (USE_MOCK_API) {
    return mockApi.getHistograms(requestData);
  }
  
  try {
    console.log('Запрашиваем гистограммы с параметрами:', requestData);
    const response = await api.post('/api/v1/objectsearch/histograms', requestData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Получены гистограммы:', response.data);
    return response.data;
  } catch (error) {
    console.error('Ошибка получения гистограмм:', error.response?.data || error.message);
    throw error;
  }
};

export const searchPublications = async (requestData, token) => {
  if (USE_MOCK_API) {
    return mockApi.searchPublications(requestData);
  }
  
  try {
    console.log('Выполняем поиск публикаций с параметрами:', requestData);
    const response = await api.post('/api/v1/objectsearch', requestData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Результаты поиска публикаций:', response.data);
    return response.data;
  } catch (error) {
    console.error('Ошибка поиска публикаций:', error.response?.data || error.message);
    throw error;
  }
};


export const getDocuments = async (ids, token) => {
  if (USE_MOCK_API) {
    return mockApi.getDocuments(ids);
  }
  
  try {
    console.log('Запрашиваем документы с ID:', ids);
    const response = await api.post('/api/v1/documents', { ids }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Получены документы:', response.data);
    return response.data;
  } catch (error) {
    console.error('Ошибка получения документов:', error.response?.data || error.message);
    throw error;
  }
};