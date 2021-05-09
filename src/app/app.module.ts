import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { JsonService } from './json.service';
import { DaterangepickerComponent } from './daterangepicker/daterangepicker.component';

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    HttpClientModule,

  ],
  declarations: [ AppComponent, HelloComponent, DaterangepickerComponent],
  providers: [
    JsonService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
