const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
  accountInfo: null,
  loading: false,
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        ...state,
        loading: true,
        error: null
      };
      
    case 'LOGIN_SUCCESS':
      console.log("LOGIN_SUCCESS:", action.payload);
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user,
        accountInfo: action.payload.accountInfo || state.accountInfo,
        loading: false,
        error: null
      };
      
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null,
        accountInfo: null,
        loading: false,
        error: action.payload
      };
      
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null,
        accountInfo: null,
        error: null
      };
      
    case 'UPDATE_ACCOUNT_INFO':
      return {
        ...state,
        accountInfo: action.payload
      };
      
    default:
      return state;
  }
};

export default authReducer;
  