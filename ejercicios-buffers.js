// =====================================
// EJERCICIOS DE BUFFERS EN NODE.JS
// =====================================
// 
// Instrucciones: Completa cada ejercicio siguiendo los comentarios
// Descomenta el código y completa lo que falta
// 

console.log('\n=== EJERCICIO 1: CREAR BUFFERS ===\n');

// Ejercicio 1.1: Crea un buffer desde la cadena 'Hola Node.js' en UTF-8
const utf8SourceString = Buffer.from("Hola Node.js","UTF-8")
// TODO: Crea la variable buffer1
// const buffer1 = 

// TODO: Imprime el buffer y su contenido como string
// console.log('Buffer:', ...);
// console.log('Contenido:', ...);

console.log("Buffer:",utf8SourceString)
console.log("Contenido:",utf8SourceString.toString())
// Ejercicio 1.2: Crea un buffer de 10 bytes vacío
// TODO:
// const emptyAllocationBuffer = 
const emptyAllocationBuffer = Buffer.alloc(10)
console.log("Esto es un buffer ",emptyAllocationBuffer)
// Ejercicio 1.3: Crea un buffer desde un array de códigos ASCII: [72, 101, 108, 108, 111]
// Pista: esos números forman "Hello"
// TODO:
 const asciiSourceBuffer = Buffer.from([72, 101, 108, 108, 111])


// Ejercicio 1.4: Imprime el contenido de asciiSourceBuffer como string
// TODO:
// console.log(...);
console.log("Esto es asciiSourceBuffer", asciiSourceBuffer.toString())
console.log('\n=== EJERCICIO 2: ESCRIBIR EN BUFFERS ===\n');

// Ejercicio 2.1: Crea un buffer de 30 bytes y escribe 'Node.js' en la posición 0
// TODO:
// const targetAllocationBuffer = 
// targetAllocationBuffer.write(...);
// console.log('Buffer escrito:', targetAllocationBuffer.toString('utf8'));
const targetAllocationBuffer = Buffer.alloc(30)
targetAllocationBuffer.write("Node js",0,"utf8")
console.log('Buffer escrito:', targetAllocationBuffer.toString('utf8'));

// Ejercicio 2.2: Crea un buffer de 8 bytes
// Escribe el número 50 en formato Big Endian en posición 0
// Escribe el número 200 en formato Little Endian en posición 4
// TODO:
const numberValueBuffer = Buffer.alloc(8)
numberValueBuffer.writeInt32BE(50,0);
numberValueBuffer.writeInt32LE(200,4);
console.log('Buffer con números:', numberValueBuffer);


console.log('\n=== EJERCICIO 3: LEER DE BUFFERS ===\n');

// Ejercicio 3.1: Crea un buffer desde 'Hola Mundo'
// Imprime:
// - Todo el contenido
// - Solo los primeros 4 caracteres (0 a 4)
// - El byte en la posición 0
// TODO:
// const readSourceBuffer = 
// console.log('Completo:', ...);
// console.log('Parcial:', ...);
// console.log('Byte 0:', ...);
const readSourceBuffer = Buffer.from("Hola Mundo")

console.log('Lectura completa:', readSourceBuffer.toString());
console.log('Lectura parcial (0-4):', readSourceBuffer.toString('utf8', 0, 4));
console.log('Lectura de byte en posición 0:', readSourceBuffer[0]);

console.log('\n=== EJERCICIO 4: CONCATENAR BUFFERS ===\n');

// Ejercicio 4.1: Crea 3 buffers:
// - firstSourceBuffer con 'JavaScript'
// - separatorBuffer con ' es '
// - adjectiveBuffer con 'genial'
// Luego concatena todos y imprime el resultado
// TODO:
const firstSourceBuffer = Buffer.from('JavaScript')
const separatorBuffer = Buffer.from(' es ')
const adjectiveBuffer = Buffer.from('genial')
const concatenatedBuffer = Buffer.concat([firstSourceBuffer,separatorBuffer,adjectiveBuffer]);
console.log('Buffers concatenados:', concatenatedBuffer.toString());


console.log('\n=== EJERCICIO 5: COMPARAR BUFFERS ===\n');

// Ejercicio 5.1: Crea dos buffers iguales y uno diferente
// Usa .equals() para compararlos
// Usa .compare() para compararlos
// TODO:
const firstComparisonBuffer = Buffer.from('JavaScript')
const secondComparisonBuffer = Buffer.from('JavaScript')
const differentComparisonBuffer = Buffer.from(' es ')
console.log('¿iguales:', firstComparisonBuffer.equals(secondComparisonBuffer));
console.log('comparar:', firstComparisonBuffer.equals(differentComparisonBuffer));
console.log('comparar:', firstComparisonBuffer.compare(differentComparisonBuffer));


console.log('\n=== EJERCICIO 6: COPIAR BUFFERS ===\n');

// Ejercicio 6.1: Crea un buffer 'Original'
// Copia su contenido a otro buffer
// Imprime ambos
// TODO:

