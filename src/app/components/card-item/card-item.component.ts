import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Card } from '../../models/card-model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css'],
}) //
export class CardComponent {
  @Input({ required: true }) card!: Card;
  @Output() delete = new EventEmitter<number>();

  deleteCard(): void {
    this.delete.emit(this.card.id);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  }

  getTypeName(): string {
    const type = Number(this.card.type);
    switch (type) {
      case 1:
        return 'Paisagem';
      case 2:
        return 'Flor';
      case 3:
        return 'Pizza';
      default:
        return '';
    }
  }

  getTypeClass(): string {
    const type = Number(this.card.type);

    switch (type) {
      case 1:
        return 'type-landscape';
      case 2:
        return 'type-flower';
      case 3:
        return 'type-pizza';
      default:
        return '';
    }
  }
}
