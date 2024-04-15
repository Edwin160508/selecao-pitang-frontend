import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {

    

  constructor(private http: HttpClient) { }

  // Método para fazer uma solicitação GET para a API
  findAllUsers(): Observable<any> {
    return this.http.get(environment.API_URL+"/users");
  }
}