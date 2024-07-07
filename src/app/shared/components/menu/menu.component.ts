import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { MenuStateService } from '../../services/menu-state.service';
import { Translations } from '../../interfaces/translations.interface';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'po-menu',
  standalone: true,
  imports: [
    CommonModule,
    FooterComponent,
    HttpClientModule,
    RouterModule,
    RouterLink,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  @Input() jsonContent: Translations | null = null;
  @Input() selectedLanguage: string = '';
  @ViewChild('container') container!: ElementRef<HTMLElement>;

  constructor(private menuStateService: MenuStateService) {}

  ngOnInit(): void {}

  navigateAndClose(target: string): void {
    this.closeMenu();
    this.navigateToPosition(target);
  }

  navigateToPosition(target: string): void {
    setTimeout(() => {
      const element = document.getElementById(target);
      if (element) {
        const headerOffset = 80;
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;
        this.scrollToPosition(elementPosition, headerOffset);
      }
    }, 50);
  }

  scrollToPosition(elementPosition: number, headerOffset: number) {
    const offsetPosition = elementPosition - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }

  closeMenu() {
    this.menuStateService.setMenuVisibility(false);
  }
}
