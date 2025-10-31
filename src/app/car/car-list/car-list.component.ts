import { Component, OnInit } from '@angular/core';

import { Car } from '../car';
import { CarService } from '../car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  cars: Array<Car> = [];
  constructor(private carService: CarService) { }


  getCars(){
    this.carService.getCars().subscribe((cars) => {
      this.cars = cars;
    });
  }


  ngOnInit(): void {
    this.getCars();
  }

}
