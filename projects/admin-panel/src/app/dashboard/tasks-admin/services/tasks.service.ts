import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  getAllTasks(filter:any):Observable<any>{
    // passing at header  token 
    // return this.http.get('https://taskcrud.onrender.com/tasks/all-tasks',{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
    // passing at query 
    let params = new HttpParams();
    // if (filter.keyword) {
    //   params= params.append('keyword',filter.keyword)
    // }
    Object.entries(filter).forEach(([key,value]:any)=>{
      if (value) {
        params = params.append(key,value)
      }
    })
    return this.http.get(environment.baseApi + '/all-tasks', {params})
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
