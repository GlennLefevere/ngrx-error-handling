import {Inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ActionCreator} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {addError} from '../actions/actions';
import {ERROR_HANDLER_ACTIONS_TOKEN} from '../ngrx-error-handling.module';

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
