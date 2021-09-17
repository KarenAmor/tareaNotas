const fs = require('fs');
const readline = require('readline'); //modificado
const rl = require('readline-sync'); // modificado

const listar = (data) => {
    data.forEach(element => {
        console.log(`La tarea ${element.titulo} esta ${element.estado}`)
    });
}

const escribir = (databases) =>{
        let arrays = ["titulo", "estado"];
        let resultado = []
        for(let i=0;i<2;i++) {
            resultado.push(rl.question(`Ingrese un ${arrays[i]}:`));
        }
        console.log(`,{"titulo":${resultado[0]}","estado":"${resultado[1]}"}`) 
        let data = {titulo:resultado[0],estado:resultado[1]} //modificado
        //data = JSON.parse(data) // agregado: convertimos a JSON el string
        databases.push(data) // agregado: agregamos a nuestro archivo actual
        let json_data = JSON.stringify(databases, null, 4);
        fs.writeFileSync('./tareas.json', json_data); // sobreescribimos el archivo
};
const tareas = require ('./tareas.json') 

const comando = process.argv[3]
const filtrarPorEstado = tareas.filter ((item)=> item.estado==comando)
 

fs.readFile('./tareas.json', 'utf8', (err, data) => {
    const databases = JSON.parse(data);
    switch (process.argv[2]) {
        case "listar":
            listar (databases)
            break;
        case "escribir":
            escribir(databases)
            break;
        case "filtrar":
            console.log(filtrarPorEstado)
            break
        case undefined:
            console.log("No entiendo qué quieres hacer.");
            break;
        default:
            console.log("Atencion tienes que pasar un archivo");
    }       
});
