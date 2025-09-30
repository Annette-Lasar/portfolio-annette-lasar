import {
  Component,
  HostListener,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChildren,
  ChangeDetectorRef,
  QueryList,
  Inject,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StaticContentService } from '../../../shared/services/static-content.service';
import { Static } from '../../../shared/interfaces/static-content.interface';
import { StaticProject } from '../../../shared/interfaces/static-project.interface';
import { TranslationService } from '../../../shared/services/translation.service';
import { Translations } from '../../../shared/interfaces/translations.interface';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { catchError } from 'rxjs';
import { of } from 'rxjs';
import { ScrollService } from '../../../shared/services/scroll.service';
import { MergedProject } from '../../../shared/interfaces/merged-projects.interface.js';
import { ButtonComponent } from '../../../shared/components/button/button.component.js';

@Component({
  selector: 'po-project',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ButtonComponent],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit, AfterViewInit {
  staticContent: Static | null = null;
  staticContentProjects: StaticProject[] = [];

  mergedProjects: MergedProject[] = [];

  jsonContent: Translations | null = null;
  isWindowLarge: boolean = false;
  @ViewChildren('imgBox') imgBoxes!: QueryList<ElementRef>;

  constructor(
    private staticContentService: StaticContentService,
    private translationService: TranslationService,
    private scrollService: ScrollService,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.staticContentService
      .getStaticContent()
      .pipe(
        catchError((error) => {
          console.error('Error fetching static content:', error);
          return of(null);
        })
      )
      .subscribe((data: Static | null) => {
        if (data) {
          this.staticContent = data;
          this.staticContentProjects = data.portfolio.projects;
          this.tryMergeProjects();
        }
      });

    this.translationService.translations$.subscribe(
      (data: Translations | null) => {
        this.jsonContent = data;
        this.tryMergeProjects();
        AOS.refresh();
      }
    );

    this.translationService
      .loadTranslations(this.translationService.getCurrentLanguage())
      .subscribe();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({
        offset: 300,
        duration: 400,
        delay: 200,
      });
    }

    setTimeout(() => {
      this.registerImgBoxes(200);
    }, 100);
  }

  private registerImgBoxes(offset: number): void {
    this.cdr.detectChanges();
    this.imgBoxes.forEach((imgBox, index) => {
      const adjustedOffset = offset + index * 100;
      this.scrollService.registerElement(imgBox.nativeElement, adjustedOffset);
      this.renderer.listen('window', 'scroll', () => {
        const scrollTop =
          window.scrollY ||
          document.documentElement.scrollTop ||
          document.body.scrollTop ||
          0;
        const boxOffsetTop =
          imgBox.nativeElement.getBoundingClientRect().top + window.scrollY;
        if (scrollTop + window.innerHeight - 200 > boxOffsetTop + offset) {
          this.renderer.addClass(imgBox.nativeElement, 'visible');
        } else {
          this.renderer.removeClass(imgBox.nativeElement, 'visible');
        }
      });
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.updateWindowSize();
  }

  private updateWindowSize(): void {
    const windowWidth = window.innerWidth;
    this.isWindowLarge = windowWidth >= 800;
  }

  getDataAos(isOdd: boolean): string {
    if (this.isWindowLarge) {
      return isOdd ? 'fade-right' : 'fade-left';
    } else {
      return 'fade-down';
    }
  }

  private tryMergeProjects(): void {
    if (this.staticContentProjects && this.jsonContent?.portfolio.projects) {
      this.mergedProjects = this.staticContentProjects.map((staticProj) => {
        const transProj = this.jsonContent!.portfolio.projects.find(
          (p: any) => p.id === staticProj.id
        );

        return {
          ...staticProj,
          description: transProj?.description || '',
          test_button: transProj?.test_button || '',
        };
      });
    }
  }
}
