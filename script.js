document.addEventListener("DOMContentLoaded", function () {
    const selectCuantia = document.getElementById("cuantia");
    const inputsContainer = document.getElementById("inputs");
    const pretensionesContainer = document.getElementById("pretensionesContainer");
    const calcularBtn = document.getElementById("calcularBtn");
    const tablaResultadosContainer = document.getElementById("tablaResultadosContainer");

    selectCuantia.addEventListener("change", function () {
        inputsContainer.classList.add("hidden");
        pretensionesContainer.classList.add("hidden");
        tablaResultadosContainer.classList.add("hidden");

        if (this.value === "cuantiaI") {
            inputsContainer.classList.remove("hidden");
            pretensionesContainer.classList.remove("hidden");
        } else if (this.value === "cuantiaD") {
            inputsContainer.classList.remove("hidden");
        }
    });

    calcularBtn.addEventListener("click", calcular);
});

function calcular() {
    const monto = parseFloat(document.getElementById("monto").value)|| 0;
    const pretensiones = parseInt(document.getElementById("pretensiones")?.value);
    const tipoCuantia = document.getElementById("cuantia").value;

    

    if (monto <= 0) {
        alert("Ingrese un monto válido.");
        return;
    }

    if (tipoCuantia === "cuantiaI" && pretensiones <= 0) {
        alert("Ingrese un número válido de pretensiones.");
        return;
    }

    let datos = [];

    if (tipoCuantia === "cuantiaD") {
        datos = [
            { descripcion: "Gastos Administrativos", resultado: calcularGastosAdministrativos(monto) },
            { descripcion: "Honorarios Árbitro Único", resultado: calcularHonorariosArbitro(monto) },
            { descripcion: "Honorarios Tribunal Arbitral", resultado: calcularHonorariosTribunal(monto) }
        ];
    } else if (tipoCuantia === "cuantiaI") {
        datos = [
            { descripcion: "Gastos Administrativos", resultado: calcularGastosAdministrativos(monto*0.05* pretensiones)  },
            { descripcion: "Honorarios Árbitro Único", resultado: calcularHonorariosArbitro(monto*0.05* pretensiones)  },
            { descripcion: "Honorarios Tribunal Arbitral", resultado: calcularHonorariosTribunal(monto*0.05* pretensiones)  }
        ];
    }

    mostrarResultados(datos);
}

function calcularGastosAdministrativos(monto) {
    if (monto <= 38000) return 2500;
    if (monto <= 50000) return 3400;
    if (monto <= 108000) return 3400 + 0.015 * (monto - 50000);
    if (monto <= 360000) return 4270 + 0.01 * (monto - 108000);
    if (monto <= 1800000) return 6790 + 0.005 * (monto - 360000);
    if (monto <= 3600000) return 13990 + 0.0025 * (monto - 1800000);
    if (monto >= 3600001) return 18990 + 0.001 * (monto - 3600000);
}

function calcularHonorariosTribunal(monto) {
    if (monto <= 38000) return 4950;
    if (monto <= 50000) return 6000;
    if (monto <= 108000) return 6000 + 0.07 * (monto - 50000);
    if (monto <= 360000) return 10060 + 0.028 * (monto - 108000);
    if (monto <= 1800000) return 17116 + 0.015 * (monto - 360000);
    if (monto <= 3600000) return 38716 + 0.01 * (monto - 1800000);
    if (monto >= 3600001) return 56716 + 0.005 * (monto - 3600000);
}

function calcularHonorariosArbitro(monto) {
    if (monto <= 38000) return 2800;
    if (monto <= 50000) return 3650;
    if (monto <= 108000) return 3650 + 0.02 * (monto - 50000);
    if (monto <= 360000) return 4810 + 0.015 * (monto - 108000);
    if (monto <= 1800000) return 8590 + 0.007 * (monto - 360000);
    if (monto <= 3600000) return 18670 + 0.005 * (monto - 1800000);
    if (monto >= 3600001) return 27670 + 0.0018 * (monto - 3600000);
}

function mostrarResultados(datos) {
    const tablaResultados = document.getElementById("tablaResultados");
    tablaResultados.innerHTML = "";
    
    datos.forEach(({ descripcion, resultado }) => {
        const igv = resultado * 0;
        const total = resultado + igv;

        const fila = `<tr>
            <td>${descripcion}</td>
            <td>${resultado.toFixed(2)}</td>
            <td>${igv.toFixed(2)}</td>
            <td>${total.toFixed(2)}</td>
        </tr>`;
        tablaResultados.innerHTML += fila;
    });

    document.getElementById("tablaResultadosContainer").classList.remove("hidden");
}


document.getElementById("monto").addEventListener("input", function() {
    let valor = this.value;
    if (valor !== "") {
        console.log("Nuevo monto ingresado:", valor);
    }
});

document.getElementById("pretensiones").addEventListener("input", function() {
    let valor = this.value;
    if (valor !== "") {
        console.log("Nuevo número de pretensiones ingresado:", valor);
    }
});


document.getElementById("cuantia").addEventListener("change", function() {
    document.getElementById("monto").value = "";
    document.getElementById("pretensiones").value = "";
});


document.getElementById("monto").addEventListener("input", function() {
    document.getElementById("tablaResultadosContainer").classList.add("hidden");
});
document.getElementById("pretensiones").addEventListener("input", function() {
    document.getElementById("tablaResultadosContainer").classList.add("hidden");
});
