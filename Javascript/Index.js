// MENU DESPLEGABLE

var nav = document.querySelector("#nav");
var open = document.querySelector("#open");
var close = document.querySelector("#close");

open.addEventListener("click", () => {
    nav.classList.add("visibility");
})

close.addEventListener("click", () => {
    nav.classList.remove("visibility");
})



let fechaBase
let eventos = []
let container = document.getElementById("category")
let arrayFiltro = []
var formulario = document.getElementById("form")
var estadisticas = document.getElementById("statss")
var cardContainer = document.getElementById("card-container")
var searchContainer = document.getElementById("search-container")
var inputSearch = document.getElementById("inputSearch")
let checkedCheckboxes = []//Se crea un array vacio que guarda los datos de los checkbox con la condicion TRUE
let search = ""
var buttonNavTitle = []

async function getData(){
    let datosApi
    await fetch("https://amd-amazingevents-api.onrender.com/api/eventos")
    .then(response => response.json())
    .then(json => datosApi = json)

    eventos =  datosApi.eventos
    fechaBase = datosApi.fechaActual

    rutasPaginas()

}

getData()

var buttonNav = document.getElementsByClassName("navLink") //Crea un boton que toma la clase navLink
for (var i = 0; i < buttonNav.length; i++) { //Recorre la clase NavLink y cuando escucha el click, captura la clase
    var element = buttonNav[i];
    buttonNavTitle.push(buttonNav[i].innerText)
    element.addEventListener("click", function (e) {
        imprimir(e.target.id)
    })
}

function imprimir(id){ //Compara la expresión y si la consigue rompe, sino, continua hasta el default

    switch (id) {

        case "upcomingEvents":
            let upcomingEvents = eventos.filter(evento => evento.date > fechaBase)
            document.getElementById("title").innerHTML = "Eventos Futuros"
            arrayFiltro = upcomingEvents
            cardContainer.style.display = "flex"
            searchContainer.style.display = "flex"
            formulario.style.display = "none"
            estadisticas.style.display = "none"
            inputSearch.value = ""
            checkedCheckboxes = []
            checkboxListener(upcomingEvents)
            // eventsCategories(upcomingEvents)
            display(upcomingEvents);
            break;
            
        case "pastEvents":
            let pastEvents = eventos.filter(evento => evento.date < fechaBase)
            document.getElementById("title").innerHTML = "Eventos Pasados"
            cardContainer.style.display = "flex"
            searchContainer.style.display = "flex"
            formulario.style.display = "none"
            estadisticas.style.display = "none"
            arrayFiltro = pastEvents
            inputSearch.value = ""
            checkedCheckboxes = []
            checkboxListener(pastEvents)
            // eventsCategories(pastEvents)
            display(pastEvents);
            break;
        case "contact":
            document.getElementById("title").innerHTML = "Contacto"
            searchContainer.style.display = "none"
            cardContainer.style.display = "none"
            estadisticas.style.display = "none"
            formulario.style.display = "flex"
            formulario.innerHTML =
            `
                  <form>
                      <div>
                        <label for="name">Nombre y Apellido</label>
                        <input type="text" id="name" placeholder="Ingrese Nombre y Apellido">
                      </div>
                      <div>
                        <label for="email">E-Mail</label>
                        <input type="email" id="email" placeholder="Ingrese E-Mail">
                      </div>
                      <div>
                        <label for="text">Mensaje</label>
                        <textarea name="message" id="text" placeholder="Ingrese Mensaje"></textarea>
                      </div>
                      <div class="buttonSend">
                        <button type="submit" value="submit" id="enviar">Enviar</button>
                      </div>
                  </form>
                  <div id="modal" class="modal">
                    <div class="modal-content">
                    <button type="submit" value="submit" id="enviar" class="closeModal">X</button>
                      <p>¡Gracias por comunicarte con nosotros!</p>
                    </div>
                  </div>
              </section>
            `
            let form = document.querySelector("form")
            const modal = document.getElementById("modal")
            const cerrar = document.querySelector('.closeModal')
            form.addEventListener("submit", (event)=>{actionForm(event)
            modal.style.display = "flex"
            })
      
            function modalForm(){
              modal.style.display = "none";
              location.reload()
            }

            cerrar.addEventListener("click", modalForm);
      
            window.addEventListener("click", (event)=>{
              if(event.target == modal){
              modal.style.display = "none"
              }
            })
            break;
        case "stats":
            document.getElementById("title").innerHTML = "Estadísticas"
            searchContainer.style.display = "none"
            cardContainer.style.display = "none"
            formulario.style.display = "none"
            estadisticas.style.display = "flex"
            estadisticas.innerHTML =
                `
                <table class="table">
                        <tr>
                            <th colspan="3" class="title">Estadisticas de Eventos</th>
                        </tr>
                        <tr>
                            <th class="subtitle">Evento con Mayor Porcentaje de Asistencia</th>
                            <th class="subtitle">Evento con Menor Porcentaje de Asistencia</th>
                            <th class="subtitle">Evento de Mayor Capacidad</th>
                        </tr>
                        <tr id="estadisticasDeEventos">
                        </tr>
                        </table>
                        <table class="table" id="estadisticasDeEventosFuturosPorCategoría">
                        <tr>
                            <th colspan="3" class="title">Estadisticas de Eventos Futuros por Categoría</th>
                        </tr>
                        <tr>
                            <th class="subtitle">Categorías</th>
                            <th class="subtitle">Ingresos</th>
                            <th class="subtitle">Porcentaje de Estimación</th>
                        </tr>
                        </table>
                        <table class="table" id="estadisticasDeEventosPasadosPorCategoría">
                        <tr>
                            <th colspan="3" class="title">Estadisticas de Eventos Pasados por Categoría</th>
                        </tr>
                        <tr>
                            <th scope="col" class="subtitle">Categorías</th>
                            <th scope="col" class="subtitle">Ingresos</th>
                            <th scope="col" class="subtitle">Porcentaje de Asistencia</th>
                        </tr>
                </table>
                `
          initStats()
            break;
        default:
            document.getElementById("title").innerHTML = "Inicio"
            cardContainer.style.display = "flex"
            searchContainer.style.display = "flex"
            formulario.style.display = "none"
            estadisticas.style.display = "none"
            arrayFiltro = eventos
            checkedCheckboxes = []
            checkboxListener(eventos);
            // eventsCategories(eventos)
            display(eventos);
            break;
    }
}

