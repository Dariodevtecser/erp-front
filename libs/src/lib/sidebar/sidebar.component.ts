import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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

  menuItems = [
    {
      label: 'Macroprocesos',
      children: [
        { label: 'Cuentas De Presupuesto', route: '/cuentas-presupuesto' },
        { label: 'Solicitudes de Disponibilidad', route: '/solicitudes-disponibilidad' },
        { label: 'Certificados de Disponibilidad', route: '/certificados-disponibilidad' },
        { label: 'Registros Presupuestales', route: '/registros-presupuestales' },
        { label: 'Modificaciones al Presupuesto', route: '/modificaciones-presupuesto' },
        { label: 'Reservas Presupuestales', route: '/reservas-presupuestales' },
        { label: 'Catalogo Presupuestal', route: '/catalogo-presupuestal' },
        { label: 'Cargar Apropiaciones Iniciales', route: '/cargar-apropiaciones-iniciales' }
      ]
    },
    {
      label: 'Auditoria',
      children: [
        { label: 'Seguimiento de Recursos por Fuente de Financiación', route: '/seguimiento-fuente-financiacion' },
        { label: 'Declaraciones IYC Vs Recaudos', route: '/declaraciones-iyc-vs-recaudos' },
        { label: 'Recaudos IPU Vs CAR', route: '/recaudos-ipu-vs-car' },
        { label: 'Bancos Vs Recaudos Por Rubro', route: '/bancos-vs-recaudos-rubro' }
      ]
    },
    {
      label: 'Reportes',
      children: [
        { label: 'Reportes Tesoreria', route: '/reportes-tesoreria' }
      ]
    },
    {
      label: 'Procesos Periodicos',
      children: [
        { label: 'Descarga Automatica de Recaudos Código Barras', route: '/descarga-automatica-codigobarras' },
        { label: 'Descarga Manual De Recaudos', route: '/descarga-manual-recaudos' },
        { label: 'Descarga en Bloque', route: '/descarga-en-bloque' },
        { label: 'Cierre de Pagos', route: '/cierre-de-pagos' },
        { label: 'Proceso de Consignación', route: '/proceso-consignacion' },
        { label: 'Constitución Cuentas por Pagar', route: '/constitucion-cuentas-por-pagar' },
        { label: 'Carga Datos Camara de Comercio', route: '/carga-camara-comercio' },
        { label: 'Carga Datos DIAN Ingresos', route: '/carga-dian-ingresos' }
      ]
    },
    {
      label: 'Datos Basicos',
      children: [
        { label: 'Unidades Ejecutoras', route: '/unidades-ejecutoras' },
        { label: 'Tipos de Presupuesto', route: '/tipos-presupuesto' },
        { label: 'Grupos de Renta Fuentes Financiacion', route: '/grupos-renta-fuentes' },
        { label: 'Tipos de Compromiso', route: '/tipos-compromiso' },
        { label: 'Plan de Cuentas FUT', route: '/plan-cuentas-fut' },
        { label: 'Parámetros de Presupuesto', route: '/parametros-presupuesto' },
        { label: 'Tipo de Renta', route: '/tipo-renta' }
      ]
    }
  ];

  toggleSubmenu(label: string) {
    this.expandedMenu = this.expandedMenu === label ? null : label;
  }

  isExpanded(label: string): boolean {
    return this.expandedMenu === label;
  }

  redirigirDashboard() {
    // Implementa la navegación al dashboard aquí
  }

  logout() {
    // Implementa la lógica de logout aquí
  }
}
