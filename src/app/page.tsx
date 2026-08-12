'use client';

import { useState } from 'react';
import jsPDF from 'jspdf';
import Turnstile from 'react-turnstile';

export default function Home() {
  const [nombre, setNombre] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const validarFormulario = () => {
    if (!nombre || !departamento || !municipio) {
      alert('Por favor completa Nombre, Departamento y Municipio.');
      return false;
    }
    if (!captchaToken) {
      alert('Completa la verificación anti-bot (Captcha) primero.');
      return false;
    }
    return true;
  };

  const generarPDF = () => {
    if (!validarFormulario()) return;

    const doc = new jsPDF();
    const fecha = new Date().toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(`${municipio}, ${departamento}, ${fecha}`, 20, 20);

    doc.text('Para:', 20, 30);
    doc.text('Doctor Abelardo de la Espriella', 20, 36);
    doc.setFont('helvetica', 'normal');
    doc.text('Presidente de la República de Colombia', 20, 42);
    doc.text('Palacio de Nariño, Bogotá D.C.', 20, 48);

    doc.setFont('helvetica', 'bold');
    doc.text('Asunto: Exigencia ciudadana inmediata para la aceptación de ayuda humanitaria', 20, 58);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);

    const textoCarta = [
      'Señor Presidente:',
      '',
      'Nos dirigimos a usted en un momento crítico para la nación, donde miles de familias colombianas enfrentan una emergencia desgarradora que requiere soluciones inmediatas, pragmáticas y sin sesgos políticos.',
      '',
      'Hemos recibido con profunda preocupación e indignación la decisión de rechazar la ayuda ofrecida por países dispuestos a enviar personal especializado en búsqueda y rescate, aun cuando existen personas atrapadas bajo los escombros y cada minuto que transcurre puede significar la diferencia entre la vida y la muerte.',
      '',
      'La aceptación de insumos y suministros humanitarios, aunque necesaria, resulta insuficiente frente a una emergencia de esta naturaleza. Lo que se necesita con urgencia es permitir el ingreso de los equipos humanos capacitados para localizar, rescatar y brindar atención inmediata a las víctimas.',
      '',
      'Es necesario recordarle con claridad que usted no se manda solo. El poder que usted ejerce le fue otorgado por el pueblo colombiano para proteger y servir a la nación, no para anteponer posturas personales o políticas a la vida y supervivencia de sus ciudadanos.',
      '',
      'Por lo tanto, la ciudadanía colombiana exige de manera categórica:',
      '1. Autorización inmediata de los equipos de rescate: Iniciar de forma urgente los trámites y protocolos necesarios para permitir el ingreso al territorio nacional de los equipos internacionales especializados en búsqueda, rescate y atención de víctimas que se encuentren dispuestos a colaborar en esta emergencia.',
      '2. Priorización de la vida: Poner todos los recursos nacionales e internacionales disponibles a disposición directa de las comunidades afectadas, garantizando transparencia, coordinación y celeridad en las labores de búsqueda, rescate y atención humanitaria.',
      '',
      'Esta no es una sugerencia. Es una orden dictada por el pueblo colombiano frente a una emergencia en la que cada minuto cuenta y en la que toda posibilidad de salvar una vida debe ser aprovechada.',
      '',
      'Exigimos que actúe a la altura de las circunstancias que el país requiere. La vida y la dignidad de los colombianos están por encima de cualquier consideración personal, política o gubernamental.',
      '',
      'Atentamente,',
      '',
      `${nombre}`,
      `Ciudadano(a) de ${municipio}, ${departamento}`,
      'En ejercicio de sus derechos ciudadanos'
    ];

    let y = 68;
    textoCarta.forEach((linea) => {
      if (linea.startsWith('Esta no es una sugerencia') || linea.startsWith('Atentamente,')) {
        doc.setFont('helvetica', 'bold');
      }

      const splitText = doc.splitTextToSize(linea, 170);
      doc.text(splitText, 20, y);
      y += splitText.length * 5 + 2;

      if (linea.startsWith('Esta no es una sugerencia')) {
        doc.setFont('helvetica', 'normal');
      }
    });

    doc.save(`Carta_Presidencia_${nombre.replace(/\s+/g, '_')}.pdf`);
  };

  const abrirCorreo = () => {
    if (!validarFormulario()) return;

    const emailDestino = 'contacto@presidencia.gov.co';
    const asuntoPredeterminado = `EXIGENCIA CIUDADANA - INGRESO DE EQUIPOS DE RESCATE - ${municipio.toUpperCase()}, ${departamento.toUpperCase()}`;
    
    const fechaActual = new Date().toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const cuerpoMensaje = 
`${municipio}, ${departamento}, ${fechaActual}

Para:
Doctor Abelardo de la Espriella
Presidente de la República de Colombia
Palacio de Nariño, Bogotá D.C.

Asunto: Exigencia ciudadana inmediata para la aceptación de ayuda humanitaria

Señor Presidente:

Nos dirigimos a usted en un momento crítico para la nación, donde miles de familias colombianas enfrentan una emergencia desgarradora que requiere soluciones inmediatas, pragmáticas y sin sesgos políticos.

Hemos recibido con profunda preocupación e indignación la decisión de rechazar la ayuda ofrecida por países dispuestos a enviar personal especializado en búsqueda y rescate, aun cuando existen personas atrapadas bajo los escombros y cada minuto que transcurre puede significar la diferencia entre la vida y la muerte.

La aceptación de insumos y suministros humanitarios, aunque necesaria, resulta insuficiente frente a una emergencia de esta naturaleza. Lo que se necesita con urgencia es permitir el ingreso de los equipos humanos capacitados para localizar, rescatar y brindar atención inmediata a las víctimas.

Es necesario recordarle con claridad que usted no se manda solo. El poder que usted ejerce le fue otorgado por el pueblo colombiano para proteger y servir a la nación, no para anteponer posturas personales o políticas a la vida y supervivencia de sus ciudadanos.

Por lo tanto, la ciudadanía colombiana exige de manera categórica:

1. Autorización inmediata de los equipos de rescate: Iniciar de forma urgente los trámites y protocolos necesarios para permitir el ingreso al territorio nacional de los equipos internacionales especializados en búsqueda, rescate y atención de víctimas que se encuentren dispuestos a colaborar en esta emergencia.

2. Priorización de la vida: Poner todos los recursos nacionales e internacionales disponibles a disposición directa de las comunidades afectadas, garantizando transparencia, coordinación y celeridad en las labores de búsqueda, rescate y atención humanitaria.

Esta no es una sugerencia. Es una orden dictada por el pueblo colombiano frente a una emergencia en la que cada minuto cuenta y en la que toda posibilidad de salvar una vida debe ser aprovechada.

Exigimos que actúe a la altura de las circunstancias que el país requiere. La vida y la dignidad de los colombianos están por encima de cualquier consideración personal, política o gubernamental.

Atentamente,

${nombre}
Ciudadano(a) de ${municipio}, ${departamento}
En ejercicio de sus derechos ciudadanos`;

    const mailtoUrl = `mailto:${emailDestino}?subject=${encodeURIComponent(asuntoPredeterminado)}&body=${encodeURIComponent(cuerpoMensaje)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <main className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-12 font-sans text-slate-800">
      <header className="max-w-5xl mx-auto text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">
          Exigencia Ciudadana a Presidencia
        </h1>
        <p className="text-slate-600">
          Completa tus datos para generar el PDF y redactar el correo oficial dirigido a Presidencia.
        </p>
      </header>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* PANEL DE CONTROL / FLUJO */}
        <section className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          
          {/* PASO 1 */}
          <div className="mb-6 pb-6 border-b border-slate-100">
            <h3 className="text-sm font-extrabold text-blue-700 uppercase tracking-wider mb-2">
              Paso 1: Verificación Humana
            </h3>
            <div className="flex justify-center bg-slate-50 p-2 rounded-lg border border-slate-200">
              <Turnstile
                sitekey="0x4AAAAAAENqN3dr0KC1_jkW"
                onVerify={(token) => setCaptchaToken(token)}
              />
            </div>
          </div>

          {/* PASO 2 */}
          <div className="mb-6 pb-6 border-b border-slate-100">
            <h3 className="text-sm font-extrabold text-blue-700 uppercase tracking-wider mb-3">
              Paso 2: Ingresa tus Datos
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Nombre Completo</label>
                <input
                  type="text"
                  placeholder="Ej: Kevin Castillo"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Departamento</label>
                  <input
                    type="text"
                    placeholder="Ej: Santander"
                    value={departamento}
                    onChange={(e) => setDepartamento(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Municipio</label>
                  <input
                    type="text"
                    placeholder="Ej: Bucaramanga"
                    value={municipio}
                    onChange={(e) => setMunicipio(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* PASO 3 */}
          <div>
            <h3 className="text-sm font-extrabold text-blue-700 uppercase tracking-wider mb-3">
              Paso 3: Descarga y Envía
            </h3>
            <div className="space-y-3">
              <button
                onClick={generarPDF}
                disabled={!captchaToken}
                className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition flex items-center justify-center gap-2 ${
                  captchaToken
                    ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-md'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                📥 1º Descargar Carta PDF
              </button>

              <button
                onClick={abrirCorreo}
                disabled={!captchaToken}
                className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition flex items-center justify-center gap-2 ${
                  captchaToken
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shadow-md'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                ✉️ 2º Redactar y Enviar Correo
              </button>
            </div>
            <p className="text-[11px] text-slate-500 mt-3 text-center">
              💡 El correo ya incluirá todo el texto redactado automáticamente. Si deseas, puedes adjuntar el PDF descargado.
            </p>
          </div>

        </section>

        {/* VISTA PREVIA CARTA */}
        <section className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
          <div className="border-b pb-3 mb-4 flex justify-between items-center">
            <span className="text-xs font-bold uppercase text-slate-400">Vista Previa de la Carta</span>
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">Documento Oficial</span>
          </div>

          <article className="text-xs sm:text-sm text-slate-800 space-y-3 leading-relaxed">
            <p className="text-right font-semibold text-slate-500">
              {municipio || '[Municipio]'}, {departamento || '[Departamento]'}, {new Date().toLocaleDateString('es-CO')}
            </p>

            <div>
              <p className="font-bold">Para:</p>
              <p className="font-semibold">Doctor Abelardo de la Espriella</p>
              <p className="text-slate-600">Presidente de la República de Colombia<br />Palacio de Nariño, Bogotá D.C.</p>
            </div>

            <p className="font-bold border-l-2 border-slate-900 pl-2">
              Asunto: Exigencia ciudadana inmediata para la aceptación de ayuda humanitaria
            </p>

            <p>Señor Presidente:</p>
            <p>Nos dirigimos a usted en un momento crítico para la nación, donde miles de familias colombianas enfrentan una emergencia desgarradora que requiere soluciones inmediatas, pragmáticas y sin sesgos políticos...</p>

            <p>Hemos recibido con profunda preocupación e indignación la decisión de rechazar la ayuda ofrecida por países dispuestos a enviar personal especializado en búsqueda y rescate...</p>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r text-amber-900 font-bold">
              Esta no es una sugerencia. Es una orden dictada por el pueblo colombiano frente a una emergencia en la que cada minuto cuenta...
            </div>

            <div className="pt-4 border-t border-slate-100">
              <p className="font-bold">Atentamente,</p>
              <p className="font-bold text-blue-600 text-base">{nombre || '[Tu Nombre]'}</p>
              <p className="text-slate-500">Ciudadano(a) de {municipio || '[Municipio]'}, {departamento || '[Departamento]'}<br />En ejercicio de sus derechos ciudadanos</p>
            </div>
          </article>
        </section>

      </div>
    </main>
  );
}