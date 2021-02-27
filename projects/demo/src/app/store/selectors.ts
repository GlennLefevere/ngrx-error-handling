import {createFeatureSelector, createSelector} from '@ngrx/store';
import {State} from './reducer';

const selectStore = createFeatureSelector<State>('app');

export const selectUsername = createSelector(selectStore, (state: State) => state)
