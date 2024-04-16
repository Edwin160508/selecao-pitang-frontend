import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../service/service';
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent {

  formUser:FormGroup = this.createForm();
  formCar:FormGroup = this.createCarForm();

  carList: any[] = [];

  constructor(private formBuilder: FormBuilder, private userService:UserService) { }

  createForm(){
    return  this.formBuilder.group({
      firstName:['', [Validators.required, Validators.minLength(3)]],      
      lastName:['', Validators.required , Validators.minLength(3)],
      email:['', Validators.required, Validators.email],
      birthday:['', Validators.required],
      login:['', Validators.required],
      password:['', Validators.required],
      phone:['', Validators.required]
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
      
      this.checkLincensePlate(this.carList, car);
      
    }
    
  }

  saveUser(){
    if(this.formUser.valid){
      let user:any = {
        firstName: this.formUser.value.firstName,
        lastName: this.formUser.value.lastName,
        email: this.formUser.value.email,
        birthday: this.formUser.value.birthday,
        login: this.formUser.value.login,
        password: this.formUser.value.password,
        phone: this.formUser.value.phone,
        cars: this.carList
      }
      
      if(user.cars.length == 0){
        alert("User can't be saved without a car.");
        return;
      }

      this.userService.saveUser(user).subscribe({
        next: (response)=>{
          console.log('Resposta recebida ',response);
        },
        error: (error) =>{
          console.log('Error: ', error);
        }
      });

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
