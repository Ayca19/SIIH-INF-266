// api/consultas/registrar.js
// ============================================================
// API - Registrar atención médica
// HU-05
// ============================================================

import { registrarConsulta } from '../../services/consultaService.js';

export default async function handler(req, res) {

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);

    return res.status(405).json({
      ok: false,
      mensaje: 'Método no permitido.',
    });
  }

  try {

    const resultado = await registrarConsulta(req.body);

    return res
      .status(resultado.status)
      .json(resultado);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      ok: false,
      mensaje: 'Error interno del servidor.',
    });

  }

}