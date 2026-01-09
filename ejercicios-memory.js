// // =====================================
// // EJERCICIOS DE MEMORY EN NODE.JS
// // =====================================
// //
// // Instrucciones: Completa cada ejercicio
// // Nota: Algunos requieren ejecutar con: node --expose-gc
// // 

console.log('\n=== EJERCICIO 1: INFORMACIÓN DE MEMORIA BÁSICA ===\n');

// // Ejercicio 1.1: Obtén información de memoria del proceso
// // TODO:
const memUsage = process.memoryUsage()
console.log("MemUsage", memUsage)
console.log('RSS (MB):', memUsage.rss);
console.log('Heap Total (MB):', memUsage.heapTotal);
console.log('Heap Used (MB):', memUsage.heapUsed);
console.log('External (KB):', memUsage.external);


console.log('\n=== EJERCICIO 2: MONITOREO CONTINUO DE MEMORIA ===\n');

// Ejercicio 2.1:
// 1. Crea un intervalo que cada 500ms imprime el heap used
// 2. Detente después de 5 segundos
// 3. Muestra los valores en MB
// TODO:
let tickCount = 0;
const monitorInterval = setInterval(() => {
    const memCurrent = process.memoryUsage();
    const heapUsedInMB = memCurrent.heapUsed / 1048576;
    console.log("Esto es el heap used a  MB", heapUsedInMB.toFixed(2));
    tickCount++;

    if (tickCount >= 10) {
        clearInterval(monitorInterval);
    }
}, 500);


console.log('\n=== EJERCICIO 3: CREAR MEMORY LEAKS (INTENCIONAL) ===\n');

// Ejercicio 3.1:
// 1. Crea un cache global (leak)
// 2. Agrega objetos grandes al cache
// 3. Monitorea cómo crece la memoria
// 4. Intenta limpiar el cache
// TODO:
const cache = [];
const memBefore = process.memoryUsage().heapUsed;
console.log("Esto es antes de llenarlos de datos basura ", memBefore)

// Agregar al cache
for (let i = 0; i < 5; i++) {
    cache.push({
        id: i,
        datos: new Array(1000000).fill('datos innecesarios')
    });
}

const memAfter = process.memoryUsage().heapUsed;
console.log("Esto es despues  de llenarlos de datos basura ", memAfter)

console.log('Incremento:', (memAfter - memBefore) / 1024 / 1024, 'MB');

// Limpiar
cache.length = 0;
console.log('Cache limpiado');


console.log('\n=== EJERCICIO 4: GARBAGE COLLECTION MANUAL ===\n');

// // Ejercicio 4.1: 
// // (Requiere ejecutar: node --expose-gc script.js)
// // TODO:
if (global.gc) {
    const memInitial = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log('Memoria antes:', memInitial.toFixed(2), 'MB');
    let objectsCollection = [];
    for (let i = 0; i < 100; i++) {
        let objectData = {
            datos: new Array(10000).fill('datos'),
            timestamp: new Date(),
            id: Math.random()
        };
        objectsCollection.push(objectData)
    }
    const memAfterCreation = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log('Después de crear:', memAfterCreation.toFixed(2), 'MB');
    console.log("Datos agregados antes de ejecutar GC", memAfterCreation.toFixed(2) - memInitial.toFixed(2))

    // Ejecutar GC
    global.gc()
    const memAfterFirstGC = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log('Después de GC memoria:', memAfterFirstGC.toFixed(2), 'MB');
    // Limpiar
    /**Tener en cuenta que 
   Para un array de objetos cualquiera esta bien:
  
  objetos.length = 0; → vacía el array en sitio.
  objetos = null; → rompe la referencia completa (útil si no lo usarás más).
  Elige length = 0 array en uso  (reutilizable); o usar  = null si ya no se necesita.
  Para limpiar arrays es array  -> array.length = 0 o para objetos->  es objeto = null  esto rompe las referencias  y los datos siguen en el heap hasta que  se ejecute global.gc ahi se liberan esas direcciones de memoria 
  si no se ejecuta el global.gc() siguen sin liberar el espacio en el MEMORIA tener encuenta esto 
  */
    objectsCollection = null;
    global.gc()
    const memAfterCleanup = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log('Después de limpiar el objeto:', memAfterCleanup.toFixed(2), 'MB');
} else {
    console.log('Ejecuta con: node --expose-gc');
}
console.log('\n=== EJERCICIO 5: VARIABLES LOCALES VS GLOBALES ===\n');

function testLocal() {
  if (global.gc) global.gc();
  const memBeforeLocal = process.memoryUsage().heapUsed;
  
  {
    const bigArray = new Array(50000).fill('datos');
    const memWithArray = process.memoryUsage().heapUsed;
    console.log('Local - Con array:', (memWithArray - memBeforeLocal) / 1024, 'KB');
  }
  
  if (global.gc) global.gc();
  const memAfterLocalGC = process.memoryUsage().heapUsed;
  console.log('Local - Después GC:', (memAfterLocalGC - memBeforeLocal) / 1024, 'KB (liberado)');
}


let globalArray = null;
function testGlobal() {
  if (global.gc) global.gc(); 
  const memBeforeGlobal = process.memoryUsage().heapUsed;
  
  if (global.gc) global.gc();
  
  const memAfterGlobalGC = process.memoryUsage().heapUsed;
  console.log('Global - Diferencia:', (memAfterGlobalGC - memBeforeGlobal) / 1024, 'KB (NO se libera)');
}

testLocal();
testGlobal();
