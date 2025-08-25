import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { SelectionService } from '../services/selection.service';

@Component({
  selector: 'lib-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isSidebarOpen = true;
  expandedMenu: string | null = null;
  selectedModule: string | null = null;

  constructor(private router: Router, private selectionService: SelectionService) {
    this.selectionService.selectedModule$.subscribe(module => {
      this.selectedModule = module;
    });

    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        const path = this.router.url.split('?')[0];
        if(path.endsWith('/home')){
          this.selectedModule = null;
          this.expandedMenu = null;
        } else {
          this.setSidebarState(path);
        }
      }
    });
  }

  noOnInit(){
    this.setSidebarState(this.router.url.split('?')[0]);
  }

  setSidebarState(path: string){
    if(path.includes('/budget')){
      this.selectedModule = 'Presupuesto';
      this.expandedMenu = 'Procesos Generales';
    }
    else if(path.includes('/seguimiento-fuente-financiacion')){
      this.selectedModule = 'Presupuesto';
      this.expandedMenu = 'Auditoria';
    }
  }

  isBudgetSection(): boolean {
    return this.router.url.startsWith('/budget');
  }

  menuItems = [
    {
      label: 'Procesos Generales',
      children: [
        { label: 'Cuentas De Presupuesto', route: '/app/budget/general-processes/budget-accounts' },
        // { label: 'Solicitudes de Disponibilidad', route: '/solicitudes-disponibilidad' },
        // { label: 'Certificados de Disponibilidad', route: '/certificados-disponibilidad' },
        // { label: 'Registros Presupuestales', route: '/registros-presupuestales' },
        // { label: 'Modificaciones al Presupuesto', route: '/modificaciones-presupuesto' },
        // { label: 'Reservas Presupuestales', route: '/reservas-presupuestales' },
        // { label: 'Catalogo Presupuestal', route: '/catalogo-presupuestal' },
        // { label: 'Cargar Apropiaciones Iniciales', route: '/cargar-apropiaciones-iniciales' }
      ]
    },
    {
       label: 'Auditoria',
       children: [
        { label: 'Seguimiento de Recursos por Fuente de Financiación', route: '/seguimiento-fuente-financiacion' },
    //     { label: 'Declaraciones IYC Vs Recaudos', route: '/declaraciones-iyc-vs-recaudos' },
    //     { label: 'Recaudos IPU Vs CAR', route: '/recaudos-ipu-vs-car' },
    //     { label: 'Bancos Vs Recaudos Por Rubro', route: '/bancos-vs-recaudos-rubro' }
       ]
    },
    {
      label: 'Reportes',
      children: [
        { label: 'Reportes Tesoreria', route: '/reportes-tesoreria' }
      ]
    },
    // {
    //   label: 'Procesos Periodicos',
    //   children: [
    //     { label: 'Descarga Automatica de Recaudos Código Barras', route: '/descarga-automatica-codigobarras' },
    //     { label: 'Descarga Manual De Recaudos', route: '/descarga-manual-recaudos' },
    //     { label: 'Descarga en Bloque', route: '/descarga-en-bloque' },
    //     { label: 'Cierre de Pagos', route: '/cierre-de-pagos' },
    //     { label: 'Proceso de Consignación', route: '/proceso-consignacion' },
    //     { label: 'Constitución Cuentas por Pagar', route: '/constitucion-cuentas-por-pagar' },
    //     { label: 'Carga Datos Camara de Comercio', route: '/carga-camara-comercio' },
    //     { label: 'Carga Datos DIAN Ingresos', route: '/carga-dian-ingresos' }
    //   ]
    // },
    // {
    //   label: 'Datos Basicos',
    //   children: [
    //     { label: 'Unidades Ejecutoras', route: '/unidades-ejecutoras' },
    //     { label: 'Tipos de Presupuesto', route: '/tipos-presupuesto' },
    //     { label: 'Grupos de Renta Fuentes Financiacion', route: '/grupos-renta-fuentes' },
    //     { label: 'Tipos de Compromiso', route: '/tipos-compromiso' },
    //     { label: 'Plan de Cuentas FUT', route: '/plan-cuentas-fut' },
    //     { label: 'Parámetros de Presupuesto', route: '/parametros-presupuesto' },
    //     { label: 'Tipo de Renta', route: '/tipo-renta' }
    //   ]
    // }
  ];

  toggleSubmenu(label: string) {
    this.expandedMenu = this.expandedMenu === label ? null : label;
  }

  isExpanded(label: string): boolean {
    return this.expandedMenu === label;
  }

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }

  redirigirDashboard() {
    // Implementa la navegación al dashboard aquí
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  toggleSidebar(){
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
