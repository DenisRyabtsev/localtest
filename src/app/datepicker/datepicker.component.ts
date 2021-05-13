import {Component, Input, OnInit, ViewChild} from '@angular/core';
import * as moment from 'moment';
import {JsonData} from '../JsonData';
import { DaterangepickerComponent } from 'ng2-daterangepicker';


@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {

  @Input() meterData: JsonData;

  @ViewChild(DaterangepickerComponent)
  private picker: DaterangepickerComponent;


  public options: any = {
    locale: { format: 'YYYY-MM-DD HH:mm' },
    alwaysShowCalendars: false,
  };


  public selectedDateJson(value: any) {
    console.log(value);
  }

  resetDate1() {
    this.picker.datePicker.setStartDate(moment(+this.meterData.firstRecord));
    this.picker.datePicker.setEndDate(moment(+this.meterData.lastRecord));
  }

  constructor() { }

  ngOnInit(): void {


  }

}
