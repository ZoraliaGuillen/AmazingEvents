async function initStats(){
    var categorias = []
    var unique = eventos.map(evento => evento.category)
    const quitoRepetidas = new Set(unique)
    categorias = [...quitoRepetidas]
    var porCategoria = []
    categorias.forEach(categoria => {

        porCategoria.push(
            {
                categoria : categoria,
                data : eventos.filter(evento => evento.category === categoria)
            }
        )
    })
    
   var ingresosYAsistencia = []

   porCategoria.map (datos =>{

    ingresosYAsistencia.push({
        categoria: datos.categoria,
        ingreso: datos.data.map(item => item.assistance ? item.assistance * item.price : 0), //operador ternario para cambiar NaN por O
        estimacionIngreso: datos.data.map(item => item.estimate ? item.estimate * item.price : 0),
        asistencia: datos.data.map(item => item.assistance ? item.assistance : 0),
        estimacionAsistencia: datos.data.map(item => item.estimate ? item.estimate : 0),
        capacidad: datos.data.map(item => item.capacity ? item.capacity : 0)
    })
})

ingresosYAsistencia.forEach(categoria =>{

    let totalAsistencia = 0
    let totalAsistenciaEstimada = 0
    let totalCapacidadPasados = 0
    let totalCapacidadFuturos = 0

    for (var i = 0; i < categoria.ingreso.length; i++) {

        if (categoria.ingreso[i] > 0) {
            totalCapacidadPasados += categoria.capacidad[i]
            totalAsistencia += categoria.asistencia[i]
            categoria.totalCapacidadPasados = totalCapacidadPasados
            categoria.totalAsistencia = totalAsistencia

        } else {
            totalCapacidadFuturos += categoria.capacidad[i]
            totalAsistenciaEstimada += categoria.estimacionAsistencia[i]
            categoria.totalCapacidadFuturos = totalCapacidadFuturos
            categoria.totalAsistenciaEstimada = totalAsistenciaEstimada
        }
    }

    categoria.porcentajeDeAsistencia = "%" + ((totalAsistencia * 100) / totalCapacidadPasados).toFixed(2)
    categoria.porcentajeDeEstimacion = "%" + ((totalAsistenciaEstimada * 100) / totalCapacidadFuturos).toFixed(2)

    let totalIngreso = 0
    categoria.ingreso.map(ingresos => totalIngreso += ingresos)
    categoria.ingresos = totalIngreso

    let totalIngresoEstimado = 0
    categoria.estimacionIngreso.map(ingresosEstimados => totalIngresoEstimado += ingresosEstimados)
    categoria.estimacionIngresos = totalIngresoEstimado
})

let eventosPasados = []
let eventosFuturos = []

eventos.filter(evento => {
    if (evento.assistance) {
        eventosPasados.push(evento)
    } else { eventosFuturos.push(evento) }
})

eventosPasados.map(evento => {
    evento.porcentajeAsistencia = evento.assistance * 100 / evento.capacity
})

let asistenciaEventos = []
    eventosPasados.filter(evento => { asistenciaEventos.push(evento.porcentajeAsistencia) })
    let mayor = Math.max(...asistenciaEventos)
    let eventoMayorAsistencia = eventos.filter(evento => evento.porcentajeAsistencia === mayor)
    let menor = Math.min(...asistenciaEventos)
    let eventoMenorAsistencia = eventos.filter(evento => evento.porcentajeAsistencia === menor)
    let mayorCapacidad = eventos.sort((a, b) => { return b.capacity - a.capacity })

var estadisticasDeEventos = document.getElementById("estadisticasDeEventos")
estadisticasDeEventos.innerHTML = ""
var tdMayorAsistencia = document.createElement("td")
var tdMenorAsistencia = document.createElement("td")
var tdMayorCapacidad = document.createElement("td")

estadisticasDeEventos.append(tdMayorAsistencia)
    tdMayorAsistencia.append(eventoMayorAsistencia[0].name + " %" + eventoMayorAsistencia[0].porcentajeAsistencia.toFixed(2))

    estadisticasDeEventos.append(tdMenorAsistencia)
    tdMenorAsistencia.append(eventoMenorAsistencia[0].name + " %" + eventoMenorAsistencia[0].porcentajeAsistencia.toFixed(2))

    estadisticasDeEventos.append(tdMayorCapacidad)
    tdMayorCapacidad.append(mayorCapacidad[0].name + " (" + mayorCapacidad[0].category + ")")

    var tablaFuturos = document.getElementById("estadisticasDeEventosFuturosPorCategoría")
    ordenarFuturos = []
    ordenarFuturos.push(...ingresosYAsistencia.sort((a, b) => {
        return b.estimacionIngresos - a.estimacionIngresos
    }))

    ordenarFuturos.map(evento => {
        if (evento.estimacionIngresos > 0) {
            tablaFuturos.innerHTML +=
                `
            <tr>
              <td>${evento.categoria}</td>
              <td>$${evento.estimacionIngresos}</td>
              <td>${evento.porcentajeDeEstimacion}</td>
            </tr>       
        `
        }
    })

    var tablaPasados = document.getElementById("estadisticasDeEventosPasadosPorCategoría")
    let ordenarPasados = []
    ordenarPasados.push(...ingresosYAsistencia.sort((a, b) => {
        return b.ingresos - a.ingresos
    }))

    ordenarPasados.map(evento => {
        if (evento.ingresos > 0) {
            tablaPasados.innerHTML += `
        <tr>
           <td>${evento.categoria}</td>
           <td>$${evento.ingresos}</td>
           <td>${evento.porcentajeDeAsistencia}</td>
        </tr>       
     `
        }  
    })
}