import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin-panel/src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _HttpClient:HttpClient) {

  }
  login(loginData:any):Observable<any>{
   return this._HttpClient.post(environment.baseApi.replace('tasks','auth') + '/login',loginData)
  }
  createUser(model:any) {
    return this._HttpClient.post(environment.baseApi.replace('/tasks' , '/auth') + '/createAccount' , model)
  }
}
