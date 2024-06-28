import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { StaticContentService } from '../../shared/services/static-content.service';
import { Static } from '../../shared/interfaces/static-content.interface';
import { TranslationService } from '../../shared/services/translation.service';
import { Translations } from '../../shared/interfaces/translations.interface';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from '../../shared/components/menu/menu.component';


@Component({
  selector: 'po-hero',
  standalone: true,
  imports: [ButtonComponent, CommonModule, HttpClientModule, MenuComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit {
  staticContent: Static | null = null;
  jsonContent: Translations | null = null;

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
}

