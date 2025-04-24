import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExpenseDTO } from 'src/app/models/Expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private apiUrl = 'http://localhost:8080/api/expenses'; 

  constructor(private http:HttpClient) { }

  addExpense(expense: ExpenseDTO): Observable<ExpenseDTO> {
    return this.http.post<ExpenseDTO>(`${this.apiUrl}`, expense);
  }

  updateExpense(expense: ExpenseDTO): Observable<ExpenseDTO> {
    return this.http.put<ExpenseDTO>(`${this.apiUrl}/${expense.id}`, expense);
  }

  deleteExpense(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getAllExpenses(): Observable<ExpenseDTO[]> {
    return this.http.get<ExpenseDTO[]>(this.apiUrl);
  }

  getExpenseById(id: number): Observable<ExpenseDTO> {
    return this.http.get<ExpenseDTO>(`${this.apiUrl}/${id}`);
  }

}
