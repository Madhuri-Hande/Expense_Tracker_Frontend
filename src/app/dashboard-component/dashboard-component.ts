import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../service/dashboard-service';
import { Expense } from '../model/expense';
import { Category } from '../model/category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-component',
  standalone: false,
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css'
})
export class DashboardComponent implements OnInit {
 username: string = ''; 
 expenses: any[] = [];
 category: any[] = [];
 totalExpenses : number = 0; 
 filteredExpenses: any[] = [];
 selectedCategory: string = '';
 filterCategoryId :number = 0;


constructor(private route: ActivatedRoute, private dashboardService : DashboardService, private router : Router) {}

ngOnInit() {
  this.username = this.route.snapshot.queryParamMap.get('username') || 'Guest';
  console.log('Username:', this.username);

  //When you subscribe, you provide functions that will be executed when the Observable emits a value
  this.dashboardService.getTotal().subscribe({
      next: (total: any) => {
        this.totalExpenses = total.totalExpenses;
      },
      error: (err) => {
        console.error('Error fetching total expenses:', err);
      }
    });

  this.dashboardService.getCategory().subscribe({
      next: (categoryData: Category[]) =>{
        this.category = categoryData;
      }
    });

  this.dashboardService.getExpenses().subscribe({
      next: (expensedata: Expense[]) => {
        this.expenses = expensedata.map(expense => {
          const matchCategory =  this.category.find(
            cat => cat.expenseCategoryId === expense.expenseCategoryId
          );
          return {
            ...expense,
            category: matchCategory ? matchCategory.expenseType : 'Unknown'
          };
        });
        this.filteredExpenses = [...this.expenses]; 
      },
      error: (err) => {
        console.error('Error fetching expenses:', err);
      }
    });
 }
 
 
filterExpenses() {
    if (this.selectedCategory) {
      this.filteredExpenses = this.expenses.filter(exp => exp.category === this.selectedCategory);

      if (this.filteredExpenses.length > 0) {
        this.filterCategoryId = this.filteredExpenses[0].expenseCategoryId;
        console.log('CategoryId:', this.filterCategoryId);
        
        // Call category-wise total API
        this.dashboardService.GetTotalCategoryWise(this.filterCategoryId).subscribe({
          next: (totalExpense: any) => {
            this.totalExpenses = totalExpense.total;
            console.log('totalExpense' ,this.totalExpenses)
          },
          error: (err) => {
            console.error('Error fetching category-wise total expenses:', err);
          }
        });

        } else {
          this.filterCategoryId = 0;
          console.warn('No expenses found for selected category');
        }

    } else {
      this.filteredExpenses = [...this.expenses];
      this.dashboardService.getTotal().subscribe({
      next: (total: any) => {
        this.totalExpenses = total.totalExpenses;
      },
      error: (err) => {
        console.error('Error fetching total expenses:', err);
      }
    });
    } 
  }
  onClickEdit(){
     this.router.navigate(['/edit-expense']); 
  }

  onClickDelete(){
    return null;
  }

  getInitial(): string {
    return this.username ? this.username.charAt(0).toUpperCase() : '';
  }

  onClickExpense() {
  this.router.navigate(['/create-expense']); 
  }
}
