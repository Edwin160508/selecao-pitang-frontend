import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Login } from './model/model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  /*imports: [
    FormsModule,
    ReactiveFormsModule,        
    MatFormFieldModule,
    MatInputModule        
  ]*/
})
export class LoginComponent {

  formLogin:FormGroup = this.createForm();

  constructor(private formBuilder: FormBuilder) { }

  createForm(){
    return  this.formBuilder.group({
      login:['', [Validators.required, Validators.minLength(3)]],      
      password:['', Validators.required]
    });
  }

  submitForm(){
    console.log(this.formLogin);
    let user: Login = new Login();
    if(this.formLogin.valid){
      user.login = this.formLogin.value.login;      
      user.password = this.formLogin.value.password;
    }
    console.log(user);
  }
}
