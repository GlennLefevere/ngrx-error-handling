import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ERROR_HANDLER_ACTIONS_TOKEN, NgrxErrorHandlingModule} from 'ngrx-error-handling';
import {RootStoreModule} from './store/reducer';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {Effects} from './store/effects';
import {requestUsernameFailed} from './store/actions';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RootStoreModule,
    EffectsModule.forRoot([Effects]),
    StoreDevtoolsModule.instrument(),
    NgrxErrorHandlingModule.forRoot(),
  ],
  providers: [
    {provide: ERROR_HANDLER_ACTIONS_TOKEN, useValue: [requestUsernameFailed]}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
