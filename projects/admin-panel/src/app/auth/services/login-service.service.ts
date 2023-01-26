import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../context/DTOs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private _HttpClient:HttpClient) {

   }
   login(loginData:Login):Observable<any>{
    return this._HttpClient.post('https://taskcrud.onrender.com/auth/login',loginData)
   }
}

