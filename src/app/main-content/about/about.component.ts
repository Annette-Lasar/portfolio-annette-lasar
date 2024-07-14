import { CommonModule } from '@angular/common';
import {
  Component,
  HostListener,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { StaticContentService } from '../../shared/services/static-content.service';
import { Static } from '../../shared/interfaces/static-content.interface';
import { TranslationService } from '../../shared/services/translation.service';
import { Translations } from '../../shared/interfaces/translations.interface';
import { HttpClientModule } from '@angular/common/http';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'po-about',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ButtonComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit, AfterViewInit {
  staticContent: Static | null = null;
  jsonContent: Translations | null = null;
  isScrolled = false;
  boxOffsetTop = 0;
  @ViewChild('aboutArrowBox') skillsArrowBoxRef!: ElementRef;

  constructor(
    private staticContentService: StaticContentService,
    private translationService: TranslationService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.calculateBoxOffset();
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
    }, 200);
  }

  @HostListener('window: scroll', [])
  onWindowScroll(): void {
    this.checkScroll();
  }

  calculateBoxOffset(): void {
    const element =
      this.elementRef.nativeElement.querySelector('.about-arrow-box');
    if (element) {
      const rect = element.getBoundingClientRect();
      this.boxOffsetTop = rect.top + window.scrollY;
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
