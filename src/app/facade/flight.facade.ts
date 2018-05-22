import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { FlightRetrievalService } from '../services/flight-retrieval.service';
import { DepartureFlightDetails } from '../shared/departure-flight.interface';
import { UPDATE_DEPARTURES } from '../reducers/departure.reducer';
import {
  newData1,
  newData2,
  newData3,
  newData4,
  newData5
} from '../../assets/new_data';

@Injectable()
export class FlightFacade {
  readonly DELAYED_STATUS: string = 'DELAYED';
  readonly BOARDING_STATUS: string = 'BOARDING';
  readonly AWAITING_BOARDING_STATUS: string = 'AWAITING_BOARDING';

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

    switch (action) {
      case 0:
        this.addData(departures);
        break;
      case 1:
        this.removeData(departures);
        break;
      case 2:
        this.appendData(departures);
        break;
      default:
       break;
    }
  }

  public addData(departures: DepartureFlightDetails[]): void {
    const newDataNumber: number = this.getRandomNumber(5) + 1;

    let newData: DepartureFlightDetails;

    switch (newDataNumber) {
      case 1:
        newData = newData1;
        break;
      case 2:
        newData = newData2;
        break;
      case 3:
        newData = newData3;
        break;
      case 4:
        newData = newData4;
        break;
      case 5:
        newData = newData5;
        break;
      default:
        newData = newData1;
        break;
    }

    // do unshift so it's more visible
    departures.unshift(newData);

    const newState: DepartureFlightDetails[] = [...departures];

    this.store.dispatch({
      type: UPDATE_DEPARTURES,
      payload: newState
    });
  }

  public removeData(departures: DepartureFlightDetails[]): void {
    const dataIndex = this.getRandomNumber(departures.length);

    departures.splice(dataIndex - 1, 1);

    const newData: DepartureFlightDetails[] = [...departures];

    this.store.dispatch({
      type: UPDATE_DEPARTURES,
      payload: newData
    });
  }

  public appendData(departures: DepartureFlightDetails[]): void {
    const dataIndex = this.getRandomNumber(departures.length);
    const actionType: number = this.getRandomNumber(3);

    let newStatus: string;

    switch (actionType) {
      case 0:
        newStatus = this.BOARDING_STATUS;
        break;
      case 1:
        newStatus = this.AWAITING_BOARDING_STATUS;
        break;
      case 2:
        newStatus = this.DELAYED_STATUS;
        break;
      default:
        newStatus = 'PLEASE BE PATIENT';
        break;
    }

    departures[dataIndex].status = newStatus;

    const newData: DepartureFlightDetails[] = [...departures];

    this.store.dispatch({
      type: UPDATE_DEPARTURES,
      payload: newData
    });
  }

  public getRandomNumber(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
