import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from './service/service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent   implements OnInit {

  formLogin:FormGroup = this.createForm();
  userLogged:any;
  authenticated:Boolean = false;

  ngOnInit(): void {
    this.authenticated = this.authService.isAuthenticated();
    console.log("authenticated = ", this.authenticated);
  }
  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService ) { }

  createForm(){
    return  this.formBuilder.group({
      login:['', [Validators.required, Validators.minLength(3)]],      
      password:['', Validators.required]
    });
  }

  submitForm(){        
    this.showInvalidFields();
    
    this.authService.login(this.formLogin.value.login, this.formLogin.value.password).subscribe({
      next: (response)=>{         
        this.userLogged = response;
        console.log("response login=> ",response);
        this.authService.setToken(response.accessToken);  
        this.authService.setKeyUser(response.keyUser);
        this.authService.setUserNameLogged(response.login);
        this.authenticated = this.authService.isAuthenticated();
      },
      error: (error) =>{  
        console.log("Erro ao logar",error);      
        alert("Error: "+error.error.message);
      }
    });            
  }

  public findInvalidControls(form:FormGroup):any[] {
    const invalid = [];
    const controls = form.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
    
    return invalid;
  }

  showInvalidFields(){
    let invalidFields = this.findInvalidControls(this.formLogin);
    let fields = ""
    if(invalidFields.length != 0 ){
      for(let item of invalidFields){
        fields += item+", "
      }
      fields = fields.slice(0, -1);
      alert("Invalid fields: "+fields.slice(0, -1)+".");
      return
    }
  }

  logout(){
    this.authService.logout();
    this.authenticated = this.authService.isAuthenticated()
  }
}
