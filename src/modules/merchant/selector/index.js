import get from 'lodash.get';
import { createSelector } from 'reselect';
import flow from 'lodash.flow';

export const getAllMerchants = state => get(state, 'merchant.data', []);
export const getPage = state => get(state, 'merchant.page');
export const getRowsPerPage = state => get(state, 'merchant.rowsPerPage');
export const getSearchText = state => get(state, 'merchant.searchText', '');

export const filterBySearchText = searchText => data => {
  if (!searchText) return data;
  return data.filter(item =>
    `${item.id} ${item.firstname} ${item.lastname} ${item.email} ${item.phone}
  `
      .toUpperCase()
      .includes(searchText.toUpperCase())
  );
};

const sortByNewest = data =>
  data.sort((item1, item2) => item2.created - item1.created);

export const paging = (page, rowsPerPage) => data =>
  data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

export const getMerchantsPerPage = createSelector(
  getAllMerchants,
  getPage,
  getRowsPerPage,
  getSearchText,
  (merchants, page, rowsPerPage, searchText) => {
    return flow([
      filterBySearchText(searchText),
      sortByNewest,
      paging(page, rowsPerPage)
    ])(merchants);
  }
);
