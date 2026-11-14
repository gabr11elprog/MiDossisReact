//=========================================
// IMPORTAR LOS ESTILOS DE LA TARJETA
//=========================================

import "./TarjetaMedicamento.css";

//=========================================
// COMPONENTE TARJETA MEDICAMENTO
// Recibe la información mediante props
//=========================================

function TarjetaMedicamento({
  medicamento,
  onMarcarTomado,
  onOpciones
}) {

  // Obtener los datos del medicamento
  const nombre = medicamento.nombre;
  const dosis = medicamento.dosis;
  const presentacion = medicamento.presentacion;
  const frecuencia = medicamento.frecuencia;
  const via = medicamento.viaAdministracion || medicamento.via;
  const hora = medicamento.hora;
  const tomado = medicamento.tomado;

  // Convertir la hora al formato AM o PM
  function formatearHora(hora) {

    if (!hora) return "Sin horario";

    const [horas, minutos] = hora.split(":");

    let h = parseInt(horas, 10);

    const ampm = h >= 12 ? "PM" : "AM";

    h = h % 12 || 12;

    return `${h}:${minutos} ${ampm}`;
  }

  //=========================================
  // ESTRUCTURA VISUAL DE LA TARJETA
  //=========================================

  return (

    <article className="tarjeta-medicamento">

      {/* ICONO DEL MEDICAMENTO */}
      <div className="tarjeta-icono">
        💊
      </div>

      {/* INFORMACIÓN DEL MEDICAMENTO */}
      <div className="tarjeta-detalles">

        {/* NOMBRE */}
        <h3 className="tarjeta-nombre">
          {nombre || "Sin nombre"}
        </h3>

        {/* DOSIS */}
        <p>
          <strong>Dosis:</strong>{" "}
          {dosis || "No especificada"}
        </p>

        {/* PRESENTACIÓN */}
        <p>
          <strong>Presentación:</strong>{" "}
          {presentacion || "No especificada"}
        </p>

        {/* FRECUENCIA */}
        <p>
          <strong>Horario:</strong>{" "}
          {frecuencia || "No especificado"}
        </p>

        {/* VÍA DE ADMINISTRACIÓN */}
        <p>
          <strong>Vía de administración:</strong>{" "}
          {via || "No especificada"}
        </p>

        {/* HORA PROGRAMADA */}
        <div className="tarjeta-hora">
          ◷ {formatearHora(hora)}
        </div>

        {/* ESTADO DEL MEDICAMENTO */}
        <div className={`tarjeta-estado ${
          tomado ? "tomado" : "pendiente"
        }`}>
          {tomado ? "Tomado" : "Pendiente"}
        </div>

        {/* BOTÓN PARA MARCAR COMO TOMADO */}
        <button
          className="tarjeta-btn-tomado"
          onClick={() => onMarcarTomado(medicamento.id)}
          disabled={tomado}
        >
          {tomado
            ? "Medicamento tomado"
            : "Marcar como tomado"}
        </button>

      </div>

      {/* BOTÓN DE OPCIONES */}
      <button
        className="tarjeta-opciones"
        onClick={() => onOpciones(medicamento)}
      >
        ⋮
      </button>

    </article>
  );
}

//=========================================
// EXPORTAR EL COMPONENTE
// Para utilizarlo en App.jsx
//=========================================

export default TarjetaMedicamento;
