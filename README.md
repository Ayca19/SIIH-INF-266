# SIIH-INF-266
This is the repository that subject INF-266 "Taller de Tecnico Superior".
## ⚙️ Configuración de la Base de Datos (Supabase)

Este proyecto utiliza Supabase como backend. Para poder ejecutar el sistema localmente y conectarte a la base de datos, cada miembro del equipo debe configurar sus propias variables de entorno obteniendo las credenciales directamente desde la plataforma.

### Pasos para la configuración:

1. En la raíz del proyecto, crea un archivo nuevo llamado exactamente `.env.local`.
2. Ingresa a [Supabase](https://supabase.com) con tu cuenta y asegúrate de haber aceptado la invitación al proyecto del grupo.
3. Dentro del panel del proyecto, dirígete al menú lateral izquierdo y haz clic en **Project Settings** (el ícono de engranaje ⚙️).
4. En el submenú, selecciona la opción **API**.
5. Copia los valores de esa pantalla y pégalos en tu archivo `.env.local` usando la siguiente plantilla:

```env
# ============================================================
# Variables de entorno para desarrollo local (Supabase)
# ============================================================

# 1. Project URL (Lo encuentras en la sección: Configuration -> URL)
VITE_SUPABASE_URL=[https://mtdpdtxrlupcdszdexta.supabase.co](https://mtdpdtxrlupcdszdexta.supabase.co)
SUPABASE_URL=[https://mtdpdtxrlupcdszdexta.supabase.co](https://mtdpdtxrlupcdszdexta.supabase.co)

# 2. Anon Key (Lo encuentras en: Project API Keys -> anon / public)
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10ZHBkdHhybHVwY2RzemRleHRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxOTQ4MDQsImV4cCI6MjA5OTc3MDgwNH0.Ln4-ZSI-NBqyCbSZyxNKwMd_sZ6Fs239G0mAiBBWV-I

# 3. Service Role Key (Lo encuentras en: Project API Keys -> service_role / secret)
# ⚠️ IMPORTANTE: Esta clave da acceso total a la base de datos. 
# 🛑 ¡NUNCA HAGAS COMMIT DE ESTE ARCHIVO A GITHUB!
SUPABASE_SERVICE_ROLE_KEY=pega_aqui_la_clave_secreta_que_copiaste_del_panel


## Issue Nro xxx: 
Descripcion
Para quien es: Como ... puedo ... 

## Issue Nro 2: 
Como usuario puedo ver mi historial clinico y solo yo y personal autorizado pueden verlo, puedo ver mi diagnostico y mi tratamiento recomendado asi tambien en forma cronologica la fecha del historial.
correo y contraseña de pruebas
lion@gmail.com
123456

## Issue Nro 07: 
Como medico puedes verificar las consultas dependiendo la fecha puedes seleccionar estados para filtrar
entre Pendiente, En atencion, Atendida y Derivada, dependiendo de la especialidad y el medico cambia ya
que esta asignado a su id medico.
correo y contraseña de pruebas
medico@hospital.com
123456

## Issue Nro 12: 
Como farmaceutico puedo verificar el dashboard, verificar el inventario y ver que lotes estan proximos a 
vencer y tambien aplico FEFO para el despacho de medicamentos, los medicamentos se verifican mediante la
receta y el medico que la asigno, se pueden agregar nuevos lotes de medicamentos.

## Issue Nro 13: 
Como farmaceutico puedo dispensar medicamentos ver la cantidad, el medico que la receto, el 
paciente que la necesita, la fecha de emision y todo se comprueba antes de la dispensacion aplicando 
FEFO
correo y contraseña de pruebas
farmacia@prueba.com
123456

##Issue Nro 19
Como administrativo, quiero que los movimientos de insumos se reflejen automáticamente en el inventario.
correo y contraseña de pruebas
xasdasd@gmail.com
123456789

## Issue Nro 09: 
Instalar la dependencia: npm install pdf-lib
ejecutar en terminal: npm install --global yarn
no olvidar ejecutar npm run server primero
ejecutar en terminal: vercel dev

**Como** médico, **quiero** generar un resumen exportable de la consulta
**para** entregarlo al paciente o guardarlo como archivo.

- **Issue:** [#12](https://github.com/Ayca19/SIIH-INF-266/issues/12)
- **Depende de:** HU-06 (Registrar historia clínica)
- **Criterio de aceptación:** Genera y exporta automáticamente un PDF con
  el resumen formal de diagnóstico y tratamiento.

### Flujo

1. El médico abre una consulta ya atendida desde **Mis Consultas** →
   botón **Editar**.
2. Si la consulta tiene diagnóstico guardado, se habilita el botón
   **📄 Descargar reporte PDF**.
3. El frontend pide `GET /api/medico/reporte-consulta?id_consulta=X&id_medico=Y`.
4. El backend valida (en este orden): que la consulta exista, que
   pertenezca al médico que la solicita, y que tenga diagnóstico
   registrado (si no, responde `409` pidiendo completar HU-06 primero).
5. Se arma el PDF con `pdf-lib` (sin fuentes externas, compatible con
   funciones serverless) y se devuelve como archivo adjunto
   (`application/pdf`).

### Arquitectura (3 capas)

| Capa | Archivo |
|---|---|
| Presentación | `src/pages/medico/GestionConsultasMedico.jsx` (botón + descarga), `src/styles/reporteConsulta.css` |
| Lógica y Seguridad | `api/medico/reporte-consulta.js` (endpoint), `services/reporteConsultaService.js` (validaciones + reglas de negocio), `services/reporteConsultaPdf.js` (armado del PDF) |
| Datos | `repositories/medicoRepository.js` → `obtenerConsultaParaReporte()`, `repositories/pacienteRepository.js` → `obtenerDetallePaciente()` |

### Notas técnicas

- El diagnóstico/tratamiento/receta no viven en columnas propias de
  `consulta`; se decodifican desde `observaciones` (bloque `[[MED]]`)
  vía `repositories/consultaMeta.js`.
- Dependencia nueva: `pdf-lib` (`npm install pdf-lib`).
- Requiere `vercel dev` para probarse en local (Vite solo no ejecuta `/api`).

## Issue Nro 14: 
Instalar la dependencia: npm install node-telegram-bot-api
ejecutar en terminal: npm install --global yarn
no olvidar ejecutar npm run server primero
ejecutar en terminal: vercel dev

**Como** farmacéutico, **quiero** recibir alertas automáticas en Telegram de bajo stock y lotes próximos a caducar
**para** gestionar el reabastecimiento a tiempo y evitar la entrega de medicamentos vencidos.

- **Issue:** [#14](https://github.com/Ayca19/SIIH-INF-266/issues/14)
- **Depende de:** Gestión de Inventario y Despacho de Recetas
- **Criterio de aceptación:** Envía un mensaje a Telegram automáticamente cuando el stock global de un medicamento cae por debajo del mínimo tras un despacho, y genera un reporte de caducidad bajo demanda.

### Flujo

1. El farmacéutico confirma el despacho de una receta o presiona el botón **Revisar Vencimientos** desde **Gestión de Inventario**.
2. Para el despacho, el backend procesa la salida de medicamentos y verifica el `stock_actual`.
3. Si `stock_actual <= stock_minimo`, se invoca inmediatamente el servicio de Telegram enviando la alerta de stock crítico.
4. Para la revisión de caducidad, el frontend pide `GET /api/farmacia/revisar-vencimientos`.
5. El backend busca en `lote_medicamento` los lotes activos (`cantidad_actual > 0`) cuya `fecha_vencimiento` sea menor o igual a 30 días.
6. Se consolida la información obtenida y se envía un reporte de los lotes críticos al grupo de Telegram configurado.

### Arquitectura (3 capas)

| Capa | Archivo |
|---|---|
| Presentación | `src/pages/farmacia/GestionInventario.jsx` (botón de revisión) |
| Lógica y Seguridad | `api/farmacia/revisar-vencimientos.js` (endpoint), `api/farmacia/despachar-receta.js` (disparador), `services/telegramService.js` (comunicación con API Telegram) |
| Datos | `repositories/inventarioRepository.js` → `obtenerLotesPorVencer()`, `verificarStockCritico()` |

### Notas técnicas

- La actualización matemática del inventario se delega a los triggers de PostgreSQL en Supabase (`trg_sincronizar_stock`, `trg_descontar_stock`); el backend solo lee el estado final para decidir si dispara la alerta, evitando condiciones de carrera.
- Dependencia nueva: `node-telegram-bot-api` (`npm install node-telegram-bot-api`).
- La revisión de caducidad funciona bajo demanda mediante un endpoint para facilitar pruebas locales sin requerir CRON Jobs por el momento.
- Requiere `vercel dev` para probarse en local (Vite solo no ejecuta `/api`).

## Issue Nro 16: Carga de resultados de laboratorio

Instalar dependencias necesarias (si aplica) y asegurar que la columna `archivo_resultado` esté activa en la tabla `analisis_laboratorio` de Supabase.
No olvidar ejecutar `npm run server` primero.
Ejecutar en terminal: `vercel dev`

**Como** técnico de laboratorio, **quiero** subir el resultado directamente al sistema para que el médico no espere el papel **para** adjuntar resultados digitales (PDF/imagen/texto), vincularlos a la solicitud y permitir su consulta y descarga inmediata.

- **Issue:** [#16](https://github.com/Ayca19/SIIH-INF-266/issues/16)
- **Depende de:** Solicitud de análisis de laboratorio y Gestión de Consultas Médicas
- **Criterio de aceptación:** Adjunta resultados digitales (PDF/imagen/texto), los vincula a la solicitud y permite su consulta y descarga desde la vista del médico tratante.

### Flujo

1. El técnico de laboratorio accede a la gestión de análisis y edita o completa una solicitud pendiente.
2. Sube el archivo digital del resultado (PDF o imagen), el cual se almacena de forma segura en el bucket de Supabase Storage (`laboratorio`).
3. El frontend genera la URL pública del archivo y la envía junto con el payload de actualización (`archivo_resultado`).
4. El backend procesa la petición mediante `actualizarAnalisisLaboratorio` e impacta la base de datos registrando el enlace permanente.
5. El médico tratante visualiza la solicitud del paciente y accede al botón dinámico **"Ver documento de laboratorio"** para consultar o descargar el archivo adjunto al instante.

### Arquitectura (3 capas)

| Capa | Archivo |
|---|---|
| Presentación | `src/pages/laboratorio/GestionAnalisisLaboratorio.jsx`, `src/pages/medico/GestionConsultasMedico.jsx` |
| Lógica y Seguridad | `api/laboratorio/editar-analisis.js`, `services/tecnicoLaboratorioService.js` (gestión de payload y subida a Storage) |
| Datos | Supabase Storage (`bucket: laboratorio`) & Tabla `analisis_laboratorio` (columna `archivo_resultado`) |

### Notas técnicas

- La persistencia del archivo se maneja mediante Supabase Storage asegurando URLs públicas accesibles para la visualización directa del médico.
- Se integró la lógica de actualización compatible con los flujos de la HU-15 (manejo de solicitudes de origen médico y técnico).
- Requiere `vercel dev` para probarse en local de manera integrada con las Serverless Functions.


## Issue Nro 20: 
