import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslationService } from '../../shared/services/translation.service';
import { Translations } from '../../shared/interfaces/translations.interface';


@Component({
  selector: 'po-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent implements OnInit {
  fields: Array<{ type: string; id: string; placeholder: string }> = [];
  jsonContent: Translations | null = null;

  constructor(private translationService: TranslationService) {}


  
  ngOnInit(): void {
    this.translationService.translations$.subscribe(
      (data: Translations | null) => {
        this.jsonContent = data;
        if (data) {
          this.initializeFields();
        }
      }
    );

    this.translationService
      .loadTranslations(this.translationService.getCurrentLanguage())
      .subscribe();
  }

  initializeFields(): void {
    if (this.jsonContent) {
      this.fields = [
        {
          type: 'text',
          id: 'name',
          placeholder: this.jsonContent.contact.name,
        },
        {
          type: 'email',
          id: 'email',
          placeholder: this.jsonContent.contact.email,
        },
        {
          type: 'textarea',
          id: 'message',
          placeholder: this.jsonContent.contact.message,
        },
      ];
    }
  }
}

