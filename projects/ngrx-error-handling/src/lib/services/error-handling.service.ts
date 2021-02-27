import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import {ErrorState} from '../reducer/error.reducer';
import {selectErrors} from '../selectors/selectors';
import {addError, removeError} from '../actions/actions';

@Injectable()
export class ErrorHandlingService {

  constructor(private readonly store: Store<ErrorState>) { }

  get errors$(): Observable<any[]> {
    return this.store.select(selectErrors);
  }

  requestRemoveError(error: any) {
    this.store.dispatch(removeError({error}));
  }

  requestAddError(error: any) {
    this.store.dispatch(addError({error}));
  }

}
