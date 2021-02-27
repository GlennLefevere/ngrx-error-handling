import {Inject, Injectable, InjectionToken} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ActionCreator} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {addError} from '../actions/actions';

export const ERROR_HANDLER_ACTIONS_TOKEN = new InjectionToken<ActionCreator[]>('ERROR_HANDLER_ACTIONS_TOKEN');

@Injectable()
export class Effects {

  constructor(private readonly actions$: Actions,
              @Inject(ERROR_HANDLER_ACTIONS_TOKEN) private readonly actions: ActionCreator[]) {
  }

  onErrorAction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(...this.actions),
      map((action: any) => {
        const error = action?.error;
        return addError({error})
      })
    )
  );

}