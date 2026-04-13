import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login-component/login-component';
import { DashboardComponent } from './dashboard-component/dashboard-component';
import { RegisterComponent } from './register-component/register-component';
import { CreateExpenseComponent } from './create-expense-component/create-expense-component';
import { EditExpenseComponent } from './edit-expense-component/edit-expense-component';


const routes: Routes = [
 { path: 'login', component: LoginComponent },
 { path: '', redirectTo: 'login', pathMatch: 'full' },
 { path: 'dashboard', component: DashboardComponent },
 { path: 'register', component: RegisterComponent },
 { path: 'create-expense', component : CreateExpenseComponent},
 { path: 'edit-expense', component :EditExpenseComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
