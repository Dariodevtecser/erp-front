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
  @Input() isSelected = false;
  @Output() favorite = new EventEmitter<void>();
  @Output() select = new EventEmitter<void>();

 onCardClick(event: MouseEvent) {
  // Evita que el click en la estrella seleccione la card
  if ((event.target as HTMLElement).closest('.favorite-button')) return;
  this.select.emit();
}

onFavoriteClick(event: MouseEvent) {
  event.stopPropagation();
  this.favorite.emit();
}
}