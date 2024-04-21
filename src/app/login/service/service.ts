import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(login: string, password: string): Observable<any> {
    const body = { login, password };
    return this.http.post(environment.API_URL+"/signin", body);
  }

  
  setKeyUser(keyUser:string){
    localStorage.setItem('keyUser',keyUser);
  }

  getKeyUser(){
    return localStorage.getItem('keyUser');
  }

  setUserNameLogged(userName:string){
    localStorage.setItem("userName",userName);
  }

  getUserNameLogged(){
    return localStorage.getItem("userName");
  }

  // Método para armazenar o token de autenticação
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Método para obter o token de autenticação
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Método para fazer logout
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('keyUser');
  }

  // Método para verificar se o usuário está autenticado
  isAuthenticated(): boolean {
    const token = this.getToken();
    // Verifique se o token existe e não está expirado, etc.
    return !!token;
  }

  // Método para adicionar token ao cabeçalho da requisição
  addTokenToHeader(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}
