import { useState, useEffect } from "react";
import "./App.css";
import RegistroMedicamento from "./components/RegistroMedicamento";
import { medicamentosIniciales } from "./data/medicamento";

function App() {
  // Obtener medicamentos guardados o cargar los iniciales si está vacío
  const [medicamentos, setMedicamentos] = useState(() => {
    try {
      const guardados = JSON.parse(localStorage.getItem("medicamentos"));
      return guardados && guardados.length > 0 ? guardados : medicamentosIniciales;
    } catch {
      return medicamentosIniciales;
    }
  });

  const [medicamentoSeleccionado, setMedicamentoSeleccionado] =
    useState(null);

  const [mostrarMenu, setMostrarMenu] = useState(false);

const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Guardar cambios en localStorage
  useEffect(() => {
    localStorage.setItem(
      "medicamentos",
      JSON.stringify(medicamentos)
    );
  }, [medicamentos]);

  // Formatear hora
  function formatearHora(hora) {
    if (!hora) return "Sin horario";

    const [horas, minutos] = hora.split(":");
    let h = parseInt(horas, 10);
    const ampm = h >= 12 ? "PM" : "AM";

    h = h % 12 || 12;

    return `${h}:${minutos} ${ampm}`;
  }

  // Marcar medicamento como tomado
  function marcarTomado(id) {
    setMedicamentos((actuales) =>
      actuales.map((medicamento) =>
        String(medicamento.id) === String(id)
          ? { ...medicamento, tomado: true }
          : medicamento
      )
    );
  }

  // Eliminar medicamento
  function eliminarMedicamento() {

    if (!medicamentoSeleccionado) return;

    if (window.confirm("¿Deseas eliminar este medicamento?")) {
      setMedicamentos((actuales) =>
        actuales.filter(
          (med) =>
            String(med.id) !== String(medicamentoSeleccionado.id)
        )
      );
    }

    setMostrarMenu(false);
  }function guardarMedicamento(nuevoMedicamento) {
  setMedicamentos(actuales => [
    ...actuales,
    {
      ...nuevoMedicamento,
      id: Date.now(),
      tomado: false
    }
  ]);

  setMostrarFormulario(false);
}

  // Volver a la página anterior
  function regresar() {
    if (window.history.length > 1) {
      window.history.back();
    }
  }

  // Colores de las tarjetas
  const colores = ["verde", "azul", "morado"];

  if (mostrarFormulario) {
  return (
    <RegistroMedicamento
      onGuardar={guardarMedicamento}
      onCancelar={() => setMostrarFormulario(false)}
    />
  );
}
  return (
    <div className="contenedor">

      {/* ENCABEZADO */}
      <header className="encabezado">

        <button className="btn-regresar" onClick={regresar}>
          ←
        </button>

        <h2>Mis medicamentos</h2>

        <button
          className="btn-filtro"
          onClick={() => alert("Próximamente: filtros de medicamentos")}
        >
          ☰
        </button>

      </header>

      {/* LISTA DE MEDICAMENTOS */}
      <main className="lista-medicamentos">

        {medicamentos.length === 0 ? (

          <div className="sin-medicamentos">
            <div className="icono-vacio">💊</div>

            <h3>No hay medicamentos registrados</h3>

            <p>
              Presiona el botón de abajo para agregar tu
              primer medicamento.
            </p>
          </div>

        ) : (

          medicamentos.map((medicamento, indice) => {

            const color = colores[indice % colores.length];

            return (

              <article className="card" key={medicamento.id ?? indice}>

                <div className="info">

                  <div className={`icono ${color}`}>
                    💊
                  </div>

                  <div className="detalles">

                    <h3 className={`${color}-texto`}>
                      {medicamento.nombre}
                    </h3>

                    <p>
                      <strong>Dosis:</strong>{" "}
                      {medicamento.dosis || "No especificada"}
                    </p>

                    <p>
                      <strong>Presentación:</strong>{" "}
                      {medicamento.presentacion || "No especificada"}
                    </p>

                    <p>
                      <strong>Horario:</strong>{" "}
                      {medicamento.frecuencia || "No especificado"}
                    </p>

                    <p>
                      <strong>Vía de administración:</strong>{" "}
                      {medicamento.viaAdministracion ||
                        medicamento.via ||
                        "No especificada"}
                    </p>

                    <div className="horas">
                      <div className="hora">
                        ◷ {formatearHora(medicamento.hora)}
                      </div>
                    </div>

                    {/* ESTADO */}
                    <div className={`estado ${
                      medicamento.tomado ? "estado-tomado" : "estado-pendiente"
                    }`}>
                      {medicamento.tomado ? "Tomado" : "Pendiente"}
                    </div>

                    {/* BOTÓN MARCAR COMO TOMADO */}
                    <button
                      className="btn-tomado"
                      onClick={() => marcarTomado(medicamento.id)}
                      disabled={medicamento.tomado}
                    >
                      {medicamento.tomado
                        ? "Medicamento tomado"
                        : "Marcar como tomado"}
                    </button>

                  </div>

                </div>

                {/* OPCIONES */}
                <button
                  className="opciones"
                  onClick={() => {
                    setMedicamentoSeleccionado(medicamento);
                    setMostrarMenu(true);
                  }}
                >
                  ⋮
                </button>

              </article>

            );

          })

        )}

      </main>

      {/* BOTÓN AGREGAR */}
      <div className="contenedor-boton">

        <button
  className="btn-agregar"
  onClick={() => setMostrarFormulario(true)}
>
  + Agregar medicamento
</button>

      </div>

      {/* MENÚ INFERIOR */}
      <nav className="menu-inferior">

        <a href="index.html" className="item-menu">
          <span>⌂</span>
          Inicio
        </a>

        <a href="mis-medicamentos.html" className="item-menu activo">
          <span>💊</span>
          Medicamentos
        </a>

        <a href="historial.html" className="item-menu">
          <span>▣</span>
          Historial
        </a>

        <a href="perfil.html" className="item-menu">
          <span>♙</span>
          Perfil
        </a>

      </nav>

      {/* MENÚ DE OPCIONES */}
      {mostrarMenu && medicamentoSeleccionado && (

        <div
          className="fondo-menu"
          onClick={() => setMostrarMenu(false)}
        >

          <div
            className="menu-opciones"
            onClick={(e) => e.stopPropagation()}
          >

            <button onClick={() => {
              localStorage.setItem(
                "editarMedicamento",
                medicamentoSeleccionado.id
              );
              window.location.href = "Registro Medicamento.html";
            }}>
              ✎ Editar
            </button>

            <button onClick={eliminarMedicamento}>
              🗑 Eliminar
            </button>

            <button onClick={() => {
              alert(
                `Medicamento: ${medicamentoSeleccionado.nombre}\n` +
                `Dosis: ${medicamentoSeleccionado.dosis}\n` +
                `Presentación: ${medicamentoSeleccionado.presentacion || "No especificada"}\n` +
                `Vía: ${medicamentoSeleccionado.viaAdministracion || medicamentoSeleccionado.via || "No especificada"}\n` +
                `Horario: ${formatearHora(medicamentoSeleccionado.hora)}`
              );
              setMostrarMenu(false);
            }}>
              ⓘ Ver información
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default App;
