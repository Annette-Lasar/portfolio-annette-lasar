import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { StaticContentService } from '../shared/services/static-content.service';
import { Static } from '../shared/interfaces/static-content.interface';
import { PrivacyPolicyTranslationService } from '../shared/services/privacy-policy-translation.service';
import { PrivacyPolicyToTranslate } from '../shared/interfaces/privacy-policy-to-translate.interface';

@Component({
  selector: 'po-privacy-policy',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    RouterLink,
  ],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss',
})
export class PrivacyPolicyComponent implements OnInit {
  staticContent: Static | null = null;
  privacyPolicyJsonContent: PrivacyPolicyToTranslate | null = null;

  private hyphenationRules: { [key: string]: string } = {
    Datenschutzerklärung: 'Daten&shy;schutz&shy;er&shy;klär&shy;ung',
    Inhaltsübersicht: 'In&shy;halts&shy;über&shy;sicht',
    Übersicht: 'Über&shy;sicht',
    Verarbeitungen: 'Verarbei&shy;tungen',
    Maßgebliche: 'Maß&shy;geb&shy;liche',
    Rechtsgrundlagen: 'Rechts&shy;grund&shy;la&shy;gen',
    Übermittlung: 'Über&shy;mittlung',
    personenbezogenen: 'personen&shy;bezogenen',
    Daten: 'Da&shy;ten',
    Sicherheitsmaßnahmen: 'Sicher&shy;heits&shy;maß&shy;nah&shy;men',
    Begriffsdefinitionen: 'Begriffs&shy;definitionen'
  };

  constructor(
    private staticContentService: StaticContentService,
    private privacyPolicyTranslationService: PrivacyPolicyTranslationService
  ) {}

  ngOnInit(): void {
    this.staticContentService.getStaticContent().subscribe((data: Static) => {
      this.staticContent = data;
    });

    this.privacyPolicyTranslationService.privacyPolicyTranslations$.subscribe(
      (data: PrivacyPolicyToTranslate | null) => {
        this.privacyPolicyJsonContent = data;
      }
    );

    this.privacyPolicyTranslationService
      .loadTranslations(
        this.privacyPolicyTranslationService.getCurrentLanguage()
      )
      .subscribe();
  }

  navigateToPosition(target: string): void {
    setTimeout(() => {
      const element = document.getElementById(target);
      if (element) {
        const headerOffset = 80;
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;
        this.scrollToPosition(elementPosition, headerOffset);
      }
    }, 150);
  }

  scrollToPosition(elementPosition: number, headerOffset: number) {
    const offsetPosition = elementPosition - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }

    insertSoftHyphens(text: string): string {
      return text.split(' ').map(word => this.hyphenationRules[word] || word).join(' ');
    }
}
