import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs'
import { map } from "rxjs/operators";
import * as moment from 'moment';


export interface Jsondata {
  channelName: string;
  meterName: string;
  firstRecord: number;
  lastRecord: number;
  recordValues: {
    Key?: number;
    Value: number;
  };
}


@Injectable()
export class JsonService {
  constructor(private http: HttpClient) {}

  getData(): Observable<Jsondata[]> {
    console.info("calling...");
    return this.http.get<Jsondata[]>('assets/test.json');
  };




  pushData(timestamp: number, value: number) {
  //alert(moment.utc(timestamp).format("MM DD YYYY hh:mm"));
  }
}
