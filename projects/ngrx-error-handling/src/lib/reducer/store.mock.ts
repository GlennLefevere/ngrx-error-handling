import { Provider } from '@angular/core';
import {initialState} from '../../../../demo/src/app/store/reducer';
import {ERROR_HANDLER_FEATURE_MODULE_NAME} from '../selectors/selectors';
import {ErrorState} from './error.reducer';
import * as ngrx from '@ngrx/store/testing';

export function provideMockStore(state?: Partial<ErrorState>): Provider[] {
  return ngrx.provideMockStore({
    initialState: {
      [ERROR_HANDLER_FEATURE_MODULE_NAME]: {
        ...initialState,
        ...state,
      },
    },
  });
}
