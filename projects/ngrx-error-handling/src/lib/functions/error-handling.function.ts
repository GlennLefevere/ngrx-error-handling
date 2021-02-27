import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ActionCreator} from '@ngrx/store';
import {addError} from '../actions/actions';


export function handleResponse<T>(successAction: ActionCreator, failAction?: ActionCreator) {
  return function <T>(source: Observable<T>) {
    return source.pipe(
      map(result => successAction({result})),
      catchError(error => of(!!failAction ? failAction({error}) : addError({error})))
    );
  }
}
