import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule , ReactiveFormsModule} from '@angular/forms'
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './conponents/login/login.component';
import { MaterialModule } from '../material/material.module';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RegisterationComponent } from './conponents/registeration/registeration.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterationComponent
  ],   
  imports: [
    MaterialModule,
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(), 
    SharedModule

  ],
  providers: [ ToastrService],

})
export class AuthModule { }
