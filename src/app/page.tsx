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
      alert('Por favor completa todos los campos (Nombre, Departamento y Municipio)');
      return false;
    }
    if (!captchaToken) {
      alert('Por favor completa la verificación de seguridad (Captcha) para continuar.');
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
    doc.text(`Ciudad y fecha: ${municipio}, ${departamento}, ${fecha}`, 20, 20);

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
      'Hemos recibido con profunda preocupación e indignación su decisión de rechazar la ayuda humanitaria brindada por la comunidad internacional. Ante una crisis de esta magnitud, dar la espalda a la cooperación global no solo es una irresponsabilidad institucional, sino una medida insensible que pone en riesgo directo la vida, la salud y el bienestar del pueblo colombiano.',
      '',
      'Es necesario recordarle con claridad que usted no se manda solo. El poder que ejerce le fue delegado por la ciudadanía para proteger a la nación, no para anteponer posturas personales o políticas sobre la supervivencia de la gente. La soberanía reside exclusivamente en el pueblo, y es ante este que usted debe rendir cuentas.',
      '',
      'Por lo tanto, la ciudadanía colombiana exige de manera categórica:',
      '1. Aceptación inmediata: Iniciar de forma urgente los trámites y protocolos necesarios para recibir y distribuir la ayuda humanitaria internacional disponible.',
      '2. Priorización de la vida: Poner los recursos y el auxilio internacional a disposición directa de las comunidades afectadas, garantizando transparencia y celeridad.',
      '',
      'Esta no es una sugerencia; es una orden directa del pueblo colombiano y es de obligatorio cumplimiento.',
      '',
      'Exigimos que actúe a la altura de las circunstancias que el país requiere. La vida y la dignidad de los colombianos están por encima de cualquier consideración personal o gubernamental.',
      '',
      'Atentamente,',
      '',
      `${nombre}`,
      `Ciudadano(a) de ${municipio}, ${departamento}`,
      'En ejercicio de su soberanía constitucional'
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

  const enviarCorreo = () => {
    if (!validarFormulario()) return;

    const emailDestino = 'contacto@presidencia.gov.co';
    const asuntoPredeterminado = `EXIGENCIA CIUDADANA - ACEPTACION DE AYUDA HUMANITARIA - ${municipio.toUpperCase()}, ${departamento.toUpperCase()}`;
    
    const cuerpoMensaje = 
`Señor Presidente de la República,

Por medio del presente mensaje, yo, ${nombre}, residente del municipio de ${municipio}, ${departamento}, presento formalmente mi exigencia para la aceptación inmediata de la ayuda humanitaria internacional destinada a atender la emergencia nacional.

Adjunto a este correo electrónico la carta formal en formato PDF firmada en mi calidad de ciudadano(a) colombiano(a) en ejercicio de mi soberanía constitucional.

Atentamente,
${nombre}
Ciudadano(a) de ${municipio}, ${departamento}`;

    const mailtoUrl = `mailto:${emailDestino}?subject=${encodeURIComponent(asuntoPredeterminado)}&body=${encodeURIComponent(cuerpoMensaje)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <main className="min-h-screen bg-slate-100 py-6 px-4 sm:px-6 lg:px-12 font-sans text-slate-800">
      {/* Encabezado Principal */}
      <header className="max-w-6xl mx-auto text-center mb-8">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
          Exigencia Ciudadana a Presidencia
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
          Genera tu carta personalizada en PDF y envíala directamente a Presidencia exigiendo la aceptación de la ayuda humanitaria internacional.
        </p>
      </header>

      {/* Contenedor Principal */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* COLUMNA IZQUIERDA: Formulario */}
        <section className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 lg:sticky lg:top-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2 border-b pb-3 border-slate-100">
            <span>📝</span> Tu Información
          </h2>

          <div className="space-y-4 mb-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Nombre Completo
              </label>
              <input
                type="text"
                placeholder="Ej: María Rodríguez"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition text-slate-900 text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Departamento
                </label>
                <input
                  type="text"
                  placeholder="Ej: Santander"
                  value={departamento}
                  onChange={(e) => setDepartamento(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition text-slate-900 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Municipio
                </label>
                <input
                  type="text"
                  placeholder="Ej: Bucaramanga"
                  value={municipio}
                  onChange={(e) => setMunicipio(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition text-slate-900 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Widget Verificación Captcha */}
          <div className="my-4 flex justify-center bg-slate-50 p-3 rounded-lg border border-slate-200">
            <Turnstile
              sitekey="0x4AAAAAAENqN3dr0KC1_jkW"
              onVerify={(token) => setCaptchaToken(token)}
            />
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={generarPDF}
              disabled={!captchaToken}
              className={`w-full font-semibold py-3.5 px-4 rounded-xl transition shadow-sm flex items-center justify-center gap-2 text-sm ${
                captchaToken
                  ? 'bg-blue-700 hover:bg-blue-800 text-white cursor-pointer'
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed opacity-60'
              }`}
            >
              <span>📄</span> 1. Descargar Carta en PDF
            </button>

            <button
              onClick={enviarCorreo}
              disabled={!captchaToken}
              className={`w-full font-semibold py-3.5 px-4 rounded-xl transition shadow-sm flex items-center justify-center gap-2 text-sm ${
                captchaToken
                  ? 'bg-emerald-700 hover:bg-emerald-800 text-white cursor-pointer'
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed opacity-60'
              }`}
            >
              <span>✉️</span> 2. Abrir Correo y Enviar a Presidencia
            </button>
          </div>

          <p className="text-xs text-slate-500 mt-4 text-center">
            🔒 Protegido con verificación humana anti-bot.
          </p>
        </section>

        {/* COLUMNA DERECHA: Vista Previa */}
        <section className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-2xl shadow-md border border-slate-200">
          <div className="flex items-center justify-between border-b pb-4 mb-6 border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Vista previa del documento
            </span>
            <span className="text-xs bg-slate-100 text-slate-600 font-medium px-2.5 py-1 rounded-full">
              Formato Oficial
            </span>
          </div>

          <article className="prose prose-slate max-w-none text-slate-800 text-xs sm:text-sm leading-relaxed space-y-4">
            <p className="text-right font-semibold text-slate-600">
              {municipio || '[Municipio]'}, {departamento || '[Departamento]'}, {new Date().toLocaleDateString('es-CO')}
            </p>

            <div className="space-y-1">
              <p className="font-bold text-slate-900 mb-0">Para:</p>
              <p className="font-semibold text-slate-800 mb-0">Doctor Abelardo de la Espriella</p>
              <p className="text-slate-600 mt-0">Presidente de la República de Colombia<br />Palacio de Nariño, Bogotá D.C.</p>
            </div>

            <p className="font-bold text-slate-900 border-l-2 border-slate-900 pl-3 py-0.5">
              Asunto: Exigencia ciudadana inmediata para la aceptación de ayuda humanitaria internacional
            </p>

            <p>Señor Presidente:</p>

            <p>
              Nos dirigimos a usted en un momento crítico para la nación, donde miles de familias colombianas enfrentan una emergencia desgarradora que requiere soluciones inmediatas, pragmáticas y sin sesgos políticos.
            </p>

            <p>
              Hemos recibido con profunda preocupación e indignación su decisión de rechazar la ayuda humanitaria brindada por la comunidad internacional. Ante una crisis de esta magnitud, dar la espalda a la cooperación global no solo es una irresponsabilidad institucional, sino una medida insensible que pone en riesgo directo la vida, la salud y el bienestar del pueblo colombiano.
            </p>

            <p>
              Es necesario recordarle con claridad que usted no se manda solo. El poder que ejerce le fue delegado por la ciudadanía para proteger a la nación, no para anteponer posturas personales o políticas sobre la supervivencia de la gente.
            </p>

            <div className="bg-amber-50/70 border-l-4 border-amber-500 p-4 rounded-r-lg my-4">
              <p className="font-bold text-amber-900 m-0">
                Esta no es una sugerencia; es una orden directa del pueblo colombiano y es de obligatorio cumplimiento.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-200">
              <p className="font-bold text-slate-900 mb-1">Atentamente,</p>
              <p className="font-bold text-blue-700 text-base mb-0">
                {nombre || '[Tu Nombre Aquí]'}
              </p>
              <p className="text-slate-600 mt-0">
                Ciudadano(a) de {municipio || '[Municipio]'}, {departamento || '[Departamento]'}<br />
                En ejercicio de su soberanía constitucional
              </p>
            </div>
          </article>
        </section>

      </div>
    </main>
  );
}