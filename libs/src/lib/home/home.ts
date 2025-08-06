import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'lib-home',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {
  modulos = [
    { title: 'Contabilidad', icon: 'assets/Vector-4.png', route: '/contabilidad' },
    { title: 'Presupuesto', icon: 'assets/Vector-3.png', route: '/presupuesto' },
    { title: 'Tesorería', icon: 'assets/Vector-9.png', route: '/tesoreria' },
    { title: 'Nómina', icon: 'assets/Vector-6.png', route: '/nomina' },
    { title: 'Almacén', icon: 'assets/Vector-7.png', route: '/almacen' },
    { title: 'Contratos', icon: 'assets/Vector-8.png', route: '/contratos' },
    { title: 'Banco de Proyectos', icon: 'assets/Vector-9.png', route: '/banco' },
    { title: 'Servicios Públicos', icon: 'assets/Vector-2.png', route: '/servicios' },
    // Agrega aquí todos los módulos que necesites
  ];

  favoritos: string[] = [];

  onFavorite(modulo: any) {
    const idx = this.favoritos.indexOf(modulo.title);
    if (idx === -1) {
      this.favoritos.unshift(modulo.title);
      // Mueve la card al inicio
      this.modulos = [
        modulo,
        ...this.modulos.filter(m => m.title !== modulo.title)
      ];
    } else {
      this.favoritos.splice(idx, 1);
      // Opcional: podrías devolver la card a su lugar original si tienes un array base
    }
  }

  isFavorite(modulo: any): boolean {
    return this.favoritos.includes(modulo.title);
  }
}