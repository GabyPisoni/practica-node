// =====================================
// EJERCICIOS DE STREAMS EN NODE.JS
// =====================================
//
const fs = require('fs');
const path = require('path');

console.log('\n=== EJERCICIO 1: READABLE STREAM ===\n');

// Ejercicio 1.1: Crea un archivo de prueba 'test.txt' con contenido
// Luego lee el archivo usando fs.createReadStream()
// Imprime cada chunk que llega
// 2. Crea un readable stream
// 3. Escucha el evento 'data'
// 4. Escucha el evento 'end'

// TODO:
const sourceTestFile = path.join(__dirname, 'test.txt');
fs.writeFileSync(sourceTestFile, "nuevo contenido de prueba\n".repeat(60));

const readInputStream = fs.createReadStream(sourceTestFile, { encoding: 'utf8' });
readInputStream.on('data', (chunk) => {
  console.log('Chunk recibido:', chunk);
});
readInputStream.on('end', () => {
  console.log('Finalizo la lectura.');
});


console.log('\n=== EJERCICIO 2: WRITABLE STREAM ===\n');

// Ejercicio 2.1: Crea un writable stream para escribir en 'output.txt'
// Escribe 5 líneas de texto usando stream.write()
// Imprime si el buffer está disponible después de cada escritura
// TODO:
const outputTestFile = path.join(__dirname, "output.txt")
let writeOutputStream = fs.createWriteStream(outputTestFile)
console.log("Escribiendo lineas en el archivo ")

for (let i = 1; i <= 10; i++) {
  const canWrite = writeOutputStream.write(`Línea  NRO ${i}: Hola soy un dato\n`);
  console.log(`Línea   NRO ${i} escrita. ¿Libre el buffer?:`, canWrite);
}
writeOutputStream.on('finish', (chunck) => {
  console.log("Termino", chunck)
});
writeOutputStream.end();


console.log('\n=== EJERCICIO 3: PIPE (Conectar Streams) ===\n');

// Ejercicio 3.1: Copia un archivo usando pipe
// Lee de 'test.txt' y escribe en 'test-copia.txt'
// TODO:
// 1. Definimos las rutas
const sourcePath = path.join(__dirname, 'datos.txt');
const destinationPath = path.join(__dirname, 'datos-copia.txt');

// 2. Verificamos si el archivo de ORIGEN existe. Si no, lo creamos.
if (!fs.existsSync(sourcePath)) {
  console.log("El archivo de origen no existe. Creándolo...");
  fs.writeFileSync(sourcePath, 'Contenido para copiar con pipe\n'.repeat(50));
}

// 3. Creamos los Streams
const sourceCopyInputStream = fs.createReadStream(sourcePath);
const destinationCopyOutputStream = fs.createWriteStream(destinationPath);

// 4. Conectamos la lectura con la escritura mediante pipe
sourceCopyInputStream.pipe(destinationCopyOutputStream);

// 5. Manejo de eventos
sourceCopyInputStream.on('end', () => {
  console.log("Lectura finalizada.");
});

destinationCopyOutputStream.on('finish', () => {
  // Evitamos imprimir 'writeStream' entero porque es un objeto interno de Node muy pesado.
  console.log(`Copia finalizada con éxito en: ${destinationPath}`);
  console.log(`Bytes escritos: ${destinationCopyOutputStream.bytesWritten}`);
});

destinationCopyOutputStream.on('error', (err) => {
  console.error("Error en la escritura:", err);
});
console.log('\n=== EJERCICIO 4: TRANSFORM STREAM ===\n');

// Ejercicio 4.1: Crea un transform stream que convierte a mayúsculas

const { Transform, pipeline } = require('stream');

// Stream personalizado que convierte a mayúsculas
const uppercaseTransformStream = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});

// Stream personalizado que agrega número de línea
const lineNumberTransformStream = new Transform({
  lineNumber: 0,
  transform(chunk, encoding, callback) {
    const lines = chunk.toString().split('\n');
    const numbered = lines.map(line => {
      if (line.trim()) {
        this.lineNumber++;
        return `${this.lineNumber}: ${line}`;
      }
      return line;
    }).join('\n');
    this.push(numbered);
    callback();
  }
});

const sourceProcessFile = path.join(__dirname, 'datos.txt');
const destinationProcessFile = path.join(__dirname, 'datos-procesados.txt');

console.log('Leyendo, transformando y escribiendo...\n');

fs.createReadStream(sourceProcessFile)
  .pipe(uppercaseTransformStream)
  .pipe(lineNumberTransformStream)
  .pipe(fs.createWriteStream(destinationProcessFile))
  .on('finish', () => {
    console.log('Archivo procesado exitosamente (datos-procesados.txt)\n');
  });

console.log('\n=== EJERCICIO 5: BACK PRESSURE (Presión en Buffer) ===\n');

// Ejercicio 5.1: Escribe muchos datos y monitorea el back pressure
// Escribe 100 líneas y observa cuando el buffer se llena
// TODO:
// const pressureBufferFile = path.join(__dirname, "pressureBuffer.txt")
// const pressureOutputStream = fs.createWriteStream(pressureBufferFile, {
//   highWaterMark: 1024
// })
// let lineCounter = 0;

