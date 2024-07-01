import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StaticContentService } from '../../services/static-content.service';
import { Static } from '../../interfaces/static-content.interface';
import { HttpClientModule } from '@angular/common/http';
import { MenuStateService } from '../../services/menu-state.service';
import { TranslationService } from '../../services/translation.service';
import { Translations } from '../../interfaces/translations.interface';
import { ImprintTranslationService } from '../../services/imprint-translation.service';
import { PrivacyPolicyTranslationService } from '../../services/privacy-policy-translation.service';
import { LanguageOption } from '../../interfaces/language-option.interface';
import { MenuComponent } from '../menu/menu.component';



@Component({
  selector: 'po-header',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MenuComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  staticContent: Static | null = null;
  jsonContent: Translations | null = null;
  selectedLanguage = 'en';
  selectedFlag = 'assets/icons/flags/english_flag.svg';
  dropdownOpen: boolean = false;
  isActive: boolean = false;
  menuActive: boolean = false;

  languageOptions: LanguageOption[] = [];

  constructor(
    private staticContentService: StaticContentService,
    private menuStateService: MenuStateService,
    private translationService: TranslationService,
    private imprintTranslationService: ImprintTranslationService,
    private privacyPolicyTranslationService: PrivacyPolicyTranslationService
  ) {}

  ngOnInit(): void {
    this.fetchStaticContent();
    this.fetchLanguageContent();
    this.subscribeToMenuState();
  }

  private fetchStaticContent(): void {
    this.staticContentService.getStaticContent().subscribe((data: Static) => {
      this.staticContent = data;
      if (this.staticContent) {
        this.initializeLanguageOptions();
        this.setInitialFlag();
      }
    });
  }

  private initializeLanguageOptions(): void {
    if (this.staticContent) {
      this.languageOptions = [
        {
          value: 'de',
          label: 'Deutsch',
          flag: this.staticContent.german_flag,
        },
        {
          value: 'en',
          label: 'English',
          flag: this.staticContent.english_flag,
        },
        {
          value: 'fr',
          label: 'Français',
          flag: this.staticContent.french_flag,
        },
      ];
    }
  }

  private setInitialFlag(): void {
    const currentLanguage = this.translationService.getCurrentLanguage();
    const selectedOption = this.languageOptions.find(
      (option) => option.value === currentLanguage
    );
    if (selectedOption) {
      this.selectedLanguage = selectedOption.value;
      this.selectedFlag = selectedOption.flag;
    }
  }

  private fetchLanguageContent(): void {
    this.translationService.translations$.subscribe(
      (data: Translations | null) => {
        this.jsonContent = data;
      }
    );

    this.translationService
      .loadTranslations(this.translationService.getCurrentLanguage())
      .subscribe();
  }

  private subscribeToMenuState(): void {
    this.menuStateService.burgerButtonActive$.subscribe((active) => {
      this.isActive = active;
    });

    this.menuStateService.menuVisible$.subscribe((visible) => {
      this.menuActive = visible;
    });
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectLanguage(option: LanguageOption, event: Event) {
    event.stopPropagation();
    this.selectedLanguage = option.value;
    this.selectedFlag = option.flag;
    this.dropdownOpen = false;
    this.translationService.loadTranslations(option.value).subscribe(() => {});
    this.imprintTranslationService.loadTranslations(option.value).subscribe(() => {});
    this.privacyPolicyTranslationService.loadTranslations(option.value).subscribe(() => {});
  }

  toggleBurgerButton() {
    this.menuStateService.toggleMenuVisibility();
  }
}
