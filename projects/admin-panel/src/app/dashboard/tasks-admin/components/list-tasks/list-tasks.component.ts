import { Component, OnInit ,ViewChild,ElementRef} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
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
    {name:this.translate.instant("tasks.Complete"),id:1 },
    {name:this.translate.currentLang=='en'?"In-Progress":'جاري التنفيذ' ,id:2},
  ]
// pagination setup
  length = 50;
  pageSize = 3;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  pageEvent !: PageEvent;
  filteration:any = {
    page:this.pageIndex+1,
    limit: this.pageSize
  }
  timeOutId:any

  constructor(private _TasksService:TasksService ,public dialog: MatDialog ,private toaster:ToastrService,private translate:TranslateService) {}

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks(){
    this._TasksService.getAllTasks(this.filteration).subscribe({
      next:(res)=>{
        console.log(res);
        this.length=res.totalItems
        this.dataSource=res.tasks
        console.log(this.dataSource);
        this.toaster.success("success")
        
      },
      error:(err)=>{
        // console.log(err);
        // this.toaster.error('errrrrror')
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
        // this.toaster.error("Task Deleted faild" , "Faild")
      }
    })

  }
  selectStatus(e:any){
    console.log(e.value);
    this.resetPagination()
    this.filteration.status=e.value ;
    this.getAllTasks()
  }
  selectUser(e:any){
    this.resetPagination()
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
    this.resetPagination()
    this.getAllTasks() 
  }

  selectData(e:any,type:any){
    this.resetPagination()
    this.filteration[type]= moment(e.value).format('DD-MM-YYYY') ;
   (type==='toDate' && this.filteration.toDate !=='Invalid date')? this.getAllTasks() : ''
  }
  search(e:any){
    this.resetPagination()
    this.filteration.keyword= e.value ;
    clearTimeout( this.timeOutId)
    this.timeOutId=setTimeout(() => {
      this.getAllTasks()
    }, 600);    

  }

  resetPagination(){
    this.filteration.page=1 ;
    this.pageSize = 3;
    this.pageIndex =0;
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.filteration.page=e.pageIndex+1 ;
    this.filteration.limit=e.pageSize ;
    this.getAllTasks()
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

}



