import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StaticContentService } from '../shared/services/static-content.service';
import { Static } from '../shared/interfaces/static-content.interface';
import { PrivacyPolicyTranslationService } from '../shared/services/privacy-policy-translation.service';
import { PrivacyPolicyToTranslate } from '../shared/interfaces/privacy-policy-to-translate.interface';
import { ButtonComponent } from '../shared/components/button/button.component';



@Component({
  selector: 'po-privacy-policy',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink, ButtonComponent],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent implements OnInit {
staticContent: Static | null = null;
privacyPolicyJsonContent: PrivacyPolicyToTranslate | null = null;
// tableOfContentList: TableOfContent = this.privacyPolicyJsonContent?.table_of_content_list;


  constructor(
    private staticContentService: StaticContentService,
    private privacyPolicyTranslationService: PrivacyPolicyTranslationService
  ){}

  ngOnInit(): void {
    this.staticContentService.getStaticContent().subscribe((data: Static) => {
      this.staticContent = data;
    });

    this.privacyPolicyTranslationService.privacyPolicyTranslations$.subscribe(
      (data: PrivacyPolicyToTranslate | null) => {
        this.privacyPolicyJsonContent = data;
        console.log('Imprint-Inhalt: ', this.privacyPolicyJsonContent);
      }
    );

    this.privacyPolicyTranslationService
      .loadTranslations(this.privacyPolicyTranslationService.getCurrentLanguage())
      .subscribe();


  }
}
