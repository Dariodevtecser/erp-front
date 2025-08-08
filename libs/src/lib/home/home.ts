import { HeaderComponent } from './../header/header.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'lib-home',
  standalone: true,
  imports: [CommonModule, CardComponent, HeaderComponent, SidebarComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {
  originalModulos = [
    { title: 'Contabilidad', icon: 'fas fa-calculator', route: '/contabilidad' },
    { title: 'Presupuesto', icon: 'fas fa-donate', route: '/presupuesto' },
    { title: 'Tesorería', icon: 'fas fa-institution', route: '/tesoreria' },
    { title: 'Nómina', icon: 'fas fa-hand-holding-usd', route: '/nomina' },
    { title: 'Almacén', icon: 'fas fa-warehouse', route: '/almacen' },
    { title: 'Contratos', icon: 'fas fa-file-lines', route: '/contratos' },
    { title: 'Banco de Proyectos', icon: 'fas fa-institution', route: '/banco' },
    { title: 'Servicios Públicos', icon: 'fas fa-charging-station', route: '/servicios' },
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
