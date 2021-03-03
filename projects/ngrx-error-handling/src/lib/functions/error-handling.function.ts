import {of, OperatorFunction, pipe} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {ActionCreator} from '@ngrx/store';
import {addError} from '../actions/actions';
import {TypedAction} from '@ngrx/store/src/models';

type CustomFunction<T> = (result: T, index: number) => TypedAction<any>;

export class ErrorHandler {
  public static handleResponse<T>(successAction: ActionCreator, failAction?: ActionCreator): OperatorFunction<any, any>;
  public static handleResponse<T>(mapFunction: CustomFunction<T>, failAction?: ActionCreator): OperatorFunction<any, any>;
  public static handleResponse<T>(initial: ActionCreator | CustomFunction<T>, failAction?: ActionCreator): OperatorFunction<any, any> {
    return pipe(
      typeof initial === "function" ? map(initial)
        :  map(result => initial({result})),
      catchError(error => of(!!failAction ? failAction({error}) : addError({error})))
    )
  }
}
