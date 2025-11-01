import { Component, OnInit } from '@angular/core';

import { Car } from '../car';
import { CarService } from '../car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css'],
})
export class CarListComponent implements OnInit {
  cars: Array<Car> = [];
  brandCounts: Record<string, number> = {};
  brandCountsArray: Array<{ brand: string; count: number }> = [];
  constructor(private carService: CarService) {}

  getCars() {
    this.carService.getCars().subscribe((cars) => {
      this.cars = cars;
      this.computeBrandCounts();
    });
  }

  ngOnInit(): void {
    this.getCars();
  }

  private computeBrandCounts() {
    this.brandCounts = {};
    for (const car of this.cars) {
      const carBrand = (car.marca || '').toString();
      if (!carBrand) {
        continue;
      }

      this.brandCounts[carBrand] = (this.brandCounts[carBrand] || 0) + 1;
    }

    console.log({brandCounts: this.brandCounts});
    console.log({brandCounts:  Object.keys(this.brandCounts)});

    this.brandCountsArray = Object.keys(this.brandCounts).map(
      (currentBrand) => ({
        brand: currentBrand,
        count: this.brandCounts[currentBrand],
      })
    );
  }

  
}
