import { TranslateResponse } from '@interfaces/index';
import { environment } from 'environments/environment'

export const translateUseCase = async(prompt: string, lang: string) => {
  try {

    const response = await fetch(`${environment.backendApi}/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({prompt, lang})
    });

    if ( !response.ok ) throw new Error('We could not make the translate');

    const { message } = await response.json() as TranslateResponse;

    return {
      ok: true,
      message
    }

  } catch (error) {
    return {
      ok: false,
      message: 'We could not make the translate'
    }
  }
}
