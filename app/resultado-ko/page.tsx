'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';

function ResultadoKoContent() {
  const searchParams = useSearchParams();

  const referencia = searchParams.get('referencia');
  const identificacion = searchParams.get('identificacion');
  const importe = searchParams.get('importe');
  const errorCode = searchParams.get('errorCode');
  const estado = searchParams.get('estado');

  const errorMessages: Record<string, string> = {
    'CANCELLED_BY_USER': 'El pago fue cancelado por el usuario',
    'INSUFFICIENT_FUNDS': 'Fondos insuficientes',
    'CARD_DECLINED': 'Tarjeta rechazada',
    'EXPIRED_CARD': 'Tarjeta expirada',
    'INVALID_CARD': 'Tarjeta inválida',
  };

  const errorMessage = errorCode ? errorMessages[errorCode] || 'Error desconocido' : 'Pago no autorizado';

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 to-rose-100 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-2xl">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-12 w-12 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-red-700">Pago Cancelado</h1>
          <p className="mt-2 text-sm text-gray-500">{errorMessage}</p>
        </div>

        <div className="mb-6 space-y-3 rounded-lg bg-gray-50 p-4">
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="font-medium text-gray-600">Estado:</span>
            <span className="font-semibold text-red-600">{estado || 'KO'}</span>
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
            <span className="text-xl font-bold text-gray-700">{importe || 'N/A'} €</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Código de Error:</span>
            <span className="text-xs font-mono text-red-600">{errorCode || 'N/A'}</span>
          </div>
        </div>

        <div className="mb-4 rounded-lg bg-red-50 p-4">
          <p className="text-sm text-gray-700">
            El pago no pudo ser completado. Si crees que esto es un error, contacta con soporte.
          </p>
        </div>

        <Link
          href="/"
          className="block w-full rounded-lg bg-red-600 px-4 py-3 text-center font-semibold text-white transition-colors hover:bg-red-700"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

export default function ResultadoKoPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-red-600 border-r-transparent"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    }>
      <ResultadoKoContent />
    </Suspense>
  );
}
