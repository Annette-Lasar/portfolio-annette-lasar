import {
  Component,
  OnInit,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StaticContentService } from '../../../shared/services/static-content.service';
import { Static } from '../../../shared/interfaces/static-content.interface';
import { StaticProject } from '../../../shared/interfaces/static-project.interface';
import { TranslationService } from '../../../shared/services/translation.service';
import { Translations } from '../../../shared/interfaces/translations.interface';
import { ProjectWrapper } from '../../../shared/interfaces/project-wrapper.interface';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { catchError } from 'rxjs';
import { of } from 'rxjs';

@Component({
  selector: 'po-project',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ButtonComponent],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit, AfterViewInit {
  staticContent: Static | null = null;
  staticContentProjects: { [key: string]: StaticProject } | null = null;
  jsonContent: Translations | null = null;

  constructor(
    private staticContentService: StaticContentService,
    private translationService: TranslationService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // AOS.init();
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
          // AOS.refresh();
        }
      });

    this.translationService.translations$.subscribe(
      (data: Translations | null) => {
        this.jsonContent = data;
        AOS.refresh();
      }
    );

    this.translationService
      .loadTranslations(this.translationService.getCurrentLanguage())
      .subscribe();
  }


  ngAfterViewInit(): void {
    console.log('Fertig geladen.');
    if (isPlatformBrowser(this.platformId)) {
      AOS.init(); // HIER INHALT AUS AOS.init GELÖSCHT.
      console.log('AOS initialized.');
    }
  }

  getProjectKeys(project: ProjectWrapper): string[] {
    return Object.keys(project);
  }
}
