import { Component, Input,OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as Exporting from 'highcharts/modules/exporting';
import {MomentValue} from '../MomentValue';
import {Observable} from 'rxjs';
import {map, timeout} from 'rxjs/operators';
import {DataBusService} from '../data-bus.service';


@Component({
  selector: 'app-highcharts',
  templateUrl: './highcharts.component.html',
  styleUrls: ['./highcharts.component.css']
})
export class HighchartsComponent implements OnInit {

  public energyHourlyData: MomentValue[];
  public energyHourlyValue: number[];
  public startDay;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: any;


  getChart() {
    this.chartOptions = {
      series: [{
        name: 'energy',
        pointInterval: 24 * 3600 * 1000,
        pointStart: this.startDay,
        data: this.energyHourlyValue,
      },],
      chart: {
        type: 'column',
        zoomType: 'x'
      },
      title: {
        text: 'Energy by day',
      },
      credits: {
        enabled: false, // remove logo
      },

        plotOptions: {series: {dataLabels: {
          enabled: true
            }}},

      xAxis: {
         type: 'datetime',
         minRange: 15 * 2300 * 36000,
      },
    }
  }

  constructor(private readonly dataBusService: DataBusService) { }

  ngOnInit(): void {
    this.dataBusService.count$.subscribe((data) => { this.energyHourlyData = data;
                                                     this.energyHourlyValue = this.energyHourlyData.map(item => item.value);
                                                     this.startDay = this.energyHourlyData[0].time;
                                                     this.getChart();
                                                         })
}
}
