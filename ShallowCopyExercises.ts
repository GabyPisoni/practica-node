import * as lodash from "lodash";
// ============================================
// EJERCICIOS: COPIAS DE OBJETOS Y ARRAYS
// ============================================

console.log("========== EJERCICIO 1: PRIMITIVOS ==========");
// Los primitivos siempre se copian por valor (son independientes)
// CONSIGNA: Crea dos variables con números, asigna num1 a num2, modifica num2
// ¿Qué pasa con num1? ¿Se modifica?

let num1: number = 10;
let num2: number = num1;
num2 = 20;
console.log("Este es number 1",num1);
console.log("Este es number 2",num2);

// TODO: Imprime num1 y num2 aquí
// TODO: ¿Son independientes o apuntan a lo mismo? Son independientes


console.log("\n========== EJERCICIO 2: OBJETOS - COPIA POR REFERENCIA ==========");
// CONSIGNA: Crea un objeto user1, asigna user1 a user2 (SIN spread operator)
// Modifica user2.name
// ¿Qué pasa con user1.name? ¿Por qué?

interface User {
  name: string;
  age: number;
}

let user1: User = {name: "Luis", age : 34};
let user2: User = user1;
user2.name = "Jose";
console.log("Esto es user1",user1);

console.log("Esto es user2",user2);

// TODO: Imprime user1.name y user2.name
// TODO: ¿user1 === user2? ¿Por qué? Verdadero por que si hizo una copia por referencia


console.log("\n========== EJERCICIO 3: SHALLOW COPY CON SPREAD {...} ==========");
// CONSIGNA: Crea person1, usa {...person1} para copiar en person2
// Modifica person2.name
// ¿Qué pasa con person1? ¿Es diferente al ejercicio 2? Si es diferente por que esta copia es por valor

let person1: User = { name: "Ana", age: 25 };
let person2: User = { ...person1 }; // ← ¿Qué tipo de copia es esta? Copia por valor

person2.name = "Maria";
console.log("Esto es person1",person1);

console.log("Esto es person2",person2);

// TODO: Imprime person1.name y person2.name
// TODO: ¿person1 !== person2? ¿Por qué es diferente al ejercicio 2? Son diferentes por que esta copia es por valor por lo cual son independientes


console.log("\n========== EJERCICIO 4: SHALLOW COPY - PROBLEMA CON ANIDADOS ==========");
// CONSIGNA: Crea employee1 con un objeto anidado (address)
// Copia con {...employee1} en employee2
// Modifica employee2.address.city
// ¿Qué pasa con employee1.address.city? ¿Por qué?

interface UserWithAddress extends User {
  address?: { city: string; zip: number };
}

// let employee1: UserWithAddress = {
//   name: "Carlos",
//   age: 35,
//   address: { city: "Madrid", zip: 28001 }
// };
let employee1: UserWithAddress = {
  name: "Nico",
  age : 23,
  address: {city: "Valencia", zip: 20232}
};
let employee2: UserWithAddress = {...employee1};
employee2.name = "Luis"; // Modifica propiedad simple
employee2.address!.city = "Barcelona"; // Modifica propiedad anidada

// TODO: Imprime employee1.name y employee2.name
// TODO: Imprime employee1.address?.city y employee2.address?.city
// TODO: ¿Por qué se comportan diferente? ¿Qué es shallow copy? Por que el shallow copy es copia por valor pero para objetos simples no para objetos un poco mas complejos o anidados hay diferentes tecnicas de copia entonces al ser anidado copio por referencia (direccion de memoria)
console.log("Esto es empleado 1",employee1.name , employee1.address?.city);

console.log("Esto es empleado 2",employee2.name , employee2.address?.city);



console.log("\n========== EJERCICIO 5: DEEP COPY CON JSON ==========");
// CONSIGNA: Crea student1 con objeto anidado
// Copia con JSON.parse(JSON.stringify()) en student2
// Modifica student2.address.city
// ¿Qué pasa con student1? ¿Es diferente al ejercicio 4?

let student1: UserWithAddress = {
  name: "Max",
  age: 22,
  address: { city: "Barcelona", zip: 46000 }
};



