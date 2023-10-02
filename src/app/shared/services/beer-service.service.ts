import { Beer, Options } from './../models/beer';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BeerServiceService {
  private baseUrl = 'https://api.punkapi.com/v2/beers';
  private _beers: BehaviorSubject<Beer[]> = new BehaviorSubject<any>(null);
  public readonly beers$: Observable<Beer[]>;
  public beersLoaded$: Observable<boolean>;
  private _beersLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(private http: HttpClient) {
    this.beers$ = this._beers.asObservable();
    this.beersLoaded$ = this._beersLoaded.asObservable();
  }

  public getBeers() {
    this._beersLoaded.next(true);
    this.http
      .get<Beer[]>(this.baseUrl)
      .pipe(
        tap((beers) => {
          this._beers.next(beers);
          this._beersLoaded.next(true);
        })
      )
      .subscribe({
        error: (err) => {
          this._beers.next([]);
          this._beersLoaded.next(false);
          throw err;
        },
      });
  }
}
