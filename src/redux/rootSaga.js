import * as effects from 'redux-saga/effects';
import * as merchant from '../modules/merchant';

/**
 * Register all saga in the app below
 */
export default function* rootSaga() {
  try {
    yield effects.all([
      merchant.sagas()
      // more saga here
    ]);
  } catch (e) {
    console.error(e);
  }
}
