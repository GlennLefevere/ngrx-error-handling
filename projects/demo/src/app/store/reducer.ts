import {Action, ActionReducerMap, createReducer, StoreModule} from '@ngrx/store';

export interface State {

}

export const initialState: State = {

}

const _reducer = createReducer(
  initialState
)

export interface RootState {
  app: State
}

const rootInitialState = {
  app: initialState,
};

const reducers: ActionReducerMap<RootState> = {
  app: _reducer,
};

export const RootStoreModule = StoreModule.forRoot(reducers, {
  initialState: rootInitialState,
  runtimeChecks: {
    strictStateImmutability: true,
    strictActionImmutability: true,
  },
});
