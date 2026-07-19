// repositories/consultaRepository.js
// ============================================================
// CAPA DE DATOS
// Acceso a las tablas consulta e historial_clinico.
// No contiene reglas de negocio.
// ============================================================

import { supabaseAdmin } from '../lib/supabaseAdmin.js';

// Registrar la consulta médica
export async function crearConsulta({
  id_cita,
  id_paciente,
  id_medico,
  motivo_consulta,
  observaciones,
}) {

  const { data, error } = await supabaseAdmin
    .from('consulta')
    .insert([
      {
        id_cita,
        id_paciente,
        id_medico,
        motivo_consulta,
        observaciones,
      },
    ])
    .select('id_consulta')
    .single();

  if (error) {
    throw new Error(`Error al registrar consulta: ${error.message}`);
  }

  return data.id_consulta;
}

// Registrar historial clínico
export async function crearHistorial({
  id_consulta,
  diagnostico,
  alergias,
  observaciones,
}) {

  const { data, error } = await supabaseAdmin
    .from('historial_clinico')
    .insert([
      {
        id_consulta,
        diagnostico,
        alergias,
        observaciones,
      },
    ])
    .select('id_historial')
    .single();

  if (error) {
    throw new Error(`Error al registrar historial: ${error.message}`);
  }

  return data.id_historial;
}