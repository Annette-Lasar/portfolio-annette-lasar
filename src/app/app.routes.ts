import { Routes } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ImprintComponent } from './imprint/imprint.component';

export const routes: Routes = [
  { path: '', component: MainContentComponent, title: 'Annette Lasar' },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
    title: 'Privacy Policy',
  },
  { path: 'imprint', component: ImprintComponent, title: 'Imprint' },
];
