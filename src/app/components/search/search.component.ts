import { Component, EventEmitter, Output } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  searchTerm = '';

  @Output()
  searchChanged = new EventEmitter<string>();

  private searchSubject = new Subject<string>();

  constructor() {
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((term) => {
        this.searchChanged.emit(term);
      });
  }

  onInputChange() {
    this.searchChanged.emit(this.searchTerm);
  }
}
