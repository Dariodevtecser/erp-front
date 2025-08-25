import { Component, EventEmitter, Output } from '@angular/core';
import { SelectionService } from '../services/selection.service';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'lib-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule],
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  breadcrumbs: string[] = [];
  selectedModule: string | null = null;

  // Mapea los segmentos de ruta a nombres amigables
  nameMap: { [key: string]: string } = {
    'home': 'Home',
    'budget': 'Presupuesto',
    'processes-generales': 'Procesos Generales',
    'budget-accounts': 'Cuentas de Presupuesto',
    'super-admin': 'Super Administrador',
    'edit': 'Usuario a editar',
    'createSuperAdmin': 'Crear Usuario',
    'admin': 'Administrador',
    'createAdmin': 'Crear Usuario'
    // Agrega más según tus rutas
  };

  constructor(private selectedService: SelectionService, private router: Router){
    this.selectedService.selectedModule$.subscribe(name => {
      this.selectedModule = name;
      this.buildBreadcrumbs();
    })
  }

  ngOnInit(){
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)).subscribe(() => {
        const path = this.router.url.split('?')[0];
        if (!path.endsWith('/home')) {
          this.selectedModule = null;
        }
        this.buildBreadcrumbs();
      });
      this.buildBreadcrumbs();
    }

    buildBreadcrumbs() {
  const path = this.router.url.split('?')[0];
  const segments = path.split('/').filter(seg => seg && seg !== 'app');
  let crumbs: string[] = [];

  // Caso especial para admin/createAdmin y admin/permissions
  if (
    segments[0] === 'admin' &&
    (segments[1] === 'createAdmin' || segments[1] === 'permissions')
  ) {
    crumbs = ['Administrador', 'Crear Usuario'];
    if (segments[1] === 'permissions') {
      crumbs.push('Permisos');
    }
  }
  // Caso especial para super-admin/createSuperAdmin y super-admin/permissions
  else if (
    segments[0] === 'super-admin' &&
    (segments[1] === 'createSuperAdmin' || segments[1] === 'permissions')
  ) {
    crumbs = ['Super Administrador', 'Crear Usuario'];
    if (segments[1] === 'permissions') {
      crumbs.push('Permisos');
    }
  }
  else if (segments.length === 1 && segments[0] === 'home' && this.selectedModule) {
    crumbs = ['Home', this.selectedModule];
  } else {
    crumbs = segments.map(seg => this.nameMap[seg] || seg);
    if (crumbs[0] !== 'Home') {
      crumbs = ['Home', ...crumbs];
    }
  }
  this.breadcrumbs = crumbs;
}

    goHome(){
      this.router.navigate(['/app/home']);
    }

    onMenuClick(){
      this.toggleSidebar.emit();
    }
}
