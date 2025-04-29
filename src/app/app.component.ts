import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardApiService } from './services/card.service';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  cards: any[] = [];

  constructor(private cardApiService: CardApiService) {
    this.cardApiService.getCards().subscribe((data: any) => {
      this.cards = data;
    });
  }
  onSearch(searchTerm: string) {
    console.log('Texto da busca:', searchTerm);
  }
}
