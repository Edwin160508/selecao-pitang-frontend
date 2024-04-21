import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NewCarComponent } from './new-car/new-car.component';
import { AuthService } from 'src/app/login/service/service';
import { CarService } from './service/service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit{

  carList:any[] = [];

  

  ngOnInit(){
    this.populateCars();
  }

  

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private authService:AuthService, private carService:CarService) {
    
  }

  populateCars(){
    this.carService.findAllCars(Number(this.authService.getKeyUser())).subscribe({
      next: (response)=>{
        this.carList = response;
        this.setUserIdAllCars(this.carList);
      },
      error:(error)=>{
        console.log(error);
      }
    });
  }

  newCar(){
    const dialogUserRef = this.dialog.open(NewCarComponent, {
      height:'auto',
      width: '500px',
      autoFocus: false,
      
    });
  }

  editCar(car:any){
    const dialogUserRef = this.dialog.open(NewCarComponent, {
      height:'auto',
      width: '500px',
      autoFocus: false,
      data: car
      
    });
  }

  removeCar(car:any){

  }

  setUserIdCar(car:any){        
    car['user'] = {key: Number(this.authService.getKeyUser())}    
  }

  setUserIdAllCars(list:any[]){
    for(let car of list){
      this.setUserIdCar(car);
    }
  }
}
