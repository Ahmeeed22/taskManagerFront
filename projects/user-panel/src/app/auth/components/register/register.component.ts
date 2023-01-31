import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(private fb:FormBuilder , private service:AuthService , private router:Router) { }

  registerForm!:FormGroup
  ngOnInit(): void {
    this.createForm()
  }


  createForm() {
    this.registerForm = this.fb.group({
      email:['' , [Validators.required , Validators.email]],
      password:['' , Validators.required],
      username:['' , Validators.required],
      confirmPassword:['' , Validators.required],
    } , {validators : this.checkPassword} )
  }

  createAccount() {
    console.log(this.registerForm);
    
    const MODEL:any = {
      email:this.registerForm.value['email'],
      role:'user',
      username:this.registerForm.value['username'],
      password:this.registerForm.value['password'],
    }
    this.service.createUser(MODEL).subscribe(res =>  {
      this.router.navigate(['/tasks'])
    })
  }

  checkPassword:ValidatorFn = (group:AbstractControl) : ValidationErrors | null => {
    let password = group.get('password')?.value;
    let confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : {notSame:true}
  }
}
