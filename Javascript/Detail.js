async function getData(){
    let datosApi;
    await fetch("https://amd-amazingevents-api.onrender.com/api/eventos")
        .then(response => response.json())
        .then(json => datosApi = json)

        eventos = datosApi.eventos;

        imprimir(eventos)
}

getData()

function imprimir(eventos) {

    let id = location.search.split("?=id=").filter(Number)
    let selectId = id[0]
    let Detalles = []
    
    for (var i = 0; i < eventos.length; i++) {

        if (eventos[i].id==selectId) {
            Detalles.push(eventos[i])
        }
    }
    var asisOesti= Detalles[0].assistance? "Asistencia" : "Estimación"
    var tarjetasVinosDetalles = document.getElementById("card-container-details")
    tarjetasVinosDetalles.innerHTML = `<div class="card-details">
    <div class="image"><img src="${Detalles[0].image}" alt=""></div>
    <div class="text">
        <h2>${Detalles[0].name}</h2>
        <p>${Detalles[0].description}</p>
        <div class="column">
        <div class="row">
            <div>
                <h3><i class="fa-solid fa-calendar-days"></i> Date</h3>
                <p>${Detalles[0].date}</p>
            </div>
            <div>
                <h3><i class="fa-solid fa-tag"></i> Category</h3>
                <p>${Detalles[0].category}</p>
            </div>
            <div>
                <h3><i class="fa-solid fa-location-dot"></i> Place</h3>
                <p>${Detalles[0].place}</p>
            </div>
        </div>
        <div class="row">
            <div>
                <h3><i class="fa-solid fa-users"></i> Capacity</h3>
                <p>${Detalles[0].capacity}</p>
            </div>
            <div>
                <h3><i class="fa-solid fa-user"></i>${asisOesti}</h3>
                <p>${Detalles[0].assistance||Detalles[0].estimate}</p>
            </div>
            <div>
                <h3><i class="fa-solid fa-money-bill-1-wave"></i> Price</h3>
                <p>${Detalles[0].price}</p>
            </div>
        </div>
    </div>
</div> 
        `

}
