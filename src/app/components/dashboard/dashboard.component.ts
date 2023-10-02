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
            this.filteredBeers = beers;
          }
        })
      )
      .subscribe();
  }

  onSearchTermChanged(searchTerm: string) {
    console.log(searchTerm);
    if (searchTerm.trim() === '') {
      this.getAllBeersList();
    } else {
      this.filteredBeers = this.filteredBeers.filter((beer) => {
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
      console.log(this.beers$);
      this.getBeersSub = this.beers$
        .pipe(
          tap((beers) => {
            if (beers && beers.length > 0) {
              console.log(beers);
              this.tableHeader = Object.keys(beers[0]);
              console.log(this.tableHeader);
            }
          })
        )
        .subscribe({});
    }
  }
}
