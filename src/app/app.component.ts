import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT, ViewportScroller } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'po-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Annette Lasar';

  constructor(
    private viewportScroller: ViewportScroller,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {}

  scrollToAnchor(anchor: string): void {
    this.viewportScroller.scrollToAnchor(anchor);
  }

  setOffset(offset: [number, number]): void {
    this.viewportScroller.setOffset(offset);
  }

  scrollToAnchorWithOffset(anchor: string, offset: number): void {
    this.setOffset([0, offset]);
    this.scrollToAnchor(anchor);
  }
}
