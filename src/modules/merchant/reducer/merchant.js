const initialState = {
  data: [],
  page: 0,
  rowsPerPage: 10
};
export default function(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_MERCHANTS':
      return {
        ...state,
        isLoading: true
      };
    case 'REQUEST_MERCHANTS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        data: action.data
      };
    case 'REQUEST_MERCHANTS_FAIL':
      return {
        ...state,
        isLoading: false
      };
    case 'CHANGE_MERCHANT_PAGE':
      return {
        ...state,
        page: action.page
      };
    case 'CHANGE_MERCHANT_ROWS_PER_PAGE':
      return {
        ...state,
        rowsPerPage: action.rowsPerPage
      };
    case 'CHANGE_MERCHANTS_SEARCH_TEXT':
      return {
        ...state,
        searchText: action.searchText,
        page: 0
      };
    case 'REMOVE_MERCHANT':
      return {
        ...state,
        data: state.data.filter(item => item.id !== action.merchantId)
      };
    default:
      return state;
  }
}
