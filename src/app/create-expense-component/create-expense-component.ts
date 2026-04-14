import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../service/dashboard-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-expense-component',
  standalone: false,
  templateUrl: './create-expense-component.html',
  styleUrl: './create-expense-component.css'
})
export class CreateExpenseComponent implements OnInit {
category: any[] = [];
expenseForm: FormGroup;

  ngOnInit(): void {
    this.getCategories();
  }

  constructor(private fb: FormBuilder, private dashboardService : DashboardService, private router : Router ) {
    this.expenseForm = this.fb.group({
      expenseCategoryId: [0, Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
      description: ['', Validators.required]
    });
  }
  
  getCategories(): void {
    this.dashboardService.getCategory().subscribe({
      next: (data) => {
        this.category = data;
      },
      error: (err) => {
        console.error('Error fetching categories', err);
      }
    });
  }

  
  onSubmit() {
    if (this.expenseForm.valid) {
      this.dashboardService.createExpenses(this.expenseForm.value).subscribe({
        next: (response) => {
          console.log('Expense submitted:', response);
          this.expenseForm.reset();
        },
        error: (error) => {
          console.error('Submission error:', error);
        }
      });
    }
  }

  goToDashboard() {
  this.router.navigate(['/dashboard']); 
 };
}