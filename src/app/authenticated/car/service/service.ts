import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/login/service/service';

@Injectable({
  providedIn: 'root'
})

export class CarService {

    

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Método para fazer uma solicitação GET para a API
  findAllCars(key:Number): Observable<any> {
    const headers = this.authService.addTokenToHeader();
    return this.http.get<any[]>(environment.API_URL+"/cars/user/"+key, { headers });
  }

  saveCar(car:any): Observable<any>{
    const headers = this.authService.addTokenToHeader();
    return this.http.post<any>(environment.API_URL+"/cars", car, { headers });
  }

  removeCar(id:Number): Observable<void>{
    const headers = this.authService.addTokenToHeader();
    return this.http.delete<void>(environment.API_URL+"/cars/"+id, { headers });
  }

  updateCar(car:any): Observable<any>{
    const headers = this.authService.addTokenToHeader();
    return this.http.put<any>(environment.API_URL+"/cars", car, { headers });
  }
}