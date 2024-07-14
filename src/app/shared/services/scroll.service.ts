import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private elements: { element: HTMLElement; offset: number }[] = [];

  constructor() {
    fromEvent(window, 'scroll')
      .pipe(throttleTime(100))
      .subscribe(() => this.checkScroll());
  }

  registerElement(element: HTMLElement, offset: number = 0): void {
    this.elements.push({ element, offset });
    this.checkScroll();
  }

  private checkScroll(): void {
    const scrollTop =
      window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;

    this.elements.forEach((item) => {
      const rect = item.element.getBoundingClientRect();
      const elementTop = rect.top + scrollTop;
      if (scrollTop + window.innerHeight > elementTop + item.offset) {
        item.element.classList.add('scrolled');
      } else {
        item.element.classList.remove('scrolled');
      }
    });
  }
}
