import { CommonModule } from '@angular/common';
import { Component, ContentChild, OnInit } from '@angular/core';
import { StaticContentService } from '../../../shared/services/static-content.service';
import { Static } from '../../../shared/interfaces/static-content.interface';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslationService } from '../../../shared/services/translation.service';
import { Translations } from '../../../shared/interfaces/translations.interface';
import { ContactData } from '../../../shared/interfaces/contact-data.interface';

@Component({
  selector: 'po-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent implements OnInit {
  fields: Array<{ type: string; id: keyof ContactData; placeholder: string }> = [];
  staticContent: Static | null = null;
  jsonContent: Translations | null = null;
  name: string = '';
  email: string = '';
  message: string = '';
  contactData: ContactData = {
    name: '',
    email: '',
    message: '',
  }

  constructor(
    private staticContentService: StaticContentService,
    private translationService: TranslationService) {}

  ngOnInit(): void {
    this.staticContentService.getStaticContent().subscribe((data: Static) => {
      this.staticContent = data;
    });
    this.translationService.translations$.subscribe(
      (data: Translations | null) => {
        this.jsonContent = data;
        if (data) {
          // this.initializeFields();
        }
      }
    );

    this.translationService
      .loadTranslations(this.translationService.getCurrentLanguage())
      .subscribe();
  }

/*   initializeFields(): void {
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
  } */

    getErrorMessage(fieldId: string): string {
      if (this.jsonContent) {
        if (fieldId === 'name' && this.jsonContent.contact.enter_name) {
          return this.jsonContent.contact.enter_name;
        }
        if (fieldId === 'email' && this.jsonContent.contact.enter_email) {
          return this.jsonContent.contact.enter_email;
        }
      }
      return '';
    }
    
  formtest(e:any, ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid) {
      console.log(123);
    }
    e.preventDefault();
  }

  onSubmit(ngForm: NgForm) {
    if (ngForm.valid && ngForm.submitted) {
      console.log(this.contactData);
    }
  }
}
