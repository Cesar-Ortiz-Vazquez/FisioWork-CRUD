document.addEventListener("DOMContentLoaded", () => {
    const guardarBtn = document.getElementById("guardarBtn");
    const listaFichas = document.getElementById("listaFichas");
    const campos = document.querySelectorAll("input, select");

    let indexEditando = null;

    function cargarFichas() {
        const fichas = JSON.parse(localStorage.getItem("fichas")) || [];
        listaFichas.innerHTML = "";

        fichas.forEach((ficha, index) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${ficha.nombre}</td>
                <td>${ficha.edad}</td>
                <td>${ficha.ocupacion}</td>
                <td>${ficha.estadoCivil}</td>
                <td>${ficha.telefono}</td>
                <td><button onclick="verDetalles(${index})">Ver más</button></td>
                <td><button onclick="editarFicha(${index})">Editar</button></td>
                <td><button onclick="eliminarFicha(${index})">Eliminar</button></td>
            `;
            listaFichas.appendChild(fila);
        });
    }

    guardarBtn.addEventListener("click", () => {
        const nuevaFicha = {};
        campos.forEach(campo => nuevaFicha[campo.id] = campo.value);

        let fichas = JSON.parse(localStorage.getItem("fichas")) || [];

        if (indexEditando !== null) {
            fichas[indexEditando] = nuevaFicha;
            alert("Ficha actualizada correctamente.");
            indexEditando = null;
        } else {
            fichas.push(nuevaFicha);
            alert("Ficha guardada correctamente.");
        }

        localStorage.setItem("fichas", JSON.stringify(fichas));
        cargarFichas();
        campos.forEach(campo => campo.value = "");
    });

    window.editarFicha = (index) => {
        const fichas = JSON.parse(localStorage.getItem("fichas")) || [];
        const ficha = fichas[index];

        campos.forEach(campo => {
            campo.value = ficha[campo.id] || "";
        });

        indexEditando = index;
        alert("Ficha cargada para edición.");
    };

    window.eliminarFicha = (index) => {
        const confirmar = confirm("¿Estás seguro de que deseas eliminar esta ficha?");
        if (confirmar) {
            const fichas = JSON.parse(localStorage.getItem("fichas")) || [];
            fichas.splice(index, 1);
            localStorage.setItem("fichas", JSON.stringify(fichas));
            cargarFichas();
            alert("Ficha eliminada.");
        } else {
            alert("Acción cancelada. La ficha no se eliminó.");
        }
    };

    window.verDetalles = (index) => {
        const fichas = JSON.parse(localStorage.getItem("fichas")) || [];
        const ficha = fichas[index];

        alert(`Detalles de ${ficha.nombre}:\n
Edad: ${ficha.edad}
Ocupación: ${ficha.ocupacion}
Estado Civil: ${ficha.estadoCivil}
Teléfono: ${ficha.telefono}
Contacto Emergencia: ${ficha.contactoEmergenciaNombre} - ${ficha.contactoEmergenciaTelefono}`);
    };

    cargarFichas();
});