import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefresherService {
  usersRefreshSubject$: Subject<number>;
  questionRefreshSubject$: Subject<number>;

  constructor() {
    this.usersRefreshSubject$ = new Subject<number>();
    this.usersRefreshSubject$.next(0);
    this.questionRefreshSubject$ = new Subject<number>();
    this.questionRefreshSubject$.next(0);
   }
}
