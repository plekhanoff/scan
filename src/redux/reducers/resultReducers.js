const initialState = {
  histograms: null,
  searchData: null,
  documents: [],
  loading: false,
  error: null
};

const resultReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_RESULTS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case 'FETCH_HISTOGRAMS_SUCCESS':
      return {
        ...state,
        histograms: action.payload,
        loading: false
      };

    case 'FETCH_SEARCH_SUCCESS':
      return {
        ...state,
        searchData: action.payload,
        loading: false
      };

    case 'FETCH_DOCUMENTS_SUCCESS':
      return {
        ...state,
        documents: action.payload,
        loading: false
      };

    case 'FETCH_RESULTS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case 'CLEAR_RESULTS':
      return {
        ...initialState
      };

    case 'SET_SEARCH_RESULTS':
      return {
        ...state,
        searchData: action.payload,
        loading: false
      };

    default:
      return state;
  }
};

export default resultReducers;
  