let student2: UserWithAddress = JSON.parse(JSON.stringify(student1));
student2.name = "Lucio";
student2.address!.city = "Bilbao";
console.log("Esto es student1", student1.name);
console.log("Esto es student2", student2.name);
console.log("Esto es student1.address?.city", student1.address?.city);
console.log("Esto es student2.address?.city", student2.address?.city);

// TODO: Imprime student1.name y student2.name
// TODO: Imprime student1.address?.city y student2.address?.city
// TODO: ¿Qué diferencia hay con el ejercicio 4? ¿Por qué? Son independientes por que esta copia la hizo por valor y no por referencia eso permite que no haya problemas o se pisen datos en memoria


console.log("\n========== EJERCICIO 6: DEEP COPY CON structuredClone ==========");
// CONSIGNA: Crea teacher con objeto anidado
// Copia con structuredClone() en teacherCopy
// Modifica teacherCopy
// ¿Qué pasa con teacher? ¿Cuál es la diferencia con JSON.parse()? Se hacen las copias por valor

let teacher : UserWithAddress = {name:"Julio", age:34, address:{city:"Londres",zip:231412}}
let teacherCopy: UserWithAddress = structuredClone(teacher); // ¿Qué tipo de copia es?

teacherCopy.name = "Roberto";
teacherCopy.address!.city = "Malaga";

console.log("Teacher ", teacher.name, teacher.address?.city);

console.log("Teacher Copy", teacherCopy.name, teacherCopy.address?.city);
// TODO: Imprime teacher.name y teacherCopy.name
// TODO: Imprime teacher.address?.city y teacherCopy.address?.city
// TODO: ¿Cuál es la diferencia entre JSON.parse() y structuredClone()?
/** La diferencia es que jsonparse serializa a texto json y vuelve a crear el objetoy pierde  referencias en  datos complejos ,
 *  en cambio structuredclone te hace la copia con  estructuras de datos complejas  */

console.log("\n========== EJERCICIO 7: ARRAYS - COPIA POR REFERENCIA ==========");
// CONSIGNA: Crea arr1 con números, asigna arr1 a arr2 (SIN spread)
// Modifica arr2[0]
// ¿Qué pasa con arr1[0]?
let arr1: number[] = [1,2,3];

let arr2: number[] = arr1;
// ¿Qué tipo de asignación es? Es por referencia

arr2[0] = 99;
console.log("Esto es arr1", arr1, "Esto arr2",arr2);
// TODO: Imprime arr1 y arr2
// TODO: ¿arr1 === arr2? ¿Por qué? Son iguales por que la copia se hizo por referencia (dir memoria)


console.log("\n========== EJERCICIO 8: ARRAYS - SHALLOW COPY CON [...] ==========");
// CONSIGNA: Crea numberArr1 con números, copia con [...numbers1] en numberArr2
// Modifica numberArr2[0]
// ¿Qué pasa con numberArr1?

let numberArr1: number[] = [20,30,40];
let numberArr2: number[]= [...numberArr1]; // ¿Qué tipo de copia es? Shallow copy es decir copia por contenido
numberArr2[0] = 99;
console.log("Esto es numberArr1", numberArr1,"Esto es numberArr2",numberArr2);
// TODO: Imprime numberArr1 y numberArr2
// TODO: numberArr1 !== numberArr2? ¿Por qué es diferente al ejercicio 7? Por que la copia se hizo por valor y no por referencia eso hace que  sean independientes entre si 


console.log("\n========== EJERCICIO 9: ARRAYS CON OBJETOS - SHALLOW COPY PROBLEM ==========");
// CONSIGNA: Crea products1 array con objetos, copia con [...products1] en products2
// Modifica products2[0].name
// ¿Qué pasa con products1[0].name? ¿Por qué?
// Luego: Modifica products2[0] = nuevo objeto
// ¿Qué pasa con products1[0]?

interface Product {
  id: number;
  name: string;
  price: number;
}

let products1: Product[] = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Mouse", price: 25 }
];

let products2: Product[] = [...products1]; // ¿Qué tipo de copia es para objetos dentro? Error de shallow copy

