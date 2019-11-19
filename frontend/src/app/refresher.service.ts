import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefresherService {
  usersRefreshSubject$: Subject<number>;

  constructor() {
    this.usersRefreshSubject$ = new Subject<number>();
    this.usersRefreshSubject$.next(0);
   }
}
