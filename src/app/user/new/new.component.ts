import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../service/service';
import { DateUtils } from '../../shared/index';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {


  ngOnInit(){
    //console.log("User to Update: ",this.data);
    this.setValue();
  }

  formUser:FormGroup = this.createForm();
  formCar:FormGroup = this.createCarForm();

  carList: any[] = [];
  maxDate: Date = new Date();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private formBuilder: FormBuilder, private userService:UserService) {
    
   }

  
  async setValue(){
    await this.data; 
    console.log("data.cars = ",this.data.cars);       
    if(this.data){
      this.carList = this.data.cars
      this.formUser.setValue({
        firstName: this.data.firstName, 
        lastName: this.data.lastName,
        email: this.data.email,
        birthday: DateUtils.convertStringToDate(this.data.birthdayString),
        login: this.data.login,
        password: this.data.password,
        phone: this.data.phone
      });
    }
   
  }
  createForm(){
    return  this.formBuilder.group({
      firstName:['', [Validators.required, Validators.minLength(3)]],      
      lastName:['', [Validators.required , Validators.minLength(3)]],
      email:['', [Validators.required, Validators.email]],
      birthday:['', [Validators.required]],
      login:['', [Validators.required]],
      password:['', [Validators.required]],
      phone:['', [Validators.required]]
    });
  }

  createCarForm(){
    return this.formBuilder.group({
      year:['', [Validators.required, Validators.minLength(4),Validators.maxLength(4)]],
      licensePlate: ['', Validators.required],
      model: ['', Validators.required],
      color: ['', Validators.required]
    });
  }

  addCar(){
    if(this.formCar.valid){
      
      let car:any = {
        year:this.formCar.value.year,
        licensePlate: this.formCar.value.licensePlate,
        model: this.formCar.value.model,
        color: this.formCar.value.color
      }      
      if(this.data){
        car['user'] = {key: this.data.key}
      }
      this.checkLincensePlate(this.carList, car);
      
      
    }
    
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
removeCarToList(car: any){
  const index = this.carList.indexOf(car);
  if(index >= 0){
    this.carList.splice(index, 1);
  }
}

updateUser(){
  if(this.carList.length == 0){
    alert("User can't be saved without a car.");
    return;
  } 
  this.showInvalidFields();

  let user:any = {
    key: this.data.key,
    firstName: this.formUser.value.firstName,
    lastName: this.formUser.value.lastName,
    email: this.formUser.value.email,
    birthdayString: DateUtils.convertDateToString(this.formUser.value.birthday),
    login: this.formUser.value.login,
    password: this.formUser.value.password,
    phone: this.formUser.value.phone,
    cars: this.carList
  }

    this.userService.updateUser(user).subscribe({
      next: (response)=>{  
               
        alert("Success: User Updated Successfully! ");
        window.location.reload();          
      },
      error: (error) =>{
        
        alert("Error: "+error.error.message);
      }
    });
}

showInvalidFields(){
  let invalidFields = this.findInvalidControls(this.formUser);
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

saveUser(){   
    if(this.carList.length == 0){
      alert("User can't be saved without a car.");
      return;
    }
    this.showInvalidFields(); 
    
    let user:any = {
      firstName: this.formUser.value.firstName,
      lastName: this.formUser.value.lastName,
      email: this.formUser.value.email,
      birthdayString: DateUtils.convertDateToString(this.formUser.value.birthday),
      login: this.formUser.value.login,
      password: this.formUser.value.password,
      phone: this.formUser.value.phone,
      cars: this.carList
    }

      this.userService.saveUser(user).subscribe({
        next: (response)=>{  
                 
          alert("Success: User Saved Successfully! ");
          window.location.reload();          
        },
        error: (error) =>{
          
          alert("Error: "+error.error.message);
        }
      });
}
saveOrUpdate(){
  if(this.data){
    this.updateUser();
  }else{
    this.saveUser();
  }
}
  checkLincensePlate(carList: any[], car:any){
    
      for(let item of carList){
        if(car.licensePlate == item.licensePlate){
          alert("Lisence Plate "+car.licensePlate+" exists!");
          return
        }
      }
      this.carList.push(car);
    
  }
}
