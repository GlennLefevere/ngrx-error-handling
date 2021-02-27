import {createAction, props} from '@ngrx/store';

export const requestUsername = createAction('[ROOT] request username');

export const requestUsernameSuccess = createAction('[ROOT] request username success', props<{result: string}>());

export const requestUsernameFailed = createAction('[ROOT] request username failed', props<{error: any}>());
