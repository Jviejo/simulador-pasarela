'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';

function ResultadoOkContent() {
  const searchParams = useSearchParams();

  const referencia = searchParams.get('referencia');
  const identificacion = searchParams.get('identificacion');
  const importe = searchParams.get('importe');
  const autorizacion = searchParams.get('autorizacion');
  const estado = searchParams.get('estado');

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-2xl">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-12 w-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-green-700">¡Pago Exitoso!</h1>
          <p className="mt-2 text-sm text-gray-500">El pago ha sido procesado correctamente</p>
        </div>

        <div className="mb-6 space-y-3 rounded-lg bg-gray-50 p-4">
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="font-medium text-gray-600">Estado:</span>
            <span className="font-semibold text-green-600">{estado || 'OK'}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="font-medium text-gray-600">Referencia:</span>
            <span className="font-semibold text-gray-800">{referencia || 'N/A'}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="font-medium text-gray-600">Identificación:</span>
            <span className="font-semibold text-gray-800">{identificacion || 'N/A'}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="font-medium text-gray-600">Importe:</span>
            <span className="text-xl font-bold text-green-600">{importe || 'N/A'} €</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Autorización:</span>
            <span className="break-all text-xs font-mono text-gray-800">{autorizacion || 'N/A'}</span>
          </div>
        </div>

        <div className="mb-4 rounded-lg bg-green-50 p-4">
          <p className="text-sm text-gray-700">
            El pago ha sido autorizado correctamente. Guarda el código de autorización para tus registros.
          </p>
        </div>

        <Link
          href="/"
          className="block w-full rounded-lg bg-green-600 px-4 py-3 text-center font-semibold text-white transition-colors hover:bg-green-700"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

export default function ResultadoOkPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-600 border-r-transparent"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    }>
      <ResultadoOkContent />
    </Suspense>
  );
}
