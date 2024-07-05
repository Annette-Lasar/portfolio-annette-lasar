import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { StaticContentService } from '../shared/services/static-content.service';
import { Static } from '../shared/interfaces/static-content.interface';
import { ImprintTranslationService } from '../shared/services/imprint-translation.service';
import { ImprintToTranslate } from '../shared/interfaces/imprint-to-translate.interface';

@Component({
  selector: 'po-imprint',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.scss',
})
export class ImprintComponent implements OnInit {
  staticContent: Static | null = null;
  imprintJsonContent: ImprintToTranslate | null = null;

  private hyphenationRules: { [key: string]: string } = {
    Diensteanbieter: 'Dienste&shy;anbieter',
    Kontaktmöglichkeiten: 'Kontakt&shy;mög&shy;lich&shy;keiten',
  };

  constructor(
    private staticContentService: StaticContentService,
    private imprintTranslationService: ImprintTranslationService
  ) {}

  ngOnInit(): void {
    this.staticContentService.getStaticContent().subscribe((data: Static) => {
      this.staticContent = data;
    });

    this.imprintTranslationService.imprintTranslations$.subscribe(
      (data: ImprintToTranslate | null) => {
        this.imprintJsonContent = data;
      }
    );

    this.imprintTranslationService
      .loadTranslations(this.imprintTranslationService.getCurrentLanguage())
      .subscribe();
  }

  isCurrentLanguage(lang: string): boolean {
    return this.imprintTranslationService.getCurrentLanguage() === lang;
  }

  insertSoftHyphens(word: string): string {
    return this.hyphenationRules[word] || word;
  }
}
