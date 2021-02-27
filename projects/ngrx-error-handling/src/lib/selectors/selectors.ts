import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ErrorState} from '../reducer/error.reducer';

export const ERROR_HANDLER_FEATURE_MODULE_NAME = `error-handling`;

const selectState = createFeatureSelector<ErrorState>(ERROR_HANDLER_FEATURE_MODULE_NAME);

export const selectErrors = createSelector(selectState, (state: ErrorState) => state.errors);
