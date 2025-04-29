import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardApiService } from './services/card.service';
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card-item/card-item.component';
import { SearchComponent } from './components/search/search.component';
import { Card } from './models/card-model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, CardComponent, SearchComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  cards: Card[] = [];
  filteredCards: Card[] = [];
  searchTerm = '';

  constructor(private cardService: CardApiService) {}

  ngOnInit(): void {
    this.loadCards();
  }

  loadCards(): void {
    this.cardService.getCards().subscribe({
      next: (cards: any) => {
        this.cards = cards;
        this.filteredCards = [...cards];
      },
      error: (error: any) => {
        console.error('Error loading cards:', error);
      },
    });
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
    this.filterCards();
  }

  filterCards(): void {
    if (!this.searchTerm) {
      this.filteredCards = [...this.cards];
      return;
    }

    this.filteredCards = this.cards.filter((card) => {
      const title = card.title ?? '';
      const description = card.description ?? '';
      return (
        title.includes(this.searchTerm) || description.includes(this.searchTerm)
      );
    });
  }

  deleteCard(id: number): void {
    this.cards = this.cards.filter((card) => card.id !== id);
    this.filterCards();
  }
}
