import { DepartureFlightDetails } from '../shared/departure-flight.interface';

import { PayloadAction } from './payload-action';

export const UPDATE_DEPARTURES = 'UPDATE_DEPARTURES';

export function departureReducer(state: DepartureFlightDetails[] = [], action: PayloadAction): DepartureFlightDetails[] {
  switch (action.type) {
    case UPDATE_DEPARTURES:
      return action.payload;

    default:
      return state;
  }
}
