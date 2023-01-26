import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {
  displayedColumns: string[] = ['position', 'title', 'user' ,'deadline','status', 'actions'];
  dataSource:any = [];
  tasksFilter!:FormGroup
  users:any = []

  status:any = [
    {name:"tasks.Complete",id:1 },
    {name:"	In-Progress" ,id:2},
  ]
  page:any = 1
  filteration:any = {
    page:this.page,
    limit:10
  }
  timeOutId:any
  total:any

  constructor(private _TasksService:TasksService ,public dialog: MatDialog) {
    
   }

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks(){
    this._TasksService.getAllTasks().subscribe({
      next:(res)=>{
        this.dataSource=res.data
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  addTask(): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width:"80%",
      data: {name: "hi"},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  updateTask(x:any){

  }
  deleteTask(x:any){

  }
}



