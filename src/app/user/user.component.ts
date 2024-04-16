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
    this.listaPosts();
  }

  constructor(private userService:UserService, public dialog: MatDialog) { }

  newUser(){
    const dialogRef = this.dialog.open(NewComponent, {
      height:'100%',
      width: '500px',
      autoFocus: false
    });
  }

  listaPosts(){
    this.userService.findAllUsers()
    .subscribe({
      next: (response)=>{
        console.log('Resposta recebida ',response);
        this.users = response;
        console.log('Users ',this.users);
        console.log('Cars ',this.users.cars);
      },
      error: (error) =>{
        console.log('Error: ', error);
      }
    })
    /*.subscribe((response) => {
      this.users = response;
      console.log('Resposta recebida ',response);
      console.log('Variavel preenchida ',this.users);
    },(error: any) =>{
      
      console.log('Erro: ', error);
    });*/
  }
}
