import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import {DataBusService} from '../data-bus.service';
import {MomentValue} from '../MomentValue';

@Component({
  selector: 'app-piecharthighcharts',
  templateUrl: './piecharthighcharts.component.html',
  styleUrls: ['./piecharthighcharts.component.css']
})
export class PiecharthighchartsComponent implements OnInit {
  public energyAvgWeek: MomentValue[];
  private energyAvgWeekValue;

  highcharts = Highcharts;
  chartOptions: any;

  getChart() {
    this.chartOptions = {
      series: [{
        name: 'energy',
        data: this.energyAvgWeekValue,
      }, ],
      chart: {
        type: 'pie',
        zoomType: 'x'
      },
      title: {
        text:
          'average electrical energy by day of the week',
      },
      credits: {
        enabled: false, // remove logo
      },
      }
    }




  constructor(private readonly dataBusService: DataBusService) { }

  ngOnInit(): void {
          this.dataBusService.AvgWeek$.subscribe((data) => { this.energyAvgWeek = data;
          this.energyAvgWeekValue = this.energyAvgWeek.map(({ time, value}) => ([time.format('YYYY/MMMM  wo'), +(value / 7).toFixed(0)]));
          this.getChart();
          })

}
}
