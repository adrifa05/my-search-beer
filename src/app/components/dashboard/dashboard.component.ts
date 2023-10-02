import { Observable, Subscription, filter, tap } from 'rxjs';
import { BeerServiceService } from './../../shared/services/beer-service.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Beer, Options } from 'src/app/shared/models/beer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  public beers$: Observable<Beer[]> = this.beerServiceService.beers$;
  private options: Options = {
    page: 1,
    per_page: 5,
  };
  private getBeersSub: Subscription;
  public tableHeader: string[];
  public allBeers: Beer[];
  public filteredBeers: Beer[];

  constructor(private beerServiceService: BeerServiceService) {}

  ngOnInit(): void {
    this.getBeers();
  }

  ngOnDestroy(): void {
    this.getBeersSub.unsubscribe();
  }

  getBeers() {
    this.beerServiceService.getBeers();
    this.getHeaders();
    this.getAllBeersList();
  }

  getAllBeersList() {
    this.beers$
      .pipe(
        tap((beers) => {
          if (beers && beers.length > 0) {
            this.allBeers = beers;
            this.filteredBeers = this.allBeers;
          }
        })
      )
      .subscribe();
  }

  onSearchTermChanged(searchTerm: string) {
    if (searchTerm.trim() === '') {
      this.getAllBeersList();
    } else {
      this.filteredBeers = this.allBeers.filter((beer) => {
        return Object.values(beer).some(
          (val) =>
            val &&
            val.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }
  }

  private getHeaders() {
    if (this.beers$ != null) {
      this.getBeersSub = this.beers$
        .pipe(
          tap((beers) => {
            if (beers && beers.length > 0) {
              this.tableHeader = Object.keys(beers[0]);
            }
          })
        )
        .subscribe({});
    }
  }
}
