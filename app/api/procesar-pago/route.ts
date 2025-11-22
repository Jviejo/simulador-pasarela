import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { referencia, identificacion, importe, urlok, urlko, aceptado } = body;

    // Validar parámetros
    if (!referencia || !identificacion || !importe || !urlok || !urlko || aceptado === undefined) {
      return NextResponse.json(
        { error: 'Faltan parámetros requeridos' },
        { status: 400 }
      );
    }

    let redirectUrl: string;

    if (aceptado) {
      // Generar código de autorización (simulado)
      const autorizacion = generateAuthorizationCode(referencia);

      // Construir URL de éxito con parámetros
      const url = new URL(urlok);
      url.searchParams.append('referencia', referencia);
      url.searchParams.append('identificacion', identificacion);
      url.searchParams.append('importe', importe);
      url.searchParams.append('autorizacion', autorizacion);
      url.searchParams.append('estado', 'OK');

      redirectUrl = url.toString();
    } else {
      // Generar código de error (simulado)
      const errorCode = 'CANCELLED_BY_USER';

      // Construir URL de error con parámetros
      const url = new URL(urlko);
      url.searchParams.append('referencia', referencia);
      url.searchParams.append('identificacion', identificacion);
      url.searchParams.append('importe', importe);
      url.searchParams.append('errorCode', errorCode);
      url.searchParams.append('estado', 'KO');

      redirectUrl = url.toString();
    }

    return NextResponse.json({
      success: true,
      redirectUrl,
    });
  } catch (error) {
    console.error('Error procesando pago:', error);
    return NextResponse.json(
      { error: 'Error procesando el pago' },
      { status: 500 }
    );
  }
}

// Función auxiliar para generar código de autorización simulado
function generateAuthorizationCode(referencia: string): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `AUTH-${referencia}-${timestamp}-${random}`;
}
