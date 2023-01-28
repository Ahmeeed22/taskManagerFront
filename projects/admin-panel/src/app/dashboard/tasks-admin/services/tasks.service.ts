import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin-panel/src/environments/environment';
import { Observable } from 'rxjs';
import { CreateTask } from '../context/DTOs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http:HttpClient) {

  }

  getAllTasks():Observable<any>{
    // return this.http.get('https://taskcrud.onrender.com/tasks/all-tasks',{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
    return this.http.get(environment.baseApi + '/all-tasks')
  }

  createTask(data:CreateTask) {
    return this.http.post(environment.baseApi + '/add-task',data)
  }

  updateTask(id:any,data:CreateTask):Observable<any>{
    return this.http.put(environment.baseApi+'/edit-task/'+id,data)
  }

  deleteTask(id:any):Observable<any>{
    return this.http.delete(environment.baseApi+'/delete-task/'+id)
  }

}
