import {Action, createReducer, on} from '@ngrx/store';
import {addError, removeError} from '../actions/actions';

export interface ErrorState {
  errors: any[]
}

export const initialErrorState: ErrorState = {
  errors: []
}

const _reducer = createReducer(
  initialErrorState,
  on(addError, (state, {error}) => ({...state, errors: [...state.errors, error]})),
  on(removeError, (state, {error}) => ({...state, errors: state.errors.filter(e => JSON.stringify(e) !== JSON.stringify(error))}))
);

export function reducer(state: ErrorState, action: Action) {
  return _reducer(state, action);
}
