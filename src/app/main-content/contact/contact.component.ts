import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { TranslationService } from '../../shared/services/translation.service';
import { Translations } from '../../shared/interfaces/translations.interface';
import { StaticContentService } from '../../shared/services/static-content.service';
import { Static } from '../../shared/interfaces/static-content.interface';

@Component({
  selector: 'po-contact',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ContactFormComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
  staticContent: Static | null = null;
  jsonContent: Translations | null = null;

  constructor(
    private translationService: TranslationService,
    private staticContentService: StaticContentService
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

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
