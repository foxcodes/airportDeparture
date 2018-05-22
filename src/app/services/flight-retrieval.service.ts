import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FlightRetrievalService {

  constructor(private http: HttpClient) { }

  public getDepartures(): Observable<any> {
    return this.http.get('../assets/mock_data.json');
  }
}
