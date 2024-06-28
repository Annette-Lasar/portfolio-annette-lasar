import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
export class AboutComponent implements OnInit {
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

  toggleHover(state: boolean) {
    this.isHovered = state;
  }
}
