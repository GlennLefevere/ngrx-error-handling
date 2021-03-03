import {ActionCreator, createAction, props} from '@ngrx/store';
import {of, throwError} from 'rxjs';
import {ErrorHandler} from './error-handling.function';
import {addError} from '../actions/actions';

describe('handleResponse', () => {
  const testSuccessAction = createAction('bla', props<{result: any}>());

  it('should map to succes', done => {
    of('test').pipe(
      ErrorHandler.handleResponse(testSuccessAction)
    ).subscribe((result) => {
      expect(result).toBeTruthy();
      const action = result as ActionCreator;
      expect(action.type).toEqual(testSuccessAction.type);
      done();
    });
  });

  it('should map to add error action', done => {
    throwError('some error').pipe(
      ErrorHandler.handleResponse(testSuccessAction),
    ).subscribe(result => {
      expect(result).toBeTruthy();
      const action = result as ActionCreator;
      expect(action.type).toEqual(addError.type);
      done();
    })
  });


  it('should map to custom error action', done => {
    const testFailAction = createAction('bla', props<{error: any}>());
    throwError('some error').pipe(
      ErrorHandler.handleResponse(testSuccessAction, testFailAction),
    ).subscribe(result => {
      expect(result).toBeTruthy();
      const action = result as ActionCreator;
      expect(action.type).toEqual(testFailAction.type);
      done();
    })
  });

});
