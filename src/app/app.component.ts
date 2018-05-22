import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  interval,
  Observable,
  Subscription
} from 'rxjs';

import { FlightFacade } from './facade/flight.facade';
import { DepartureFlightDetails } from './shared/departure-flight.interface';
import {
  Store,
  select
} from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit, OnDestroy {
  private departures: DepartureFlightDetails[] = [];
  private dataGenerator: Subscription;
  private dataGeneratorTick: Observable<number> = interval(500);

  constructor(
    private facade: FlightFacade,
    private store: Store<any>
  ) {
    this.store.select('departure').subscribe((departures: DepartureFlightDetails[]) => {
      this.handleDepartureChange(departures);
    });
  }

  public ngOnInit(): void {
    this.facade.getFlights();

    this.dataGenerator = this.dataGeneratorTick.subscribe(() => {
      this.facade.updateData(this.departures);
    });
  }

  public ngOnDestroy(): void {
    this.dataGenerator.unsubscribe();
  }

  public handleDepartureChange(departures: DepartureFlightDetails[]): void {
    this.departures = departures;
  }
}
