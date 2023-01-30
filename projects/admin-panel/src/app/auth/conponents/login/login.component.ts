import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginServiceService } from '../../services/login-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
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
    ,private _LoginServiceService:LoginServiceService 
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
    this._LoginServiceService.login(this.loginForm.value).subscribe({
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
