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
        { label: 'Validar Catálogo de Cuentas', route: '/validar-catalogo-cuentas' },
        { label: 'Validar Enlaces Contables', route: '/validar-enlaces-contables' },
        { label: 'Auditar Ejecución de Gastos', route: '/auditar-ejecucion-gastos' },
        { label: 'Distribución del Presupuesto por Grupos de Rentas', route: '/distribucion-presupuesto-grupos-rentas' },
        { label: 'Revisar Saldos de Certificados de Disponibilidad', route: '/revisar-saldos-certificados-disponibilidad' },
        { label: 'Revisar Saldos de Registros Presupuestales', route: '/revisar-saldos-registros-presupuestales' },
        { label: 'Localizar Documentos', route: '/localizar-documentos' },
        { label: 'Informe Ley 617', route: '/informe-ley-617' },
        { label: 'Seguimiento de Recursos por Fuente de Financiación', route: '/seguimiento-recursos-fuente-financiacion' },
        { label: 'Ejecucion Gastos Vs Documentos', route: '/ejecucion-gastos-vs-documentos' },
        { label: 'Ejecucion Ingresos Vs Recaudos', route: '/ejecucion-ingresos-vs-recaudos' }
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
        { label: 'Descarga Automatica de Recaudos Código Barras', route: '/descarga-automatica-recaudos-codigo-barras' },
        { label: 'Descarga Manual De Recaudos', route: '/descarga-manual-recaudos' },
        { label: 'Descarga en Bloque', route: '/descarga-en-bloque' },
        { label: 'Cierre de Pagos', route: '/cierre-pagos' },
        { label: 'Proceso de Consignación', route: '/proceso-consignacion' },
        { label: 'Constitución Cuentas por Pagar', route: '/constitucion-cuentas-por-pagar' },
        { label: 'Carga Datos Camara de Comercio', route: '/carga-datos-camara-comercio' },
        { label: 'Carga Datos DIAN Ingresos', route: '/carga-datos-dian-ingresos' }
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
