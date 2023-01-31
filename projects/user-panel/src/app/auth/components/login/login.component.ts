import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  typeSelected: string;
  loginForm !:FormGroup;

  constructor(
     private fb:FormBuilder 
    ,private AuthService:AuthService 
    ,private toasterService:ToastrService
    ,private _Router:Router
    ) {
      this.typeSelected = 'ball-fussion'; 
    }

 

  ngOnInit(): void {
    this.createForm()
  }
  createForm(){
    this.loginForm =this.fb.group({
      email:['' , [Validators.required , Validators.email]],
      password:['' , [Validators.required]],
      role:['admin']
    })
  }

  login(){
    this.AuthService.login(this.loginForm.value).subscribe({
      next:(res)=>{
        localStorage.setItem('token',res.token)
        this.toasterService.success("Success","Success Login")
        this._Router.navigate(['./tasks'])
        console.log(res);
      },
      error:(err)=>{
        // this.toasterService.error("Faild","Faild Login")
        
      }
    })
    console.log(this.loginForm.value);
    
  }

}