function display(array) {

    var html = ""; //Crea un templete que toma los datos a medida que se recorre el array 

    for (var i = 0; i < array.length; i++) {
        html += `
        <div class="card">
            <img src="${array[i].image}" alt="">
            <div class="text">
                <h2>${array[i].name}</h2>
                <p>${array[i].description} </p>
            </div>
            <div class="text-info">
                <p>Price: $${array[i].price} </p>
                <button class="btn">
                <a href="./Pages/Details.html?=id=${array[i].id}">See More...</a></button>
            </div>
        </div>
        `
    }
    cardContainer.innerHTML = html;
}

// NAV DETAILS

var time = location.search.split("?time=") //Convierto a parametro la ubicación y luego la divido para obtener el ID

function rutasPaginas()
{

switch (time[1]) { //Compara la expresión y si la consigue rompe, sino, continua hasta el default

    
    case "upcomingEvents": imprimir("upcomingEvents")
        break;
    case "pastEvents": imprimir("pastEvents")
        break;
    case "contact": imprimir("contact")
        break;
    case "stats": imprimir("stats")
        break;
    default: imprimir("home")
}}


var buttonRight = document.getElementById("buttonRight")
buttonRight.addEventListener("click", function (e) {
    var page = document.getElementById("title").innerText
    if (buttonNavTitle.indexOf(page) < 4) {
        beforePage(buttonNavTitle.indexOf(page) + 1);
    }
    else {
        beforePage(0)
    }
}
)

