import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import Swal from 'sweetalert2';
 
export interface BudgetAccount {
  id: string;
  vigencia: number;
  tipoPresupuesto: string;
  unidadEjecutora: string;
  tipoCuenta: 'ingreso' | 'gasto';
  rubro: string;
  nombre: string;
  codigo: string;
  nivel: string;
  tipoRenta: string;
  grupoRenta: string;
  codigoHomologado: string;
  sf: string;
  codigoProducto: string;
  activo: boolean;
  fechaCreacion: string;
  fechaModificacion: string;
  usuarioModificacion: string;
  showDetails?: boolean; // Propiedad para controlar la visibilidad del acordeón
  grupoNombre?: string; // Propiedad opcional para el grupo de nombre
}
 
const BUDGET_ACCOUNTS_MOCK: BudgetAccount[] = [
  {
    id: '1',
    vigencia: 2025,
    tipoPresupuesto: 'Ingresos',
    unidadEjecutora: '01',
    tipoCuenta: 'ingreso',
    rubro: '1',
    nombre: 'Ingresos',
    codigo: '1',
    nivel: '1',
    tipoRenta: '1',
    grupoRenta: '2025',
    codigoHomologado: '1001',
    sf: '1',
    codigoProducto: '1',
    activo: true,
    fechaCreacion: '2025-01-01',
    fechaModificacion: '2025-01-01',
    usuarioModificacion: 'admin',
  },
  {
    id: '2',
    vigencia: 2025,
    tipoPresupuesto: 'Ingresos',
    unidadEjecutora: '01',
    tipoCuenta: 'ingreso',
    rubro: '1.0',
    nombre: 'Disponibilidad Inicial',
    codigo: '1.0',
    nivel: '2',
    tipoRenta: '2',
    grupoRenta: '20242',
    codigoHomologado: '1002',
    sf: '2',
    codigoProducto: '2',
    activo: true,
    fechaCreacion: '2025-01-01',
    fechaModificacion: '2025-01-01',
    usuarioModificacion: 'admin',
  }
  // ...agrega más registros según el mockup
];
 
@Component({
  selector: 'app-budget-accounts',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './budget-accounts.component.html',
  styleUrls: ['./budget-accounts.component.scss']
})
export class BudgetAccountsComponent {
  // Formulario para crear/editar cuentas
  accountForm!: FormGroup;
  accounts: BudgetAccount[] = [];
  filteredAccounts: BudgetAccount[] = [];
  search = '';
  vigencia = 2025;
  tipoPresupuesto = '';
  unidadEjecutora = '';
  tipoCuenta = '';
 
  isModalOpen = false;
  isEditMode = false;
  currentAccount: BudgetAccount | null = null;
  currentStep = 1;
  showPagination = true;
  showColumnSelector = false;
  showDeleteConfirmation = false;
  accountToDelete: BudgetAccount | null = null;
  showExportOptions = false;
  showOptions = false;
 
  // Columnas disponibles para mostrar/ocultar
  availableColumns = [
    { name: 'Opciones', visible: true },
    { name: 'rubro', visible: true },
    { name: 'nombre', visible: true },
    { name: 'Gr Nombre', visible: true },
    { name: 'nivel', visible: true },
    { name: 'SF', visible: true },
    { name: 'Cód.Producto', visible: true },
    { name: 'grupo renta', visible: true },
    { name: 'tipo renta', visible: true }
  ];
 
  // Options for dropdowns
  tipoRentaOptions = [
    { value: 'TRIBUTARIO', label: 'TRIBUTARIO' },
    { value: 'NO TRIBUTARIO', label: 'NO TRIBUTARIO' },
    { value: 'TRANSFERENCIAS', label: 'TRANSFERENCIAS' },
    { value: 'RECURSOS DE CAPITAL', label: 'RECURSOS DE CAPITAL' }
  ];
 
  unidadOptions = [
    { value: 'PESOS', label: 'PESOS' },
    { value: 'PORCENTAJE', label: 'PORCENTAJE' },
    { value: 'UNIDAD', label: 'UNIDAD' }
  ];
 
  grupoRentaOptions = [
    { value: 'ICLD', label: 'ICLD' },
    { value: 'ICDE', label: 'ICDE' },
    { value: 'SGP', label: 'SGP' },
    { value: 'REGALIAS', label: 'REGALIAS' },
    { value: 'CREDITO', label: 'CREDITO' },
    { value: 'COFINANCIACION', label: 'COFINANCIACION' }
  ];
 
