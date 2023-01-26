import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http:HttpClient) {

  }

  getAllTasks():Observable<any>{
    // return this.http.get('https://taskcrud.onrender.com/tasks/all-tasks',{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
    return this.http.get('https://taskcrud.onrender.com/tasks/all-tasks')
  }

}
