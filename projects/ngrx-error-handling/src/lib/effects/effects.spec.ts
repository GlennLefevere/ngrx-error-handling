import {TestBed} from '@angular/core/testing';
import {ReplaySubject} from 'rxjs';
import {Action, ActionCreator, createAction, props} from '@ngrx/store';
import {Effects} from './effects';
import {provideMockActions} from '@ngrx/effects/testing';
import {ERROR_HANDLER_ACTIONS_TOKEN} from '../ngrx-error-handling.module';

describe('effects', () => {
  const testErrorAction = createAction('test', props<{error: any}>());
  const actions: ActionCreator[] = [testErrorAction];
  const actions$: ReplaySubject<Action> = new ReplaySubject(1);
  let effects: Effects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Effects,
        provideMockActions(() => actions$),
        {provide: ERROR_HANDLER_ACTIONS_TOKEN, useValue: actions},
      ]
    });

    effects = TestBed.inject(Effects);
  });

  it('should dispatch add error', done => {
    actions$.next(testErrorAction({error: 'test'}));
    effects.onErrorAction$.subscribe(result => {
      expect(result).toBeTruthy();
      done();
    });
  });

})
