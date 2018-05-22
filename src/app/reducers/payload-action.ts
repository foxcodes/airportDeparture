import { Action } from '@ngrx/store';

export interface PayloadAction extends Action {
  type: string;
  payload?: any;
}
