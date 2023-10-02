import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  searchTerm = '';

  @Output() searchChanged = new EventEmitter<string>();

  onInputChange() {
    this.searchChanged.emit(this.searchTerm);
  }
}
