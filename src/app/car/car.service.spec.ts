import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { faker } from '@faker-js/faker';

import { CarService } from './car.service';
import { environment } from '../../environments/environment.development';
import { Car } from './car';

describe('CarService', () => {
  let service: CarService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CarService]
    });

    service = TestBed.inject(CarService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should request cars JSON from the expected URL', () => {
    faker.seed(456);
    const mockCar = new Car(
      1,
      faker.vehicle.manufacturer(),
      faker.vehicle.model(),
      faker.vehicle.model(),
      faker.number.int({ min: 2000, max: 2025 }),
      faker.color.human(),
      ''
    );

    const mockResponse: Car[] = [mockCar];

    service.getCars().subscribe(res => {
      expect(res.length).toBe(1);
      expect(res[0].marca).toBe(mockCar.marca);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/202212_MISW4104_Grupo1.json`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});

