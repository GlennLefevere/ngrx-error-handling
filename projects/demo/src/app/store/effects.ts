import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {DummyService} from '../http-service/dummy.service';
import {requestUsername, requestUsernameFailed, requestUsernameSuccess} from './actions';
import {switchMap} from 'rxjs/operators';
import {handleResponse} from 'ngrx-error-handling';

@Injectable()
export class Effects {

  constructor(private readonly actions$: Actions,
              private readonly dummyService: DummyService) {
  }

  requestUsername$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestUsername),
      switchMap(() => this.dummyService.getUserName().pipe(
        handleResponse(requestUsernameSuccess, requestUsernameFailed)
      ))
    )
  );

}
