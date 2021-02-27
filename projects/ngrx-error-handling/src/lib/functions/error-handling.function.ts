import {MonoTypeOperatorFunction, Observable, of, OperatorFunction, pipe} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ActionCreator} from '@ngrx/store';
import {addError} from '../actions/actions';
import {TypedAction} from '@ngrx/store/src/models';

export function handleResponse<R extends TypedAction<any>> (successAction: ActionCreator, failAction?: ActionCreator): OperatorFunction<any, any> {
  return pipe(
    map(result => successAction({result})),
    catchError(error => of(!!failAction ? failAction({error}) : addError({error})))
  )
}
/*
export function handleResponse<T, R>(successAction: ActionCreator, failAction?: ActionCreator) {
  return function <T, R>(source: Observable<T>) {
    return source.pipe(
      map(result => successAction({result})),
      catchError(error => of(!!failAction ? failAction({error}) : addError({error})))
    );
  }
}
*/
