import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Static } from '../interfaces/static-content.interface';

@Injectable({
  providedIn: 'root',
})
export class StaticContentService {
  private staticUrl = 'assets/static-content/static.json';

  constructor(private http: HttpClient) {}

  getStaticContent(): Observable<Static> {
    return this.http.get<Static>(this.staticUrl);
  }
}