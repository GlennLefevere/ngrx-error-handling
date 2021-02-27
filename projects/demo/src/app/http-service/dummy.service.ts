import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DummyService {

  constructor() { }

  getUserName(): Observable<any> {
    return throwError({message: 'Some naughty error'});
  }

}
