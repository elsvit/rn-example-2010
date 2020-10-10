import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import { initApiServices } from 'services/api';
import config from 'constants/config';

import common, { CommonStateT } from './common';
import fees, { FeesStateT } from './fees';
import user, { UserStateT } from './user';

import sagas from './sagas';

export interface IAppState {
  common: CommonStateT;
  fees: FeesStateT;
  user: UserStateT;
}

export const api = initApiServices(`${config.baseURL}${config.apiPath}`);

const reducers = combineReducers<IAppState>({
  common,
  fees,
  user,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagas.forEach((saga: any) => sagaMiddleware.run(saga));

export default store;
