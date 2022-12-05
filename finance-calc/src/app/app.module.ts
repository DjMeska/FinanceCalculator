import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PaymentsComponent } from './Components/payments/payments.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './Core/Common/NavBar/navbar/navbar.component';
import { MaterialModule } from '../material/material.module';
import { DialogBoxComponent } from './Core/Common/DialogBox/dialog-box/dialog-box.component'
import { FormsModule } from '@angular/forms';
import { LineChartComponent } from './Components/line-chart/line-chart.component';

const appRoutes: Routes = [
  {path: 'payments', component: PaymentsComponent},
  {path: 'charts', component: LineChartComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    PaymentsComponent,
    NavbarComponent,
    DialogBoxComponent,
    LineChartComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
