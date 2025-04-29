import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [FormsModule],
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  searchText: string = '';

  @Output() search = new EventEmitter<string>();

  onSearchChange() {
    this.search.emit(this.searchText);
  }
}
