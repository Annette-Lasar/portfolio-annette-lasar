/* import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ScrollService } from './shared/services/scroll.service';

@Component({
  selector: 'po-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Annette Lasar';

  constructor(private scrollService: ScrollService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.scrollService.scrollToElement$.subscribe((elementId) => {
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          console.log('gelesen');
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    });
  }
} */

import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ScrollService } from './shared/services/scroll.service';

@Component({
  selector: 'po-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Annette Lasar';
  @ViewChild('anchorElement') anchorElement!: ElementRef;

  constructor(
    private scrollService: ScrollService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
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
    }, 1000);
  }
}
