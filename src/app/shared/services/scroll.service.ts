import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private scrollToElementSubject = new Subject<string>();

  scrollToElement$ = this.scrollToElementSubject.asObservable();

  scrollTo(elementId: string) {
    this.scrollToElementSubject.next(elementId);
  }
}