  codigoHomologadoOptions = [
    { value: '1001', label: 'CICP 1001' },
    { value: '1002', label: 'CICP 1002' },
    { value: '1003', label: 'CICP 1003' }
  ];
 
  // Step 2 options
  tipoIngresoOptions = [
    { value: 'ingreso1', label: 'Tipo Ingreso 1' },
    { value: 'ingreso2', label: 'Tipo Ingreso 2' }
  ];
 
  tipoCuentaBancariaOptions = [
    { value: 'ahorros', label: 'Ahorros' },
    { value: 'corriente', label: 'Corriente' }
  ];
 
  bancoOptions = [
    { value: 'banco1', label: 'Banco 1' },
    { value: 'banco2', label: 'Banco 2' }
  ];
 
  tipoDocumentoOptions = [
    { value: 'cc', label: 'Cédula de Ciudadanía' },
    { value: 'nit', label: 'NIT' }
  ];
 
  tipoPersonaOptions = [
    { value: 'natural', label: 'Persona Natural' },
    { value: 'juridica', label: 'Persona Jurídica' }
  ];
 
  // Step 3 options
  tipoFutOptions = [
    { value: 'fut1', label: 'FUT Opción 1' },
    { value: 'fut2', label: 'FUT Opción 2' }
  ];
 
  tipoFffutOptions = [
    { value: 'fffut1', label: 'FFFUT Opción 1' },
    { value: 'fffut2', label: 'FFFUT Opción 2' }
  ];
 
  tipoFutiOptions = [
    { value: 'futi1', label: 'FUTI Opción 1' },
    { value: 'futi2', label: 'FUTI Opción 2' }
  ];
 
  // Step 4 options
  cuentaTipoNormaOptions = [
    { value: 'norma1', label: 'Cuenta Norma 1' },
    { value: 'norma2', label: 'Cuenta Norma 2' }
  ];
 
  cuipoCpcOptions = [
    { value: 'cpc1', label: 'CUIPO CPC 1' },
    { value: 'cpc2', label: 'CUIPO CPC 2' }
  ];
 
  cuipoFuenteFinanciacionOptions = [
    { value: 'fuente1', label: 'Fuente Financiación 1' },
    { value: 'fuente2', label: 'Fuente Financiación 2' }
  ];
 
  cuipoTerceroChipOptions = [
    { value: 'chip1', label: 'Tercero CHIP 1' },
    { value: 'chip2', label: 'Tercero CHIP 2' }
  ];
 
  cuipoPoliticaPublicaOptions = [
    { value: 'politica1', label: 'Política Pública 1' },
    { value: 'politica2', label: 'Política Pública 2' }
  ];
 
  cuipoDetalleSectorialPiOptions = [
    { value: 'sectorial1', label: 'Detalle Sectorial PI 1' },
    { value: 'sectorial2', label: 'Detalle Sectorial PI 2' }
  ];
 
  cuipoDetalleSectorialEiOptions = [
    { value: 'sectorialei1', label: 'Detalle Sectorial EI 1' },
    { value: 'sectorialei2', label: 'Detalle Sectorial EI 2' }
  ];
 
  homologadoIcldOptions = [
    { value: 'icld1', label: 'Homologado ICLD 1' },
    { value: 'icld2', label: 'Homologado ICLD 2' }
  ];
 
