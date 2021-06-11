import {Component, OnDestroy, OnInit} from '@angular/core';
import {MomentValue} from '../MomentValue';
import {DataBusService} from '../data-bus.service';
import * as Highcharts from 'highcharts';


@Component({
  selector: 'app-highcharts',
  templateUrl: './highcharts.component.html',
  styleUrls: ['./highcharts.component.css']
})
export class HighchartsComponent implements OnInit, OnDestroy {
  public energyHourlyData: MomentValue[];
  chartOptions: any;
  highcharts = Highcharts;
  private readonly MIN_RANGE = 15 * 2300 * 36000;
  private alive = true;

  constructor(private readonly dataBusService: DataBusService) {
  }

  ngOnInit(): void {
    this.dataBusService.count$.subscribe((data) => {
      this.energyHourlyData = data;
      const energyHourlyValue = this.energyHourlyData.map((item) => [+item.time, item.value]);
      this.chartOptions = this.getChartOptions(energyHourlyValue);
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }



  getChartOptions(energyHourlyValue): any {
    return  {
      series: [{
        name: 'energy days',
        pointInterval: 24 * 3600 * 1000,
        data: energyHourlyValue,
      }],
      chart: {
        panning: true,
        panKey: 'shift',
        type: 'column',
        zoomType: 'x'
      },
      title: {
        text: 'Energy by day',
      },
      credits: {
        enabled: false, // remove logo
      },

      plotOptions: {
        series: {
          dataLabels: {
            enabled: true
          }
        }
      },

      xAxis: {
        type: 'datetime',
        minRange: this.MIN_RANGE,
      }
    };
  }
}
