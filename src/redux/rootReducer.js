import { combineReducers } from 'redux';
import * as merchant from '../modules/merchant';

export default combineReducers({
  merchant: merchant.merchantReducer
});
