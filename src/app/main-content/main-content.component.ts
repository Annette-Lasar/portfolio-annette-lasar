import { Component } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { AboutComponent } from './about/about.component';
import { SkillsComponent } from './skills/skills.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ContactComponent } from './contact/contact.component';

@Component({
  selector: 'po-main-content',
  standalone: true,
  imports: [
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    PortfolioComponent,
    ContactComponent,
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss',
})
export class MainContentComponent {}

