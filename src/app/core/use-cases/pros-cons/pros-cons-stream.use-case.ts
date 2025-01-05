import { environment } from "environments/environment";

export async function* prosConsStreamUseCase( prompt: string, abortSignal: AbortSignal) {
  try {
    const response = await fetch(`${environment.backendApi}/pros-cons-discusser-stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({prompt}),
      signal: abortSignal,
    });

    if ( !response.ok ) throw new Error('We could not make the comparison');

    const dataReader = response.body?.getReader();
    if ( !dataReader ) {
      console.log('We cannot generate the reader');
      throw new Error('We cannot generate the reader');
    }

    const decoder = new TextDecoder();
    let text = '';

    while( true ) {
      const {value, done} = await dataReader.read();

      if ( done ) {
        break;
      }

      const decodedChunk = decoder.decode( value, { stream: true });
      text += decodedChunk;
      yield text;
    }

    return text;
  } catch (error) {
    return null;
  }
}
