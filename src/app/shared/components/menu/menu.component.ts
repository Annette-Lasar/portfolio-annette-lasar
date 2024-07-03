/* import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { MenuStateService } from '../../services/menu-state.service';
import { Translations } from '../../interfaces/translations.interface';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'po-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent, HttpClientModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  @Input() jsonContent: Translations | null = null;
  @Input() selectedLanguage: string = '';

  constructor(private menuStateService: MenuStateService) {}
  ngOnInit(): void {}

  closeMenu() {
    this.menuStateService.setMenuVisibility(false);
  }
} */

import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  Router,
  NavigationEnd,
  RouterModule,
  ActivatedRoute,
} from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { MenuStateService } from '../../services/menu-state.service';
import { Translations } from '../../interfaces/translations.interface';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'po-menu',
  standalone: true,
  imports: [CommonModule, FooterComponent, HttpClientModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit, AfterViewInit {
  @Input() jsonContent: Translations | null = null;
  @Input() selectedLanguage: string = '';

  @ViewChild('container') container!: ElementRef<HTMLElement>;

  constructor(
    private menuStateService: MenuStateService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Überwache NavigationEnd-Ereignisse
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.scrollToFragment();
      });

    // Direktaufruf der Methode, um beim ersten Laden der Seite zu scrollen
    this.scrollToFragment();
  }

  scrollToFragment(): void {
    // Sicherstellen, dass die container-Referenz initialisiert ist
    if (this.container) {
      const fragment = this.activeRoute.snapshot.fragment;
      if (fragment) {
        const section = this.container.nativeElement.querySelector(
          `#${fragment}`
        );
        console.log(section);

        section?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  closeMenu() {
    this.menuStateService.setMenuVisibility(false);
  }
}
