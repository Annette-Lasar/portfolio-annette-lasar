/* import { CommonModule } from '@angular/common';
import {
  Component,
  HostListener,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StaticContentService } from '../../shared/services/static-content.service';
import { Static } from '../../shared/interfaces/static-content.interface';
import { TranslationService } from '../../shared/services/translation.service';
import { ProjectComponent } from './project/project.component';
import { Translations } from '../../shared/interfaces/translations.interface';
import { ProjectWrapper } from '../../shared/interfaces/project-wrapper.interface';

@Component({
  selector: 'po-portfolio',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ProjectComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent implements OnInit, AfterViewInit {
  staticContent: Static | null = null;
  jsonContent: Translations | null = null;
  isScrolled = false;
  boxOffsetTop = 0;
  @ViewChild('portfolioArrowBox') skillsArrowBoxRef!: ElementRef;

  constructor(
    private staticContentService: StaticContentService,
    private translationService: TranslationService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.checkScroll();
    this.staticContentService.getStaticContent().subscribe((data: Static) => {
      this.staticContent = data;
    });

    this.translationService.translations$.subscribe(
      (data: Translations | null) => {
        this.jsonContent = data;
      }
    );

    this.translationService
      .loadTranslations(this.translationService.getCurrentLanguage())
      .subscribe();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.calculateBoxOffset();
      this.checkScroll();
    }, 250);
  }

  @HostListener('window: scroll', [])
  onWindowScroll(): void {
    this.checkScroll();
  }

  getProjectKeys(project: ProjectWrapper): string[] {
    return Object.keys(project);
  }

  calculateBoxOffset(): void {
    const element = this.elementRef.nativeElement.querySelector(
      '.portfolio-arrow-box'
    );
    console.log('element: ', element);
    if (element) {
      const rect = element.getBoundingClientRect();
      this.boxOffsetTop = rect.top + window.scrollY;
      console.log('letzter boxOffsetTop: ', this.boxOffsetTop);
      this.checkScroll();
    }
  }

  checkScroll(): void {
    const scrollTop =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    if (scrollTop + 500 > this.boxOffsetTop) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
  }
}
 */

import { CommonModule } from '@angular/common';
import {
  Component,
  HostListener,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StaticContentService } from '../../shared/services/static-content.service';
import { Static } from '../../shared/interfaces/static-content.interface';
import { TranslationService } from '../../shared/services/translation.service';
import { ProjectComponent } from './project/project.component';
import { Translations } from '../../shared/interfaces/translations.interface';
import { ProjectWrapper } from '../../shared/interfaces/project-wrapper.interface';

@Component({
  selector: 'po-portfolio',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ProjectComponent],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit, AfterViewInit {
  staticContent: Static | null = null;
  jsonContent: Translations | null = null;
  isScrolled = false;
  boxOffsetTop = 0;
  boxHeight = 0;
  @ViewChild('portfolioArrowBox') skillsArrowBoxRef!: ElementRef;

  constructor(
    private staticContentService: StaticContentService,
    private translationService: TranslationService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.checkScroll();
    this.staticContentService.getStaticContent().subscribe((data: Static) => {
      this.staticContent = data;
    });

    this.translationService.translations$.subscribe(
      (data: Translations | null) => {
        this.jsonContent = data;
      }
    );

    this.translationService
      .loadTranslations(this.translationService.getCurrentLanguage())
      .subscribe();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.calculateBoxOffset();
      this.checkScroll();
    }, 250);
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.checkScroll();
  }

  getProjectKeys(project: ProjectWrapper): string[] {
    return Object.keys(project);
  }

  calculateBoxOffset(): void {
    const element = this.elementRef.nativeElement.querySelector(
      '.portfolio-arrow-box'
    );
    if (element) {
      const rect = element.getBoundingClientRect();
      this.boxOffsetTop = rect.top + window.scrollY;
      this.boxHeight = rect.height;
      this.checkScroll();
    }
  }

  checkScroll(): void {
    const scrollTop =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    const windowHeight = window.innerHeight;
    if (scrollTop + windowHeight > this.boxOffsetTop + this.boxHeight / 2) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
  }
}
