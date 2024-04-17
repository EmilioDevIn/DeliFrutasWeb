const INICIO = "Distribuidora de frutas";
const FRUTAS = "Frutas";

let frutas = ["bciruelas", "bbanana", "bcoco", "bpera", "bhigo", "bmelon", "bmembrillo", "bmango", "blimon", "bsandia", "buva", "bdurazno", "bnectarina", "bgranada", "bkiwi","aarandanos", "bdatil", "blitchi", "bmanzanaRoja", "bmanzanaverde", "bcarambola", "bpomelo", "amoras", "bpalta","afranbuesa","acerezas", "abayas", "agrosellas", "afrutillas", "aciruela-rojas"];


function refactorizar(arreglo) {
    return arreglo.sort().map((palabra, i, arreglo) => palabra.split("").slice(1,arreglo.length).join(""));
}

frutas = refactorizar(frutas);
console.log(frutas);

class GestorTarjetas {

    constructor(frutas) {
        this.pagina = document.querySelector("title").textContent;
        this.tarjetas = this.generar(frutas);
        this.filtroTarjetas = this.tarjetas;
        this.grupos = this.tarjetas;
    }
    
    crearTarjeta(fruta) {
        return `
        <div class="tarjeta">
            <a href="#"><img src="imagenes/${fruta}.jpg" alt=""></a>
            <p style="text-align: center;">${fruta.replace("jpg", "").toUpperCase()}</p>
            <span>$ 5.50</span>
            <br>
            <button><a href="https://www.expansion.com/fueradeserie/gastro/2022/06/21/629e587be5fdea0e228b4659.html">Saber mas</a></button>
        </div>
        `; 
    }

    crearGrupo(grupo) {
        return `
            <div class="grupo">
                ${grupo}
            </div>
        `;
    }

    generar(frutas) {
        return frutas.map(fruta => this.crearTarjeta(fruta));
    }

    filtrar(cantidad) {
        this.filtroTarjetas = this.tarjetas.filter((tarjeta, indice) => indice < cantidad);
    }

    agrupar(cantidad) {
        let grupos = [], grupo = [];
        this.filtroTarjetas.forEach((tarjeta, indice, este) => {
            grupo.push(tarjeta);
            if((indice + 1) % cantidad == 0) {
                grupos.push(grupo);
                grupo = [];
            } else if(indice + 1 == este.length) {
                "0".repeat(cantidad - (indice + 1) % cantidad).split("").forEach(e => grupo.push(`<div class="tarjeta invisible"></div>`));
                grupos.push(grupo);
                grupo = [];
            }
        })
        this.grupos = grupos;
    }

    html() {
        return this.grupos.map(grupo => this.crearGrupo(grupo.join(""))).join("");
    }

    invertir() {
        this.tarjetas = this.tarjetas.reverse();
    }

    renderizar(idPadre) {
        if(this.pagina == INICIO)
            this.filtrar(8);
        if(this.pagina == FRUTAS)
            this.invertir();
        this.agrupar(4);
        
        document.getElementById(idPadre).innerHTML += this.html();
    }

    static instancia = new GestorTarjetas(frutas);

}

GestorTarjetas.instancia.renderizar("container");

/*const URI = "apigenial";

function crearAgregrarTarjeta(fruta) {

}

function construccion(frutas) {

}

async function tomarDatos(siguiente) {
    let peticion = "/frutas?filtro=8&ordenar=frutosRojos";
    let frutas = await fetch(URI + peticion);
    siguiente(frutas);
}

tomarDatos(construccion);

tomarDatos()
*/