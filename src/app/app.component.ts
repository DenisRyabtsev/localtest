import { Component, OnInit} from '@angular/core';
import {MomentValue} from './MomentValue';
import {JsonService} from './json.service';
import * as moment from 'moment';
import {JsonData} from './JsonData';

import 'daterangepicker';
import $ from 'jquery';




@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private jsonService: JsonService) {
  }
;
  private energyData: MomentValue[];
  private energyHourlyData: MomentValue[];
  private energyDailyData: MomentValue[];
  meterData: JsonData = null;
  avgHourly: number;
  sotrEnergyHourly;
  sotrEnergyDaily;
  isJqueryWorking: string






  ngOnInit(): void {
    this.jsonService.getData().subscribe(jsondata => {
      if (jsondata.length > 0) {
        this.meterData = jsondata[0];
        this.energyData = this.parseEnergyData(this.meterData);
        this.energyHourlyData = this.wrapToHourlyData(this.energyData);
        this.energyDailyData = this.wrapToDayData(this.energyData);
      }
    });
  }

  private parseEnergyData(data: JsonData): MomentValue[] {

    return data.recordValues.map(keyValuePair => new MomentValue(moment(+keyValuePair.Key), keyValuePair.Value));
  }


  getMaximumHour() {
    this.sotrEnergyHourly = this.energyHourlyData.sort((a, b) => b.value - a.value);
  }

  getMinimumDay() {
    this.sotrEnergyDaily = this.energyDailyData.sort((a, b) => a.value - b.value);
  }


  calculateAvgHourly() {
    let sum = 0;
    for (const point of this.energyHourlyData) {
      sum += point.value;
    }

    this.avgHourly = sum / this.energyHourlyData.length;
  }


  private wrapToHourlyData(energyData: MomentValue[]): MomentValue[] {
    const updatedValueHourly = energyData.reduce((acc: any, curr: any) => {
      const date = curr.time;
      const findElement = acc.find((item) => {
        return (
          item.time.hour() === date.hour() &&
          item.time.date() === date.date()
        );
      });

      if (findElement) {
        findElement.value += curr.value;
      } else {
        acc.push({
          time: curr.time,
          value: curr.value,
        });
      }
      return acc;
    }, []);

    return updatedValueHourly;
  }

  private wrapToDayData(energyData: MomentValue[]): MomentValue[] {
    const updatedValueDay = energyData.reduce((acc: any, curr: any) => {
      const date = curr.time;
      const findElement = acc.find((item) => {
        return (
          item.time.date() === date.date()
        );
      });

      if (findElement) {
        findElement.value += curr.value;
      } else {
        acc.push({
          time: curr.time,
          value: curr.value,
        });
      }
      return acc;
    }, []);
    return updatedValueDay;
  }

}