const sourceOriginalBuffer = Buffer.from('Original');
const destinationCopyBuffer = Buffer.alloc(sourceOriginalBuffer.length);
sourceOriginalBuffer.copy(destinationCopyBuffer);
console.log('Original:', sourceOriginalBuffer.toString());
console.log('Copia:', destinationCopyBuffer.toString());

// Ejercicio 6.2: Copia solo los primeros 3 bytes de 'Copiado' a un nuevo buffer
// TODO:
const partialSourceBuffer = Buffer.from('Copiado')
const partialDestinationBuffer = Buffer.alloc(partialSourceBuffer.length);
partialSourceBuffer.copy(partialDestinationBuffer)
console.log('Copia parcial:',partialDestinationBuffer.toString("utf-8"));


console.log('\n=== EJERCICIO 7: MÉTODOS ÚTILES ===\n');

// Ejercicio 7.1: Crea un buffer con 'Node.js Framework'
// Usa los métodos:
// - .length para obtener el tamaño
// - .indexOf() para encontrar 'Framework'
// - .includes() para verificar si contiene 'Node'
// - .slice() para obtener 'Node'
// TODO:
const frameworkSourceBuffer = Buffer.from('Node.js Framework')
console.log('Longitud:',frameworkSourceBuffer.length);
console.log('Índice de Framework:',frameworkSourceBuffer.indexOf("Framework"));
console.log('¿Contiene Node?:', frameworkSourceBuffer.includes("Node"));
const slicedContent = frameworkSourceBuffer.toString('utf-8').slice(0,4)
console.log('Slice 1 :',slicedContent);


console.log('\n=== EJERCICIO 8: ENCODINGS (CODIFICACIONES) ===\n');

// Ejercicio 8.1: Crea un buffer con el texto 'Hola' en UTF-8
// Convierte a Base64 y Hex
// Decodifica desde Base64 de vuelta a UTF-8
// TODO:
const sourceText = 'Hola';
const utf8Buffer = Buffer.from(sourceText,"utf8")
const base64Encoded = utf8Buffer.toString('base64')
const hexEncoded = utf8Buffer.toString('hex')
console.log('UTF-8:', utf8Buffer);
console.log('Base64:', base64Encoded);
console.log('Hex:', hexEncoded);
console.log('Decodificado:', Buffer.from(base64Encoded, 'base64').toString('utf8'));


console.log('\n=== EJERCICIO 9: BUFFER Y MEMORIA ===\n');

// Ejercicio 9.1: Obtén información de memoria del proceso
// Imprime:
// - RSS (Resident Set Size)
// - Heap Total
// - Heap Used
// Todos en MB
// TODO:
// const currentMemoryUsage = 
// console.log('RSS:', ...);
// console.log('Heap Total:', ...);
// console.log('Heap Used:', ...);
const currentMemoryUsage = process.memoryUsage()
console.log("Esto es memory que se esta usando",currentMemoryUsage)
console.log('RSS:', currentMemoryUsage.rss);
console.log('Heap Total:',currentMemoryUsage.heapTotal);
console.log('Heap Used:',currentMemoryUsage.heapUsed);

// Ejercicio 9.2: Crea un buffer de 5 MB
// Mide la memoria antes y después
// Calcula el incremento
// TODO:
// const beforeAllocationMemory = 
// const largeAllocationBuffer = 
// const afterAllocationMemory = 
// console.log('Incremento:', ...);
// Crear un buffer grande
const beforeAllocationMemory = process.memoryUsage();
console.log('Antes de crear buffer de 5MB:',beforeAllocationMemory);

const largeAllocationBuffer = Buffer.alloc(1024 * 1024 * 5); // 5 MB
console.log('Después de crear buffer de 5MB:',beforeAllocationMemory);
console.log('  Heap Used:', Math.round(beforeAllocationMemory.heapUsed / 1024 / 1024) + ' MB');

console.log('\n=== EJERCICIO 10: DESAFÍO - CONVERSIÓN DE DATOS ===\n');

// Ejercicio 10 (Desafío): 
// 1. Crea un objeto: { nombre: 'Juan', edad: 25 }
// 2. Conviértelo a string JSON
// 3. Crea un buffer desde ese JSON
// 4. Convierte el buffer a Base64
// 5. Decodifica de Base64 de vuelta a string
// 6. Parsea el JSON para obtener el objeto original
// TODO: (Escribe todo el código)
let sourceObjectData = {nombre: 'Juan', edad : 25}
let jsonStringified = JSON.stringify(sourceObjectData)
console.log("Esto es sourceObjectData",sourceObjectData)
let jsonSourceBuffer = Buffer.from(jsonStringified,"utf8")
console.log("Esto es jsonSourceBuffer en utf8",jsonSourceBuffer)

let base64EncodedBuffer = jsonSourceBuffer.toString("base64")
console.log("Esto es base64EncodedBuffer en base 64",base64EncodedBuffer)
let decodedObjectData = JSON.parse(Buffer.from(base64EncodedBuffer,"base64").toString("utf8"))
console.log("Decoded:",decodedObjectData)

console.log('\n=== FIN DE EJERCICIOS DE BUFFERS ===\n')