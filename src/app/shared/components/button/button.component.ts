import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'po-button',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() caption: string = '';
  @Input() linkTarget: string = '';
  @Input() routerLinkTarget: string = '';
  @Input() additionalClass: string = '';
  @Input() scrollTarget: string = '';

  constructor(private router: Router) {}

  navigateToPosition(target: string): void {
    this.router.navigate(['/']).then(() => {
      setTimeout(() => {
        const element = document.getElementById(target);
        console.log('Element: ', element);
        if (element) {
          const headerOffset = 80;
          const elementPosition =
            element.getBoundingClientRect().top + window.scrollY;
          console.log('ElementPosition: ', elementPosition);
          this.scrollToPosition(elementPosition, headerOffset);
        }
      }, 50);
    });
  }

  scrollToPosition(elementPosition: number, headerOffset: number): void {
    const offsetPosition = elementPosition - headerOffset;
    console.log('Offset-Position: ', offsetPosition);
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
}