  constructor(private fb: FormBuilder) {
    // Cargar cuentas desde localStorage si existen
    this.loadAccountsFromLocalStorage();
   
    // Si no hay cuentas en localStorage, usar los datos mock
    if (this.accounts.length === 0) {
      this.accounts = [...BUDGET_ACCOUNTS_MOCK];
      this.saveAccountsToLocalStorage();
    }
   
    // Inicializar la lista filtrada
    this.filteredAccounts = [...this.accounts];
   
    this.accountForm = this.fb.group({
      // Paso 1: Datos Generales
      rubro: ['', [
        Validators.required,
        Validators.maxLength(200),
        this.rubroUniqueValidator.bind(this)
      ]],
      nombre: ['', [
        Validators.required,
        Validators.maxLength(200)
      ]],
      nivel: ['', [
        Validators.required,
        Validators.min(1),
        Validators.maxLength(200),
        Validators.pattern('^[a-zA-Z0-9]*$') // Alfanumérico
      ]],
      tipoRenta: ['', Validators.required],
      unidad: ['', Validators.required],
      grupoRenta: ['', Validators.required],
      codigoHomologado: ['', [
        Validators.required,
        Validators.maxLength(10),
        this.codigoUniqueValidator.bind(this)
      ]],
     
      // Paso 2: Enlaces Sifse y SIA
      cuentaIngresos: [''],
      cuentaBancos: [''],
      cuentaCausacionIngresos: [''],
      tipoIngreso: [''],
      codigoSubfijoSia: [''],
      codigoCuentaSia: [''],
      tipoCuentaBancaria: [''],
      banco: [''],
      numeroCuenta: [''],
      tipoDocumento: [''],
      numeroDocumento: [''],
      tipoPersona: [''],
      nombreTitular: [''],
      descripcion: [''],
     
      // Paso 3: Enlaces CGR y FUT
      fut: [''],
      fffut: [''],
      futi: [''],
     
      // Paso 4: Enlaces CCPET
      cuentaTipoNorma: [''],
      cuipoNumeroFecha: [''],
      cuipoCpc: [''],
      cuipoFuenteFinanciacion: [''],
      cuipoTerceroChip: [''],
      cuipoPoliticaPublica: [''],
      cuipoDetalleSectorialPi: [''],
      cuipoDetalleSectorialEi: [''],
      homologadoIcld: ['']
    });
  }
 
  onAddAccount(): void {
    this.isModalOpen = true;
    this.currentStep = 1;
    this.accountForm.reset();
    this.isEditMode = false;
    this.currentAccount = null;
  }
 
  onEditAccount(account: BudgetAccount): void {
    this.isModalOpen = true;
    this.currentStep = 1;
    this.isEditMode = true;
    this.currentAccount = account;
   
    // Cargar los datos del rubro en el formulario
    this.accountForm.patchValue({
      rubro: account.rubro,
      nombre: account.nombre,
      nivel: account.nivel,
      tipoRenta: account.tipoRenta,
      unidad: account.unidadEjecutora,
      grupoRenta: account.grupoRenta,
      codigoHomologado: account.codigoHomologado,
      // Aquí puedes agregar más campos según sea necesario
    });
  }
 
