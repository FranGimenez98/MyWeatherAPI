const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');


window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
})


function buscarClima (e) {
    e.preventDefault();
    //Validacion
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad === '' || pais === ''){
        mostrarError('Ambos campos son obligatorios.')

        return;
    }
    
    buscarAPI(ciudad,pais);
}


function mostrarError (mensaje){
    console.log(mensaje)
    //Alerta
    const alerta = document.createElement('div');
    alerta.classList.add('bg-red-700', 'border-red-200','text-white','px-4','py-3','rounded-xl','max-w-md','mx-auto','mt-6','text-center',);

    alerta.innerHTML = `
        <strong class="font-bold">¡Error!</strong>
        <span class="block">${mensaje}</span>
    `;

    container.appendChild(alerta)

    setTimeout(() => {
        alerta.remove();
    }, 3000); 
}


function buscarAPI (ciudad, pais){
    const appId = 'e0dec57865b48a25ed488887264127ad';
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    spinner();
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            limpiarHTML();//Limpiar html previo
            if(datos.cod === "404"){
                mostrarError('Ciudad no encontrada.')
                return;
        
            }

            //Imprime la respuesta en el HTML
            mostrarClima(datos);
        })
}


function mostrarClima(datos){
    const {name, main:{temp, temp_max , temp_min, humidity }} = datos;

    const centigrados = kelvinToCentigrade(temp);
    const max = kelvinToCentigrade(temp_max);
    const min = kelvinToCentigrade(temp_min);


    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `Clima en ${name}:`;
    nombreCiudad.classList.add('font-bold','text-2xl');

    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados}&#8451;`;
    actual.classList.add('font-bold','text-6xl');

    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = `max: ${max}&#8451;`;
    tempMaxima.classList.add('text-xl','m-1');

    const tempMin = document.createElement('p');
    tempMin.innerHTML = `min: ${min}&#8451;`;
    tempMin.classList.add('text-xl','m-1');

    const humedad = document.createElement('p');
    humedad.textContent = `humedad: ${humidity}%`;
    humedad.classList.add('text-xl','m-1')

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center','text-white');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMin);
    resultadoDiv.append(humedad);
    resultado.appendChild(resultadoDiv);
}

//Kelvin a grados centigrados
function kelvinToCentigrade (grados){
    return parseInt(grados-273.15);
}

/*function mostrarHumedad (){
    const humedad = document.createElement('p');
    humedad.
}*/

//Limpiar HTML
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function spinner (){

    limpiarHTML();

    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-circle');
    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-child"></div>
        <div class="sk-circle2 sk-child"></div>
        <div class="sk-circle3 sk-child"></div>
        <div class="sk-circle4 sk-child"></div>
        <div class="sk-circle5 sk-child"></div>
        <div class="sk-circle6 sk-child"></div>
        <div class="sk-circle7 sk-child"></div>
        <div class="sk-circle8 sk-child"></div>
        <div class="sk-circle9 sk-child"></div>
        <div class="sk-circle10 sk-child"></div>
        <div class="sk-circle11 sk-child"></div>
        <div class="sk-circle12 sk-child"></div>
    `;
    resultado.appendChild(divSpinner);
}

