import {createAction, props} from '@ngrx/store';

export const addError = createAction(
  '[ERROR_HANDLER] add error',
  props<{ error: any }>()
)

export const removeError = createAction(
  '[ERROR_HANDLER] remove error',
  props<{ error: any }>()
)
