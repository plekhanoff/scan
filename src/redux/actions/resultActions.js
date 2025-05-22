import { getHistograms, searchPublications, getDocuments } from '../../api';

// Действие для получения гистограмм
export const fetchHistograms = (requestData) => async (dispatch, getState) => {
  dispatch({ type: 'FETCH_RESULTS_REQUEST' });
  
  try {
    const token = getState().auth.token || localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Не найден токен авторизации');
    }
    
    const histogramData = await getHistograms(requestData, token);
    
    dispatch({
      type: 'FETCH_HISTOGRAMS_SUCCESS',
      payload: histogramData
    });
    
    return histogramData;
  } catch (error) {
    console.error('Ошибка получения гистограмм:', error);
    
    dispatch({
      type: 'FETCH_RESULTS_FAILURE',
      payload: error.response?.data?.message || error.message
    });
    
    throw error;
  }
};

// Действие для поиска публикаций
export const fetchSearchResults = (requestData) => async (dispatch, getState) => {
  dispatch({ type: 'FETCH_RESULTS_REQUEST' });
  
  try {
    const token = getState().auth.token || localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Не найден токен авторизации');
    }
    
    const searchData = await searchPublications(requestData, token);
    
    dispatch({
      type: 'FETCH_SEARCH_SUCCESS',
      payload: searchData
    });
    
    return searchData;
  } catch (error) {
    console.error('Ошибка поиска публикаций:', error);
    
    dispatch({
      type: 'FETCH_RESULTS_FAILURE',
      payload: error.response?.data?.message || error.message
    });
    
    throw error;
  }
};

// Действие для получения документов
export const fetchDocuments = (ids) => async (dispatch, getState) => {
  dispatch({ type: 'FETCH_RESULTS_REQUEST' });
  
  try {
    const token = getState().auth.token || localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Не найден токен авторизации');
    }
    
    const documents = await getDocuments(ids, token);
    
    dispatch({
      type: 'FETCH_DOCUMENTS_SUCCESS',
      payload: documents
    });
    
    return documents;
  } catch (error) {
    console.error('Ошибка получения документов:', error);
    
    dispatch({
      type: 'FETCH_RESULTS_FAILURE',
      payload: error.response?.data?.message || error.message
    });
    
    throw error;
  }
};

// Действие для очистки результатов поиска
export const clearResults = () => ({
  type: 'CLEAR_RESULTS'
});