// const writeData = () => {
//   let canContinue = true;
//   while (lineCounter < 100 && canContinue) {
//     const data = `Línea ${lineCounter}: Datos de prueba para back pressure\n`
//     canContinue = pressureOutputStream.write(data.repeat(100))
//     lineCounter++;
    
//     if (!canContinue) {
//       console.log(`Buffer lleno en línea ${lineCounter}`);
//     }
//   }
  
//   if (lineCounter >= 100) {
//     pressureOutputStream.end();
//   }
// };

// pressureOutputStream.on('drain', () => {
//   console.log('Buffer drenado, continuando escritura...');
//   writeData();
// });

// writeData();


console.log('\n=== EJERCICIO 6: PIPELINE (Forma Moderna) ===\n');

// Ejercicio 6.1: Usa pipeline() para conectar streams de forma segura
// Lee test.txt -> transforma a mayúsculas -> escribe en output-pipe.txt
// TODO:
console.log('=== 7. PIPELINE (Forma Moderna) ===\n');



const sourcePipelineFile = path.join(__dirname, 'datos.txt');
const destinationPipelineFile = path.join(__dirname, 'datos-final.txt');

const uppercaseTransformStream2 = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});

console.log('Conectando streams con pipeline...\n');

pipeline(
  fs.createReadStream(sourcePipelineFile),
  uppercaseTransformStream2,
  fs.createWriteStream(destinationPipelineFile),
  (error) => {
    if (error) {
      console.error('Pipeline error:', error);
    } else {
      console.log('Pipeline completado\n');
    }
  }
);
console.log('\n=== EJERCICIO 7: MÚLTIPLES TRANSFORMS ===\n');

// Ejercicio 7.1: Crea 2 transform streams:
// 1. numerar: Agrega número de línea
// 2. mayusculas: Convierte a mayúsculas
// Conecta: read -> numerar -> mayusculas -> write
// TODO:
const lineNumberTransformStream2 = new Transform({
  lineNumber: 0,
  transform(chunk, encoding, callback) {
    console.log("Esto es chunk", chunk)
    const numbered = chunk
      .toString()
      .split('\n')
      .map(line => {
        if (line.trim()) {
          this.lineNumber += 1;
          return `${this.lineNumber}: ${line}`;
        }
        return line;
      })
      .join('\n');
    this.push(numbered);
    callback();
  }
});

const uppercaseTransformStream3 = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});

fs.createReadStream('test.txt')
  .pipe(lineNumberTransformStream2)
  .pipe(uppercaseTransformStream3)
  .pipe(fs.createWriteStream('output-transformado.txt'))
  .on('finish', () => {
    console.log('Transformación completada: output-transformado.txt');
  });
console.log("Termino de agregar numeros y convertir string a mayusculas")



console.log('\n=== EJERCICIO 8: CREAR DATOS GRANDES CON STREAM ===\n');
function generateStringSimple(long) {
  return Math.random().toString(36).substring(2, 2 + long);
}

// Ejercicio 8: Crea un generador de datos
// Escribe 1000 líneas aleatorias en un archivo usando stream
// TODO:
const bigDataFile = path.join(__dirname, 'bigData.txt');
const bigDataOutputStream = fs.createWriteStream(bigDataFile);

for (let i = 0; i < 1000; i++) {
  const randomData = generateStringSimple(i)
  bigDataOutputStream.write(randomData + '\n');
}

bigDataOutputStream.on('finish', () => {
  const stats = fs.statSync(bigDataFile);
  console.log(`Archivo grande generado en ${bigDataFile} (${stats.size} bytes)`);

});

bigDataOutputStream.end();

console.log('\n=== EJERCICIO 9: DESAFÍO - PROCESAR CSV ===\n');

// Ejercicio 9 (Desafío):
// 1. Crea un archivo CSV simple con 3 registros:
//    id,nombre,edad
//    1,Juan,25
//    2,Salvio,30
//    3,Carlos,35
//
// 2. Crea un transform stream que:
//    - Parsea cada línea del CSV
//    - Crea objetos JSON
//    - Filtra solo mayores de 26 años
//
// 3. Escribe los resultados en 'output-csv.json'
//
// TODO: Implementa todo el código aquí


let csvOutputStream = fs.createWriteStream("./streamWithData.csv", { encoding: 'utf8' })

const csvHeaders = ["id", "nombre", "edad"]
const csvData = [
  [1, "Juan", 25],
  [2, "Salvio", 30],
  [3, "Carlos", 35]]

csvOutputStream.write(csvHeaders.join(';') + '\n', 'utf8');

csvData.forEach((row) => {
  csvOutputStream.write(row.join(';') + '\n', 'utf8');
});


csvOutputStream.on('finish', () => {
    console.log('CSV creado exitosamente: streamWithData.csv')
}).on('error', (err) => {
    console.log(err)
})
console.log('\n=== FIN DE EJERCICIOS DE STREAMS ===\n');
csvOutputStream.end()
