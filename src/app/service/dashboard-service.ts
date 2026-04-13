import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Expense } from '../model/expense'; 
import { Category } from '../model/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  headers : any;
  private baseUrl = 'https://localhost:44357/api/FilterExpences';
  private categoryUrl = 'https://localhost:44357/api/Category';
  private ExpenseUrl ='https://localhost:44357/api/Expense'
  constructor(private http: HttpClient) {}
  getTotal(){
    return this.http.get(`${this.baseUrl}/GetTotalExpenses`);
  }

  //An Observable is a mechanism in RxJS used to handle asynchronous data streams, like HTTP requests, user input, etc.
  // Observables are lazy, which means they won’t start emitting data until you subscribe to them.
  getCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.categoryUrl}/GetCategory`);
  }

  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.ExpenseUrl}/GetExpenses`);
  }

  createExpenses(expenseData: { expenseCategoryId: number; amount: number; description: string }) {
    return this.http.post(`${this.ExpenseUrl}/CreateExpences`, expenseData);
  }
  
// HttpParams is used to construct query parameters.
// The second argument to http.get should be an object with a params property.
// CategoryId.toString() ensures the value is passed as a string, which is required by HttpParams.
  GetTotalCategoryWise(CategoryId : number){
    const params = new HttpParams().set('CategoryId', CategoryId.toString());
    return this.http.get(`${this.baseUrl}/GetTotalCategoryWise`,{ params});
  }

  EditExpenses(expenseData: { expenseCategoryId: number; amount: number; description: string }) {
    return this.http.put(`${this.ExpenseUrl}/CreateExpences`, expenseData);
  }
 
  GetExpensesById(ExpenseId : number){
    const params = new HttpParams().set('ExpenseId', ExpenseId.toString());
    return this.http.get(`${this.ExpenseUrl}/GetExpensesById`,{params});
  }
}