function beforePage(i) {
    switch (i) {
        case 1: imprimir("upcomingEvents")
            document.getElementById("title").innerHTML = buttonNavTitle[i]
            break;
        case 2: imprimir("pastEvents")
            document.getElementById("title").innerHTML = buttonNavTitle[i]
            break;
        case 3: imprimir("contact")
            document.getElementById("title").innerHTML = buttonNavTitle[i]
            break;
        case 4: imprimir("stats")
            document.getElementById("title").innerHTML = buttonNavTitle[i]
            break;
        default: imprimir("home")
        document.getElementById("title").innerHTML = buttonNavTitle[i]
            break;
    }
}

var buttonLeft = document.getElementById("buttonLeft")
buttonLeft.addEventListener("click", function (e) {
    var pageL = document.getElementById("title").innerText
    if (buttonNavTitle.indexOf(pageL) <= 4) {
        afterPage(buttonNavTitle.indexOf(pageL) - 1);
    }
    else {
        afterPage(0)
    }
}
)

function afterPage(i) {
    switch (i) {
        case 0: imprimir("home")
            document.getElementById("title").innerHTML = buttonNavTitle[i]
            break;
        case 1: imprimir("upcomingEvents")
            document.getElementById("title").innerHTML = buttonNavTitle[i]
            break;
        case 2: imprimir("pastEvents")
            document.getElementById("title").innerHTML = buttonNavTitle[i]
            break;
        case 3: imprimir("contact")
            document.getElementById("title").innerHTML = buttonNavTitle[i]
            break;
        default: imprimir("stats")
        document.getElementById("title").innerHTML = buttonNavTitle[i]
            break;
    }
}



inputSearch.addEventListener("keyup", function (evento){
    var dataInput = evento.target.value
    search = dataInput.trim().toLowerCase()
    filtrosCombinados()
})

// function eventsCategories() {
//     let categoriasEventos = 
//       `
//       <label><input type="checkbox" value="Carrera">Carrera</label>
//       <label><input type="checkbox" value="Concierto de Música">Concierto de Música</label>
//       <label><input type="checkbox" value="Feria de Comida">Feria de Comida</label>
//       <label><input type="checkbox" value="Fiesta de Disfraces">Fiesta de Disfraces</label>
//       <label><input type="checkbox" value="Intercambio de Libros">Intercambio de Libros</label>
//       <label><input type="checkbox" value="Salida al Museo">Salida al Museo</label>
//       <label><input type="checkbox" value="Vamos al Cine">Vamos al Cine</label>
//       `
//     document.getElementById("category").innerHTML = categoriasEventos
//     checkboxListener()
//   }
  
  function checkboxListener() {
    var checkboxs = document.querySelectorAll('input[type=checkbox]')
    for (i = 0; i < checkboxs.length; i++) {
      checkboxs[i].addEventListener("change", function () {
        checkedCheckboxes = []
        for (i = 0; i < checkboxs.length; i++) {
          if (checkboxs[i].checked) {
            checkedCheckboxes.push(checkboxs[i].value)
          }
        }
        filtrosCombinados()
      })
    }
  }
  
  
  function filtrosCombinados() {
    var filtrado = []
    if (search !== "" && checkedCheckboxes.length > 0) {
      checkedCheckboxes.map(category => filtrado.push(...arrayFiltro.filter(evento =>
        evento.name.toLowerCase().trim().includes(search) && evento.category === category)
      ))
    }
    else if (search !== "" && checkedCheckboxes.length == 0) {
      filtrado = arrayFiltro.filter(evento => evento.name.toLowerCase().trim().includes(search))
    }
    else if (search === "" && checkedCheckboxes.length > 0) {
      checkedCheckboxes.map(category =>
        filtrado.push(...arrayFiltro.filter(evento => evento.category === category))
      )
    }
    else {
      filtrado = arrayFiltro
    }
    filtrado.length > 0 ?
      display(filtrado) :
      cardContainer.innerHTML = `
      <div class="ceroResultado">
      <h1 class="sinEventos" style="color : white">No se encontraron eventos para tu busqueda...</h1>
      </div>
      `
  }

  function actionForm(event){
    event.preventDefault()
    let formDatos = {
        name: event.target[0].value,
        email: event.target[1].value,
        message: event.target[2].value
    }
    console.log(formDatos);
  }

//STAST//

