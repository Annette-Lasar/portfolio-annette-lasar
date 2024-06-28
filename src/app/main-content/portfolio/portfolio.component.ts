import { Component, OnInit } from '@angular/core';
import { StaticContentService } from '../../shared/services/static-content.service';
import { Static } from '../../shared/interfaces/static-content.interface';
import { TranslationService } from '../../shared/services/translation.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProjectComponent } from '../project/project.component';
import { Translations } from '../../shared/interfaces/translations.interface';
import { ProjectWrapper } from '../../shared/interfaces/project-wrapper.interface';


@Component({
  selector: 'po-portfolio',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ProjectComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent implements OnInit {
  staticContent: Static | null = null;
  jsonContent: Translations | null = null;
  isHovered: boolean = false;

  constructor(
    private staticContentService: StaticContentService,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
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
  getProjectKeys(project: ProjectWrapper): string[] {
    return Object.keys(project);
  }

  toggleHover(state: boolean) {
    this.isHovered = state;
  }
}
