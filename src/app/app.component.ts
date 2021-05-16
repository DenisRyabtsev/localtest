import { Component,  OnInit} from '@angular/core';
import {MomentValue} from './MomentValue';
import {JsonService} from './json.service';
import * as moment from 'moment';
import {JsonData} from './JsonData';
import {RangeValues} from './datepicker/datepicker.component';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private jsonService: JsonService) {
  };

  private updatedAr: MomentValue[];
  private energyData: MomentValue[];
  private updatedValueHourly: MomentValue[];
  private updatedValueDay: MomentValue[];
  meterData: JsonData;
  avgHourly: number;
  sotrEnergyHourly;
  sotrEnergyDaily;
  public daterange: RangeValues = {};


  ngOnInit(): void {
    this.jsonService.getData().subscribe(jsondata => {
      if (jsondata.length > 0) {
        this.meterData = jsondata[0];
        this.energyData = this.parseEnergyData(this.meterData);
      }
    });
  }

  private parseEnergyData(data: JsonData): MomentValue[] {

    return data.recordValues.map(keyValuePair => new MomentValue(moment(+keyValuePair.Key), keyValuePair.Value));
  }

  getSelectedInterval(daterang: RangeValues) {
    this.daterange.start = daterang.start;
    this.daterange.end = daterang.end;
  }

  private sortValuesInterval(): MomentValue[] {
    let dataStart;
    let dataEnd;
    if (this.daterange.start && this.daterange.end) {
      dataStart = this.daterange.start,
        dataEnd = this.daterange.end;
    } else {
      dataStart = moment(+this.meterData.firstRecord),
        dataEnd = moment(+this.meterData.lastRecord);
    }
    this.updatedAr = this.energyData.filter((item) => {
      return item.time >= dataStart && item.time <= dataEnd;
    });
    return this.updatedAr;
  }

  private wrapToHourlyData(): MomentValue[] {
    this.sortValuesInterval();
    this.updatedValueHourly = this.updatedAr.reduce((acc: any, curr: any) => {
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

    return this.updatedValueHourly;
  }

  private wrapToDayData(): MomentValue[] {
    this.sortValuesInterval()
    this.updatedValueDay = this.updatedAr.reduce((acc: any, curr: any) => {
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
    return this.updatedValueDay;

  }


  getMaximumHour() {
    this.wrapToHourlyData()
    this.sotrEnergyHourly = this.updatedValueHourly.sort((a, b) => b.value - a.value);
  }

  getMinimumDay() {
    this.wrapToDayData()
    this.sotrEnergyDaily = this.updatedValueDay.sort((a, b) => a.value - b.value);
  }


  calculateAvgHourly() {
    this.wrapToHourlyData()
    let sum = 0;
    for (const point of this.updatedValueHourly) {
      sum += point.value;
    }
    this.avgHourly = sum / this.updatedValueHourly.length;
  };


}
