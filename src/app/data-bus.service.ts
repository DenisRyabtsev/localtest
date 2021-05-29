import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {MomentValue} from './MomentValue';

@Injectable( )
export class DataBusService {

  public count$ = new Subject<any>();
  public AvgWeek$ = new Subject<any>();

  public pushValueHourly(data: any[]) {
    this.count$.next(data);
  }

  public pushAvgWeek(data: any[]) {
    this.AvgWeek$.next(data);
  }

  constructor() {
     }
}
