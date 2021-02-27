import {InjectionToken, ModuleWithProviders, NgModule} from '@angular/core';
import {ActionCreator, StoreConfig, StoreModule} from '@ngrx/store';
import {ERROR_HANDLER_FEATURE_MODULE_NAME} from './selectors/selectors';
import {EffectsModule} from '@ngrx/effects';
import {Effects} from './effects/effects';
import {ErrorHandlingService} from './services/error-handling.service';
import {reducer} from './reducer/error.reducer';

export const ERROR_HANDLER_ACTIONS_TOKEN = new InjectionToken<ActionCreator[]>('ERROR_HANDLER_ACTIONS_TOKEN');

const FEATURE_MODULE_CONFIG_TOKEN = new InjectionToken<StoreConfig<any, any>>('FEATURE_MODULE_CONFIG_TOKEN');

@NgModule({
  imports: [
    StoreModule.forFeature(ERROR_HANDLER_FEATURE_MODULE_NAME, reducer, FEATURE_MODULE_CONFIG_TOKEN),
    EffectsModule.forFeature([Effects]),
  ]
})
export class NgrxErrorHandlingModule {
  static forRoot(
    actions: ActionCreator[] = [],
    config: StoreConfig<any, any> | InjectionToken<StoreConfig<any, any>> = {}
  ): ModuleWithProviders<NgrxErrorHandlingModule> {
    return {
      ngModule: NgrxErrorHandlingModule,
      providers: [
        ErrorHandlingService,
        config instanceof InjectionToken ?
          {provide: FEATURE_MODULE_CONFIG_TOKEN, useExisting: config}
          : {provide: FEATURE_MODULE_CONFIG_TOKEN, useValue: config},
        {provide: ERROR_HANDLER_ACTIONS_TOKEN, useValue: actions},
      ],
    };
  }
}

