import { Injectable } from '@angular/core';

import { FlightRetrievalService } from '../services/flight-retrieval.service';
import { DepartureFlightDetails } from '../shared/departure-flight.interface';
import { Store } from '@ngrx/store';
import { UPDATE_DEPARTURES } from '../reducers/departure.reducer';

@Injectable()
export class FlightFacade {
  constructor(
    private flightRetrievalService: FlightRetrievalService,
    private store: Store<any>
  ) {
  }

  public getFlights(): void {
    this.flightRetrievalService.getDepartures().subscribe((response: Response) => {
      this.getDeparturesSuccessfull(response);
    }, (error: Error) => {
      console.log(error);
    });
  }

  public getDeparturesSuccessfull(response: Response): void {
    this.store.dispatch({
      type: UPDATE_DEPARTURES,
      payload: response
    });
  }

  public updateData(departures): void {
    const action: number = this.getRandomNumber(3);
    this.removeData(departures);
    return;

    // switch (action) {
    //   case 0:
    //     this.facade.addData(this.departures);
    //     break;
    //   case 1:
    //     this.facade.removeData(this.departures);
    //     break;
    //   case 2:
    //     this.facade.appendData(this.departures);
    //     break;
    //   default:
    //    break;
    // }
  }

  public addData(departures: DepartureFlightDetails[]): void {

  }

  public removeData(departures: DepartureFlightDetails[]): void {
    const dataIndex = this.getRandomNumber(departures.length);

    departures.splice(dataIndex - 1, 1);

    const newData: DepartureFlightDetails[] = departures;

    this.store.dispatch({
      type: UPDATE_DEPARTURES,
      payload: newData
    });
  }

  public appendData(departures: DepartureFlightDetails[]): void {

  }

  public getRandomNumber(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
