import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { FlightFacade } from './facade/flight.facade';
import { FlightRetrievalService } from './services/flight-retrieval.service';

import { departureReducer } from './reducers/departure.reducer';


import { AppComponent } from './app.component';
import { DepartureFlightTableComponent } from './departure-flight-table/departure-flight-table.component';
import { DepartureHeaderComponent } from './departure-header/departure-header.component';

@NgModule({
  declarations: [
    AppComponent,
    DepartureHeaderComponent,
    DepartureFlightTableComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot({
      departure: departureReducer
  })],
  providers: [
    FlightFacade,
    FlightRetrievalService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
