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

let fechaBase = datos.fechaBase
let eventos = datos.eventos
var upcomingEvents = []
var pastEvents = []
var buttonNav = document.getElementsByClassName("navLink")
var buttonNavTitle = []
let arrayFiltro = []
let checkedCheckboxes = []
let search = ""
var searchContainer = document.getElementById("search-container")
var inputSearch = document.getElementById("inputSearch")
let container = document.getElementById("category")
var cardContainer = document.getElementById("card-container")
var contact = document.getElementById("contactt")
var stats = document.getElementById("statss")

for (var i = 0; i < eventos.length; i++) {

    if (eventos[i].date > fechaBase) {
        pastEvents.push(eventos[i]) 
    }
    else {
        upcomingEvents.push(eventos[i])
    }

}

eventos.sort(function (a, b) {
    return a.name.localeCompare(b.name);
});

// let fechaBase
// let eventos = []

// async function getData() {
//     let datosApi
//     await fetch("https://amd-amazingevents-api.onrender.com/api/eventos")
//         .then(response => response.json())
//         .then(json => datosApi = json)

//     eventos = datosApi.eventos
//     fechaBase = datosApi.fechaActual

//     rutasPaginas()
// }

// getData()

for (var i = 0; i < buttonNav.length; i++) { //Recorre la clase NavLink y cuando escucha el click, captura la clase
    const element = buttonNav[i];
    buttonNavTitle.push(buttonNav[i].innerText)
    element.addEventListener("click", function (e) {
        imprimir(e.target.id)
    })
}

