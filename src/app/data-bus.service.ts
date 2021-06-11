import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class DataBusService {

  public count$ = new Subject<any>();
  public avgWeek$ = new Subject<any>();

  public pushValueHourly(data: any[]) {
    this.count$.next(data);
  }

  public pushAvgWeek(data: any[]) {
    this.avgWeek$.next(data);
  }

  constructor() {
  }
}
