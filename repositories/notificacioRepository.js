import { supabaseAdmin } from '../lib/supabaseAdmin.js';

export async function guardarNotificacion({
  id_paciente,
  id_cita = null,
  titulo,
  mensaje,
  tipo = 'Sistema',
  estado = 'pendiente'
}) {
  const { data, error } = await supabaseAdmin
    .from('notificacion')
    .insert([
      {
        id_paciente,
        id_cita,
        titulo,
        mensaje,
        tipo,
        estado
      }
    ])
    .select()
    .single();

  if (error) {
    throw new Error(`Error al guardar notificación: ${error.message}`);
  }

  return data;
}

