import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StaticContentService } from '../../services/static-content.service';
import { Static } from '../../interfaces/static-content.interface';
import { HttpClientModule } from '@angular/common/http';
import { TranslationService } from '../../services/translation.service';
import { Translations } from '../../interfaces/translations.interface';


@Component({
  selector: 'po-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  staticContent: Static | null = null;
  jsonContent: Translations | null = null;
  @Input() isMenuFooter: boolean = false;

  constructor(
    private staticContentService: StaticContentService,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.fetchStaticContent();
    this.fetchLanguageContent();
  }

  private fetchStaticContent(): void {
    this.staticContentService.getStaticContent().subscribe((data: Static) => {
      this.staticContent = data;
    });
  }

  private fetchLanguageContent() {
    this.translationService.translations$.subscribe(
      (data: Translations | null) => {
        this.jsonContent = data;
      }
    );

    this.translationService
      .loadTranslations(this.translationService.getCurrentLanguage())
      .subscribe();
  }
}