products2[0].name = "Desktop"; // Modifica propiedad del objeto
products2[0] = { id: 3, name: "Teclado", price: 50 }; // Reemplaza el objeto
console.log("esto es products1",products1[0].name, products1.length);
console.log("esto es products2",products2[0].name, products2.length);
// TODO: Imprime products1[0].name y products2[0].name
// TODO: Imprime products1.length y products2.length
// TODO: ¿Por qué se comportan diferente? ¿Qué es shallow copy para arrays?cuando copias un array con objetos dentro con spread solo copias el array pero los objetos dentro siguen siendo referencias a los mismos objetos en memoria excepto por el array si cambiamos el objeto completo en products2 no afecta a products1


console.log("\n========== EJERCICIO 10: ARRAYS CON OBJETOS - DEEP COPY ==========");
// CONSIGNA: Crea items1 array con objetos, copia con JSON.parse(JSON.stringify())
// Modifica items2[0]
// ¿Qué pasa con items1[0]? ¿Es diferente al ejercicio 9? Si por que esta copia es por valor

let items1: Product[]= [{id:3,price:150, name:"Teclado"},{id:4, price:90, name:"Auriculares"}];

let items2: Product[] =JSON.parse(JSON.stringify(items1)); // ¿Qué tipo de copia es? Por valor 

items2[0].name = "Monitor 4K";
items2[0].price = 400;
// items2[0] = { id: 7, name: "CPU", price: 5000 };

console.log("Esto es items1",items1[0].name, items1[0].price);
console.log("Esto es items2",items2[0].name, items2[0].price);
// TODO: Imprime items1[0].name e items1[0].price
// TODO: Imprime items2[0].name e items2[0].price
// TODO: ¿Qué diferencia hay con el ejercicio 9? ¿Por qué? los objetos de items1 y items2 son independientes por que la copia se hizo por valor y no por referencia


console.log("\n========== EJERCICIO 11: LODASH MERGE Y CLONE ==========");
// Requisitos: npm install lodash @types/lodash
// Objetivo: practicar merge profundo y cloneDeep con objetos anidados

let lodashLib = lodash;

if (lodashLib) {
  const originalProfile = {
    name: "Sofía",
    age: 29,
    address: { city: "Córdoba", country: "AR" },
    skills: ["JS", "TS"],
  };

  const overrideProfile = {
    age: 30,
    address: { city: "Madrid" },
    skills: ["Node"],
  };

  const mergedProfile = lodashLib.merge({}, originalProfile, overrideProfile);
  const deepCloned = lodashLib.cloneDeep(originalProfile);

  // Mutamos estructuras para ver independencia
  mergedProfile.skills.push("React"); // merge mantiene la referencia del array interno
  deepCloned.address.city = "Sevilla"; // cloneDeep es independiente del original

  console.log("Original", originalProfile);
  console.log("Merge (profundo)", mergedProfile);
  console.log("CloneDeep (independiente)", deepCloned);
}
/**
 * Exacto, es una buena forma de verlo, pero no es una intersección completa. Es más bien:

merge() = fusión donde el segundo objeto sobrescribe coincidencias

Con arrays, se comporta así:

Compara índice por índice
Si ambos tienen elemento en el mismo índice → el segundo reemplaza al primero
Si el primero tiene más elementos → se mantienen
Si el segundo tiene más elementos → se añaden
 */

console.log("\n========== RESUMEN RÁPIDO ==========");
// TODO: Completa estas oraciones después de resolver todos los ejercicios:
// 1. Los primitivos siempre se copian por: _________________
// 2. Un objeto SIN spread se copia por: _________________
// 3. Un objeto CON {...} se copia por: _________________ (pero solo nivel superior)
// 4. Los objetos anidados con {...} se copian por: _________________
// 5. JSON.parse(JSON.stringify()) hace una: _________________ copy
// 6. structuredClone() hace una: _________________ copy
// 7. Un array SIN spread se copia por: _________________
// 8. Un array CON [...] se copia por: _________________ (pero solo el array)
// 9. Los objetos dentro de un array CON [...] se copian por: _________________
// 10. Para hacer una copia completamente independiente de objetos y arrays usa: _________________
