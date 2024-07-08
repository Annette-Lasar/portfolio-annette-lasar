import {
  Component,
  Renderer2,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { AboutComponent } from './about/about.component';
import { SkillsComponent } from './skills/skills.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ContactComponent } from './contact/contact.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { ScrollService } from '../shared/services/scroll.service';

@Component({
  selector: 'po-main-content',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    PortfolioComponent,
    ContactComponent,
    FooterComponent,
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss',
})
export class MainContentComponent {
  @ViewChild('anchorElement') anchorElement!: ElementRef;
  constructor(
    private scrollService: ScrollService,
    private renderer: Renderer2
  ) {}

  /* ngAfterViewInit(): void {
    this.scrollService.scrollToElement$.subscribe((elementId) => {
      console.log('Anker-Element: ', this.anchorElement);
      if (
        this.anchorElement &&
        this.anchorElement.nativeElement.id === elementId
      ) {
        console.log('gelesen');
        this.renderer.setProperty(
          this.anchorElement.nativeElement,
          'scrollIntoView',
          { behavior: 'smooth' }
        );
      }
    });
  } */
}
