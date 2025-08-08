import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'lib-home',
  standalone: true,
  imports: [CommonModule, CardComponent, SidebarComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {
  originalModulos = [
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

  modulos = [...this.originalModulos];
  selectedCard: string | null = null;
  favoritos: string[] = [];
  
  onSelect(modulo: any) {
    this.selectedCard = modulo.title;
  }

  onFavorite(modulo: any) {
    const idx = this.favoritos.indexOf(modulo.title);
    if (idx === -1) {
      this.favoritos.push(modulo.title);
    } else {
      this.favoritos.splice(idx, 1);
    }
    this.ordenarModulos();
  }

  ordenarModulos() {
    const favoritos = this.originalModulos.filter(m => this.favoritos.includes(m.title));
    const noFavoritos = this.originalModulos.filter(m => !this.favoritos.includes(m.title));
    this.modulos = [...favoritos, ...noFavoritos];
  }

isFavorite(modulo: any): boolean {
  return this.favoritos.includes(modulo.title);
}

isSelected(modulo: any): boolean {
  return this.selectedCard === modulo.title;
}
}