function imprimir(id) { //Compara la expresión y si la consigue rompe, sino, continua hasta el default
console.log(id)
    switch (id) {

        case "upcomingEvents":
            // let upcomingEvents = eventos.filter(evento => evento.date > fechaBase)
            document.getElementById("title").innerHTML = "Upcoming Events"
            arrayFiltro = upcomingEvents
            checkedCheckboxes = []
            checkboxListener(upcomingEvents)
            inputSearch.value = ""
            searchContainer.style.display = "flex"
            cardContainer.style.display = "flex"
            contact.style.display = "none"
            stats.style.display = "none"
            // eventsCategories(upcomingEvents)
            display(upcomingEvents);
            break;
        case "pastEvents":
            // let pastEvents = eventos.filter(evento => evento.date < fechaBase)
            document.getElementById("title").innerHTML = "Past Events"
            arrayFiltro = pastEvents
            checkedCheckboxes = []
            checkboxListener(pastEvents)
            inputSearch.value = ""
            searchContainer.style.display = "flex"
            cardContainer.style.display = "flex"
            contact.style.display = "none"
            stats.style.display = "none"
            // eventsCategories(pastEvents)
            display(pastEvents);
            break;
        case "contact":
            document.getElementById("title").innerHTML = "Contacto"
            searchContainer.style.display = "none"
            cardContainer.style.display = "none"
            stats.style.display = "none"
            contact.style.display = "flex"
            contact.innerHTML =
                `
                  <form>
                      <div>
                        <label for="name" id="name">Nombre y Apellido</label>
                        <input type="text" id="name" placeholder="Ingrese Nombre y Apellido" required>
                      </div>
                      <div>
                        <label for="email">E-Mail</label>
                        <input type="email" id="email" placeholder="Ingrese E-Mail" required>
                      </div>
                      <div>
                        <label for="text">Mensaje</label>
                        <textarea name="message" id="text" placeholder="Ingrese Mensaje"></textarea>
                      </div>
                      <div class="buttonSend">
                        <button type="submit" value="submit" class="btn" id="enviar">Enviar</button>
                      </div>
                  </form>
                  <div id="modal-container" class="modal-container">
                    <div class="modal">
                        <div>
                            <p>¡Hola!</p>
                            <i class="fa-solid fa-x"></i>
                        </div>
                            <h2>Gracias por comunicarte con nosotros</h2>
                    </div>
                  </div>
              </section>
            `
            let form = document.querySelector(".contact")
            const modal = document.querySelector(".modal-container")
            const cerrar = document.querySelector('.fa-x')
            form.addEventListener("submit", (event) => {
                actionForm(event)
                modal.style.display = "flex"
            })

            function modalForm() {
                modal.style.display = "none";
                location.reload()
            }

            cerrar.addEventListener("click", modalForm);

            window.addEventListener("click", (event) => {
                if (event.target == modal) {
                    modal.style.display = "none"
                }
            })
            break;
        case "stats":
            document.getElementById("title").innerHTML = "Estadísticas"
            searchContainer.style.display = "none"
            cardContainer.style.display = "none"
            contact.style.display = "none"
            stats.style.display = "flex"
            stats.innerHTML =
                `
                <table class="table">
                        <tr>
                            <th colspan="3" class="title">Event Statistics</th>
                        </tr>
                        <tr>
                            <th class="subtitle">Event with the Highest Percentage of Attendance</th>
                            <th class="subtitle">Event with the Lowest Attendance Percentage</th>
                            <th class="subtitle">Largest Capacity Event</th>
                        </tr>
                        <tr id="estadisticasDeEventos">
                        </tr>
                        </table>
                        <table class="table" id="estadisticasDeEventosFuturosPorCategoría">
                        <tr>
                            <th colspan="3" class="title">Upcoming Events Statistics by Category</th>
                        </tr>
                        <tr>
                            <th class="subtitle">Categories</th>
                            <th class="subtitle">Revenue</th>
                            <th class="subtitle">Estimate Percentage</th>
                        </tr>
                        </table>
                        <table class="table" id="estadisticasDeEventosPasadosPorCategoría">
                        <tr>
                            <th colspan="3" class="title">Past Event Statistics by Category</th>
                        </tr>
                        <tr>
                            <th scope="col" class="subtitle">Categories</th>
                            <th scope="col" class="subtitle">Revenue</th>
                            <th scope="col" class="subtitle">Estimate Percentage</th>
                        </tr>
                </table>
                `
            initStats()
            break;
        default:
            document.getElementById("title").innerHTML = "Home"
            arrayFiltro = eventos
            checkedCheckboxes = []
            checkboxListener(eventos);
            inputSearch.value = ""
            searchContainer.style.display = "flex"
            cardContainer.style.display = "flex"
            contact.style.display = "none"
            stats.style.display = "none"
            // eventsCategories(eventos)
            display(eventos);
            break;
    }
}

function display(array) {

    var html = "";

    for (var i = 0; i < array.length; i++) {
        html += `
        <div class="card">
            <img src="${array[i].image}" alt="">
            <div class="text">
                <h2>${array[i].name}</h2>
                <p>${array[i].description} </p>
            </div>
            <div class="text-info">
                <p class="price"><i class="fa-solid fa-money-bill-wave"></i>Price: $${array[i].price} </p>
                <button class="btn">
                <a href="./Pages/Details.html?=id=${array[i].id}">Ver Detalles</a></button>
            </div>
        </div>
        `
    }
    cardContainer.innerHTML = html;
}

// NAV DETAILS

var time = location.search.split("?time=")

function rutasPaginas() {

    switch (time[1]) {


        case "upcomingEvents": imprimir("upcomingEvents")
            break;
        case "pastEvents": imprimir("pastEvents")
            break;
        case "contact": imprimir("contact")
            break;
        case "stats": imprimir("stats")
            break;
        default: imprimir("home")
    }
}

rutasPaginas()

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
            break;
    }
}

inputSearch.addEventListener("keyup", function (evento) {
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
      <div>
      <h1 class="noResults" style="color : white">No se encontraron EVENTOS para tu Búsqueda...</h1>
      </div>
      `
}

function actionForm(event) {
    event.preventDefault()
    let formDatos = {
        name: event.target[0].value,
        email: event.target[1].value,
        message: event.target[2].value
    }
    console.log(formDatos);
}