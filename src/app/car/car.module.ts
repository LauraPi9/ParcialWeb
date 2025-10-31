import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import { CarListComponent } from './car-list/car-list.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [CarListComponent],
  declarations: [CarListComponent]
})
export class CarModule { }
