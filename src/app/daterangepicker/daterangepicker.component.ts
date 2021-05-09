import { Component,  OnInit } from '@angular/core';
import $ from 'jquery';
import 'daterangepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-daterangepicker',
  templateUrl: './daterangepicker.component.html',
  styleUrls: ['./daterangepicker.component.css']
})
export class DaterangepickerComponent implements OnInit {


  constructor() {
  }

  ngOnInit() {
    console.log('date pickr   strt');
    $('input[name="datefilter"]').daterangepicker({
      "singleDatePicker": false,
      "showWeekNumbers": false,
      "showISOWeekNumbers": false,
      "timePicker": true,
      "timePicker24Hour": true,
      "timePickerIncrement": 15,


      "maxSpan": {
        "hour": 4
      },

      "locale": {
        "format": "MM/DD/YYYY HH:mm",
        "separator": " - ",
        "applyLabel": "Apply",
        "cancelLabel": "Cancel",
        "fromLabel": "From",
        "toLabel": "To",
        "customRangeLabel": "Custom",
        "weekLabel": "W",
        "daysOfWeek": [
          "Su",
          "Mo",
          "Tu",
          "We",
          "Th",
          "Fr",
          "Sa"
        ],
        "monthNames": [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ],
        "firstDay": 1
      },
      "alwaysShowCalendars": true,
      startDate: moment().startOf('hour'),
      endDate: moment(),
      minDate: '01/01/2007',
      maxDate: '12/31/2025',
    }, function(start, end, label) {
      console.log('New date range selected: ' + start.format('YYYY-MM-DD HH:mm') + ' to ' + end.format('YYYY-MM-DD HH:mm') + ' (predefined range: ' + label + ')');
    });

  }
}
