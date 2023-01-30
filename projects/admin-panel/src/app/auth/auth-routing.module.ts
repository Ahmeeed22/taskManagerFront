import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './conponents/login/login.component';
import { RegisterationComponent } from './conponents/registeration/registeration.component';

const routes: Routes = [
  { path:'', 
    component:LoginComponent
  },
  {
    path :'registeration',
    component : RegisterationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
