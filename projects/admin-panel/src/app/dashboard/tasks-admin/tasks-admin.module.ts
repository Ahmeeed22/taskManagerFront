import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksAdminRoutingModule } from './tasks-admin-routing.module';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { DashboardRoutingModule } from '../dashboard-routing.module';
import { MaterialModule } from '../../material/material.module';


@NgModule({
  declarations: [
    ListTasksComponent,
    AddTaskComponent
  ],
  imports: [
    TasksAdminRoutingModule,
    MaterialModule,
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(), 
  ]
})
export class TasksAdminModule { 
  constructor(){
    console.log("testtttt");
    
  }
  
}
