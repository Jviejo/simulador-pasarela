'use client';

import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    referencia: 'REF-' + Date.now(),
    identificacion: '12345678A',
    importe: '100.00',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construir la URL de la pasarela con los parámetros
    const baseUrl = window.location.origin;
    const urlok = `${baseUrl}/resultado-ok`;
    const urlko = `${baseUrl}/resultado-ko`;

    const pasarelaUrl = new URL(`${baseUrl}/pasarela`);
    pasarelaUrl.searchParams.append('referencia', formData.referencia);
    pasarelaUrl.searchParams.append('identificacion', formData.identificacion);
    pasarelaUrl.searchParams.append('importe', formData.importe);
    pasarelaUrl.searchParams.append('urlok', urlok);
    pasarelaUrl.searchParams.append('urlko', urlko);

    // Redirigir a la pasarela
    window.location.href = pasarelaUrl.toString();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-blue-100 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
            <svg
              className="h-8 w-8 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Simulador de Pasarela</h1>
          <p className="mt-2 text-sm text-gray-500">Página de prueba del simulador de pagos</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="referencia" className="mb-2 block text-sm font-medium text-gray-700">
              Referencia del Pago
            </label>
            <input
              type="text"
              id="referencia"
              name="referencia"
              value={formData.referencia}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
              placeholder="REF-123456"
            />
          </div>

          <div>
            <label htmlFor="identificacion" className="mb-2 block text-sm font-medium text-gray-700">
              Identificación
            </label>
            <input
              type="text"
              id="identificacion"
              name="identificacion"
              value={formData.identificacion}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
              placeholder="12345678A"
            />
          </div>

          <div>
            <label htmlFor="importe" className="mb-2 block text-sm font-medium text-gray-700">
              Importe (€)
            </label>
            <input
              type="number"
              id="importe"
              name="importe"
              value={formData.importe}
              onChange={handleChange}
              required
              step="0.01"
              min="0.01"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
              placeholder="100.00"
            />
          </div>

          <div className="rounded-lg bg-blue-50 p-4">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Nota:</span> Al hacer clic en "Ir a la Pasarela", serás
              redirigido al simulador donde podrás aceptar o cancelar el pago.
            </p>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-purple-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Ir a la Pasarela
          </button>
        </form>

        <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <h3 className="mb-2 font-semibold text-gray-800">Flujo del simulador:</h3>
          <ol className="list-decimal space-y-1 pl-5 text-sm text-gray-600">
            <li>Completa el formulario con los datos del pago</li>
            <li>Serás redirigido a la pasarela de pago</li>
            <li>Acepta o cancela el pago en la pasarela</li>
            <li>Verás el resultado (OK o KO) con los parámetros correspondientes</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
