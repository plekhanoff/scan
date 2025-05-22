import { login as apiLogin, getAccountInfo } from '../../api';


export const login = (loginData) => async (dispatch) => {
  try {
    dispatch({ type: 'LOGIN_REQUEST' });
    

    const { accessToken, expire } = await apiLogin(loginData);
    

    const expireDate = expire || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();
    

    localStorage.setItem('token', accessToken);
    localStorage.setItem('expire', expireDate);
    localStorage.setItem('user', loginData.login);
    

    const accountInfo = await getAccountInfo(accessToken);
    

    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: { 
        token: accessToken, 
        user: loginData.login,
        expire: expireDate,
        accountInfo
      },
    });
    
    return { accessToken, expire: expireDate, accountInfo };
  } catch (error) {
    console.error('Ошибка входа:', error.response?.data || error.message);
    
    dispatch({
      type: 'LOGIN_FAILURE',
      payload: error.response?.data?.message || error.message
    });
    
    throw error;
  }
};


export const checkToken = () => (dispatch) => {
  const token = localStorage.getItem('token');
  const expire = localStorage.getItem('expire');
  const user = localStorage.getItem('user');
  
  if (!token || !expire) {
    dispatch(logout());
    return false;
  }
  

  const expireDate = new Date(expire);
  const now = new Date();
  
  if (now >= expireDate) {

    dispatch(logout());
    return false;
  }
  

  dispatch({
    type: 'LOGIN_SUCCESS',
    payload: { 
      token,
      expire,
      user: user || 'Пользователь'
    },
  });
  
  return true;
};


export const logout = () => (dispatch) => {

  localStorage.removeItem('token');
  localStorage.removeItem('expire');
  localStorage.removeItem('user');
  

  localStorage.removeItem('histogramsData');
  localStorage.removeItem('searchData');
  

  dispatch({ type: 'LOGOUT' });
};


export const setSearchResults = (results) => ({
  type: 'SET_SEARCH_RESULTS',
  payload: results,
});
