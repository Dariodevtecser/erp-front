import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'erp-frontend-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() title = '';
  @Input() icon = '';
  @Input() isFavorite = false;
  @Output() favorite = new EventEmitter<void>();

  onFavoriteClick() {
    this.favorite.emit();
  }
}