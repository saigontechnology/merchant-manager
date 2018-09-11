import { all } from 'redux-saga/effects';
import { watchRequestMerchants } from './requestMerchants';

export default function*() {
  yield all([watchRequestMerchants()]);
}
