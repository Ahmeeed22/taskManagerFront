import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(), 

  ],
  providers: [ ToastrService],
})
export class DashboardModule { }

// DashboardRoutingModule,