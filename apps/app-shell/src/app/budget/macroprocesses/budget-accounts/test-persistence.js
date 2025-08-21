// Script para probar la persistencia de datos en BudgetAccountsComponent

// Función para verificar los datos en localStorage
function checkLocalStorage() {
  const savedAccounts = localStorage.getItem('budgetAccounts');
  if (savedAccounts) {
    try {
      const accounts = JSON.parse(savedAccounts);
      console.log('✅ Datos encontrados en localStorage:', accounts.length, 'cuentas');
      console.table(accounts.map(acc => ({
        id: acc.id,
        rubro: acc.rubro,
        nombre: acc.nombre,
        fechaCreacion: acc.fechaCreacion
      })));
      return accounts;
    } catch (error) {
      console.error('❌ Error al parsear datos de localStorage:', error);
      return null;
    }
  } else {
    console.log('❌ No se encontraron datos en localStorage');
    return null;
  }
}

// Función para agregar una cuenta de prueba
function addTestAccount() {
  const savedAccounts = localStorage.getItem('budgetAccounts');
  if (savedAccounts) {
    try {
      const accounts = JSON.parse(savedAccounts);
      
      // Crear una nueva cuenta de prueba
      const newAccount = {
        id: (accounts.length + 1).toString(),
        vigencia: 2025,
        tipoPresupuesto: 'Ingresos',
        unidadEjecutora: 'TEST',
        tipoCuenta: 'ingreso',
        rubro: `TEST-${Date.now()}`,
        nombre: `Cuenta de Prueba ${new Date().toLocaleTimeString()}`,
        codigo: `TEST-${Date.now()}`,
        nivel: '1',
        tipoRenta: 'TRIBUTARIO',
        grupoRenta: 'ICLD',
        codigoHomologado: `CH-${Date.now()}`,
        sf: '1',
        codigoProducto: '1',
        activo: true,
        fechaCreacion: new Date().toISOString().split('T')[0],
        fechaModificacion: new Date().toISOString().split('T')[0],
        usuarioModificacion: 'test-script'
      };
      
      // Agregar la nueva cuenta
      accounts.push(newAccount);
      
      // Guardar en localStorage
      localStorage.setItem('budgetAccounts', JSON.stringify(accounts));
      
      console.log('✅ Cuenta de prueba agregada correctamente:', newAccount);
      console.log('🔄 Recarga la página para ver los cambios');
      
      return true;
    } catch (error) {
      console.error('❌ Error al agregar cuenta de prueba:', error);
      return false;
    }
  } else {
    console.error('❌ No hay datos en localStorage para modificar');
    return false;
  }
}

// Función para eliminar una cuenta
function deleteAccount(id) {
  const savedAccounts = localStorage.getItem('budgetAccounts');
  if (savedAccounts) {
    try {
      let accounts = JSON.parse(savedAccounts);
      const initialCount = accounts.length;
      
      // Filtrar la cuenta a eliminar
      accounts = accounts.filter(acc => acc.id !== id);
      
      if (accounts.length === initialCount) {
        console.log(`❌ No se encontró ninguna cuenta con ID: ${id}`);
        return false;
      }
      
      // Guardar en localStorage
      localStorage.setItem('budgetAccounts', JSON.stringify(accounts));
      
      console.log(`✅ Cuenta con ID ${id} eliminada correctamente`);
      console.log('🔄 Recarga la página para ver los cambios');
      
      return true;
    } catch (error) {
      console.error('❌ Error al eliminar cuenta:', error);
      return false;
    }
  } else {
    console.error('❌ No hay datos en localStorage para modificar');
    return false;
  }
}

// Función para limpiar todos los datos
function clearAllData() {
  if (confirm('¿Estás seguro de que deseas eliminar TODOS los datos? Esta acción no se puede deshacer.')) {
    localStorage.removeItem('budgetAccounts');
    console.log('🗑️ Todos los datos han sido eliminados');
    console.log('🔄 Recarga la página para ver los cambios');
    return true;
  }
  return false;
}

// Verificar datos actuales
checkLocalStorage();
