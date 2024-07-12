import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StaticContentService } from '../../../shared/services/static-content.service';
import { Static } from '../../../shared/interfaces/static-content.interface';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslationService } from '../../../shared/services/translation.service';
import { Translations } from '../../../shared/interfaces/translations.interface';
import { ContactData } from '../../../shared/interfaces/contact-data.interface';

@Component({
  selector: 'po-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent implements OnInit {
  staticContent: Static | null = null;
  jsonContent: Translations | null = null;
  checkboxState: boolean = false;
  showSuccessMessage: boolean = false;
  contactData: ContactData = {
    name: '',
    email: '',
    message: '',
  };
  isInvisible: boolean = true;

  http = inject(HttpClient);

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

  changeVisibility(field: NgModel): boolean {
    return !(field.invalid && field.touched);
  }

  formtest(e: any, ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid) {
      console.log(123);
    }
    e.preventDefault();
  }

  post = {
    endPoint: 'https://annette-lasar.de/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid) {
      this.http
        .post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: (response) => {
            this.showSuccessMessage = true;
            ngForm.resetForm();
            this.removeSuccessMessage();
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => console.info('send post complete'),
        });
    }
  }

  removeSuccessMessage() {
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 3000);
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
