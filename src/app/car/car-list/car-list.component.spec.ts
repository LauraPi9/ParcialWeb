/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { faker } from '@faker-js/faker';

import { CarListComponent } from './car-list.component';
import { CarService } from '../car.service';
import { Car } from '../car';

describe('CarListComponent', () => {
  let component: CarListComponent;
  let fixture: ComponentFixture<CarListComponent>;

  
  beforeAll(() => {
    faker.seed(123);
  });

  const mockCars: Car[] = Array.from({ length: 3 }, (_, i) => {
    const id = i + 1;
    const marca = faker.vehicle.manufacturer();
    const linea = faker.vehicle.model();
    const referencia = faker.vehicle.model();
    const modelo = faker.number.int({ min: 2000, max: 2025 });
    const color = faker.color.human();
    const imagen = '';
    return new Car(id, marca, linea, referencia, modelo, color, imagen);
  });

  const mockCarService = {
    getCars: () => of(mockCars)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [CarListComponent],
      providers: [{ provide: CarService, useValue: mockCarService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate cars from service', () => {
    expect(component.cars.length).toBe(3);
  });

  it('should compute brand counts correctly', () => {
    const counts = component.brandCounts;
    const sum = Object.values(counts).reduce((a, b) => a + b, 0);
    expect(sum).toBe(3);
    expect(component.brandCountsArray.length).toBe(Object.keys(counts).length);
  });

  it('should render table rows equal to cars length (3 rows)', () => {
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(3);
  });

  it('should render brand totals under the table', () => {
    const totalEls = fixture.debugElement.queryAll(By.css('p.mb-1'));
    expect(totalEls.length).toBe(component.brandCountsArray.length);
    const texts = totalEls.map(el => el.nativeElement.textContent.trim());
    texts.forEach(t => {
      expect(t).toMatch(/^Total .+: \d+$/);
    });
  });
});
