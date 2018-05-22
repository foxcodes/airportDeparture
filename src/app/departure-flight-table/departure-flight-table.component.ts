import {
  Component,
  Input,
  OnChanges,
  ChangeDetectionStrategy,
  SimpleChanges
} from '@angular/core';

import { DepartureFlightDetails } from '../shared/departure-flight.interface';

@Component({
  selector: 'departure-flight-table',
  templateUrl: './departure-flight-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DepartureFlightTableComponent implements OnChanges {
 @Input() departures: DepartureFlightDetails[] = [];

  public ngOnChanges(changes: SimpleChanges): void {
    this.departures = this.departures;
  }
}
