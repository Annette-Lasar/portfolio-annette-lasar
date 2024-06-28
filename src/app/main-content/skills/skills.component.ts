import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StaticContentService } from '../../shared/services/static-content.service';
import { Static } from '../../shared/interfaces/static-content.interface';
import { TranslationService } from '../../shared/services/translation.service';
import { Translations } from '../../shared/interfaces/translations.interface';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'po-skills',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent implements OnInit {
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

  isCurrentLanguage(lang: string): boolean {
    return this.translationService.getCurrentLanguage() === lang;
  }

  toggleHover(state: boolean) {
    this.isHovered = state;
  }
}
