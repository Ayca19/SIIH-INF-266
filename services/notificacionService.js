import { guardarNotificacion } from '../repositories/notificacionRepository.js';

export async function enviarNotificacion({
  id_paciente,
  id_cita = null,
  correo,
  titulo,
  mensaje
}) {
  try {

    console.log(`
=================================
NOTIFICACIÓN
Para: ${correo}
${titulo}
${mensaje}
=================================
`);

    await guardarNotificacion({
      id_paciente,
      id_cita,
      titulo,
      mensaje,
      tipo: 'Sistema',
      estado: 'enviada'
    });

    return true;

  } catch (error) {

    await guardarNotificacion({
      id_paciente,
      id_cita,
      titulo,
      mensaje,
      tipo: 'Sistema',
      estado: 'error'
    });

    return false;
  }
}