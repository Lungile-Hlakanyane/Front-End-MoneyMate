import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IncomeDTO } from 'src/app/models/Income';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  private baseUrl = 'http://localhost:8080/api/incomes'; 

  constructor(private http: HttpClient) {}

  createIncome(income: IncomeDTO): Observable<IncomeDTO> {
    return this.http.post<IncomeDTO>(this.baseUrl, income);
  }

  getIncomeByUserId(userId: number): Observable<IncomeDTO> {
    return this.http.get<IncomeDTO>(`${this.baseUrl}/user/${userId}`);
  }
}
