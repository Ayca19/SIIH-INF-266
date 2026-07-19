import { useState } from "react";
import '../styles/registroPaciente.css';

export default function RegistrarConsulta() {

  const [form, setForm] = useState({
    id_cita: "",
    id_paciente: "",
    id_medico: "",
    motivo_consulta: "",
    diagnostico: "",
    tratamiento: "",
    observaciones: "",
    alergias: "",
  });

  const cambiar = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  async function guardar(e) {
    e.preventDefault();

    const respuesta = await fetch("/api/consultas/registrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const datos = await respuesta.json();

    if (datos.ok) {
      alert(datos.mensaje);

      setForm({
        id_cita: "",
        id_paciente: "",
        id_medico: "",
        motivo_consulta: "",
        diagnostico: "",
        tratamiento: "",
        observaciones: "",
        alergias: "",
      });

    } else {

      alert(
        datos.errores?.general ||
        "No se pudo registrar la atención."
      );

    }
  }

  return (

    <div className="container mt-4">

      <h2>Registrar Atención Médica</h2>

      <form onSubmit={guardar}>

        <input
          className="form-control mb-3"
          placeholder="ID Cita"
          name="id_cita"
          value={form.id_cita}
          onChange={cambiar}
        />

        <input
          className="form-control mb-3"
          placeholder="ID Paciente"
          name="id_paciente"
          value={form.id_paciente}
          onChange={cambiar}
        />

        <input
          className="form-control mb-3"
          placeholder="ID Médico"
          name="id_medico"
          value={form.id_medico}
          onChange={cambiar}
        />

        <textarea
          className="form-control mb-3"
          placeholder="Motivo de consulta"
          name="motivo_consulta"
          value={form.motivo_consulta}
          onChange={cambiar}
        />

        <textarea
          className="form-control mb-3"
          placeholder="Diagnóstico"
          name="diagnostico"
          value={form.diagnostico}
          onChange={cambiar}
        />

        <textarea
          className="form-control mb-3"
          placeholder="Tratamiento"
          name="tratamiento"
          value={form.tratamiento}
          onChange={cambiar}
        />

        <textarea
          className="form-control mb-3"
          placeholder="Observaciones"
          name="observaciones"
          value={form.observaciones}
          onChange={cambiar}
        />

        <textarea
          className="form-control mb-3"
          placeholder="Alergias"
          name="alergias"
          value={form.alergias}
          onChange={cambiar}
        />

        <button
          className="btn btn-primary"
          type="submit"
        >
          Guardar Atención
        </button>

      </form>

    </div>

  );

}