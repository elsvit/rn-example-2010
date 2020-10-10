import { put, takeEvery } from 'redux-saga/effects';

import { setLoaded, setLoading, setError } from '../common';
import { api } from 'store';
import { IFee } from 'types/IFee';
import {
  getFeesSuccessAction,
  FeesActions,
} from './fees';

export function* sagaGetFees() {
  const actionType = FeesActions.FEES_GET;
  try {
    yield put(setLoading({ actionType }));
    const res: { data: IFee[] } = yield api.feesApi.getFees();
    yield put(getFeesSuccessAction(res.data));
    yield put(setLoaded({ actionType }));
  } catch (error) {
    yield put(setError({ actionType, error }));
  }
}

export default function*(): Generator {
  yield takeEvery(FeesActions.FEES_GET, sagaGetFees);
}
