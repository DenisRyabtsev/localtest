import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { JsonService } from './json.service';
import { Daterangepicker } from 'ng2-daterangepicker';
import { DatepickerComponent } from './datepicker/datepicker.component';


@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    Daterangepicker,


  ],
  declarations: [ AppComponent, HelloComponent, DatepickerComponent],
  providers: [
    JsonService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
