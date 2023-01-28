import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
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
    {name:"Complete",id:1 },
    {name:"	In-Progress" ,id:2},
  ]
  page:any = 1
  filteration:any = {
    page:this.page,
    limit:10
  }
  timeOutId:any
  total:any

  constructor(private _TasksService:TasksService ,public dialog: MatDialog ,private toaster:ToastrService) {
    
   }

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks(){
    this._TasksService.getAllTasks().subscribe({
      next:(res)=>{
        this.dataSource=res.tasks
        console.log(this.dataSource);
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  addTask(): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width:"80%",
      disableClose:true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getAllTasks()

    });
  }

  updateTask(e:any,ele:any){
    console.log(ele);
    
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width:"80%",
      disableClose:true,
      data:ele,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getAllTasks()

    });

  }
  deleteTask(e:any,id:any){
    this._TasksService.deleteTask(id).subscribe({
      next:()=>{
        this.toaster.success("Task Deleted Succesfully" , "Success")
        this.getAllTasks()
      },
      error : ()=>{
        this.toaster.success("Task Deleted faild" , "Faild")
      }
    })

  }
  selectData(e:any,x:any){

  }
  selectStatus(e:any){

  }
  selectUser(e:any){

  }
  search(e:any){

  }
}



