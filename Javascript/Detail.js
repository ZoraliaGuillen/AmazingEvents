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

// async function getData(){
//     let datosApi;
//     await fetch("https://amd-amazingeventos-api.onrender.com/api/eventos")
//         .then(response => response.json())
//         .then(json => datosApi = json)

//         eventos = datosApi.eventos;

//         imprimir(eventos)
// }

// getData()

let eventos = datos.eventos

function imprimir(eventos) {

    let id = location.search.split("?=id=").filter(Number)
    let selectId = id[0]
    let details = []
    
    for (var i = 0; i < eventos.length; i++) {

        if (eventos[i].id==selectId) {
            details.push(eventos[i])
        }
    }
    
    var asisOesti= details[0].assistance? "Asistencia" : "Estimación"
    var tarjetasVinosdetails = document.getElementById("card-container-details")
    tarjetasVinosdetails.innerHTML = `<div class="card-details">
    <div class="image"><img src="${details[0].image}" alt=""></div>
    <div class="text">
        <h2>${details[0].name}</h2>
        <p>${details[0].description}</p>
        <div class="column">
        <div class="row">
            <div>
                <div>
                    <i class="fa-solid fa-calendar-days"></i> 
                    <h3>Fecha</h3>
                </div>
                <p>${details[0].date}</p>
            </div>
            <div>
                <div>
                    <i class="fa-solid fa-tag"></i>
                    <h3>Categoría</h3>
                </div>
                <p>${details[0].category}</p>
            </div>
            <div>
                <div>
                    <i class="fa-solid fa-location-dot"></i>
                    <h3>Lugar</h3>
                </div>
                <p>${details[0].place}</p>
            </div>
        </div>
        <div class="row">
            <div>
                <div>
                    <i class="fa-solid fa-users"></i>
                    <h3>Capacidad</h3>
                </div>
                <p>${details[0].capacity}</p>
            </div>
            <div>
                <div>
                    <i class="fa-solid fa-user"></i>
                    <h3>${asisOesti}</h3>
                </div>
                <p>${details[0].assistance||details[0].estimate}</p>
            </div>
            <div>
                <div>
                    <i class="fa-solid fa-money-bill-1-wave"></i>
                    <h3>Precio</h3>
                </div>
                <p>$${details[0].price}</p>
            </div>
        </div>
    </div>
</div> 
        `
}

imprimir(eventos)