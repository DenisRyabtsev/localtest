import { Component, OnInit } from '@angular/core';

import {Jsondata, JsonService} from './json.service';
import {map} from 'rxjs/operators';
import * as moment from 'moment';




@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private jsonService: JsonService) {
  }

  clicked = false;
  isCollapsed: boolean = true;
  isCollapsedn: boolean = true;
  isCollapsednw: boolean = true;
  jsondata: Jsondata[] = [];

  jsondatarest;
  arrt;
  h = [];
  sotrM;
  index;
  jsonAverageValue;
  arrAverageValue;
  sum = 0;
  AverageValue;
  reArr;
  arrhc = [];
  arrhq = [];
  indexq;
  q;
  o;
  f;
  zx;
  l;
  g = [];
  m;
  qwer;
  reArrl;


  toggleColapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleColapsenw() {
    this.isCollapsednw = !this.isCollapsednw;
  }

  toggleColapsen() {
    this.isCollapsedn = !this.isCollapsedn;
  }

 calсHourly() {
    this.jsondatarest = this.jsondata.map(data => data.recordValues);
    this.jsondatarest = this.jsondatarest.flat(1);
    if (moment.unix(this.jsondatarest[0].Key).format('mm') == '30') {
      this.jsondatarest.shift();
    } else if (moment.unix(this.jsondatarest[0].Key).format('mm') == '45') {
      this.jsondatarest.shift();
    } else if (moment.unix(this.jsondatarest[0].Key).format('mm') == '00') {
      this.jsondatarest.shift();
    } else {
      console.log("ok")
    }
    this.arrt = this.jsondatarest.map((m) => m.Value);
    for (let i = 0; i < this.arrt.length; i += 4) {
      this.h.push(this.arrt[i] + this.arrt[i + 1] + this.arrt[i + 2] + this.arrt[i + 3]);
    }
  }


  calcMaxhour() {
    this.calсHourly()
    this.reArr = this.h.slice();
    this.sotrM = this.reArr.sort((a, b) => b - a);
    this.index = this.h.findIndex((ind) => ind === this.sotrM[0]);
    return moment.unix(this.jsondatarest[this.index * 4].Key).format('hh:mm LL')
  }

  calcMinday() {
    this.calсHourly()
    for (let i = 0; i < this.h.length; i += 24) {
      this.arrhq.push(this.h[i] + this.h[i + 1] + this.h[i + 2] +
        this.h[i + 3] + this.h[i + 4] + this.h[i + 5] + this.h[i + 6] + this.h[i + 7] +
        this.h[i + 8] + this.h[i + 9] + this.h[i + 10] + this.h[i + 11] + this.h[i + 12] +
        this.h[i + 13] + this.h[i + 14] + this.h[i + 15] + this.h[i + 16] + this.h[i + 17] +
        this.h[i + 18] + this.h[i + 19] + this.h[i + 20] + this.h[i + 21] + this.h[i + 22] +
        this.h[i + 23])
    }
    this.reArrl = this.arrhq.slice();
    this.zx = this.reArrl.sort((a, b) => a - b);
    this.indexq = this.arrhq.findIndex((ind) => ind === this.zx[0]);
    return moment.unix(this.jsondatarest[this.indexq * 48].Key).format('LL');
  }

  calcAverageValue() {
    this.calcMaxhour();
    for (let i = 0; i < this.h.length; i++) {
      if (isNaN(this.h[i]) == true) {
        continue
      } else {
        this.sum += this.h[i];
      }
    }
    this.AverageValue = this.sum / (this.h.length);
    return this.AverageValue.toFixed(0);
  }

public ngOnInit() {
     this.jsonService.getData().subscribe(jsondata => {
       console.log('answer', jsondata);
       this.jsondata = jsondata;
     });


     this.jsonService.pushData(123123, 123)


  }
}
