import { takeLatest, call, put } from 'redux-saga/effects';
import fetchHelper from '../../../helpers/fetchHelper';
import { Snackbar } from '../../../components/snackbar';

export function* watchRequestMerchants() {
  yield takeLatest('REQUEST_MERCHANTS', requestMerchants);
}

function* requestMerchants() {
  const [data, status] = yield call(
    fetchHelper.fetch,
    process.env.REACT_APP_API_URL + '/merchants'
  );
  if (status === 200) {
    yield put({
      type: 'REQUEST_MERCHANTS_SUCCESS',
      data,
      status
    });
  } else {
    yield put({
      type: 'REQUEST_MERCHANTS_FAIL',
      data,
      status
    });
    Snackbar.show({
      message: status + ' error on request merchant. Please try again later.'
    });
  }
}
