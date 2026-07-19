// services/consultaService.js
// ============================================================
// CAPA DE LÓGICA Y SEGURIDAD
// HU-05: Registrar atención médica
// Permite al médico registrar la atención de un paciente.
// ============================================================

import {
  crearConsulta,
  crearHistorial,
} from '../repositories/consultaRepository.js';

function validarDatos({
  id_cita,
  id_paciente,
  id_medico,
  motivo_consulta,
  diagnostico,
}) {

  const errores = {};

  if (!id_cita)
    errores.id_cita = 'La cita es obligatoria.';

  if (!id_paciente)
    errores.id_paciente = 'El paciente es obligatorio.';

  if (!id_medico)
    errores.id_medico = 'El médico es obligatorio.';

  if (!motivo_consulta || motivo_consulta.trim().length < 5)
    errores.motivo_consulta = 'Debe ingresar el motivo de consulta.';

  if (!diagnostico || diagnostico.trim().length < 5)
    errores.diagnostico = 'Debe ingresar el diagnóstico.';

  return errores;
}

export async function registrarConsulta(payload) {

  const {
    id_cita,
    id_paciente,
    id_medico,
    motivo_consulta,
    diagnostico,
    tratamiento,
    observaciones,
    alergias,
  } = payload || {};

  // Validación
  const errores = validarDatos({
    id_cita,
    id_paciente,
    id_medico,
    motivo_consulta,
    diagnostico,
  });

  if (Object.keys(errores).length > 0) {
    return {
      ok: false,
      status: 400,
      errores,
    };
  }

  try {

    // Registrar consulta
    const id_consulta = await crearConsulta({
      id_cita,
      id_paciente,
      id_medico,
      motivo_consulta,
      observaciones,
    });

    // Registrar historial clínico
    await crearHistorial({
      id_consulta,
      diagnostico,
      alergias,
      observaciones:
        tratamiento || observaciones,
    });

    return {
      ok: true,
      status: 201,
      mensaje: 'La atención médica fue registrada correctamente.',
    };

  } catch (error) {

    return {
      ok: false,
      status: 500,
      errores: {
        general: error.message,
      },
    };

  }

}