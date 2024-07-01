import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'po-button',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
@Input() caption: string = '';
@Input() linkTarget: string = '';
@Input() routerLinkTarget: string = '';
@Input() additionalClass: string = '';
}

