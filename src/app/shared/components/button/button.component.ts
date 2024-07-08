import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { RouterModule, Router, RouterLink } from '@angular/router';
import { ScrollService } from '../../services/scroll.service';

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
  @Input() targetAttr: string = '';
  // @ViewChild('targetElement', {static: true}) scrollTarget: ElementRef;
  // @ViewChild('anchorElement') anchorElement!: ElementRef;

  constructor(private router: Router, private scrollService: ScrollService) {}

  /*   ngAfterViewInit(): void {
    console.log(this.anchorElement.nativeElement);
  } */

  /*   navigateToPosition(target: string): void {
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
  } */

  /*     navigateToPosition(target: string): void {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          if (this.scrollTarget && this.scrollTarget.nativeElement) {
            const headerOffset = 80;
            const elementPosition = this.scrollTarget.nativeElement.getBoundingClientRect().top + window.scrollY;
            this.scrollToPosition(elementPosition, headerOffset);
          }
        }, 50);
      });
    } */

  /*   scrollToPosition(elementPosition: number, headerOffset: number): void {
    const offsetPosition = elementPosition - headerOffset;
    console.log('Offset-Position: ', offsetPosition);
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  } */

  navigateToPosition() {
    setTimeout(() => {
      this.scrollService.scrollTo(this.scrollTarget);
    }, 1000);
  }
}
