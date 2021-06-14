import { Component,  OnInit} from '@angular/core';
import {MomentValue} from './MomentValue';
import {JsonService} from './json.service';
import * as moment from 'moment';
import {JsonData} from './JsonData';
import {RangeValues} from './datepicker/datepicker.component';
import {fromEvent, of} from 'rxjs';
import {DataBusService} from './data-bus.service';
import {AverageValues} from './AverageValues';


@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private jsonService: JsonService,
              private dataBusService: DataBusService) {
  }
  public callNumber = 1;
  private updatedAr: MomentValue[];
  private energyData: MomentValue[];
  private updatedValueHourly: MomentValue[];
  public updatedValueDay: MomentValue[];
  public updatedValueWeek: MomentValue[];
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
        this.dataBusService.pushValueHourly(this.wrapToDayData());
        this.dataBusService.pushAvgWeek(this.calculateAvgWeek());
       }
    });
  }

  private parseEnergyData(data: JsonData): MomentValue[] {
    return data.recordValues.map(keyValuePair => new MomentValue(moment(+keyValuePair.Key), keyValuePair.Value));
  }

  getSelectedInterval(daterang: RangeValues) {
    this.daterange.start = daterang.start;
    this.daterange.end = daterang.end;
    this.dataBusService.pushValueHourly(this.wrapToDayData());
    this.dataBusService.pushAvgWeek(this.calculateAvgWeek())
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

  public wrapToHourlyData(): MomentValue[] {
    this.updatedValueHourly =  this.sortValuesInterval().reduce((acc: any, curr: any) => {
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
    this.updatedValueDay = this.sortValuesInterval().reduce((acc: any, curr: any) => {
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

  private wrapToWeekData(): AverageValues[] {

    this.updatedValueWeek = this.wrapToDayData().reduce((acc: any, curr: any) => {
      curr.day = 1;
      const date = curr.time;
      const findElement = acc.find((item) => {
        return (
          item.time.date() === date.date(),
           item.time.week() === date.week()
        );
      });

      if (findElement) {
        findElement.value += curr.value;
        findElement.day++;
      } else {
        acc.push({
          time: curr.time,
          value: curr.value,
          day: curr.day
        });

      }
      return acc;
    }, []);
    return this.updatedValueWeek;
  }

  calculateAvgWeek() {
   return  this.wrapToWeekData();
    }


  getMaximumHour() {
    this.sotrEnergyHourly = this.wrapToHourlyData().sort((a, b) => b.value - a.value);
  }

  getMinimumDay() {
    this.sotrEnergyDaily = this.wrapToDayData().sort((a, b) => a.value - b.value);
  }


  calculateAvgHourly() {
    this.wrapToHourlyData();
    let sum = 0;
    for (const point of this.updatedValueHourly) {
      sum += point.value;
    }
    this.avgHourly = sum / this.updatedValueHourly.length;
  }
  //
  // public euros = [29.76, 41, 46.5];
  //
  // public average = this.euros.reduce((total, amount) => {
  //   debugger
  //   total.push(amount * 2);
  //   return total;
  // }, []);
}
