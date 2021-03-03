import { TestBed } from '@angular/core/testing';

import { ErrorHandlingService } from './error-handling.service';
import {provideMockStore} from '../reducer/store.mock';
import {MockStore} from '@ngrx/store/testing';
import {selectErrors} from '../selectors/selectors';
import {addError, removeError} from '../actions/actions';

describe('ErrorHandlingService', () => {
  let service: ErrorHandlingService;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ErrorHandlingService,
        provideMockStore()
      ]
    });
    service = TestBed.inject(ErrorHandlingService);
    store = TestBed.inject(MockStore);
    store.dispatch = jest.fn();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should select errors', done => {
    const errors = [{message: 'test'}];

    store.overrideSelector(selectErrors, errors);
    store.refreshState();

    service.errors$.subscribe(result => {
      expect(result).toEqual(errors);
      done();
    });
  });

  it('should request remove error', () => {
    const error = {message: 'test'};

    service.requestRemoveError(error);

    expect(store.dispatch).toHaveBeenCalledWith(removeError({error}));
  });

  it('should request remove error', () => {
    const error = {message: 'test'};

    service.requestAddError(error);

    expect(store.dispatch).toHaveBeenCalledWith(addError({error}));
  });
});
