import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from '../store/reducer';
import {requestUsername} from '../store/actions';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsernameService {

  constructor(private readonly store: Store<State>) { }

  requestUsername() {
    this.store.dispatch(requestUsername());
  }

}
