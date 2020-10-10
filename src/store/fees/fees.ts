import { Reducer } from 'redux';

import { IFee } from 'types/IFee';

// Actions
export enum FeesActions {
  FEES_GET = 'fees/GET',
  FEES_GET_SUCCESS = 'fees/SET',
  FEES_RESET = 'fees/RESET',
}

export type FeesLoadableT = typeof FeesActions.FEES_GET ;

export interface IFeesGetAction {
  type: typeof FeesActions.FEES_GET;
}

export interface IFeesGetSuccessAction {
  type: typeof FeesActions.FEES_GET_SUCCESS;
  payload: IFee[];
}

export interface IResetFeesAction {
  type: typeof FeesActions.FEES_RESET;
}

type FeesActionsT = IFeesGetSuccessAction | IFeesGetAction | IResetFeesAction;

export const getFeesAction = (): IFeesGetAction => ({
  type: FeesActions.FEES_GET,
});

export const getFeesSuccessAction = (payload: IFee[]): IFeesGetSuccessAction => ({
  type: FeesActions.FEES_GET_SUCCESS,
  payload,
});

export const resetFeesAction = (): IResetFeesAction => ({
  type: FeesActions.FEES_RESET,
});

//Reducer
interface IFeesState {
  fees: IFee[];
}

export type FeesStateT = Readonly<IFeesState>;

const initialState: IFeesState = {
  fees: [],
};

const reducer: Reducer<FeesStateT> = (state: IFeesState = initialState, action: FeesActionsT) => {
  switch (action.type) {
    case FeesActions.FEES_GET_SUCCESS:
      return { ...state, fees: action.payload };

    case FeesActions.FEES_RESET:
      return initialState;

    default:
      return state;
  }
};

export default reducer;
