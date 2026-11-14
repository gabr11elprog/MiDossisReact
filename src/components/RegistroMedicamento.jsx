import { useState, useEffect } from "react";
import "./RegistroMedicamento.css";
import { medicamentosIniciales } from "../data/medicamento";

function RegistroMedicamento({
  medicamentoEditar,
  onGuardar,
  onCancelar
}) {
  const [formulario, setFormulario] = useState({
    nombre: "",
    dosis: "",
    presentacion: "",
    viaAdministracion: "",
    frecuencia: "",
    hora: "",
    fechaInicio: "",
    fechaFinal: ""
  });

  // Controla si el usuario eligió escribir un medicamento nuevo
  const [esPersonalizado, setEsPersonalizado] = useState(false);

  // Cargar información cuando se edita un medicamento
  useEffect(() => {
    if (medicamentoEditar) {
      setFormulario((actual) => ({
        ...actual,
        ...medicamentoEditar
      }));

      // Si el medicamento editado no está en la lista inicial, activar modo manual
      const existeEnLista = medicamentosIniciales.some(
        (med) => med.nombre === medicamentoEditar.nombre
      );
      setEsPersonalizado(!existeEnLista);
    } else {
      const hoy = new Date();
      const fecha = [
        hoy.getFullYear(),
        String(hoy.getMonth() + 1).padStart(2, "0"),
        String(hoy.getDate()).padStart(2, "0")
      ].join("-");

      setFormulario((actual) => ({
        ...actual,
        fechaInicio: fecha
      }));
    }
  }, [medicamentoEditar]);

  // Manejar selección desde el menú desplegable <select>
  function manejarSeleccionMedicamento(e) {
    const valor = e.target.value;

    if (valor === "OTRO") {
      setEsPersonalizado(true);
      setFormulario((actual) => ({
        ...actual,
        nombre: "",
        dosis: "",
        presentacion: "",
        viaAdministracion: "",
        frecuencia: "",
        hora: ""
      }));
      return;
    }

    setEsPersonalizado(false);

    const encontrado = medicamentosIniciales.find(
      (med) => med.nombre === valor
    );

    if (encontrado) {
      setFormulario((actual) => ({
        ...actual,
        nombre: encontrado.nombre,
        dosis: encontrado.dosis,
        presentacion: encontrado.presentacion,
        viaAdministracion: encontrado.via,
        frecuencia: encontrado.frecuencia,
        hora: encontrado.hora
      }));
    } else {
      setFormulario((actual) => ({
        ...actual,
        nombre: ""
      }));
    }
  }

  // Actualizar campos normales
  function manejarCambio(e) {
    const { name, value } = e.target;
    setFormulario((actual) => ({
      ...actual,
      [name]: value
    }));
  }

  // Guardar medicamento
  function manejarEnvio(e) {
    e.preventDefault();

    if (
      formulario.fechaFinal &&
      formulario.fechaFinal < formulario.fechaInicio
    ) {
      alert("La fecha final no puede ser menor que la fecha inicial.");
      return;
    }

    onGuardar(formulario);
  }

  return (
    <div className="contenedor">
      <header className="encabezado">
        <button
          className="btn-regresar"
          type="button"
          onClick={onCancelar}
        >
          ←
        </button>

        <h2>Registrar medicamento</h2>
      </header>

      <form className="form-registro" onSubmit={manejarEnvio}>
        <div className="grupo-registro">
          <label>Nombre del medicamento</label>
          <select
            value={esPersonalizado ? "OTRO" : formulario.nombre}
            onChange={manejarSeleccionMedicamento}
            required={!esPersonalizado}
          >
            <option value="">Selecciona medicamento</option>
            {medicamentosIniciales.map((med) => (
              <option key={med.id} value={med.nombre}>
                {med.nombre}
              </option>
            ))}
            <option value="OTRO">+ Otro medicamento (escribir nombre)</option>
          </select>

          {esPersonalizado && (
            <input
              type="text"
              name="nombre"
              value={formulario.nombre}
              onChange={manejarCambio}
              placeholder="Escribe el nombre del medicamento"
              style={{ marginTop: "10px" }}
              required
            />
          )}
        </div>

        <div className="grupo-registro">
          <label>Dosis</label>
          <input
            name="dosis"
            value={formulario.dosis}
            onChange={manejarCambio}
            placeholder="Ej. 500 mg"
            required
          />
        </div>

        <div className="grupo-registro">
          <label>Presentación</label>
          <select
            name="presentacion"
            value={formulario.presentacion}
            onChange={manejarCambio}
            required
          >
            <option value="">Selecciona presentación</option>
            <option>Tableta</option>
            <option>Tableta efervescente</option>
            <option>Cápsula</option>
            <option>Jarabe</option>
            <option>Gotas</option>
            <option>Crema</option>
            <option>Pomada</option>
            <option>Solución</option>
            <option>Inhalador</option>
            <option>Inyección</option>
          </select>
        </div>

        <div className="grupo-registro">
          <label>Vía de administración</label>
          <select
            name="viaAdministracion"
            value={formulario.viaAdministracion}
            onChange={manejarCambio}
            required
          >
            <option value="">Selecciona vía</option>
            <option>Oral</option>
            <option>Tópica</option>
            <option>Sublingual</option>
            <option>Intravenosa</option>
            <option>Intramuscular</option>
            <option>Subcutánea</option>
            <option>Oftálmica</option>
            <option>Ótica</option>
            <option>Inhalatoria</option>
            <option>Rectal</option>
          </select>
        </div>

        <div className="grupo-registro">
          <label>Frecuencia</label>
          <select
            name="frecuencia"
            value={formulario.frecuencia}
            onChange={manejarCambio}
            required
          >
            <option value="">Selecciona frecuencia</option>
            <option>Cada 4 horas</option>
            <option>Cada 6 horas</option>
            <option>Cada 8 horas</option>
            <option>Cada 12 horas</option>
            <option>Cada 24 horas</option>
            <option>Una vez al día</option>
            <option>Dos veces al día</option>
            <option>Tres veces al día</option>
            <option>Solo cuando sea necesario</option>
          </select>
        </div>

        <div className="grupo-registro">
          <label>Hora de toma</label>
          <input
            type="time"
            name="hora"
            value={formulario.hora}
            onChange={manejarCambio}
            required
          />
        </div>

        <div className="grupo-registro">
          <label>Fecha de inicio</label>
          <input
            type="date"
            name="fechaInicio"
            value={formulario.fechaInicio}
            onChange={manejarCambio}
            required
          />
        </div>

        <div className="grupo-registro">
          <label>Fecha final (opcional)</label>
          <input
            type="date"
            name="fechaFinal"
            min={formulario.fechaInicio}
            value={formulario.fechaFinal}
            onChange={manejarCambio}
          />
        </div>

        <button className="btn-guardar-registro" type="submit">
          Guardar medicamento
        </button>
      </form>
    </div>
  );
}

export default RegistroMedicamento;