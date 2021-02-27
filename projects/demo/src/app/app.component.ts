import {Component, OnInit} from '@angular/core';
import {UsernameService} from './service/username.service';
import {ErrorHandlingService} from 'ngrx-error-handling';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'demo';

  errors$: Observable<any[]> = this.errorHandlerService.errors$;

  constructor(private readonly usernameService: UsernameService,
              private readonly errorHandlerService: ErrorHandlingService) {
  }

  requestUsername() {
    this.usernameService.requestUsername();
  }

}
