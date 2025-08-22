import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = localStorage.getItem('token');
    if (token && !this.isTokenExpired(token)) {
      const payload = this.getPayload(token);
      let userRole = payload?.rol;
      // Si el rol no está en el token, lo leemos de localStorage
      if (!userRole) {
        userRole = localStorage.getItem('rol');
      }
      const allowedRoles = route.data['roles'] as string[] | undefined;
      if (allowedRoles && !allowedRoles.includes(userRole)) {
        // Redirige según el rol
        if (userRole === 'Super_Administrador') {
          this.router.navigate(['/app/super-admin']);
        } else if (userRole === 'Administrador') {
          this.router.navigate(['/app/admin']);
        } else {
          this.router.navigate(['/app/home']);
        }
        return false;
      }
      return true;
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('rol');
      this.router.navigate(['/login']);
      return false;
    }
  }

  private getPayload(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  }
  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp;
      if (!exp) return true;
      const now = Math.floor(Date.now() / 1000);
      return exp < now;
    } catch {
      return true;
    }
  }
}