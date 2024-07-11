import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule, RouterLink } from '@angular/router';

@Component({
  selector: 'po-button',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() caption: string = '';
  @Input() linkTarget: string = '';
  @Input() routerLinkTarget: string = '';
  @Input() additionalClass: string = '';
  @Input() scrollTarget: string = '';
  @Input() targetAttr: string = '';

  constructor() {}
}
