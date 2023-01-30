import { Component, OnInit ,ViewChild,ElementRef} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
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
  users:any = [
    {
      name:"Ahmed",
      id:"63d36463a5a313fca07f9997"
    }, {
      name:"Sayed",
      id:"63d3648ca5a313fca07f999a"
    },
  ]

  status:any = [
    {name:"Complete",id:1 },
    {name:"In-Progress" ,id:2},
  ]
  page:any = 1
  filteration:any = {
    page:this.page,
    limit:10
  }
  timeOutId:any
  total:any
  @ViewChild('start') start!: ElementRef;
  @ViewChild('end') end!: ElementRef;

  constructor(private _TasksService:TasksService ,public dialog: MatDialog ,private toaster:ToastrService) {
    
   }

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks(){
    this._TasksService.getAllTasks(this.filteration).subscribe({
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
  selectStatus(e:any){
    console.log(e.value);
    this.filteration.status=e.value ;
    this.getAllTasks()
  }
  selectUser(e:any){
    this.filteration['userId']=e.value
    this.getAllTasks()  
  }
  
  range = new FormGroup({
    start: new FormControl(null),
    end: new FormControl(null),
  });

  resetDateRange(){
    this.range.reset();
    this.filteration.fromDate=null
    this.filteration.toDate=null
    this.getAllTasks() 
  }

  selectData(e:any,type:any){
    this.filteration[type]= moment(e.value).format('DD-MM-YYYY') ;
   (type==='toDate' && this.filteration.toDate !=='Invalid date')? this.getAllTasks() : ''
  }
  search(e:any){
    this.filteration.keyword= e.value ;
    clearTimeout( this.timeOutId)
    this.timeOutId=setTimeout(() => {
      this.getAllTasks()
    }, 1000);    

  }
}



