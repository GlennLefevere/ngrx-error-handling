import {Inject, InjectionToken, Injector, ModuleWithProviders, NgModule} from '@angular/core';
import {
  ActionCreator,
  combineReducers,
  FEATURE_REDUCERS,
  STORE_FEATURES,
  StoreConfig,
  StoreFeatureModule
} from '@ngrx/store';
import {checkForActionTypeUniqueness} from '@ngrx/store/src/runtime_checks';
import {_createFeatureReducers, _createFeatureStore} from '@ngrx/store/src/store_module';
import {_FEATURE_CONFIGS, _FEATURE_REDUCERS, _FEATURE_REDUCERS_TOKEN, _STORE_FEATURES} from '@ngrx/store/src/tokens';
import {reducer} from './reducer/error.reducer';
import {ERROR_HANDLER_FEATURE_MODULE_NAME} from './selectors/selectors';
import {EffectsModule} from '@ngrx/effects';
import {Effects, ERROR_HANDLER_ACTIONS_TOKEN} from './effects/effects';
import {ErrorHandlingService} from './services/error-handling.service';

const FEATURE_MODULE_CONFIG_TOKEN = new InjectionToken<StoreConfig<any, any>>('FEATURE_MODULE_CONFIG_TOKEN');

@NgModule({})
class StoreModule {
  static forFeature(): ModuleWithProviders<StoreFeatureModule> {
    return {
      ngModule: StoreFeatureModule,
      providers: [
        {
          provide: _FEATURE_CONFIGS,
          multi: true,
          useExisting: FEATURE_MODULE_CONFIG_TOKEN,
        },
        {
          provide: STORE_FEATURES,
          multi: true,
          useFactory: (config: StoreConfig<any, any>) => {
            return {
              key: ERROR_HANDLER_FEATURE_MODULE_NAME,
              reducerFactory:
                config.reducerFactory
                  ? config.reducerFactory
                  : combineReducers,
              metaReducers:
                config.metaReducers
                  ? config.metaReducers
                  : [],
              initialState:
                config.initialState
                  ? config.initialState
                  : undefined,
            }
          },
          deps: [_FEATURE_CONFIGS]
        },
        {
          provide: _STORE_FEATURES,
          deps: [Injector, _FEATURE_CONFIGS, STORE_FEATURES],
          useFactory: _createFeatureStore,
        },
        {
          provide: _FEATURE_REDUCERS,
          multi: true,
          useValue: reducer,
        },
        {
          provide: _FEATURE_REDUCERS_TOKEN,
          multi: true,
          useExisting: _FEATURE_REDUCERS,
        },
        {
          provide: FEATURE_REDUCERS,
          multi: true,
          deps: [
            Injector,
            _FEATURE_REDUCERS,
            [new Inject(_FEATURE_REDUCERS_TOKEN)],
          ],
          useFactory: _createFeatureReducers,
        },
        checkForActionTypeUniqueness(),
      ],
    }
  }
}

@NgModule({
  imports: [
    StoreModule.forFeature(),
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
        {provide: ERROR_HANDLER_ACTIONS_TOKEN, useValue: actions}
      ],
    };
  }
}
