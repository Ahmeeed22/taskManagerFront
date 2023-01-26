import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginServiceService } from '../../services/login-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
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
    // ,private spinner: NgxSpinnerService
    ,private spinnerService: NgxSpinnerService) {
      this.typeSelected = 'ball-fussion'; 
    }

 

  ngOnInit(): void {
    this.createForm()
  }
public showSpinner(): void {
    this.spinnerService.show();

    setTimeout(() => {
      this.spinnerService.hide();
    }, 5000); // 5 seconds
  }
  createForm(){
    this.loginForm =this.fb.group({
      email:['' , [Validators.required , Validators.email]],
      password:['' , [Validators.required]],
      role:['admin']
    })
  }

  login(){
    this.spinnerService.show();
    this._LoginServiceService.login(this.loginForm.value).subscribe({
      next:(res)=>{
        this.spinnerService.hide();
        this.toasterService.success("Success","Success Login")
        this._Router.navigate(['./tasks'])
        console.log(res);
      },
      error:(err)=>{
        this.spinnerService.hide();
        this.toasterService.success("Faild","Faild Login")
        
      }
    })
    console.log(this.loginForm.value);
    
  }

}
