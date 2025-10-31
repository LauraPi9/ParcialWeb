import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment.development';
import { Car } from './car';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private apiUrl = `${environment.baseUrl}/202212_MISW4104_Grupo1.json`;
  constructor(private httpclient: HttpClient) {}

  getCars(): Observable<Car[]> {
    return this.httpclient.get<Car[]>(this.apiUrl);
  }
}
