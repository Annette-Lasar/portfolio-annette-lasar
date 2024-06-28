import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuStateService {
  private menuVisibleSubject = new BehaviorSubject<boolean>(false);
  menuVisible$ = this.menuVisibleSubject.asObservable();

  private burgerButtonActiveSubject = new BehaviorSubject<boolean>(false);
  burgerButtonActive$ = this.burgerButtonActiveSubject.asObservable();

  toggleMenuVisibility() {
    const newState = !this.menuVisibleSubject.value;
    this.menuVisibleSubject.next(newState);
    this.burgerButtonActiveSubject.next(newState);
  }

  setMenuVisibility(visible: boolean) {
    this.menuVisibleSubject.next(visible);
    this.burgerButtonActiveSubject.next(visible);
  }
}
