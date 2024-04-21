import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarService } from '../service/service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/login/service/service';

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.component.html',
  styleUrls: ['./new-car.component.css']
})
export class NewCarComponent implements OnInit {

  ngOnInit(){
    
    this.setValue();
  }

  formCar: FormGroup = this.createForm();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private formBuilder: FormBuilder, private carService:CarService,
  private authService:AuthService){}

  createForm(){
    return this.formBuilder.group({
      year:['', [Validators.required, Validators.minLength(4),Validators.maxLength(4)]],
      licensePlate: ['', Validators.required],
      model: ['', Validators.required],
      color: ['', Validators.required]
    });
  }

  async setValue(){
    await this.data;
    //console.log("data new car= ", this.data);
    if(this.data){
      this.formCar.setValue({
        year: this.data.year, 
        licensePlate: this.data.licensePlate,
        model: this.data.model,
        color: this.data.color
      });
    }
  }

  saveOrUpdate(){
    if(this.data){
      this.updateCar();
    }else{
      this.saveCar();
    }
  }

  updateCar(){
    this.showInvalidFields();
    console.log("updateCar this.data ",this.data);
    let car:any = {
      key: this.data.key,
      year: this.formCar.value.year,
      licensePlate: this.formCar.value.licensePlate,
      model: this.formCar.value.model,
      color: this.formCar.value.color,
      user: {key: this.data.user.key} 
    }

    this.carService.updateCar(car).subscribe({
      next:(response)=>{
        alert("Success: Car Saved Successfully! ");
        window.location.reload();  
        
      },
      error:(error)=>{
        console.log("Error to updateCar ",error);
      }
    });
  }

  saveCar(){
    this.showInvalidFields();
    let userKey = this.authService.getKeyUser();
    
    let car:any = {
      year: this.formCar.value.year,
      licensePlate: this.formCar.value.licensePlate,
      model: this.formCar.value.model,
      color: this.formCar.value.color,
      user: {key: Number(userKey)} 
    }

    this.carService.saveCar(car).subscribe({
      next:(response)=>{
        alert("Success: Car Saved Successfully! ");
        window.location.reload();  
        
      },
      error:(error)=>{
        console.log("Error to updateCar ",error);
      }
    });

  }

  showInvalidFields(){
    let invalidFields = this.findInvalidControls(this.formCar);
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

}
