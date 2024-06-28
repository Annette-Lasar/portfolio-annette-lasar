import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ProjectWrapper } from '../../shared/interfaces/project-wrapper.interface';
import { StaticProject } from '../../shared/interfaces/static-project.interface';
import { Static } from '../../shared/interfaces/static-content.interface';
import { Translations } from '../../shared/interfaces/translations.interface';
import { ButtonComponent } from '../../shared/components/button/button.component';
import AOS from 'aos';
import 'aos/dist/aos.css';

@Component({
  selector: 'po-project',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit, AfterViewInit {
  @Input() staticContent: Static | null = null;
  @Input() staticContentProjects: { [key: string]: StaticProject } | null =
    null;
  @Input() jsonContent: Translations | null = null;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    AOS.init({ duration: 750, delay: 150 });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.document.addEventListener('DOMContentLoaded', () => {
        console.log('doc loaded');
        console.log('Page ready');
        AOS.init({ once: true, duration: 1000 });
        AOS.refresh();
      });
    }
  }

  getProjectKeys(project: ProjectWrapper): string[] {
    return Object.keys(project);
  }
}
