import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ImprintToTranslate } from '../interfaces/imprint-to-translate.interface';

@Injectable({
  providedIn: 'root',
})
export class ImprintTranslationService {
  private translationsSubject = new BehaviorSubject<ImprintToTranslate | null>(null);
  imprintTranslations$ = this.translationsSubject.asObservable();
  private currentLanguage: string;

  constructor(private http: HttpClient) {
    const storedLanguage = localStorage.getItem('language');
    this.currentLanguage = storedLanguage ? storedLanguage : 'en';
    this.loadTranslations(this.currentLanguage).subscribe();
  }

  loadTranslations(language: string): Observable<ImprintToTranslate> {
    return this.http
      .get<ImprintToTranslate>(`assets/i18n/legal-notice/${language}.json`)
      .pipe(
        map((translations) => {
          this.translationsSubject.next(translations);
          this.currentLanguage = language;
          localStorage.setItem('language', language);
          return translations;
        })
      );
  }

  getTranslation(key: string): string {
    const keys = key.split('.');
    let result: any = this.translationsSubject.getValue();

    for (const k of keys) {
      if (result && result[k] !== undefined) {
        result = result[k];
      } else {
        return key;
      }
    }
    return result;
  }

  getCurrentLanguage(): string {
    return this.currentLanguage;
  }
}