  closeModal(): void {
    // Verificar si el formulario tiene cambios sin guardar
    if (this.accountForm.dirty) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Hay cambios sin guardar. Si cierras el formulario, se perderán estos cambios.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, cerrar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.resetModalState();
        }
      });
    } else {
      this.resetModalState();
    }
  }
 
  // Método para resetear el estado del modal
  private resetModalState(): void {
    this.isModalOpen = false;
    this.currentStep = 1;
    this.accountForm.reset();
    this.isEditMode = false;
    this.currentAccount = null;
  }
 
  // Métodos para los botones de acción
  clearSearch(): void {
    this.search = '';
    this.filterAccounts();
  }
 
  clearAllFilters(): void {
    this.search = '';
    this.vigencia = 2025;
    this.tipoPresupuesto = '';
    this.unidadEjecutora = '';
    this.tipoCuenta = '';
    this.filterAccounts();
  }
 
  filterAccounts(): void {
    // Primero filtramos por término de búsqueda
    let filtered = [...this.accounts];
   
    // Filtro por término de búsqueda
    if (this.search && this.search.trim() !== '') {
      const searchTerm = this.search.toLowerCase().trim();
      filtered = filtered.filter(account =>
        account.rubro.toLowerCase().includes(searchTerm) ||
        account.nombre.toLowerCase().includes(searchTerm) ||
        account.codigoHomologado.toLowerCase().includes(searchTerm) ||
        account.grupoRenta.toLowerCase().includes(searchTerm) ||
        account.tipoRenta.toLowerCase().includes(searchTerm)
      );
    }
   
    // Filtro por tipo de presupuesto
    if (this.tipoPresupuesto) {
      filtered = filtered.filter(account => account.tipoPresupuesto === this.tipoPresupuesto);
    }
   
    // Filtro por unidad ejecutora
    if (this.unidadEjecutora) {
      filtered = filtered.filter(account => account.unidadEjecutora === this.unidadEjecutora);
    }
   
    // Filtro por tipo de cuenta (ingreso/gasto)
    if (this.tipoCuenta) {
      filtered = filtered.filter(account => account.tipoCuenta === this.tipoCuenta);
    }
   
    this.filteredAccounts = filtered;
  }
 
  togglePagination(): void {
    this.showPagination = !this.showPagination;
  }
 
  toggleColumnSelector(): void {
    this.showColumnSelector = !this.showColumnSelector;
    this.showExportOptions = false;
    this.showOptions = false;
  }
 
  toggleExportOptions(): void {
    this.showExportOptions = !this.showExportOptions;
    this.showColumnSelector = false;
    this.showOptions = false;
  }
 
  toggleOptions(): void {
    this.showOptions = !this.showOptions;
    this.showColumnSelector = false;
    this.showExportOptions = false;
  }
 
  exportData(format: string): void {
    // Implementación para exportar datos
    console.log(`Exportando datos en formato ${format}`);
   
    // Aquí iría la lógica para exportar los datos según el formato
    // Por ejemplo, para Excel podríamos usar una librería como xlsx
    const dataToExport = this.filteredAccounts.map(account => {
      return {
        rubro: account.rubro,
        nombre: account.nombre,
        nivel: account.nivel,
        tipoRenta: account.tipoRenta,
        grupoRenta: account.grupoRenta,
        codigoHomologado: account.codigoHomologado,
        unidadEjecutora: account.unidadEjecutora
      };
    });
   
    // Cerrar el menú de exportación
    this.showExportOptions = false;
  }
 
  printData(): void {
    // Implementación para imprimir datos
    console.log('Imprimiendo datos');
   
    // Aquí iría la lógica para imprimir los datos
    // Por ejemplo, podríamos abrir una nueva ventana con los datos formateados para imprimir
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write('<html><head><title>Catálogo de Cuentas</title>');
      printWindow.document.write('<style>table { width: 100%; border-collapse: collapse; } th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }</style>');
      printWindow.document.write('</head><body>');
      printWindow.document.write('<h1>Catálogo de Cuentas</h1>');
      printWindow.document.write('<table>');
      printWindow.document.write('<tr><th>Rubro</th><th>Nombre</th><th>Nivel</th><th>Tipo Renta</th><th>Grupo Renta</th><th>Código Homologado</th><th>Unidad Ejecutora</th></tr>');
     
      this.filteredAccounts.forEach(account => {
        printWindow.document.write(`<tr><td>${account.rubro}</td><td>${account.nombre}</td><td>${account.nivel}</td><td>${account.tipoRenta}</td><td>${account.grupoRenta}</td><td>${account.codigoHomologado}</td><td>${account.unidadEjecutora}</td></tr>`);
      });
     
      printWindow.document.write('</table>');
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    }
  }
 
  nextStep(): void {
    switch (this.currentStep) {
      case 1:
        this.currentStep = 2;
        break;
      case 2:
        this.currentStep = 3;
        break;
      case 3:
        this.currentStep = 4;
        break;
    }
  }
 
  previousStep(): void {
    switch (this.currentStep) {
      case 2:
        this.currentStep = 1;
        break;
      case 3:
        this.currentStep = 2;
        break;
      case 4:
        this.currentStep = 3;
        break;
    }
  }
 
  saveAccount(): void {
    if (this.accountForm.valid) {
      const formData = this.accountForm.value;
     
      // Mostrar indicador de carga
      Swal.fire({
        title: 'Guardando...',
        text: 'Por favor espere mientras se guarda la información',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
     
      // Simulamos un tiempo de procesamiento (esto se eliminaría cuando se conecte al backend)
      setTimeout(() => {
        if (this.isEditMode && this.currentAccount) {
          // Actualizar el rubro existente
          const currentId = this.currentAccount.id;
          if (currentId) {
            const index = this.accounts.findIndex(acc => acc.id === currentId);
            if (index !== -1) {
              // Actualizar los datos del rubro
              this.accounts[index] = {
                ...this.accounts[index],
                ...formData,
                fechaModificacion: new Date().toISOString().split('T')[0],
                usuarioModificacion: 'admin' // Aquí deberías usar el usuario actual
              };
             
              // Actualizar la lista filtrada
              this.filteredAccounts = [...this.accounts];
              console.log('Rubro actualizado:', this.accounts[index]);
             
              // Guardar cuentas en localStorage
              this.saveAccountsToLocalStorage();
             
              // Mostrar notificación de éxito
              Swal.fire({
                title: '¡Actualizado!',
                text: `La cuenta ${formData.rubro} ha sido actualizada correctamente.`,
                icon: 'success',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#3085d6'
              });
            }
          }
        } else {
          // Crear un nuevo rubro
          const newAccount: BudgetAccount = {
            id: (this.accounts.length + 1).toString(),
            vigencia: this.vigencia,
            tipoPresupuesto: this.tipoPresupuesto || 'Ingresos',
            unidadEjecutora: formData.unidad,
            tipoCuenta: 'ingreso',
            rubro: formData.rubro,
            nombre: formData.nombre,
            codigo: formData.rubro, // Usar el rubro como código por defecto
            nivel: formData.nivel,
            tipoRenta: formData.tipoRenta,
            grupoRenta: formData.grupoRenta,
            codigoHomologado: formData.codigoHomologado,
            sf: '',
            codigoProducto: '',
            activo: true,
            fechaCreacion: new Date().toISOString().split('T')[0],
            fechaModificacion: new Date().toISOString().split('T')[0],
            usuarioModificacion: 'admin' // Aquí deberías usar el usuario actual
          };
         
          this.accounts.push(newAccount);
          this.filteredAccounts = [...this.accounts];
          console.log('Nuevo rubro creado:', newAccount);
         
          // Guardar cuentas en localStorage
          this.saveAccountsToLocalStorage();
         
          // Mostrar notificación de éxito
          Swal.fire({
            title: '¡Guardado!',
            text: `La cuenta ${formData.rubro} ha sido creada correctamente.`,
            icon: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#3085d6'
          });
        }
       
        this.closeModal();
      }, 1000); // Simulamos 1 segundo de procesamiento
    } else {
      // Identificar campos con errores
      const camposConError: string[] = [];
     
      Object.keys(this.accountForm.controls).forEach(key => {
        const control = this.accountForm.get(key);
        if (control?.invalid && (control?.dirty || control?.touched)) {
          camposConError.push(this.getFieldName(key));
        }
        control?.markAsTouched();
      });
     
      // Mostrar notificación de error con campos específicos
      Swal.fire({
        title: 'Error de validación',
        html: `<p>Por favor, complete correctamente los siguientes campos:</p>
              <ul>
                ${camposConError.map(campo => `<li>${campo}</li>`).join('')}
              </ul>`,
        icon: 'error',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#d33'
      });
    }
  }
 
  // Método auxiliar para obtener nombres legibles de los campos
  private getFieldName(fieldKey: string): string {
    const fieldNames: {[key: string]: string} = {
      'rubro': 'Rubro',
      'nombre': 'Nombre',
      'nivel': 'Nivel',
      'tipoRenta': 'Tipo de Renta',
      'unidad': 'Unidad',
      'grupoRenta': 'Grupo de Renta',
      'codigoHomologado': 'Código Homologado'
      // Añadir más campos según sea necesario
    };
   
    return fieldNames[fieldKey] || fieldKey;
  }
 
  // Métodos para mostrar mensajes de error específicos en el formulario
  getErrorMessage(controlName: string): string {
    const control = this.accountForm.get(controlName);
    if (!control || !control.errors || !control.touched) return '';
   
    const errors = control.errors;
   
    if (errors['required']) {
      return `El campo ${this.getFieldName(controlName)} es obligatorio`;
    }
   
    if (errors['rubroExists']) {
      return `El rubro ya existe en el sistema`;
    }
   
    if (errors['codigoExists']) {
      return `El código homologado ya existe en el sistema`;
    }
   
    if (errors['pattern']) {
      return `El formato del campo ${this.getFieldName(controlName)} no es válido`;
    }
   
    if (errors['minlength']) {
      return `El campo debe tener al menos ${errors['minlength'].requiredLength} caracteres`;
    }
   
    if (errors['maxlength']) {
      return `El campo no puede tener más de ${errors['maxlength'].requiredLength} caracteres`;
    }
   
    if (errors['min']) {
      return `El valor debe ser mayor o igual a ${errors['min'].min}`;
    }
   
    // Si hay un error pero no está contemplado en los casos anteriores
    return 'Campo inválido';
  }
 
  // Método para verificar si un campo tiene error
  hasError(controlName: string): boolean {
    const control = this.accountForm.get(controlName);
    return control ? (control.invalid && control.touched) : false;
  }
 
  // Validador personalizado para verificar unicidad del rubro
  rubroUniqueValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;
   
    // Si estamos en modo edición y el valor es igual al rubro actual, no hay error
    if (this.isEditMode && this.currentAccount && this.currentAccount.rubro === value) {
      return null;
    }
   
    // Verificar si el rubro ya existe en la lista de cuentas
    const exists = this.accounts.some(account => account.rubro === value);
    return exists ? { rubroExists: true } : null;
  }
 
  // Validador personalizado para verificar unicidad del código homologado
  codigoUniqueValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;
   
    // Si estamos en modo edición y el valor es igual al código actual, no hay error
    if (this.isEditMode && this.currentAccount && this.currentAccount.codigoHomologado === value) {
      return null;
    }
   
    // Verificar si el código ya existe en la lista de cuentas
    const exists = this.accounts.some(account => account.codigoHomologado === value);
    return exists ? { codigoExists: true } : null;
  }
 
  // Método para guardar cuentas en localStorage
  private saveAccountsToLocalStorage(): void {
    try {
      localStorage.setItem('budgetAccounts', JSON.stringify(this.accounts));
      console.log('Cuentas guardadas en localStorage:', this.accounts.length);
      // Actualizar también la lista filtrada
      this.filterAccounts();
    } catch (error) {
      console.error('Error al guardar cuentas en localStorage:', error);
      // Mostrar notificación de error al usuario
      Swal.fire({
        title: 'Error',
        text: 'No se pudieron guardar los datos. Por favor, inténtelo de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }
 
  // Método para cargar cuentas desde localStorage
  private loadAccountsFromLocalStorage(): void {
    const savedAccounts = localStorage.getItem('budgetAccounts');
    if (savedAccounts) {
      try {
        this.accounts = JSON.parse(savedAccounts);
        console.log('Cuentas cargadas desde localStorage:', this.accounts.length);
      } catch (error) {
        console.error('Error al cargar cuentas desde localStorage:', error);
        // Si hay un error al cargar, inicializar con array vacío
        this.accounts = [];
        // Mostrar notificación de error al usuario
        Swal.fire({
          title: 'Error',
          text: 'No se pudieron cargar los datos guardados. Se inicializará con datos predeterminados.',
          icon: 'warning',
          confirmButtonText: 'Aceptar'
        });
      }
    } else {
      // Si no hay datos guardados, inicializar con array vacío
      this.accounts = [];
    }
  }
 
  exitWizard(): void {
    this.closeModal();
  }
 
  /**
   * Método para controlar la apertura/cierre del acordeón
   * @param account La cuenta presupuestal a mostrar/ocultar detalles
   */
  toggleAccordion(account: BudgetAccount): void {
    account.showDetails = !account.showDetails;
  }
 
  /**
   * Método para mostrar el modal de confirmación de eliminación
   * @param account La cuenta presupuestal a eliminar
   */
  onDeleteAccount(account: BudgetAccount): void {
    this.accountToDelete = account;
    this.showDeleteConfirmation = true;
  }
 
  /**
   * Método para confirmar la eliminación de una cuenta
   */
  confirmDelete(): void {
    if (this.accountToDelete) {
      // Eliminar la cuenta del array de cuentas
      this.accounts = this.accounts.filter(acc => acc.id !== this.accountToDelete?.id);
     
      // Actualizar la lista filtrada
      this.filterAccounts();
     
      // Guardar cuentas en localStorage después de eliminar
      this.saveAccountsToLocalStorage();
     
      // Mostrar notificación de éxito
      Swal.fire({
        title: 'Eliminado',
        text: 'La cuenta ha sido eliminada correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6'
      });
     
      // Cerrar el modal de confirmación
      this.closeDeleteConfirmation();
    }
  }
 
  /**
   * Método para cerrar el modal de confirmación sin eliminar
   */
  closeDeleteConfirmation(): void {
    this.showDeleteConfirmation = false;
    this.accountToDelete = null;
  }
}