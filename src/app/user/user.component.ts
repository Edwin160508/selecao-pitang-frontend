import { Component, OnInit } from '@angular/core';
import { UserService } from './service/service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, } from '@angular/material/dialog';
import { NewComponent } from './new/new.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: any;
  ngOnInit() {
    this.listaUsers();
  }

  constructor(private userService:UserService, public dialog: MatDialog) { }

  newUser(){
    const dialogRef = this.dialog.open(NewComponent, {
      height:'100%',
      width: '500px',
      autoFocus: false
    });
  }

  removeUser(user: any){
    console.log("User: ", user);
    this.userService.removeUser(user.id).subscribe({
      next: (response)=>{
        alert("Success: User removed Successfully! ");
        window.location.reload();
      },
      error: (error) =>{
        alert("Error: "+error.error.message);
      }
    });
    
  }

  listaUsers(){
    this.userService.findAllUsers()
    .subscribe({
      next: (response)=>{
        console.log('Resposta recebida ',response);
        this.users = response;
      },
      error: (error) =>{
        alert("Error: "+error.error.message);
      }
    })
   
  }
}
