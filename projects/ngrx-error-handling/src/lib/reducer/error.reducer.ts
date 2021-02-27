import {Action, ActionReducerMap, combineReducers, createReducer, on} from '@ngrx/store';
import {addError, removeError} from '../actions/actions';

export interface ErrorState {
  errors: any[]
}

export const initialErrorState: ErrorState = {
  errors: []
}

export const reducer: ActionReducerMap<ErrorState> = {
  errors: errorReducer(initialErrorState.errors),
};

export function errorReducer(initialState: any[]) {
  return createReducer(
    initialState,
    on(addError, (state, {error}) => ([...state, error])),
    on(removeError, (state, {error}) => state.filter(e => JSON.stringify(e) !== JSON.stringify(error)))
  );
}
