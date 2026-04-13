import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { LoginComponent } from './auth/login-component/login-component';
import { DashboardComponent } from './dashboard-component/dashboard-component';
import { RegisterComponent } from './register-component/register-component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './service/auth-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CreateExpenseComponent } from './create-expense-component/create-expense-component';
import { EditExpenseComponent } from './edit-expense-component/edit-expense-component';

@NgModule({
  declarations: [
    App,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    CreateExpenseComponent,
    EditExpenseComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [App]
})
export class AppModule { }
