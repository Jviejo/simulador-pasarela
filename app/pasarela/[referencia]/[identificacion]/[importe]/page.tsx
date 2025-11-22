'use client';

import { useSearchParams, useParams } from 'next/navigation';
import { Suspense, useState } from 'react';

function PasarelaContent() {
  const searchParams = useSearchParams();
  const params = useParams();
  const [processing, setProcessing] = useState(false);

  // Función auxiliar para parsear parámetros de la URL completa si no están en searchParams
  const parseUrlParams = () => {
    if (typeof window === 'undefined') return { urlok: null, urlko: null };
    
    const fullUrl = window.location.href;
    let urlok: string | null = null;
    let urlko: string | null = null;

    // Buscar urlok - desde urlok= hasta &urlko= o el final
    const urlokIndex = fullUrl.indexOf('urlok=');
    if (urlokIndex !== -1) {
      const urlokStart = urlokIndex + 6; // longitud de "urlok="
      const urlkoIndex = fullUrl.indexOf('&urlko=', urlokStart);
      if (urlkoIndex !== -1) {
        urlok = decodeURIComponent(fullUrl.substring(urlokStart, urlkoIndex));
      } else {
        urlok = decodeURIComponent(fullUrl.substring(urlokStart));
      }
    }

    // Buscar urlko - desde urlko= hasta el final
    const urlkoIndex = fullUrl.indexOf('urlko=');
    if (urlkoIndex !== -1) {
      const urlkoStart = urlkoIndex + 6; // longitud de "urlko="
      urlko = decodeURIComponent(fullUrl.substring(urlkoStart));
    }

    return { urlok, urlko };
  };

  // Leer parámetros de la ruta
  const referencia = params?.referencia as string;
  const identificacion = params?.identificacion as string;
  const importe = params?.importe as string;

  // Leer urlok y urlko: primero de searchParams, si no están, parsear manualmente la URL
  let urlok = searchParams.get('urlok');
  let urlko = searchParams.get('urlko');
  
  if (!urlok || !urlko) {
    const parsedParams = parseUrlParams();
    urlok = urlok || parsedParams.urlok;
    urlko = urlko || parsedParams.urlko;
  }

  // Validación de parámetros
  const missingParams: string[] = [];
  if (!referencia) missingParams.push('referencia');
  if (!identificacion) missingParams.push('identificacion');
  if (!importe) missingParams.push('importe');
  if (!urlok) missingParams.push('urlok');
  if (!urlko) missingParams.push('urlko');

  if (missingParams.length > 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-red-50">
        <div className="max-w-md rounded-lg bg-white p-8 shadow-lg">
          <h1 className="mb-4 text-2xl font-bold text-red-600">Error</h1>
          <p className="mb-2 text-gray-700">
            Faltan parámetros requeridos:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            {missingParams.map(param => (
              <li key={param}>{param}</li>
            ))}
          </ul>
          <p className="text-sm text-gray-500">
            La ruta debe ser: /pasarela/referencia/identificacion/importe?urlok=...&urlko=...
          </p>
        </div>
      </div>
    );
  }

  const handlePago = async (aceptado: boolean) => {
    setProcessing(true);

    try {
      const response = await fetch('/api/procesar-pago', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          referencia,
          identificacion,
          importe,
          urlok,
          urlko,
          aceptado,
        }),
      });

      const data = await response.json();

      // Redirigir a la URL correspondiente
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      }
    } catch (error) {
      console.error('Error procesando pago:', error);
      setProcessing(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-2xl">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <svg
              className="h-8 w-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Pasarela de Pago</h1>
          <p className="mt-2 text-sm text-gray-500">Simulador de Pagos</p>
        </div>

        <div className="mb-6 space-y-4 rounded-lg bg-gray-50 p-4">
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="font-medium text-gray-600">Referencia:</span>
            <span className="font-semibold text-gray-800">{referencia}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="font-medium text-gray-600">Identificación:</span>
            <span className="font-semibold text-gray-800">{identificacion}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Importe:</span>
            <span className="text-2xl font-bold text-blue-600">{importe} €</span>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => handlePago(true)}
            disabled={processing}
            className="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {processing ? 'Procesando...' : 'Aceptar Pago'}
          </button>
          <button
            onClick={() => handlePago(false)}
            disabled={processing}
            className="w-full rounded-lg bg-red-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {processing ? 'Procesando...' : 'Cancelar Pago'}
          </button>
        </div>

        <div className="mt-6 rounded-lg bg-blue-50 p-3">
          <p className="text-xs text-gray-600">
            <span className="font-semibold">Nota:</span> Este es un simulador de pasarela de pago.
            No se realizará ningún cargo real.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PasarelaPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    }>
      <PasarelaContent />
    </Suspense>
  );
}
