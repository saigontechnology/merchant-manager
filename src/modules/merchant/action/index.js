export function requestMerchants() {
  return {
    type: 'REQUEST_MERCHANTS'
  };
}

export function changeMerchantPage(page) {
  return {
    type: 'CHANGE_MERCHANT_PAGE',
    page
  };
}

export function changeMerchantRowsPerpage(rowsPerPage) {
  return {
    type: 'CHANGE_MERCHANT_ROWS_PER_PAGE',
    rowsPerPage
  };
}

export function changeMerchantsSearchText(searchText) {
  return {
    type: 'CHANGE_MERCHANTS_SEARCH_TEXT',
    searchText
  };
}

export function removeMerchant(merchantId) {
  return {
    type: 'REMOVE_MERCHANT',
    merchantId
  };
}
