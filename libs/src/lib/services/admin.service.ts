// libs/src/lib/services/admin.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { User } from '../models/user-admin.model';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private http = inject(HttpClient);

  // Idealmente mover a environments; por ahora lo dejamos directo
  private readonly apiUrl = 'http://192.168.2.43:8081/api/v1/users/All';

  /** Obtiene todos los usuarios y los mapea a la interfaz usada por el dashboard */
  getAllUsers(): Observable<User[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((resp) => {
        // Si tu API devuelve un array directo: resp es []
        // Si tu API devuelve { data: [] }: usar resp.data
        const arr = Array.isArray(resp) ? resp : resp?.data ?? [];

        // Mapeo flexible por si los nombres varían
        return arr.map((u: any) => this.mapToUser(u));
      }),
      catchError((err) => {
        console.error('[AdminService] Error al obtener usuarios', err);
        return throwError(() => err);
      })
    );
  }

  /** Normaliza campos del backend a los que usa tu UI */
  private mapToUser(u: any): User {
  return {
    cedula: u.cedula ?? u.documentNumber ?? u.document ?? String(u.id ?? ''),
    nombre: u.nombre ?? u.name ?? u.username ?? '',   // <-- usa username si no hay nombre
    correo: u.correo ?? u.email ?? '',
    rol: (u.rol ?? u.role ?? (u.roles?.length ? u.roles.join(', ') : 'Usuarios')), // <-- maneja array de roles
    cargo: u.cargo ?? u.position?.name ?? '',         // <-- aquí el fix para evitar [object Object]
    activo: (u.activo ?? u.active ?? true) as boolean
  };
}


}
