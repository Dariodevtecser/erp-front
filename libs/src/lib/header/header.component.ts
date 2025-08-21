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
    'macroprocesses': 'Macroprocesos',
    'budget-accounts': 'Cuentas de Presupuesto',
    'admin': 'Administrador',
    'create': 'Crear Usuario'
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

    buildBreadcrumbs(){
      const path = this.router.url.split('?')[0];
      const segments = path.split('/').filter(seg => seg && seg !== 'app');
      let crumbs: string[] = [];

      // Si estás en home y tienes un módulo/card seleccionado, muestra Home > [nombre card]
        if (segments.length === 1 && segments[0] === 'home' && this.selectedModule) {
          crumbs = ['Home', this.selectedModule];
        } else {
          crumbs = segments.map(seg => this.nameMap[seg] || seg);
          // Si la ruta no empieza con 'home', puedes anteponer 'Home' si quieres
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
