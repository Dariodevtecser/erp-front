import { Injectable } from '@angular/core';
import { environment } from '../enviroments/enviroment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}/api/v1/auth/login`;

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<any>{
    return this.http.post<any>(this.baseUrl, credentials);
  }

  guardarToken(token: string, rol: number): void{
    sessionStorage.setItem('authToken', token);
    sessionStorage.setItem('userRol', rol.toString());
  }

  obtenerToken(): string | null{
    return sessionStorage.getItem('authToken');
  }

  obtenerRol(): number | null{
    const rol = sessionStorage.getItem('userRol');
    return rol ? + rol: null;
  }

  obtenerCedula(): string | null{
    return sessionStorage.getItem('cedula');
  }

  esSuperAdmin(): boolean{
    return this.obtenerRol() === 1;
  }

  esAdmin(): boolean{
    return this.obtenerRol() === 2;
  }

  esUsuario(): boolean{
    return this.obtenerRol() === 3;
  }

  eliminarToken(): void{
    sessionStorage.removeItem('authToken');
  }

  estaLogueado(): boolean{
    return !!this.obtenerToken();
  }
}
